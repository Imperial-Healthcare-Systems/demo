/**
 * Accessibility + integrity checks that a screenshot cannot catch.
 * Run against a running production build.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3000";
const ROUTES = [
  "/",
  "/solutions",
  "/advisory",
  "/products/digital-currency-hub",
  "/industries",
  "/lab",
  "/partners",
  "/about",
  "/about/leadership",
  "/about/careers",
  "/insights",
  "/insights/designing-retail-cbdc-for-privacy",
  "/contact",
  "/legal/privacy",
  "/nope-404",
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const problems = [];

for (const route of ROUTES) {
  const errors = [];
  page.removeAllListeners("console");
  page.removeAllListeners("pageerror");
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));

  const res = await page.goto(BASE + route, { waitUntil: "networkidle" });
  const status = res?.status();

  const report = await page.evaluate(() => {
    const out = {};
    out.title = document.title;
    out.desc =
      document.querySelector('meta[name="description"]')?.getAttribute("content")?.length ?? 0;
    out.h1 = [...document.querySelectorAll("h1")].map((h) => h.textContent.trim().slice(0, 60));
    out.imgNoAlt = [...document.querySelectorAll("img")].filter(
      (i) => i.getAttribute("alt") === null,
    ).length;
    out.emptyLinks = [...document.querySelectorAll("a")].filter(
      (a) => !a.textContent.trim() && !a.getAttribute("aria-label"),
    ).length;
    out.emptyButtons = [...document.querySelectorAll("button")].filter(
      (b) => !b.textContent.trim() && !b.getAttribute("aria-label"),
    ).length;
    out.inputsNoLabel = [...document.querySelectorAll("input,select,textarea")].filter((el) => {
      if (el.type === "hidden") return false;
      if (el.getAttribute("aria-label")) return false;
      return !(el.id && document.querySelector(`label[for="${CSS.escape(el.id)}"]`));
    }).length;
    // Heading order
    const levels = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => +h.tagName[1]);
    out.headingJumps = levels.filter((l, i) => i > 0 && l - levels[i - 1] > 1).length;
    // Horizontal overflow
    out.docWidth = document.documentElement.scrollWidth;
    out.viewportWidth = window.innerWidth;
    // Hidden-but-focusable widgets
    const slider = document.querySelector('[aria-label="Speak to OrbisMoneta"]');
    out.sliderInert = slider ? slider.hasAttribute("inert") : "n/a";
    const dialog = document.querySelector('[role="dialog"]')?.closest("[inert]");
    out.dialogWrapperInert = !!dialog;
    return out;
  });

  const issues = [];
  if (status !== 200 && route !== "/nope-404") issues.push(`status ${status}`);
  if (report.h1.length !== 1) issues.push(`h1 count=${report.h1.length}`);
  if (!report.desc) issues.push("no meta description");
  if (report.imgNoAlt) issues.push(`${report.imgNoAlt} img without alt`);
  if (report.emptyLinks) issues.push(`${report.emptyLinks} unlabelled links`);
  if (report.emptyButtons) issues.push(`${report.emptyButtons} unlabelled buttons`);
  if (report.inputsNoLabel) issues.push(`${report.inputsNoLabel} unlabelled inputs`);
  if (report.headingJumps) issues.push(`${report.headingJumps} heading-level jumps`);
  if (report.docWidth > report.viewportWidth + 1)
    issues.push(`h-overflow ${report.docWidth}>${report.viewportWidth}`);
  // Chromium logs "Failed to load resource: 404" for the document itself, so the
  // 404 route can never be console-clean. Ignore that one line there; anything
  // else the not-found page logs is still a real failure.
  const realErrors =
    route === "/nope-404"
      ? errors.filter((e) => !/status of 404/.test(e))
      : errors;
  if (realErrors.length) issues.push(`console: ${realErrors[0].slice(0, 80)}`);

  problems.push({ route, status, issues });
}

// Mobile overflow pass
const mctx = await browser.newContext({ viewport: { width: 360, height: 780 } });
const mp = await mctx.newPage();
for (const route of ROUTES.slice(0, 13)) {
  await mp.goto(BASE + route, { waitUntil: "networkidle" });
  const o = await mp.evaluate(() => ({
    doc: document.documentElement.scrollWidth,
    vw: window.innerWidth,
  }));
  if (o.doc > o.vw + 1) problems.push({ route: route + " (360px)", issues: [`h-overflow ${o.doc}`] });
}

console.log("\n== AUDIT ==");
for (const p of problems) {
  console.log(p.issues.length ? `✗ ${p.route}: ${p.issues.join("; ")}` : `✓ ${p.route}`);
}

await browser.close();
