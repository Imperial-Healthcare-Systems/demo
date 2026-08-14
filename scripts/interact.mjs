import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = ".shots";
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

// 1 — product hero, real viewport
await page.goto(`${BASE}/products/digital-currency-hub`, { waitUntil: "networkidle" });
await page.screenshot({ path: `${OUT}/i-product-hero.png` });

// 2 — sticky header, scrolled, mega menu open
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.mouse.wheel(0, 1200);
await page.waitForTimeout(600);
await page.getByRole("button", { name: "Advisory" }).hover();
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/i-megamenu.png`, clip: { x: 0, y: 0, width: 1440, height: 620 } });

// 3 — carousel, tallest slide
await page.keyboard.press("Escape");
await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  for (let y = 0; y < 4000; y += 300) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
});
await page.getByRole("button", { name: /Show slide 4/ }).click();
await page.waitForTimeout(900);
const carousel = page.locator("section[aria-roledescription=carousel]");
await carousel.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await carousel.screenshot({ path: `${OUT}/i-carousel-slide4.png` });

// 4 — engagement slider, expanded
await page.evaluate(() => sessionStorage.removeItem("om.engagement.dismissed"));
await page.goto(`${BASE}/advisory`, { waitUntil: "networkidle" });
await page.waitForTimeout(12500);
await page.screenshot({ path: `${OUT}/i-slider.png`, clip: { x: 840, y: 380, width: 600, height: 520 } });

// 5 — RFQ drawer, both steps
await page
  .getByLabel("Speak to OrbisMoneta")
  .getByRole("button", { name: "Request a call" })
  .click();
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}/i-rfq-step1.png` });
await page.getByLabel("Primary area of interest").selectOption("CBDC & Digital Money");
await page
  .getByLabel("Tell us about your challenge or programme")
  .fill("We are preparing a retail CBDC pilot and need an enterprise wallet platform.");
await page.getByRole("button", { name: "Continue" }).click();
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/i-rfq-step2.png` });

// 6 — validation state
await page.getByRole("button", { name: /Request the call/ }).click();
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/i-rfq-errors.png` });

// 7 — footer hand-off: slider must be gone once the footer CTA is on screen
await page.keyboard.press("Escape");
await page.waitForTimeout(500);
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(900);
const sliderVisible = await page
  .locator('[aria-label="Open contact options"], section[aria-label="Speak to OrbisMoneta"]')
  .first()
  .isVisible()
  .catch(() => false);
const opacity = await page.evaluate(() => {
  const el = document.querySelector('[aria-label="Open contact options"]')?.parentElement;
  return el ? getComputedStyle(el).opacity : "n/a";
});
console.log("after footer reached → wrapper opacity:", opacity, "| locator visible:", sliderVisible);
await page.screenshot({ path: `${OUT}/i-footer-handoff.png` });

// 8 — mobile nav
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mp = await mctx.newPage();
await mp.goto(`${BASE}/`, { waitUntil: "networkidle" });
await mp.getByRole("button", { name: "Open menu" }).click();
await mp.waitForTimeout(400);
await mp.getByRole("button", { name: "Advisory" }).click();
await mp.waitForTimeout(400);
await mp.screenshot({ path: `${OUT}/i-mobile-nav.png` });

if (errors.length) console.log("CONSOLE ERRORS:", [...new Set(errors)].slice(0, 8));
else console.log("no console errors");

await browser.close();
