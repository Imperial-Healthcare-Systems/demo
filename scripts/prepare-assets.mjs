/**
 * One-off asset pipeline.
 * Takes the raw client-supplied artwork (7000px PNGs pulled out of the Word
 * document) and produces web-weight WebP derivatives in /public/images.
 *
 * For the editorial split layouts (carousel, proposition, why, CTA band) the
 * client artwork carries baked-in text on the left. We crop to the artwork
 * region only and re-set that copy as live HTML — responsive, selectable,
 * translatable and readable by screen readers.
 *
 * Run: node scripts/prepare-assets.mjs
 */
import sharp from "sharp";
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// The raster step needs the extracted Word media directory. The brand-mark step
// only needs the source SVG in the repo, so it can be re-run on its own:
//   node scripts/prepare-assets.mjs            → brand marks only
//   node scripts/prepare-assets.mjs <media-dir> → everything
const SRC = process.argv[2];

const OUT = path.join(process.cwd(), "public", "images");

/** Keep the right-hand artwork, drop the baked-in text column. */
async function cropRight(file, out, keep, width = 1700) {
  const src = path.join(SRC, file);
  const meta = await sharp(src).metadata();
  const left = Math.round(meta.width * (1 - keep));
  await sharp(src)
    .extract({ left, top: 0, width: meta.width - left, height: meta.height })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(OUT, out));
  console.log("→", out);
}

async function full(file, out, width) {
  await sharp(path.join(SRC, file))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(OUT, out));
  console.log("→", out);
}

await mkdir(path.join(OUT, "carousel"), { recursive: true });
await mkdir(path.join(OUT, "brand"), { recursive: true });

if (SRC) {
  // Hero backdrop — full-bleed, no baked text.
  await full("image1.png", "hero-network-globe.webp", 2400);

  // Client's own composed hero — used as the social/OG share card.
  await full("image2.png", "og-orbismoneta.webp", 1200);

  // Five premium carousel slides: artwork only, copy re-set in HTML.
  // Keep values are tuned per image so no baked-in lettering survives the crop.
  await cropRight("image3.png", "carousel/global-solution-platform.webp", 0.48);
  // image5 is two rounds out of date — the slide now points at the v2 crop at
  // the foot of this file. Left in place because this block is the record of
  // what the first round of artwork was, and it only runs with a media dir.
  // await cropRight("image5.png", "carousel/intelligent-platform.webp", 0.52);
  await cropRight("image4.png", "carousel/seamless-interoperability.webp", 0.54);
  await cropRight("image7.png", "carousel/trust-and-security.webp", 0.53);
  await cropRight("image6.png", "carousel/innovation-led.webp", 0.5);

  // Editorial section artwork.
  await cropRight("image8.png", "proposition-tokenized-value.webp", 0.5, 1500);
  await cropRight("image9.png", "why-orbismoneta-team.webp", 0.5, 1500);
  await cropRight("image10.png", "cta-lets-talk.webp", 0.5, 1500);
} else {
  console.log("· no media dir given — brand marks only");
}

// ---------------------------------------------------------------------------
// Replacement carousel banners.
//
// The second round of hero artwork arrived already cropped to the diagram — no
// baked-in headline column to cut away, unlike the first set — so these only
// need re-encoding. Originals move to source-assets/ so /public never carries
// a 2MB PNG.
const CAROUSEL_SRC = path.join(process.cwd(), "source-assets", "carousel");
const PUBLIC_POSTER = path.join(OUT, "intelligent-platform-poster.jpeg");

// ...except where a later round went back to a full poster — headline column,
// body paragraph, capability strip and footer band, all baked in — and the crop
// has to come back with it. Every box below is measured off its own file rather
// than taken as a fraction, because these compositions do not divide at a tidy
// percentage the way the first set did.
//
// This poster is the one source file that stays in /public rather than moving
// to source-assets, because unlike every other original here it is not just a
// source: the homepage band shows it whole, so it is also a delivered asset.
// It is pointed at directly rather than pre-encoded to WebP because it is
// already a lossy JPEG — re-encoding would put a second generation of loss on
// 14px type for an 8% saving at the quality that type needs, and next/image
// derives the AVIF/WebP that actually ships either way.
const CAROUSEL_CROPS = [
  {
    from: PUBLIC_POSTER,
    // A new name, not a new file under the old one. This artwork replaces
    // intelligent-platform.webp at a different aspect ratio, and the ratio is
    // baked into the box the plate paints into — so anything still holding the
    // old bytes under the old URL (a CDN edge, a returning visitor, Next's own
    // image cache) would fit the previous picture to the new box and crop it.
    // The superseded original is skipped below rather than left to race this.
    out: "intelligent-platform-v2.webp",
    supersedes: "intelligent-platform.png",
    /*
      A 1254x1254 poster carrying the whole slide: the headline, the subtitle,
      the paragraph and the five-point strip are all baked into its left half,
      and the slide re-sets every one of them as live HTML — so all of it has to
      go, or the words print twice.

      It does not divide with one vertical cut. The copy column's widest element
      is the five-icon strip at x=557, but the artwork's leftmost element is the
      "CUSTOMER-CENTRIC EXPERIENCES" label at x=528: they overlap by 29px, and
      cutting clear of the strip beheads the label. What separates them is that
      the strip starts at y=616 and the label sits at y=370. Cutting above the
      strip lets the left edge come in to x=480 — clear of the headline at
      x=469 and the paragraph at x=454 — and keeps all six nodes whole.

      The other three edges are the feather's, not the artwork's. Top holds all
      53px of dark margin above the first icon, which is what the plate's 8% top
      feather needs to fade in empty space. Right leaves the 32px the poster
      already had past the last label. Bottom cuts the globe mid-sphere at
      y=605, where the 4% bottom feather dissolves the cut into the ground.

      774x605 is 1.279 — the ratio PLATE_RATIO carries for this slide.
    */
    box: { left: 480, top: 0, width: 774, height: 605 },
  },
];

if (existsSync(CAROUSEL_SRC)) {
  // The originals a crop replaces stay in source-assets as the record of what
  // the slide used to be, but they must not still be encoded into /public — the
  // slide no longer points at them and shipping both is dead weight.
  const superseded = new Set(CAROUSEL_CROPS.map((c) => c.supersedes).filter(Boolean));
  const banners = (await readdir(CAROUSEL_SRC)).filter(
    (f) => /\.png$/i.test(f) && !superseded.has(f),
  );
  for (const file of banners) {
    await sharp(path.join(CAROUSEL_SRC, file))
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(OUT, "carousel", file.replace(/\.png$/i, ".webp")));
  }
  if (banners.length) console.log(`→ carousel/ (${banners.length} banners)`);

  for (const { from, out, box } of CAROUSEL_CROPS) {
    if (!existsSync(from)) continue;
    await sharp(from)
      .extract(box)
      .resize({ width: 1400, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(OUT, "carousel", out));
    console.log("→ carousel/" + out, `(cropped ${box.width}x${box.height})`);
  }
}

// ---------------------------------------------------------------------------
// Editorial section artwork supplied as loose PNGs.
//
// Same rule as everything else: originals live in source-assets and only the
// WebP derivative ships. Dropped straight into /public these were 3.8MB.
const SECTION_SRC = path.join(process.cwd(), "source-assets", "sections");
const SECTIONS = [
  // The globe carries its own labelled cards, so it keeps its full frame.
  ["globe_image.png", "industry-globe.webp", 1600],
  ["people.png", "why-orbismoneta-people.webp", 1500],
  // Page bands and the platform architecture visual, from the client prototype.
  ["page-solutions.jpg", "page-solutions.webp", 1600],
  ["vis-architecture.jpg", "platform-architecture.webp", 1400],
];

if (existsSync(SECTION_SRC)) {
  for (const [from, to, width] of SECTIONS) {
    if (!existsSync(path.join(SECTION_SRC, from))) continue;
    await sharp(path.join(SECTION_SRC, from))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(OUT, to));
    console.log("→", to);
  }
}

// ---------------------------------------------------------------------------
// Audience artwork for the "Who we serve" marquee.
//
// Supplied as ~2MB PNGs dropped straight into /public — 12MB that would ship to
// every visitor. Cropped to the card's 3:2 slot and re-encoded, which takes the
// set from 11.8MB to well under a megabyte. Originals live in source-assets/.
const AUDIENCE_SRC = path.join(process.cwd(), "source-assets", "audiences");
const AUDIENCES = [
  ["banks.png", "banks.webp"],
  ["fintechs.png", "fintechs.webp"],
  ["Corporates.png", "corporates.webp"],
  ["governments.png", "governments.webp"],
  ["regulators.png", "regulators.webp"],
  ["Financial Market Infrastructure.png", "financial-market-infrastructure.webp"],
];

if (existsSync(AUDIENCE_SRC)) {
  await mkdir(path.join(OUT, "audiences"), { recursive: true });
  for (const [from, to] of AUDIENCES) {
    await sharp(path.join(AUDIENCE_SRC, from))
      .resize({ width: 1200, height: 800, fit: "cover", position: "attention" })
      .webp({ quality: 78, effort: 6 })
      .toFile(path.join(OUT, "audiences", to));
  }
  console.log(`→ audiences/ (${AUDIENCES.length} images)`);
}

// Facebook and LinkedIn still refuse WebP share cards, so the OG image is also
// emitted as a PNG. Same artwork, which already carries the lockup.
const ogSource = path.join(OUT, "og-orbismoneta.webp");
if (existsSync(ogSource)) {
  await sharp(ogSource).png({ compressionLevel: 9 }).toFile(path.join(OUT, "og-orbismoneta.png"));
  console.log("→ og-orbismoneta.png");
}

// Brand marks.
//
// The supplied SVG is drawn for light backgrounds: a full-canvas white
// rectangle sits underneath, the wordmark and globe ring are brand navy, and
// the letter counters (the holes in O, b, o, a, e) are painted back on in
// white. Naively swapping navy for white therefore produces a white slab with
// an invisible wordmark. The inverse variant instead:
//   1. drops the background rectangle,
//   2. repaints the counters in the dark surface colour,
//   3. promotes navy to white and the anti-aliasing blend strokes to their
//      pure brand values so no light halo remains on a dark ground.
const raw = await readFile(path.join(process.cwd(), "brand", "OrMo Logo V SVG.svg"), "utf8");

// The supplied viewBox is 1774×887, but the mark only inks 1621×394 of it —
// more than half the height is empty padding. Constrained by height in a
// header that renders the wordmark at roughly 19px and illegible. Tighten the
// viewBox to the measured ink bounds (plus a small optical margin) so the mark
// fills the space it is given.
const logo = raw.replace(
  /viewBox="0\.00 0\.00 1774\.00 887\.00"/,
  'viewBox="55 217 1645 418"',
);

// The background rectangle also has to go from the light variant: against the
// header's translucent white it reads as a pale box around the mark.
const DROP_BACKGROUND = /fill="#ffffff"(\s+d="\s*\n?\s*M 1774\.00 0\.00)/i;
await writeFile(
  path.join(OUT, "brand", "orbismoneta-logo.svg"),
  logo.replace(DROP_BACKGROUND, 'fill="none"$1'),
);

const inverse = logo
  // 1. background rectangle — matched on its full-canvas move command
  .replace(DROP_BACKGROUND, 'fill="none"$1')
  // 2. remaining white fills are letter counters
  .replace(/fill="#ffffff"/gi, 'fill="#061634"')
  // 3. brand colours for a dark ground
  .replace(/#002ea6/gi, "#FFFFFF")
  .replace(/#8097d3/gi, "#FFFFFF")
  .replace(/#80d699/gi, "#01AC32")
  .replace(/#80d2ff/gi, "#01A4FF");

await writeFile(path.join(OUT, "brand", "orbismoneta-logo-inverse.svg"), inverse);
console.log("→ brand/orbismoneta-logo.svg + inverse");

// ---------------------------------------------------------------------------
// Transparent raster marks, keyed out of the supplied PNG.
//
// The supplied SVG paints the letter counters — the holes in O, b, o, e, a —
// as solid white shapes sitting on top of the letterforms. That is invisible on
// a white header and correct-looking there, but on any other ground the holes
// show as white blobs. They cannot simply be deleted either: remove them and
// the letters fill in solid, because the glyphs are drawn as solid shapes with
// the counters painted back over.
//
// Keying white out of the raster solves both at once — background and counters
// are the same white, so both become transparent in one pass.
async function keyOutWhite(src) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    // Distance from white drives the alpha, so anti-aliased edges stay soft.
    const alpha = 255 - Math.min(out[i], out[i + 1], out[i + 2]);
    if (alpha === 0) {
      out[i + 3] = 0;
      continue;
    }
    // Un-composite the colour off the white it was blended into, or every edge
    // keeps a pale halo.
    const a = alpha / 255;
    for (let c = 0; c < 3; c++) {
      out[i + c] = Math.max(0, Math.min(255, Math.round((out[i + c] - 255 * (1 - a)) / a)));
    }
    out[i + 3] = Math.round(alpha * (out[i + 3] / 255));
  }
  return { out, info };
}

/** Navy → white, for the dark-ground variant. Sky and green are left alone. */
function navyToWhite(buf) {
  const out = Buffer.from(buf);
  for (let i = 0; i < out.length; i += 4) {
    if (out[i + 3] === 0) continue;
    const [r, g, b] = [out[i], out[i + 1], out[i + 2]];
    // Navy sits low in green; sky (#01a4ff, g=164) and green (#01ac32, g=172)
    // both clear this bar, so only the navy ring and wordmark are repainted.
    if (g < 110 && b > 80 && r < 120) {
      out[i] = 255;
      out[i + 1] = 255;
      out[i + 2] = 255;
    }
  }
  return out;
}

const LOGO_PNG = path.join(process.cwd(), "brand", "OrMo Logo V PNG.png");
if (existsSync(LOGO_PNG)) {
  const { out, info } = await keyOutWhite(LOGO_PNG);
  const raw = { raw: { width: info.width, height: info.height, channels: 4 } };

  // Trim the transparent margin so the mark fills the box it is given.
  const light = await sharp(out, raw).trim().png({ compressionLevel: 9 }).toBuffer();
  const dark = await sharp(navyToWhite(out), raw).trim().png({ compressionLevel: 9 }).toBuffer();

  /*
    PNG and lossless WebP, both. The marks ship `unoptimized` — they are flat
    colour with hard edges, which is where lossy re-encoding shows worst, and
    skipping the optimiser also avoids the `images.qualities` trap. That is
    still right; what it cost was 158KB of brand marks on every page at full
    size, which on a phone was 45% of the whole image budget for a logo.

    Lossless WebP is the way out that gives nothing up: no re-encode, no
    artifacts, and the decoded pixels are byte-identical to the PNG's — checked,
    not assumed. It takes the four marks from 196KB to 123KB, a 37% cut, for a
    format every browser this site supports has handled for years.

    The PNGs stay as the fallback of record and cost nothing unless requested.
  */
  for (const [buf, name] of [[light, "orbismoneta-logo"], [dark, "orbismoneta-logo-inverse"]]) {
    const sized = sharp(buf).resize({ width: 1400, withoutEnlargement: true });
    await sized.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT, "brand", `${name}.png`));
    await sized
      .clone()
      .webp({ lossless: true, effort: 6 })
      .toFile(path.join(OUT, "brand", `${name}.webp`));
  }

  // Symbol: the glyph alone, cropped off the left of the trimmed lockup.
  const meta = await sharp(light).metadata();
  const side = meta.height;
  for (const [buf, name] of [[light, "orbismoneta-symbol"], [dark, "orbismoneta-symbol-inverse"]]) {
    const sq = sharp(buf).extract({ left: 0, top: 0, width: side, height: side }).resize({ width: 512 });
    await sq.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT, "brand", `${name}.png`));
    await sq
      .clone()
      .webp({ lossless: true, effort: 6 })
      .toFile(path.join(OUT, "brand", `${name}.webp`));
  }
  console.log("→ brand/*.png + .webp (transparent lockup + symbol, light + inverse)");
}

// ---------------------------------------------------------------------------
// Symbol-only marks.
//
// The lockup is unusable below roughly 120px wide — the wordmark closes up and
// the globe shrinks to nothing. Anywhere the brand has to sit in a small or
// square space (favicon, app icon, dialog headers, watermarks) it needs the
// glyph on its own.
//
// No new artwork is drawn for this. SVG clips to its viewport, so pointing the
// viewBox at the glyph's measured ink box leaves the wordmark outside the frame
// and simply not rendered — the geometry is the client's, untouched.
//
// Measured ink box of the glyph within the supplied canvas: 67,229 494×394.
// Squared off around its own centre so the mark never distorts in a 1:1 slot.
const SYMBOL_VIEWBOX = "67 179 494 494";

/** Does this single path put any ink inside the symbol frame? */
async function inksSymbol(pathEl) {
  const probe = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${SYMBOL_VIEWBOX}"><g stroke-width="2.00" fill="none" stroke-linecap="butt">${pathEl}</g></svg>`;
  const { data, info } = await sharp(Buffer.from(probe), { density: 96 })
    .resize(128, 128, { fit: "fill" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += info.channels) if (data[i] > 8) return true;
  return false;
}

// Clipping alone would leave all 43 paths in the file — a 38KB favicon whose
// wordmark is downloaded only to be thrown away. Each path is probed against
// the symbol frame and the ones that contribute nothing are dropped, so the
// symbol files carry only the glyph. Which paths belong to the glyph is decided
// by rendering, not by guessing at coordinate ranges: the `d` attributes mix x
// and y and the arc commands interleave radii and flags, so any numeric
// heuristic would be reading y-values as x-values.
async function toSymbol(svg) {
  const parts = svg.match(/<path\b[\s\S]*?\/>/g) ?? [];
  const keep = await Promise.all(parts.map(inksSymbol));
  let i = 0;
  return svg
    .replace(/viewBox="[^"]*"/, `viewBox="${SYMBOL_VIEWBOX}"`)
    .replace(/<path\b[\s\S]*?\/>/g, (m) => (keep[i++] ? m : ""))
    .replace(/\n{2,}/g, "\n");
}

const symbol = await toSymbol(logo.replace(DROP_BACKGROUND, 'fill="none"$1'));
const symbolInverse = await toSymbol(inverse);

await writeFile(path.join(OUT, "brand", "orbismoneta-symbol.svg"), symbol);
await writeFile(path.join(OUT, "brand", "orbismoneta-symbol-inverse.svg"), symbolInverse);
console.log("→ brand/orbismoneta-symbol.svg + inverse");

// ---------------------------------------------------------------------------
// Favicon and app icons.
//
// Browser and OS icon slots sit on backgrounds we do not control — a browser
// tab is light or dark depending on the theme, an iOS home screen is whatever
// wallpaper the user chose. So the icon carries its own ground: the brand abyss
// navy, with the inverse glyph on top. Nested <svg> rather than a transform, so
// the glyph's own viewBox keeps doing the framing.
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="OrbisMoneta">
<rect width="512" height="512" rx="116" fill="#030d22"/>
<svg x="76" y="76" width="360" height="360" viewBox="${SYMBOL_VIEWBOX}">
${symbolInverse.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "")}
</svg>
</svg>
`;

const PUBLIC = path.join(process.cwd(), "public");
await writeFile(path.join(PUBLIC, "favicon.svg"), icon);

// PNG fallbacks: Safari ignores SVG apple-touch-icons, and Android's manifest
// path wants raster. Rendered from the same SVG so they can never drift.
for (const [name, size] of [
  ["apple-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
]) {
  await sharp(Buffer.from(icon), { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, name));
}
console.log("→ favicon.svg, apple-icon.png, icon-192.png, icon-512.png");
