import type { Metadata } from "next";
import Image from "next/image";
import { partnersPage } from "@/content/about";
import { site } from "@/content/site";
import { ArtCarousel } from "@/components/ArtCarousel";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Section";

export const metadata: Metadata = {
  title: "Ecosystem & Partners",
  description:
    "OrbisMoneta integrates, certifies and co-engineers alongside cloud providers, fintech platforms, core banking vendors and specialist technology partners.",
  alternates: { canonical: "/partners" },
};

/**
 * One tone per tier, taken from each render's own light — the technology card
 * is lit blue, the implementation card green, the alliances card a deeper
 * blue — so the panel under each image continues the picture rather than
 * sitting beside it.
 *
 * `panel` starts at very close to the bottom edge of the matching render,
 * sampled rather than guessed: #000215 / #000000 / #01081e across the three.
 * That is what lets the seam read as one surface darkening downward instead of
 * as a photograph pasted onto a card.
 */
const TIER_TONES = [
  {
    ring: "ring-sky-400/18",
    panel: "bg-[linear-gradient(180deg,#020a1c,#071a3d_58%,#0a2350)]",
    badge:
      "bg-[linear-gradient(145deg,var(--color-sky-500),var(--color-navy-600))] shadow-[0_16px_34px_-14px_rgba(1,164,255,.85)]",
    label: "text-sky-400",
    link: "text-sky-400",
    ghost: "text-sky-400/15 group-hover/tier:text-sky-400/30",
    glow: "bg-[radial-gradient(circle,rgba(1,164,255,.5),transparent_70%)]",
    lift: "hover:ring-sky-400/45 hover:shadow-[0_28px_54px_-24px_rgba(3,13,34,.75),0_46px_78px_-46px_rgba(1,164,255,.6)]",
  },
  {
    ring: "ring-green-400/20",
    panel: "bg-[linear-gradient(180deg,#010d05,#06240f_58%,#0a3317)]",
    badge:
      "bg-[linear-gradient(145deg,var(--color-green-400),var(--color-green-600))] shadow-[0_16px_34px_-14px_rgba(1,172,50,.85)]",
    label: "text-green-400",
    link: "text-green-400",
    ghost: "text-green-400/15 group-hover/tier:text-green-400/30",
    glow: "bg-[radial-gradient(circle,rgba(1,172,50,.5),transparent_70%)]",
    lift: "hover:ring-green-400/45 hover:shadow-[0_28px_54px_-24px_rgba(3,13,34,.75),0_46px_78px_-46px_rgba(1,172,50,.6)]",
  },
  {
    ring: "ring-sky-500/20",
    panel: "bg-[linear-gradient(180deg,#02102e,#0a2560_58%,#0d2f77)]",
    /* Brighter than the tone alone would suggest. This is the one tile that is
       drawn rather than baked, and it sits over the lit face of the bank —
       at sky-600/navy-700 it read as a flat patch beside the glowing tiles on
       the other two cards. */
    badge:
      "bg-[linear-gradient(145deg,var(--color-sky-400),var(--color-navy-600))] shadow-[0_16px_36px_-12px_rgba(1,164,255,.95)]",
    label: "text-sky-400",
    link: "text-sky-400",
    ghost: "text-sky-300/15 group-hover/tier:text-sky-300/30",
    glow: "bg-[radial-gradient(circle,rgba(0,46,166,.6),transparent_70%)]",
    lift: "hover:ring-sky-500/45 hover:shadow-[0_28px_54px_-24px_rgba(3,13,34,.75),0_46px_78px_-46px_rgba(0,46,166,.65)]",
  },
];

/**
 * The hero gallery.
 *
 * This was a single feathered diagram, floating frameless on the section. Two
 * more images arrived and that treatment stopped working: the diagram is
 * near-white and the two new scenes are near-black, and a feather blends by
 * taking an image's edges to zero, which only reads as a blend when image and
 * page are close in tone. Feathering a near-black scene onto #f7f9fc gives a
 * dark blob with soft edges. Worse, the feather that suited the diagram was a
 * radial — it would have cropped the new scenes to a circle and taken the bank
 * and the tower off their corners, which is most of what they depict.
 *
 * So: a framed card, the same answer the industry gallery reached for the same
 * reason, and the same component.
 *
 * 16/15, and that number is derived rather than picked — see the note on
 * `partnersPage.hero.gallery`, which records the measured subject bounds each
 * slide has to keep and the window they leave. The short version: it is the one
 * band of ratios where all three fill the frame without losing anything drawn.
 * Wider frames were tried first and both failed the same way — 5:4 and 9:8 each
 * left the square diagram letterboxed inside a much larger box, which reads as
 * a small picture in a big hole.
 *
 * The drift is `om-float`, the slow rise-and-fall the advisory hero uses, so
 * the two openings move at one tempo.
 */
function EcosystemGallery() {
  return (
    /* Bleeds past the shell between lg and xl, where the column is narrow
       enough that the card would otherwise read as an afterthought beside the
       copy. None from xl up: the card is what sets the hero's height there, so
       every pixel of bleed is a pixel of section. */
    <div className="mx-auto w-full max-w-[30rem] lg:w-[calc(100%+2rem)] lg:max-w-none xl:w-full">
      <div className="animate-[om-float_11s_var(--ease-in-out-soft)_infinite] motion-reduce:animate-none">
        <ArtCarousel
          slides={partnersPage.hero.gallery}
          label="Partner ecosystem imagery"
          aspect="aspect-[16/15]"
          ground="bg-[#eef1f8]"
          priority
          sizes="(min-width: 1280px) 34vw, (min-width: 1024px) 40vw, 92vw"
        />
      </div>
    </div>
  );
}

export default function PartnersPage() {
  /* "Become an OrbisMoneta partner." with the brand name painted. Split on the
     name rather than stored pre-split, so the sentence stays one string. */
  const [ctaLead, ctaTail] = partnersPage.cta.headline.split(site.name);

  return (
    <>
      <PageHero
        eyebrow={partnersPage.eyebrow}
        title={partnersPage.headline}
        accent={partnersPage.headlineAccent}
        intro={partnersPage.intro}
        split="showcase"
        actions={
          <ButtonLink
            href={`mailto:${partnersPage.cta.email}`}
            icon="arrowRight"
          >
            {partnersPage.cta.label}
          </ButtonLink>
        }
        aside={<EcosystemGallery />}
      />

      <section className="section ground-soft bg-canvas">
        <div className="shell">
          <Reveal kind="fade" className="mb-10 md:mb-12">
            <Eyebrow>Our partner ecosystem</Eyebrow>
          </Reveal>

          <ol className="grid auto-rows-fr gap-6 lg:grid-cols-3">
            {partnersPage.tiers.map((tier, i) => {
              const tone = TIER_TONES[i % TIER_TONES.length];
              return (
                <Reveal
                  as="li"
                  key={tier.title}
                  delay={i * 90}
                  className={`group/tier on-dark relative flex h-full flex-col overflow-hidden rounded-[1.75rem] ring-1 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 motion-reduce:hover:translate-y-0 ${tone.panel} ${tone.ring} ${tone.lift}`}
                >
                  {/*
                    The render, whole and uncropped.

                    Each one already carries its own label chips, and those
                    chips run down to 90% of the frame — past where the badge
                    below sits. So there is no band to crop and no bottom fade
                    to apply: either would take a chip's label with it. The
                    seam is handled from the other side instead, by starting
                    `tone.panel` at the render's own bottom colour.
                  */}
                  <div className="relative">
                    <Image
                      src={tier.image}
                      alt=""
                      aria-hidden="true"
                      width={1402}
                      height={1122}
                      quality={78}
                      sizes="(min-width: 1024px) 30vw, (min-width: 768px) 46vw, 92vw"
                      className="h-auto w-full select-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tier:scale-[1.05] motion-reduce:transition-none"
                    />

                    {/* Light raking across as the pointer arrives. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.16),transparent)] opacity-0 group-hover/tier:animate-[om-sheen_1.15s_ease-out] group-hover/tier:opacity-100 motion-reduce:hidden"
                    />

                    {/*
                      The tier's mark — drawn only where the render lacks one.

                      Two of the three carry their own centre tile, and drawing
                      over them is not an option: the baked tiles run from 76%
                      to 97% of the frame and overlap the label chips above, so
                      nothing can be cropped or faded away to make room. An
                      overlay just sits beneath a second, visible tile, which is
                      what the first pass shipped. So the drawn one matches the
                      baked ones instead — same width, same footing — and only
                      appears on the card that needs it.
                    */}
                    {!tier.markInImage && (
                      <>
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute bottom-[1%] left-1/2 h-24 w-24 -translate-x-1/2 rounded-full blur-2xl ${tone.glow}`}
                        />
                        <span
                          aria-hidden="true"
                          className={`absolute bottom-[3%] left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-2xl text-white ring-1 ring-white/20 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tier:scale-110 group-hover/tier:rotate-[-8deg] motion-reduce:transition-none ${tone.badge}`}
                        >
                          <Icon
                            name={tier.icon as IconName}
                            className="h-7 w-7"
                            strokeWidth={1.6}
                          />
                        </span>
                      </>
                    )}
                  </div>

                  <div className="relative flex flex-1 flex-col gap-2 px-7 pt-10 pb-7">
                    {/* Oversized numeral, sunk into the corner. */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute right-5 bottom-3 font-display text-[3.75rem] leading-none font-bold tabular transition-colors duration-300 ${tone.ghost}`}
                    >
                      {tier.tier.replace("Tier ", "")}
                    </span>

                    <span
                      className={`font-mono text-[0.6875rem] tracking-[0.18em] uppercase ${tone.label}`}
                    >
                      {tier.tier}
                    </span>
                    <h2 className="text-[1.25rem] leading-snug text-white">
                      {tier.title}
                    </h2>
                    {/*
                      No paragraph. Each tier's description came off at the
                      client's request, so the card is the render, the tier
                      label, the name and the ask. `tier.body` stays in
                      content/about.ts — the copy is the client's own and
                      nothing else was reworded around its absence.
                    */}

                    {/*
                      A real destination, not the reference's decorative "Learn
                      more". These tiers have no pages of their own, and a link
                      that looks live but goes nowhere is worse than no link —
                      so it points at the address the rest of the page already
                      uses for partner enquiries.
                    */}
                    <a
                      href={`mailto:${partnersPage.cta.email}?subject=${encodeURIComponent(tier.title)}`}
                      className={`relative mt-auto inline-flex w-fit items-center gap-2 pt-8 font-mono text-[0.6875rem] tracking-[0.14em] uppercase transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${tone.link}`}
                    >
                      Become a partner
                      <Icon
                        name="arrowRight"
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover/tier:translate-x-1"
                        strokeWidth={2}
                      />
                    </a>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/*
        The partnership banner.

        A contained card on a light ground rather than the full-bleed dark band
        that was here: the page already ends on the footer's navy, and two dark
        slabs stacked read as one long dark run with a seam in it.

        The wave is drawn, not an image — fourteen stroked paths fanned out of
        one curve. Same reasoning as the tier artwork: no ground of its own to
        mask around, sharp at any width, and it costs nothing.
      */}
      <section className="section-tight bg-canvas">
        <div className="shell">
          <Reveal
            kind="scale"
            className="on-dark group/partner-cta relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(115deg,#04123a_0%,#072055_48%,#03153f_100%)] ring-1 ring-white/10 shadow-[0_30px_70px_-40px_rgba(3,13,34,.75)]"
          >
            {/* Dotted patches, top-right and bottom-left, as in the design. */}
            <span
              aria-hidden="true"
              className="absolute top-7 right-8 h-16 w-28 bg-[radial-gradient(circle,rgba(255,255,255,.22)_1.1px,transparent_1.1px)] bg-[size:14px_14px] opacity-70"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-8 left-7 hidden h-16 w-24 bg-[radial-gradient(circle,rgba(255,255,255,.16)_1.1px,transparent_1.1px)] bg-[size:14px_14px] sm:block"
            />

            {/* Ribbon. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 240"
              preserveAspectRatio="none"
              fill="none"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[82%] w-full"
            >
              <defs>
                <linearGradient
                  id="om-partner-wave"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-navy-500)"
                    stopOpacity="0.2"
                  />
                  <stop offset="55%" stopColor="var(--color-sky-500)" />
                  <stop offset="100%" stopColor="var(--color-green-400)" />
                </linearGradient>
              </defs>
              {Array.from({ length: 14 }, (_, i) => (
                <path
                  key={i}
                  /* The fan has to live inside the viewBox. The first pass
                     started these at y=196 of 240 and stepped down from there,
                     so ten of the fourteen were below the frame and the ribbon
                     rendered as a single faint line. */
                  d={`M0 ${118 + i * 8} C 240 ${94 + i * 7}, 470 ${186 - i * 2}, 700 ${138 + i * 3} S 1010 ${68 - i * 2}, 1200 ${26 - i * 3}`}
                  stroke="url(#om-partner-wave)"
                  strokeWidth="1"
                  opacity={0.16 + i * 0.05}
                />
              ))}
            </svg>
            {/* Two lit points riding the ribbon. */}
            <span
              aria-hidden="true"
              className="absolute right-[9%] bottom-[38%] h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_12px_3px_rgba(1,164,255,.8)]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[12%] left-[46%] hidden h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,.7)] md:block"
            />

            <div className="relative flex flex-col items-start gap-7 p-8 md:p-12 lg:flex-row lg:items-center lg:gap-10 lg:py-14">
              {/* Glass badge. */}
              <span
                aria-hidden="true"
                className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/[0.07] ring-1 ring-white/15 backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/partner-cta:scale-105 motion-reduce:transition-none"
              >
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(1,164,255,.30),transparent_70%)]" />
                <Icon
                  name="nodes"
                  className="relative h-9 w-9 text-sky-400"
                  strokeWidth={1.5}
                />
              </span>

              <div className="flex flex-col gap-3 lg:flex-1">
                <h2 className="text-[1.625rem] leading-[1.15] font-semibold tracking-[-0.03em] text-white md:text-[2rem]">
                  {ctaLead}
                  <span className="text-brand-gradient-inv">{site.name}</span>
                  {ctaTail}
                </h2>
                <p className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-inv-2 md:text-[1rem]">
                  {partnersPage.cta.body}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-2.5 lg:items-end">
                <ButtonLink
                  href={`mailto:${partnersPage.cta.email}`}
                  tone="brand"
                  size="lg"
                  icon="arrowRight"
                >
                  {partnersPage.cta.label}
                </ButtonLink>
                {/* The button is a mailto, so the address it opens is worth
                    showing — people copy it as often as they click it. */}
                <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-inv-3">
                  {partnersPage.cta.email}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
