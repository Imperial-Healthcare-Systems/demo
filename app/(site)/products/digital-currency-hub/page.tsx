import type { Metadata } from "next";
import { digitalCurrencyHub as dch } from "@/content/product";
import { site } from "@/content/site";
import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { VendorWordmark } from "@/components/VendorWordmark";

export const metadata: Metadata = {
  title: "Digital Currency Hub™ — Bank-Ready Digital Money Infrastructure",
  description: dch.summary,
  alternates: { canonical: "/products/digital-currency-hub" },
};

/**
 * This page follows the client's product one-pager section for section, in its
 * order, and takes only its wording, including its three-column band —
 * Technology Stack, Deployment Models and Commercial Models sit side by side,
 * each running as its own vertical list, and drop to one column under lg where
 * three tracks would leave about 200px apiece.
 *
 * Everything visual is the site's own — the display and mono faces, the
 * navy/sky/green tokens, `--radius-card`, the standard reveal and hover
 * behaviour. Nothing is taken from the artwork but the structure.
 *
 * The sections this page used to carry are archived at the foot of the file.
 */

/** Navy · sky · green, the logo's order, as everywhere else on the site. */
const TONES = [
  {
    tile: "bg-navy-600/8 text-navy-600 ring-navy-600/15",
    disc: "bg-[radial-gradient(circle,rgba(0,46,166,.14),rgba(0,46,166,.05))] text-navy-600",
    hoverTile:
      "group-hover/item:bg-navy-600 group-hover/item:text-white group-hover/item:ring-navy-600",
    bar: "bg-[linear-gradient(90deg,var(--color-navy-600),var(--color-navy-400))]",
    numeral: "bg-navy-600/8 text-navy-600 ring-navy-600/15",
    ring: "ring-navy-600/20 hover:ring-navy-600/40",
    wash: "bg-[linear-gradient(180deg,#ffffff,rgba(0,46,166,.035))]",
    label: "text-navy-600",
    check: "text-navy-600",
    lift: "hover:ring-navy-600/25 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_22px_44px_-20px_rgba(10,21,51,.28)]",
  },
  {
    tile: "bg-sky-500/12 text-sky-600 ring-sky-500/20",
    disc: "bg-[radial-gradient(circle,rgba(1,164,255,.16),rgba(1,164,255,.05))] text-sky-600",
    hoverTile:
      "group-hover/item:bg-sky-500 group-hover/item:text-white group-hover/item:ring-sky-500",
    bar: "bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-sky-400))]",
    numeral: "bg-sky-500/12 text-sky-600 ring-sky-500/20",
    ring: "ring-sky-500/25 hover:ring-sky-500/45",
    wash: "bg-[linear-gradient(180deg,#ffffff,rgba(1,164,255,.04))]",
    label: "text-sky-600",
    check: "text-sky-600",
    lift: "hover:ring-sky-500/30 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_22px_44px_-20px_rgba(10,21,51,.28)]",
  },
  {
    tile: "bg-green-500/12 text-green-600 ring-green-500/20",
    disc: "bg-[radial-gradient(circle,rgba(1,172,50,.16),rgba(1,172,50,.05))] text-green-600",
    hoverTile:
      "group-hover/item:bg-green-500 group-hover/item:text-white group-hover/item:ring-green-500",
    bar: "bg-[linear-gradient(90deg,var(--color-green-500),var(--color-green-400))]",
    numeral: "bg-green-500/12 text-green-600 ring-green-500/20",
    ring: "ring-green-500/30 hover:ring-green-500/50",
    wash: "bg-[linear-gradient(180deg,#ffffff,rgba(1,172,50,.04))]",
    label: "text-green-600",
    check: "text-green-600",
    lift: "hover:ring-green-500/30 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_22px_44px_-20px_rgba(10,21,51,.28)]",
  },
];

/**
 * The design fills the first two numeral chips navy and only the third green;
 * the navy/sky/green ladder resumes on the icon tile beside it. It also keeps
 * white above 4.5:1 on all three, which a solid sky-500 chip (2.6:1) would not.
 */
/*
  One per card, and each has to be the same colour its card already is. This
  ran navy / navy / green while TONES beneath it runs navy / sky / green — so
  card 02 wore a navy numeral above a sky icon, a sky label and a sky rule. That
  was the one place on the page where a card's heading and its line disagreed.
*/
const MODEL_NUMERAL = ["bg-navy-600", "bg-sky-500", "bg-green-600"];
/** Paired with the cards in order: a vault, a hyperscaler, a bank's own floor. */
const MODEL_ART = ["private", "public", "onprem"] as const;

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Digital Currency Hub",
  applicationCategory: "BusinessApplication",
  description: dch.summary,
  brand: { "@type": "Brand", name: site.name },
  publisher: { "@type": "Organization", name: site.legalEntity },
  offers: {
    "@type": "AggregateOffer",
    offerCount: dch.deployment.modelDetail.items.length,
    availability: "https://schema.org/InStock",
  },
};

/**
 * The banded head above each of the three columns.
 *
 * The design puts the column's opening line inside the navy band rather than in
 * the white below it. All three columns now do — the commercial column used to
 * carry a title alone and keep its opening line in the white underneath, which
 * left the three navy bands at three different heights and was the only part of
 * this row that stretching could not square up. `intro` stays optional for a
 * caller that genuinely has nothing to say. Indented past the icon so the line
 * hangs off the title rather than off the band's edge.
 *
 * Caps and letterspaced, as the design sets them, but in the site's display
 * face — the mono face is this site's label voice, what `Eyebrow` uses, and
 * these are section titles.
 */
function PanelHead({
  icon,
  title,
  intro,
}: {
  icon: IconName;
  title: string;
  intro?: string;
}) {
  return (
    <div className="bg-[linear-gradient(100deg,var(--color-navy-700),var(--color-navy-600))] px-5 py-4 md:px-6">
      <div className="flex items-center gap-3">
        <Icon
          name={icon}
          className="h-5 w-5 shrink-0 text-sky-400"
          strokeWidth={1.7}
        />
        <h2 className="text-[0.9375rem] leading-none font-bold tracking-[0.06em] text-white uppercase md:text-[1rem]">
          {title}
        </h2>
      </div>
      {intro && (
        <p className="mt-2.5 pl-8 text-[0.8125rem] leading-relaxed text-ink-inv-2">
          {intro}
        </p>
      )}
    </div>
  );
}

/**
 * The two spot illustrations the design tucks into the bottom-right corner of
 * the licence and hosted cards — a skyline for the edition an institution runs
 * itself, a rack under a cloud for the one we run for it.
 *
 * Drawn here rather than imported. The design's own artwork is not in this
 * project, and these are generic massing shapes carrying no mark, so they can
 * be redrawn without approximating anything of anyone's. They sit at a tenth of
 * an opacity in the card's own tone: texture in the corner the copy leaves
 * empty, not a picture.
 */
function EditionArt({ kind }: { kind: "skyline" | "stack" }) {
  return (
    /* Sized off the card's width. Height-first, the 200x120 box came out wider
       than the card on a stretched card and washed across the copy. */
    <svg
      viewBox="0 0 200 175"
      fill="currentColor"
      aria-hidden="true"
      className="pointer-events-none absolute right-0 bottom-0 h-[52%] w-auto max-w-[62%] opacity-[0.13]"
    >
      {kind === "skyline" ? (
        <g>
          <rect x="2" y="98" width="27" height="77" rx="2" />
          <rect x="35" y="62" width="31" height="113" rx="2" />
          <rect x="72" y="112" width="23" height="63" rx="2" />
          <rect x="101" y="30" width="35" height="145" rx="2" />
          <rect x="142" y="80" width="25" height="95" rx="2" />
          <rect x="173" y="120" width="27" height="55" rx="2" />
        </g>
      ) : (
        <g>
          <g opacity="0.55">
            <circle cx="76" cy="48" r="20" />
            <circle cx="104" cy="38" r="26" />
            <circle cx="132" cy="50" r="18" />
            <rect x="56" y="48" width="94" height="22" rx="11" />
          </g>
          <rect x="64" y="92" width="84" height="22" rx="5" />
          <rect x="64" y="121" width="84" height="22" rx="5" />
          <rect x="64" y="150" width="84" height="22" rx="5" />
        </g>
      )}
    </svg>
  );
}

/**
 * The spot illustration each deployment-model card carries, matching the pair
 * the commercial cards already have.
 *
 * Same treatment as `EditionArt`, and for the same reason: the design tucks a
 * shape into the corner the copy leaves empty, at a tenth of an opacity in the
 * card's own tone, so it reads as texture and not as a picture. The three model
 * cards had none, which is what made that column look flatter than the one
 * beside it once both were squared to the same height.
 *
 * Drawn here rather than imported — generic massing shapes carrying no mark, so
 * nothing of anyone's is being approximated.
 */
function ModelArt({ kind }: { kind: "private" | "public" | "onprem" }) {
  return (
    <svg
      viewBox="0 0 200 175"
      fill="currentColor"
      aria-hidden="true"
      /* Smaller and fainter than `EditionArt`, and bled off the corner.

         Those cards are tall and leave their bottom-right genuinely empty; a
         shape at 13% sits in white space there. These are compact — the copy
         reaches the corner on all three — so the same treatment put a padlock
         legibly on top of a sentence. At 6%, cropped by the card's own rounded
         edge, it is the texture it was meant to be rather than an object
         competing with the words in front of it. */
      className="pointer-events-none absolute -right-3 -bottom-3 h-[58%] w-auto max-w-[30%] opacity-[0.06]"
    >
      {kind === "private" && (
        <g>
          <g opacity="0.5">
            <circle cx="78" cy="50" r="19" />
            <circle cx="106" cy="41" r="25" />
            <circle cx="134" cy="53" r="17" />
            <rect x="59" y="50" width="92" height="20" rx="10" />
          </g>
          <path
            d="M88 112v-12a17 17 0 0 1 34 0v12"
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
          />
          <rect x="76" y="110" width="58" height="46" rx="8" />
        </g>
      )}
      {kind === "public" && (
        <g>
          <g opacity="0.5">
            <circle cx="70" cy="54" r="18" />
            <circle cx="100" cy="44" r="24" />
            <circle cx="130" cy="56" r="16" />
            <rect x="52" y="54" width="96" height="20" rx="10" />
          </g>
          <rect x="97" y="80" width="6" height="46" rx="3" />
          <rect
            x="66"
            y="92"
            width="6"
            height="34"
            rx="3"
            transform="rotate(-38 69 109)"
          />
          <rect
            x="128"
            y="92"
            width="6"
            height="34"
            rx="3"
            transform="rotate(38 131 109)"
          />
          <circle cx="56" cy="140" r="12" />
          <circle cx="100" cy="140" r="12" />
          <circle cx="144" cy="140" r="12" />
        </g>
      )}
      {kind === "onprem" && (
        <g>
          <g opacity="0.5">
            <path d="M100 20 182 58H18z" />
            <rect x="26" y="64" width="148" height="10" rx="3" />
          </g>
          <rect x="46" y="88" width="108" height="20" rx="4" />
          <rect x="46" y="116" width="108" height="20" rx="4" />
          <rect x="46" y="144" width="108" height="20" rx="4" />
        </g>
      )}
    </svg>
  );
}

/**
 * The white card each band sits in. `h-full` because the three lower bands sit
 * as columns of one grid row and have to square off against each other however
 * unevenly their contents run.
 */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-[0_1px_2px_rgba(10,21,51,.04),0_16px_40px_-28px_rgba(10,21,51,.24)] ring-1 ring-line">
      {children}
    </div>
  );
}

export default function DigitalCurrencyHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Masthead. The one-pager opens on a dark band: name, a coloured
          strapline, the positioning paragraph, then four marks along the foot. */}
      {/*
        A full screen of blue.

        The section used to end at its content — 606px — so on a 965px viewport
        the next one showed 359px of itself underneath, which read as a gap
        rather than as the start of something. `min-h-svh` makes the masthead own
        the whole first screen; the shell below it is a flex column, so the
        breadcrumb holds the top, the pillar strip holds the foot, and the
        headline and render take the middle on `my-auto`. Whatever height is
        going spare becomes even air above and below the copy instead of a band
        at the bottom, and the next section now begins exactly at the fold.
      */}
      <section className="on-dark relative isolate flex min-h-svh flex-col overflow-hidden rounded-b-[2rem] bg-abyss pt-16 pb-6 md:rounded-b-[3rem] md:pt-20 md:pb-7">
        <div
          aria-hidden="true"
          /*
            The aurora sits behind the copy, not behind the artwork. It used to
            be centred at 78% 18% — directly under the render — which lifted the
            masthead around the image without lifting the image, so its #010a25
            ground read as a dark rectangle against a ground that was no longer
            #030d22. Moved left it lights the headline instead, and the render
            brings its own glow to that half.
          */
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_65%_at_22%_16%,rgba(1,164,255,.16),transparent_64%),radial-gradient(45%_55%_at_10%_95%,rgba(1,172,50,.12),transparent_66%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:radial-gradient(70%_60%_at_60%_10%,#000,transparent)]"
        />

        <div className="shell flex flex-1 flex-col justify-center">
          {/*
            Seven columns to the plate and five to the copy, from `xl` — the
            Lab masthead's split, matched deliberately.

            Measured against it, this hero was placing its artwork at 36% of the
            section's height where the Lab places its at 53%, and six-and-six
            was most of the reason. Seven columns plus the bleed below brings it
            to 41% at 1440 and 54% at 1920, which is the Lab's proportion.

            It costs the headline a line. "Digital Currency Hub" needs about
            600px to stay on one and five columns of a 1264px shell is 503px, so
            from `xl` it sets on two. That is a real trade and it is the one
            being asked for: the Lab's own headline stays on one line only
            because "Innovation Lab" is short enough to, not because five
            columns is wide enough for a headline.
          */}
          <div className="mt-5 grid gap-5 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-6 xl:col-span-5">
              <Reveal delay={60}>
                {/*
                  Painted the way the home hero paints its second line: white
                  above, `text-brand-gradient-inv` on the phrase that carries the
                  weight — sky-400 into #35d3c0 into green-400. It was a flat
                  sky-400 here, which is the same family but not the same
                  gesture, and this is the only other h1 on the site big enough
                  for the gradient to actually read across.

                  The accent falls on "Hub" rather than the whole name, so the
                  painted phrase is the product and the plain one is the
                  category. The trademark stays outside the span: it is a mark,
                  not part of the word, and inside it the gradient would land
                  mid-ramp on a glyph six pixels tall.
                */}
                <h1 className="h-display-1 leading-[1.05] text-white">
                  Digital Currency{" "}
                  <span className="text-brand-gradient-inv">Hub</span>
                  <span className="align-super text-[0.45em]">™</span>
                </h1>
              </Reveal>
              <Reveal delay={110}>
                <p className="mt-2.5 text-[1.25rem] leading-snug font-semibold text-green-400 md:text-[1.375rem]">
                  {dch.tagline}
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-inv-2">
                  {dch.summary}
                </p>
              </Reveal>
            </div>

            {/*
              The render's ground is #010a25 against a #030d22 masthead — near
              enough to pass unnoticed, so this needs a feather rather than a
              frame. Its subject leaves 12.5% clear at the top, 17.9% at the
              bottom and about 11% each side, so a 9% hold on every edge dissolves
              the box without touching the bank or any of its four labels.
            */}
            <Reveal
              delay={200}
              kind="right"
              className="lg:col-span-6 xl:col-span-7"
            >
              {/*
                The client's banner, in the masthead's right column.

                It is a landscape plate — 1824x862, against the 1402x1122 render
                that stood here before — so it is given the column's full width
                and takes its own height from that rather than being capped to
                the copy's.

                What it costs is worth stating plainly: its six labels are 20px
                glyph runs across 1824px, so at the ~736px this column can give
                them they paint near 8px. They are texture here, not reading
                matter. The render they replaced set its four labels at 12.3px.
                Nothing about the column can fix that — the plate needs about
                1000px before that type clears 11px, which is a full-width band
                and not a half of one. The page still names all six fields in
                text further down, so nothing is only in the picture.

                The feather is the plate's own, not the old one's: this artwork
                is drawn to its edges with 27px clear on the left and 31px on
                the right, so the hold is 2%. The 9% the render used would have
                dissolved a label.
              */}
              <div className="relative mx-auto w-full animate-[om-float_11s_var(--ease-in-out-soft)_infinite] motion-reduce:animate-none min-[1424px]:w-[calc(100%+(100vw-1264px)/2-1.5rem)]">
                {/*
                  The plate runs past the shell, into the margin a wide screen
                  leaves empty.

                  Its column is 616px and its labels are 20px glyph runs across
                  1824px, so in-column they paint at 6.8px. The room to fix that
                  is not inside the grid — it is the gutter either side of a
                  1264px shell, which on a 1920px screen is 328px of nothing.

                  `(100vw - 1264px) / 2` is exactly that gutter, the shell being
                  centred and capped at 1264px of content from 1424px up; less
                  1.5rem so the plate stops short of the screen edge instead of
                  touching it. It scales with the display — 680px at 1440, 920px
                  at 1920, 1240px at 2560, where the labels finally clear 13px.
                  Below 1424 the cap no longer holds and the arithmetic would be
                  wrong, so the bleed does not apply there.
                */}
                {/*
                  Blended, not framed — and the frame was covering for the wrong
                  diagnosis.

                  Sampled at its own edges the plate's ground is rgb(0,4,38),
                  which is *darker* than the masthead's rgb(3,13,34), not
                  lighter as assumed. The rectangle was not the plate standing
                  out against the section; it was the section's aurora lighting
                  the area around a plate darker than it. The ring and shadow
                  then drew that boundary deliberately.

                  So: a pool of the plate's own ground, extended well past it,
                  which removes the step entirely — the tone ramps from the
                  section into the plate instead of meeting it at an edge. The
                  feather then only has to soften what is left.

                  That feather is asymmetric because the artwork is, and the
                  numbers matter: measured at a threshold low enough to catch
                  background sparkle, the left edge looks 0.66% clear and cannot
                  be faded at all. Measured at the first *sustained* run of real
                  subject — six consecutive columns, which is an icon or a
                  letter rather than a speck — it is 3.95% clear on the left and
                  4.71% on the right. The first reading bought a 3px fade that
                  hid nothing; the second allows 24px.

                  Holds sit just inside each: 6% top (against 7.89% clear), 3%
                  left, 3.5% right, and 1.1% at the bottom, which is the one
                  genuinely tight edge — the pedestal's glow runs to within
                  1.5% of it — and also the one that needs a feather least,
                  since that glow already fades on its own.
                */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-16 -inset-y-12 -z-10 bg-[radial-gradient(closest-side,#000426_58%,rgba(0,4,38,.6)_80%,transparent_100%)]"
                />
                <Image
                  src={dch.banner.src}
                  alt={dch.banner.alt}
                  width={1824}
                  height={862}
                  priority
                  quality={82}
                  sizes="(min-width: 1424px) calc(50vw + 12rem), (min-width: 1024px) 56vw, 92vw"
                  className="h-auto w-full select-none [mask-composite:intersect] [mask-image:linear-gradient(180deg,transparent_0%,#000_6%,#000_98.9%,transparent_100%),linear-gradient(90deg,transparent_0%,#000_3%,#000_96.5%,transparent_100%)]"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={220} className="mt-5 border-t border-white/10 pt-4">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 sm:gap-x-0">
              {dch.pillars.map((pillar, i) => (
                <li
                  key={pillar.title}
                  className={`group/item flex items-start gap-3 sm:px-5 sm:first:pl-0 sm:last:pr-0 ${
                    i > 0 ? "sm:border-l sm:border-white/10" : ""
                  }`}
                >
                  {/* Beside the words rather than above them. Stacked, each
                      pillar ran 135px and the strip alone took a fifth of the
                      screen; on one line it is 60, and the height it gives back
                      goes to the render. Still outlined — a ring rather than a
                      fill, so the four read as a set and not as four buttons. */}
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sky-400 ring-1 ring-white/20 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:scale-110 group-hover/item:text-white group-hover/item:ring-sky-400 md:h-14 md:w-14">
                    <Icon
                      name={pillar.icon as IconName}
                      className="h-[1.375rem] w-[1.375rem] md:h-[1.625rem] md:w-[1.625rem]"
                      strokeWidth={1.6}
                    />
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="text-[0.875rem] leading-snug font-semibold text-white">
                      {pillar.title}
                    </span>
                    <span className="text-[0.75rem] leading-relaxed text-ink-inv-2">
                      {pillar.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <div className="ground-soft bg-canvas py-8 md:py-10">
        <div className="shell flex flex-col gap-5">
          {/* Core capabilities */}
          <Reveal>
            <Panel>
              <div className="flex flex-col items-center gap-4 px-5 pt-9 pb-2 text-center md:px-6">
                {/* Same split as the h1 above and the home hero: the plain word
                    sets the category, the painted one carries the weight. */}
                <h2 className="h-display-3">
                  Core <span className="text-brand-gradient">capabilities</span>
                </h2>
                <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2 md:text-[1rem]">
                  {dch.capabilitiesIntro}
                </p>
                <span
                  aria-hidden="true"
                  className="block h-[3px] w-20 rounded-full bg-[linear-gradient(90deg,var(--color-navy-600),var(--color-green-500))]"
                />
              </div>

              {/*
                Eight across on the widest screens, as the one-pager sets them,
                halving to four and then two as the width goes.

                The dividers are additive at every breakpoint, never subtractive,
                which is what keeps them correct. Every cell carries a
                transparent left border and each rule only ever paints one in;
                an earlier pass added borders at one width and removed them at
                the next, and since two arbitrary variants at the same
                breakpoint have no guaranteed order, the removal won in places it
                should not have. It works out because a row-leading cell is
                never an even one: at four columns those are 4n+1, all odd, so
                the two-column rule cannot collide with them, and only 4n+3 has
                to be added. At eight columns the same holds and only 8n+5 is
                left to add.
              */}
              <ul className="grid grid-cols-2 gap-3 px-5 py-6 md:grid-cols-4 md:px-6 xl:grid-cols-8">
                {dch.coreCapabilities.map((capability, i) => {
                  const tone = TONES[i % TONES.length];
                  return (
                    <li
                      key={capability.title}
                      className={`group/item relative flex flex-col items-center gap-3 overflow-hidden rounded-[1.25rem] bg-[linear-gradient(180deg,#ffffff,var(--color-surface))] px-3 pt-6 pb-7 text-center ring-1 ring-line transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 motion-reduce:hover:translate-y-0 ${tone.lift}`}
                    >
                      {/* A disc rather than a squircle here — eight of these sit
                          in one row and the round tile reads as a set at that
                          width, where eight rounded squares read as a toolbar. */}
                      <span
                        className={`flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:scale-110 ${tone.disc}`}
                      >
                        <Icon
                          name={capability.icon as IconName}
                          className="h-[1.35rem] w-[1.35rem]"
                          strokeWidth={1.6}
                        />
                      </span>

                      <h3 className="text-[0.9375rem] leading-snug">
                        {capability.title}
                      </h3>

                      {/* Short rule under the title, then the full-width bar at
                          the foot — both in the card's own tone, which is what
                          keeps eight otherwise identical cards distinguishable. */}
                      <span
                        aria-hidden="true"
                        className={`block h-[3px] w-7 rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:w-12 ${tone.bar}`}
                      />

                      <p className="text-[0.8125rem] leading-relaxed text-ink-2">
                        {capability.body}
                      </p>

                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 bottom-0 h-[3px] ${tone.bar}`}
                      />
                    </li>
                  );
                })}
              </ul>
            </Panel>
          </Reveal>

          {/*
            The three-column band, as the design has it.

            An earlier pass split this two-up-plus-one because the middle column
            was carrying 660px of dead white: a grid row is only ever as short
            as its tallest member, and nothing inside the commercial column grew
            to meet it. The answer was not to break the row but to let its contents
            claim it — every list here is now `flex-1` and every card inside is
            too, so a column with two cards gives each of them half the height
            rather than leaving the remainder blank. That is what the design
            does: its licence and hosted cards are tall, not because they hold
            more words, but because they take the space.

            The panels also carry `h-full`. A grid item stretches; its child does
            not inherit that, and without it each card would end at its own
            content and the row would look ragged.
          */}
          <div className="grid items-stretch gap-5 lg:grid-cols-3">
            {/* Technology stack */}
            <Reveal>
              <Panel>
                <PanelHead
                  icon="layers"
                  title={dch.technology.eyebrow}
                  intro={dch.technology.intro}
                />
                <div className="flex flex-1 flex-col px-4 py-5 xl:px-5">
                  {/* One per row, as the design lists them, hairline-ruled between
                    but not above the first — the band is already the boundary. */}
                  <ul className="flex flex-1 flex-col">
                    {dch.technology.items.map((item, i) => {
                      const tone = TONES[i % TONES.length];
                      return (
                        <li
                          key={item.title}
                          className="group/item flex flex-1 items-center gap-3 border-t border-line py-3.5 first:border-t-0"
                        >
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:scale-110 group-hover/item:[transform:perspective(520px)_rotateY(-12deg)] ${tone.tile} ${tone.hoverTile}`}
                          >
                            <Icon
                              name={item.icon as IconName}
                              className="h-5 w-5"
                              strokeWidth={1.6}
                            />
                          </span>
                          <div className="flex min-w-0 flex-1 flex-col gap-1">
                            <h3 className="text-[0.875rem] leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-[0.8125rem] leading-relaxed text-ink-2">
                              {item.body}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* The tinted footnote the design closes the column on. Shield
                    rather than tick, and set in ink at semibold — it is a claim
                    about the build, not another list row. */}
                  <div className="mt-4 flex items-start gap-3 rounded-[1.25rem] bg-navy-50/70 px-4 py-3.5 ring-1 ring-navy-100">
                    <Icon
                      name="shield"
                      className="mt-0.5 h-4 w-4 shrink-0 text-navy-600"
                      strokeWidth={1.8}
                    />
                    <p className="text-[0.8125rem] leading-relaxed font-semibold text-ink">
                      {dch.technology.note}
                    </p>
                  </div>
                </div>
              </Panel>
            </Reveal>

            {/* Deployment models — where it runs */}
            <Reveal>
              <Panel>
                <PanelHead
                  icon="nodes"
                  title={dch.deployment.modelDetail.eyebrow}
                  intro={dch.deployment.modelDetail.intro}
                />
                <div className="flex flex-1 flex-col px-4 py-5 xl:px-5">
                  <ol className="flex flex-1 flex-col gap-3">
                    {dch.deployment.modelDetail.items.map((model, i) => {
                      const tone = TONES[i % TONES.length];
                      return (
                        <li
                          key={model.title}
                          className={`group/item relative flex flex-col gap-3 overflow-hidden rounded-[1.25rem] p-3.5 ring-1 xl:p-4 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${tone.wash} ${tone.ring} ${tone.lift}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:scale-x-100 ${tone.bar}`}
                          />
                          <span className={tone.label}>
                            <ModelArt kind={MODEL_ART[i % MODEL_ART.length]} />
                          </span>

                          {/* Numeral, icon and the title/body sit on one row; the
                            blocks beneath run the card's width, indented past
                            the numeral only. That is the design's own alignment
                            and it is also what the vendor pills need — held in
                            the title's column they wrap onto a second line and
                            take the whole row's height with them. */}
                          <div className="flex gap-3">
                            <div className="flex shrink-0 gap-2">
                              <span
                                className={`flex h-10 w-10 items-center justify-center rounded-xl font-display text-[1.0625rem] leading-none font-bold text-white tabular xl:h-11 xl:w-11 xl:text-[1.1875rem] ${MODEL_NUMERAL[i % MODEL_NUMERAL.length]}`}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span
                                className={`flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:scale-110 group-hover/item:[transform:perspective(520px)_rotateY(-12deg)] xl:h-11 xl:w-11 ${tone.tile} ${tone.hoverTile}`}
                              >
                                <Icon
                                  name={model.icon as IconName}
                                  className="h-5 w-5"
                                  strokeWidth={1.6}
                                />
                              </span>
                            </div>

                            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                              {/* Coloured, like the commercial cards' headings
                                opposite. Those set their name in the card's own
                                green or blue; these were plain ink, so the two
                                columns treated an identical element two ways. */}
                              <h3
                                className={`text-[0.9375rem] leading-snug ${tone.label}`}
                              >
                                {model.title}
                              </h3>
                              <p className="text-[0.8125rem] leading-relaxed text-ink-2">
                                {model.body}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col gap-3 pl-[2.875rem] xl:pl-[3.375rem]">
                            {"environments" in model && model.environments && (
                              <div className="flex flex-col gap-2">
                                <p
                                  className={`font-mono text-[0.75rem] md:text-[0.6875rem] tracking-[0.14em] uppercase ${tone.label}`}
                                >
                                  Supported environments
                                </p>
                                <ul className="flex flex-wrap items-center gap-2">
                                  {model.environments.map((env) => (
                                    <li key={env.name}>
                                      <VendorWordmark
                                        name={env.name}
                                        logo={env.logo ?? undefined}
                                      />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </Panel>
            </Reveal>
            {/* Commercial models — how it is bought */}
            <Reveal>
              <Panel>
                {/* `intro`, like the other two. This head used to carry a title
                  alone while its opening line sat in the white below, which is
                  what made the three navy bands three different heights — the
                  one thing on this row that could not be made to line up by
                  stretching anything. `dch.deployment.lead` is no longer set:
                  it read "Flexible Deployment to Match Your Strategy", which
                  belongs to the models column now that this one is Commercial
                  Models. It stays in content/product.ts, unused. */}
                <PanelHead
                  icon="cloud"
                  title={dch.deployment.eyebrow}
                  intro={dch.deployment.intro}
                />
                <div className="flex flex-1 flex-col px-4 py-5 xl:px-5">
                  {/*
                  The design outlines these two in different colours — green for
                  the licensed edition, blue for the hosted one — and that
                  outline is the only thing separating them, so it is kept and
                  redrawn in the site's own tokens.

                  Two rows of a two-column grid: the disc holds the left column
                  against the title, and the body starts at `col-start-2` so it
                  hangs off the title rather than off the disc. That is the
                  design's alignment, and it is also why the copy does not wrap
                  around a circle it has no business wrapping around.
                */}
                  <ul className="flex flex-1 flex-col gap-3">
                    {dch.deployment.editions.map((edition, i) => {
                      const licence = i === 0;
                      const outline = licence
                        ? "ring-green-500/40 hover:ring-green-500/70"
                        : "ring-sky-500/40 hover:ring-sky-500/70";
                      const wash = licence
                        ? "bg-[linear-gradient(165deg,#ffffff_55%,rgba(1,172,50,.06))]"
                        : "bg-[linear-gradient(165deg,#ffffff_55%,rgba(1,164,255,.07))]";
                      const disc = licence
                        ? "bg-[radial-gradient(circle,rgba(1,172,50,.16),rgba(1,172,50,.06))] text-green-600"
                        : "bg-[radial-gradient(circle,rgba(1,164,255,.18),rgba(1,164,255,.06))] text-sky-600";
                      const heading = licence
                        ? "text-green-600"
                        : "text-sky-600";
                      return (
                        <li
                          key={edition.name}
                          className={`group/item relative flex flex-1 flex-col overflow-hidden rounded-[1.25rem] p-5 ring-1 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 motion-reduce:hover:translate-y-0 ${wash} ${outline}`}
                        >
                          <span
                            className={
                              licence ? "text-green-600" : "text-sky-600"
                            }
                          >
                            <EditionArt kind={licence ? "skyline" : "stack"} />
                          </span>

                          <div className="relative grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
                            <span
                              className={`flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:scale-110 ${disc}`}
                            >
                              <Icon
                                name={licence ? "layers" : "cloud"}
                                className="h-6 w-6"
                                strokeWidth={1.6}
                              />
                            </span>

                            <h4
                              className={`text-[0.9375rem] leading-tight font-bold tracking-[0.05em] uppercase ${heading}`}
                            >
                              {edition.name}
                              {edition.aside && (
                                <span className="mt-0.5 block text-[0.8125rem]">
                                  ({edition.aside})
                                </span>
                              )}
                            </h4>

                            <p className="col-start-2 text-[0.8125rem] leading-relaxed text-ink-2">
                              {edition.body}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Panel>
            </Reveal>
          </div>
        </div>
      </div>

      {/*
        Platform architecture — the ecosystem diagram, at the foot of the page.

        Its own labels are the client's `architecture` content to the character:
        the Central Bank above, the Hub at the centre, and Commercial Banks,
        Retail Customers, Government, Merchants and Corporates around it. That
        block survived the cut to the one-pager but had nothing rendering it;
        this is that section, restored as the one render rather than as the
        diagram the page used to draw in markup.

        It is measured, not eyeballed: the render leaves 3.5% clear above its
        content, 8.6% below and 6-7% each side, so a hold of 3% top, 6% bottom
        and 4.5% each side dissolves the plate into the white canvas without
        reaching a single label. Its ground runs #fdfdfd at the top to #eef3f8
        at the foot, which is why the bottom needs the deepest feather and the
        top barely needs one.
      */}
      {/*
        One screen, the way the masthead owns one.

        The render is 1402x1122, so left to run at the shell's width it stood
        1086px tall on a 900px viewport and the section spilled over the fold by
        a fifth of itself. It is now bounded by height rather than width: the
        section claims exactly `min-h-svh`, the heading takes what it needs, and
        the figure takes the rest on `flex-1` with the image on `object-contain`
        inside it, so the plate is as large as the screen allows and never
        larger. `pt-16` clears the fixed header, which floats over the top 4rem
        of whatever section is under it.

        The bound sits on the image rather than on a chain of flex-1 parents.
        Those give a definite height only when the section has one, and the
        section's height is what the image is deciding — so `h-full` resolved
        against nothing and the plate stayed 794px wide whatever the screen. A
        `calc` against svh has no such circularity: 4.5rem of top pad — just
        clearing the 4rem fixed header — 2rem at the foot and 8.5rem of heading,
        sub-line and rule, which leaves the rest. Every one of those is a pixel
        off the plate, so they run as tight as the type allows.
        Both bounds go on as maxima with width and height left auto, which is
        the one arrangement that shrinks proportionally: a replaced element over
        both its maxima takes whichever ratio is smaller and scales to it. Set
        as a fixed height instead, the tablet widths kept the box at the tall
        budget and letterboxed 220px of nothing around the picture.

        From md down the bound comes off. There the width floor below binds
        anyway, and a diagram squeezed into a phone's leftover vertical is the
        illegible case this whole treatment exists to avoid.
      */}
      <section className="ground-soft flex flex-col justify-center bg-canvas pt-4 pb-10 md:min-h-svh md:pt-[4.5rem] md:pb-8">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col items-center gap-2.5 text-center">
              <h2 className="h-display-3">
                One Platform.{" "}
                <span className="text-brand-gradient">
                  Endless Possibilities.
                </span>
              </h2>
              <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2 md:text-[1rem]">
                {dch.architecture.subline}
              </p>
              <span
                aria-hidden="true"
                className="block h-[3px] w-20 rounded-full bg-[linear-gradient(90deg,var(--color-navy-600),var(--color-green-500))]"
              />
            </div>
          </Reveal>

          <Reveal delay={120} kind="scale" className="mt-4">
            {/* Capped at 68rem — its native width is 1402, and past that the
                render is being enlarged rather than displayed. */}
            <figure className="mx-auto w-full max-w-[68rem]">
              {/*
                Below md the diagram keeps a floor of 44rem and pans instead of
                shrinking. Fitted to a 390px screen its own body copy comes out
                at a five-pixel cap — present, but not readable, which makes a
                diagram carrying six descriptions decorative. Held at 704px it
                stays legible and the reader drags. Focusable, because a region
                that scrolls has to be reachable without a pointer.
              */}
              <div
                tabIndex={0}
                role="group"
                aria-label={dch.architecture.eyebrow}
                className="overflow-x-auto rounded-[var(--radius-card)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy-600 md:overflow-visible"
              >
                <Image
                  src="/images/dch-image.png"
                  alt="The Digital Currency Hub at the centre of the retail CBDC ecosystem, integrated with Central Bank infrastructure above and serving commercial banks, retail customers, government, merchants and corporates around it"
                  width={1402}
                  height={1122}
                  quality={88}
                  sizes="(min-width: 1024px) 68rem, (min-width: 768px) 94vw, 44rem"
                  className="mx-auto h-auto w-full min-w-[44rem] select-none [mask-composite:intersect] [mask-image:linear-gradient(180deg,transparent_0%,#000_3%,#000_94%,transparent_100%),linear-gradient(90deg,transparent_0%,#000_4.5%,#000_95.5%,transparent_100%)] md:h-auto md:w-auto md:max-h-[calc(100svh-15rem)] md:max-w-full md:min-w-0"
                />
              </div>
              <p className="mt-1 text-center text-[0.75rem] text-ink-3 md:hidden">
                Drag the diagram sideways to read it in full.
              </p>
              {/* Everything the diagram says, in text. A render this dense is
                  the only place on the page carrying these six relationships,
                  and alt text alone would not hold them. */}
              <figcaption className="sr-only">
                {dch.architecture.top.title} — {dch.architecture.top.body} —
                connects by {dch.architecture.top.note.toLowerCase()} to the{" "}
                {dch.architecture.centre.brand} {dch.architecture.centre.title},{" "}
                {dch.architecture.centre.body}. {dch.architecture.bank.title}:{" "}
                {dch.architecture.bank.body} It serves{" "}
                {dch.architecture.participants
                  .map(
                    (participant) =>
                      `${participant.title} — ${participant.body}`,
                  )
                  .join(" ")}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Closing strip */}
      <section className="on-dark relative isolate overflow-hidden bg-abyss py-9 md:py-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(1,164,255,.16),transparent_66%)]"
        />
        <div className="shell">
          <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {dch.attributes.map((attribute, i) => (
              <Reveal
                as="li"
                key={attribute.title}
                delay={i * 60}
                className={`group/item flex flex-col items-start gap-3 ${
                  i > 0 ? "xl:border-l xl:border-white/10 xl:pl-6" : ""
                }`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full text-green-400 ring-1 ring-white/20 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:scale-110 group-hover/item:text-white group-hover/item:ring-green-400">
                  <Icon
                    name={attribute.icon as IconName}
                    className="h-5 w-5"
                    strokeWidth={1.6}
                  />
                </span>
                <span className="text-[0.9375rem] leading-snug font-semibold text-white">
                  {attribute.title}
                </span>
                <span className="text-[0.875rem] leading-relaxed text-ink-inv-2">
                  {attribute.body}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/*
        The bar the design closes on. It is the page's only call to action —
        everything else was cut when the page was reduced to the client's own
        material — so it carries a real destination rather than a decorative
        button.
      */}
      <section className="ground-soft bg-canvas py-8 md:py-9">
        <div className="shell">
          <Reveal kind="scale">
            <div className="flex flex-col items-start gap-6 rounded-[var(--radius-card)] bg-white p-6 shadow-[0_1px_2px_rgba(10,21,51,.04),0_16px_40px_-28px_rgba(10,21,51,.24)] ring-1 ring-line md:flex-row md:items-center md:justify-between md:gap-8 md:p-7">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-600/8 text-navy-600 ring-1 ring-navy-600/15">
                  <Icon
                    name={dch.closingBar.icon as IconName}
                    className="h-5 w-5"
                    strokeWidth={1.6}
                  />
                </span>
                <p className="text-[1rem] leading-snug font-semibold text-ink md:text-[1.125rem]">
                  {dch.closingBar.line}
                </p>
              </div>
              <ButtonLink
                href="/contact"
                icon="arrowRight"
                className="shrink-0"
              >
                {dch.closingBar.cta}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ===========================================================================
   ARCHIVE — the sections this page carried before it was cut to the client's
   product one-pager. Disabled rather than deleted.

   Restoring any of them also means restoring their imports: PageHero, DemoCta,
   ButtonLink, DarkSection, Eyebrow, SectionHeading, plus the Rail helper. Note
   the local Panel in this file now belongs to the one-pager layout and is a
   different component from the archived one of the same name.

   Nested JSX comments were flattened to line comments, since a second comment
   terminator inside this block would close it early.

   1. Hero descriptor line
        <span className="mt-3 block h-display-4 font-semibold text-ink-2">
          {dch.descriptor}
        </span>

   2. Hero second paragraph
        <p className="mt-4">{dch.intro[0]}</p>

   3. Hero actions
        actions={
          <>
            <DemoCta />
            <ButtonLink href="#deployment" tone="secondary">
              Deployment options
            </ButtonLink>
          </>
        }

   4. Hero aside — the Designed-for panel
        aside={
          <div className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-line shadow-[var(--shadow-card)]">
            <p className="font-mono text-[0.75rem] md:text-[0.625rem] uppercase tracking-[0.18em] text-navy-600">
              Designed for
            </p>
            <ul className="flex flex-col gap-3">
              {dch.designedFor.map((audience) => (
                <li key={audience} className="flex items-center gap-3 text-[0.9375rem] text-ink">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-green-500" strokeWidth={2.4} />
                  {audience}
                </li>
              ))}
            </ul>
            <p className="mt-2 border-t border-line pt-4 text-[0.875rem] leading-relaxed text-ink-2">
              {dch.intro[1]}
            </p>
          </div>
        }

   5.  Why Digital Currency Hub
   6.  Platform architecture diagram — SUPERSEDED, not archived. The section is
       back at the foot of the page, but as the client's own render rather than
       as the markup diagram this file used to draw. dch.architecture is live
       again: its headline, subline, top, centre, bank and participants all feed
       the heading and the figure's caption.
   7.  Designed for / Business benefits panels
   8.  Delivery models strip
   9.  Why banks choose OrbisMoneta
   10. Closing section and the Request-a-Demo CTA
   11. Rail helper
   12. Panel helper (the old one)

   The markup for 5-12 is recoverable from git history — it was live in the
   commit preceding this rewrite. The content it reads from is all still in
   content/product.ts, untouched: dch.descriptor, dch.intro, dch.why,
   dch.architecture, dch.designedFor, dch.benefits, dch.deployment.models,
   dch.whyBanks, dch.closing and dch.cta.
   =========================================================================== */
