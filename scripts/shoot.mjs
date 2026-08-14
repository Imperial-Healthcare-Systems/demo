import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = process.argv[2] ?? "./.shots";
await mkdir(OUT, { recursive: true });

const targets = process.argv.slice(3);
const pages = targets.length
  ? targets.map((t) => {
      const [path, name, mode] = t.split("::");
      return { path, name, full: mode !== "viewport" };
    })
  : [
      { path: "/", name: "home", full: true },
      { path: "/solutions", name: "solutions", full: true },
      { path: "/advisory", name: "advisory", full: true },
      { path: "/products/digital-currency-hub", name: "product", full: true },
      { path: "/industries", name: "industries", full: true },
      { path: "/insights", name: "insights", full: true },
      { path: "/insights/designing-retail-cbdc-for-privacy", name: "insight-detail", full: true },
      { path: "/about", name: "about", full: true },
      { path: "/contact", name: "contact", full: true },
    ];

const browser = await chromium.launch();

for (const viewport of [
  { w: 1440, h: 900, tag: "desktop" },
  { w: 390, h: 844, tag: "mobile" },
]) {
  const context = await browser.newContext({
    viewport: { width: viewport.w, height: viewport.h },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));

  for (const target of pages) {
    await page.goto(BASE + target.path, { waitUntil: "networkidle" });
    // Trigger every scroll reveal, then settle back to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 300) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 150));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 500));
    });
    await page.screenshot({
      path: `${OUT}/${target.name}-${viewport.tag}.png`,
      fullPage: target.full,
    });
    console.log("shot", target.name, viewport.tag);
  }

  if (errors.length) console.log("CONSOLE ERRORS:", [...new Set(errors)].slice(0, 10));
  await context.close();
}

await browser.close();
