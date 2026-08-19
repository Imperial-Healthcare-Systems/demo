/**
 * Mobile audit.
 *
 * Checks the things that actually break a phone layout and that a screenshot
 * will not reliably show you: content wider than the screen, tap targets too
 * small to hit, and type too small to read. Run against a production build.
 *
 *   npx next build && npx next start -p 4330
 *   BASE=http://localhost:4330 node scripts/mobile-audit.mjs
 *
 * Widths are the real narrow end of the market, not round numbers: 320 is the
 * iPhone SE and the narrowest phone still in use, 360 is the most common
 * Android, 390 is the modern iPhone.
 */
import { chromium } from "playwright";

const BASE = process.env.BASE ?? "http://localhost:3000";
const WIDTHS = [320, 360, 390];

const ROUTES = [
  "/",
  "/solutions",
  "/solutions/platforms",
  "/advisory",
  "/products/digital-currency-hub",
  "/industries",
  "/lab",
  "/partners",
  "/about",
  "/about/leadership",
  "/insights",
  "/insights/iso-20022-harmonisation-the-hard-part",
  "/events",
  "/contact",
  "/legal/privacy",
  "/admin/login",
  "/nope-404",
];

/** WCAG 2.5.5 asks for 44x44. 24x24 is the 2.2 AA floor; below that is a fail. */
const TAP_MIN = 44;

const browser = await chromium.launch();
const findings = [];

for (const width of WIDTHS) {
  const ctx = await browser.newContext({
    viewport: { width, height: 800 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });
  const page = await ctx.newPage();

  for (const route of ROUTES) {
    const errors = [];
    page.removeAllListeners("pageerror");
    page.on("pageerror", (e) => errors.push(String(e).slice(0, 120)));

    await page.goto(BASE + route, { waitUntil: "networkidle" });
    // Walk the page so lazy reveals paint and nothing is measured while hidden.
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(250);

    const report = await page.evaluate((TAP_MIN) => {
      const vw = document.documentElement.clientWidth;
      const out = { vw, overflow: 0, wide: [], small: [], tiny: [] };

      out.overflow = document.documentElement.scrollWidth - vw;

      // Which elements actually stick out. Skip anything deliberately clipped
      // by an ancestor, or the report is a list of innocent children.
      const clipped = (el) => {
        for (let n = el.parentElement; n; n = n.parentElement) {
          const s = getComputedStyle(n);
          if (s.overflowX !== "visible") return true;
        }
        return false;
      };

      for (const el of document.querySelectorAll("body *")) {
        const s = getComputedStyle(el);
        if (s.display === "none" || s.visibility === "hidden") continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;

        // Wider than the screen, or pushed past its right edge.
        if ((r.right > vw + 1 || r.left < -1) && !clipped(el)) {
          out.wide.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className?.toString?.() ?? "").slice(0, 70),
            left: Math.round(r.left),
            right: Math.round(r.right),
            w: Math.round(r.width),
          });
        }

        // Tap targets.
        if (el.matches("a[href], button, input, select, textarea, [role=button]")) {
          /*
            Two things have to be accounted for before a small box is a real
            problem, or the report is mostly noise and gets ignored.

            First, the card pattern: a headline link with
            `after:absolute after:inset-0` is visually 20px tall but is
            actually clickable across the whole card. The measured element is
            the wrong box — the stretched ::after is the target.

            Second, WCAG 2.5.8 exempts a link sitting inside a sentence, on the
            grounds that you cannot enlarge one word of a paragraph without
            wrecking the paragraph. An email address written into a line of
            prose is exempt; the same address as a standalone contact line is
            not.
          */
          const after = getComputedStyle(el, "::after");
          const stretched =
            after.position === "absolute" &&
            after.insetBlockStart === "0px" &&
            after.insetInlineStart === "0px";
          const box = stretched && el.offsetParent
            ? el.offsetParent.getBoundingClientRect()
            : r;

          /*
            The real test for the WCAG "inline" exception is whether the link
            sits among other words, not how many. Comparing lengths with a
            threshold got "Built by <Imperial>" and "Contact: <address>" wrong
            in both directions — they ARE links in a sentence and cannot be
            enlarged without breaking the line they live in.
          */
          const parent = el.parentElement;
          const siblingText =
            parent &&
            [...parent.childNodes]
              .filter((n) => n !== el)
              .map((n) => n.textContent ?? "")
              .join("")
              .trim();
          const inSentence =
            parent &&
            /^(P|LI|SPAN|TD|FIGCAPTION|BLOCKQUOTE|ADDRESS)$/.test(parent.tagName) &&
            siblingText.length > 0;

          const hidden = el.closest(".sr-only") || el.classList.contains("sr-only");

          const tooSmall = box.width < TAP_MIN || box.height < TAP_MIN;
          if (tooSmall && box.width > 0 && !inSentence && !hidden) {
            out.small.push({
              tag: el.tagName.toLowerCase(),
              text: (el.textContent ?? "").trim().slice(0, 28) || el.getAttribute("aria-label") || "",
              w: Math.round(box.width),
              h: Math.round(box.height),
              inNav: Boolean(el.closest("nav, header, footer")),
            });
          }
        }

        // Type too small to read on a phone.
        const size = parseFloat(s.fontSize);
        const hasOwnText = [...el.childNodes].some(
          (n) => n.nodeType === 3 && n.textContent.trim().length > 1,
        );
        if (hasOwnText && size < 12) {
          out.tiny.push({
            tag: el.tagName.toLowerCase(),
            size: +size.toFixed(1),
            text: el.textContent.trim().slice(0, 34),
          });
        }
      }

      const dedupe = (list, key) => {
        const seen = new Map();
        for (const item of list) {
          const k = key(item);
          if (!seen.has(k)) seen.set(k, item);
        }
        return [...seen.values()];
      };
      out.wide = dedupe(out.wide, (i) => i.tag + i.cls);
      out.small = dedupe(out.small, (i) => i.tag + i.text + i.w + i.h);
      out.tiny = dedupe(out.tiny, (i) => i.tag + i.size + i.text);
      return out;
    }, TAP_MIN);

    findings.push({ width, route, ...report, errors });
  }
  await ctx.close();
}

await browser.close();

// ------------------------------------------------------------------- report
let problems = 0;
for (const width of WIDTHS) {
  const rows = findings.filter((f) => f.width === width);
  const bad = rows.filter(
    (r) => r.overflow > 0 || r.wide.length || r.small.length || r.tiny.length || r.errors.length,
  );
  console.log(`\n${"=".repeat(64)}\n  ${width}px — ${bad.length} of ${rows.length} routes with findings`);
  for (const r of bad) {
    problems++;
    console.log(`\n  ${r.route}`);
    if (r.overflow > 0) console.log(`    HORIZONTAL SCROLL: ${r.overflow}px past the viewport`);
    for (const w of r.wide.slice(0, 6))
      console.log(`    wide  <${w.tag}> ${w.w}px at ${w.left}..${w.right}  ${w.cls}`);
    for (const s of r.small.slice(0, 8))
      console.log(`    tap   <${s.tag}> ${s.w}x${s.h}  "${s.text}"${s.inNav ? "  [nav]" : ""}`);
    for (const t of r.tiny.slice(0, 6))
      console.log(`    type  <${t.tag}> ${t.size}px  "${t.text}"`);
    for (const e of r.errors) console.log(`    error ${e}`);
  }
}
console.log(`\n${"=".repeat(64)}\n${problems === 0 ? "CLEAN" : `${problems} route/width combinations with findings`}`);
