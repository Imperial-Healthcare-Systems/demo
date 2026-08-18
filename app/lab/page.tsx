import type { Metadata } from "next";
import { labPage } from "@/content/about";
import { Breadcrumbs } from "@/components/PageHero";
import { Icon, type IconName } from "@/components/Icon";
import Image from "next/image";
import { FlipCard, FlipHint } from "@/components/FlipCard";
import { PointerSpotlight } from "@/components/PointerSpotlight";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";

export const metadata: Metadata = {
  title: "Innovation Lab — Exploring. Experimenting. Engineering the Future.",
  description: labPage.intro,
  alternates: { canonical: "/lab" },
};

/**
 * The Innovation Lab, following the client's page design section for section:
 * a dark masthead, What we explore, How we innovate, Co-innovation is at our
 * core, and the line they close on.
 *
 * Everything visual is the site's own — the display and mono faces, the
 * navy/sky/green tokens, `--radius-card`, the standard reveal and hover
 * behaviour. Only the structure and the wording come from the design.
 *
 * The masthead now carries the client's own banner render. It replaced
 * `LabOrbit`, the CSS-and-SVG orbit this page used while there was no artwork —
 * that component is still in the project but nothing imports it any more.
 */

/** Navy · sky · green, the logo's order, as everywhere else on the site. */
const TONES = [
  {
    tile: "bg-navy-600/10 text-navy-600 ring-navy-600/15",
    hoverTile:
      "group-hover/item:bg-navy-600 group-hover/item:text-white group-hover/item:ring-navy-600",
    bar: "bg-[linear-gradient(90deg,var(--color-navy-600),var(--color-navy-400))]",
    solid: "bg-navy-600",
    text: "text-navy-600",
    back: "bg-[linear-gradient(160deg,#0a1533,#002583)] ring-navy-800",
    spot: "bg-[radial-gradient(11rem_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgba(0,46,166,.13),transparent_62%)]",
    halo: "group-hover/flip:shadow-[0_18px_38px_-18px_rgba(0,46,166,.55)]",
    lift: "hover:ring-navy-600/25 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_22px_44px_-20px_rgba(10,21,51,.28)]",
  },
  {
    tile: "bg-sky-500/12 text-sky-600 ring-sky-500/20",
    hoverTile:
      "group-hover/item:bg-sky-500 group-hover/item:text-white group-hover/item:ring-sky-500",
    bar: "bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-sky-400))]",
    solid: "bg-sky-600",
    text: "text-sky-600",
    back: "bg-[linear-gradient(160deg,#0a1533,#0086d6)] ring-sky-600/70",
    spot: "bg-[radial-gradient(11rem_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgba(1,164,255,.16),transparent_62%)]",
    halo: "group-hover/flip:shadow-[0_18px_38px_-18px_rgba(1,164,255,.55)]",
    lift: "hover:ring-sky-500/30 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_22px_44px_-20px_rgba(10,21,51,.28)]",
  },
  {
    tile: "bg-green-500/12 text-green-600 ring-green-500/20",
    hoverTile:
      "group-hover/item:bg-green-500 group-hover/item:text-white group-hover/item:ring-green-500",
    bar: "bg-[linear-gradient(90deg,var(--color-green-500),var(--color-green-400))]",
    solid: "bg-green-600",
    text: "text-green-600",
    back: "bg-[linear-gradient(160deg,#0a1533,#018a28)] ring-green-600/70",
    spot: "bg-[radial-gradient(11rem_circle_at_var(--spot-x,50%)_var(--spot-y,50%),rgba(1,172,50,.15),transparent_62%)]",
    halo: "group-hover/flip:shadow-[0_18px_38px_-18px_rgba(1,172,50,.55)]",
    lift: "hover:ring-green-500/30 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_22px_44px_-20px_rgba(10,21,51,.28)]",
  },
];

/**
 * Both faces of an exploration card share a shell, so it keeps its shape
 * through the turn.
 *
 * No `relative` in here, deliberately — the back is positioned by `FlipCard`,
 * and a `relative` arriving through `backClassName` lands in the same class
 * list as its `absolute` and wins on stylesheet order, dropping the back into
 * flow below the front. `isolate` gives each face its own stacking context so
 * the cursor wash can sit behind the copy and still in front of the card.
 */
const FACE =
  "isolate overflow-hidden rounded-[1.25rem] p-5 ring-1 shadow-[0_1px_2px_rgba(10,21,51,.04)] transition-shadow duration-300";

/**
 * A panel's own title, flanked by rules.
 *
 * The design sets these in caps between two short lines. The lines are the part
 * worth keeping — they are what makes a title read as belonging to the panel it
 * sits in rather than to the page — so the rules stay and the type does not:
 * this is the site's display face with the accent painted, the same gesture as
 * every other heading here, one step down in size because it now lives inside a
 * card rather than above a section.
 *
 * `onDark` takes the flat green rather than the gradient. On a ground this dark
 * the gradient's navy end drops out of the middle of the line.
 */
function PanelHead({
  heading,
  accent,
  onDark = false,
}: {
  heading: string;
  accent?: string;
  onDark?: boolean;
}) {
  const [before, after] = accent ? heading.split(accent) : [heading, ""];
  return (
    <div className="flex items-center justify-center gap-3 md:gap-4">
      <span
        aria-hidden="true"
        className={`h-px w-8 shrink-0 md:w-12 ${
          onDark
            ? "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.28))]"
            : "bg-[linear-gradient(90deg,transparent,var(--color-line-strong))]"
        }`}
      />
      <h2
        className={`text-center text-[1.125rem] leading-tight font-semibold tracking-[-0.024em] md:text-[1.375rem] ${
          onDark ? "text-green-400" : "text-ink"
        }`}
      >
        {before}
        {accent && <span className="text-brand-gradient">{accent}</span>}
        {after}
      </h2>
      <span
        aria-hidden="true"
        className={`h-px w-8 shrink-0 md:w-12 ${
          onDark
            ? "bg-[linear-gradient(90deg,rgba(255,255,255,.28),transparent)]"
            : "bg-[linear-gradient(90deg,var(--color-line-strong),transparent)]"
        }`}
      />
    </div>
  );
}

/**
 * A centred section head, painted the way every other one on the site is: the
 * plain word sets the category and the accented one carries the weight.
 */
function SectionHead({
  heading,
  accent,
  intro,
}: {
  heading: string;
  accent: string;
  intro?: string;
}) {
  const [before, after] = heading.split(accent);
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <h2 className="h-display-3">
        {before}
        <span className="text-brand-gradient">{accent}</span>
        {after}
      </h2>
      {intro && (
        <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-ink-2 md:text-[1rem]">
          {intro}
        </p>
      )}
      <span
        aria-hidden="true"
        className="block h-[3px] w-20 rounded-full bg-[linear-gradient(90deg,var(--color-navy-600),var(--color-green-500))]"
      />
    </div>
  );
}

export default function LabPage() {
  return (
    <>
      {/*
        The masthead, in the shape the rest of the site uses: name and copy on
        the left, the render on the right, four marks along the foot, and
        `min-h-svh` so it owns exactly one screen.

        This plate does not get what it wants from that shape and it is worth
        being clear about why, because it is not fixable by nudging anything.
        The render is 1536x1024 and drawn right out to its own edges, with its
        smallest label — the "Financial Institutions" chip — set at a 14px glyph
        run. Painted at the ~726px a seven-of-twelve column gives it, that run
        lands near 6.6px: visible as texture, not readable as words. It ran full
        width for one build to keep those labels legible, at the cost of a
        masthead a screen and a half tall; the client has asked for the standard
        hero instead, so the labels are decoration here and the page carries the
        same information in text below.

        Nothing is cropped either way. The plate keeps its own ratio and the
        feather holds are still measured off the artwork.
      */}
      <section className="on-dark relative isolate flex min-h-svh flex-col overflow-hidden rounded-b-[2rem] bg-abyss pt-16 pb-6 md:rounded-b-[3rem] md:pt-20 md:pb-7">
        <div
          aria-hidden="true"
          /* Lighting the copy, not the plate. The render brings its own light,
             and an aurora behind it would only wash it out. */
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_65%_at_22%_16%,rgba(1,164,255,.16),transparent_64%),radial-gradient(45%_55%_at_10%_95%,rgba(1,172,50,.12),transparent_66%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:radial-gradient(70%_60%_at_60%_10%,#000,transparent)]"
        />

        <div className="shell flex flex-1 flex-col justify-center">
          <Reveal kind="fade">
            <Breadcrumbs onDark items={[{ label: "Innovation Lab" }]} />
          </Reveal>

          {/*
            Six and six at lg, five and seven at xl. The plate takes every pixel
            the layout can spare it once there is room to spare, and the copy
            keeps a full six columns below that, where a five-column headline
            would break "Innovation" onto its own line.
          */}
          <div className="mt-5 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-6 xl:col-span-5">
              {/* No eyebrow. It read "ORBISMONETA", which the header's own
                  lockup says two inches above it and the breadcrumb says again
                  in between — three statements of the brand before the page
                  names itself. `labPage.eyebrow` stays in content/about.ts,
                  unused. The headline takes the top margin the eyebrow was
                  holding so the block does not shift up. */}
              <Reveal delay={90}>
                {/*
                  Painted the way the home hero and the product page paint
                  theirs: white above, `text-brand-gradient-inv` on the word that
                  carries the weight — sky-400 into #35d3c0 into green-400.
                */}
                <h1 className="h-display-1 leading-[1.05] text-white">
                  Innovation{" "}
                  <span className="text-brand-gradient-inv">
                    {labPage.headlineAccent}
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={130}>
                <p className="mt-2.5 text-[1.125rem] leading-snug font-semibold text-green-400 md:text-[1.375rem]">
                  {labPage.tagline}
                </p>
              </Reveal>
              <Reveal delay={170}>
                <p className="mt-4 text-[1rem] leading-relaxed text-ink-inv-2 md:text-[1.0625rem]">
                  {labPage.intro}
                </p>
              </Reveal>
            </div>

            {/*
              Feathered rather than framed. Its ground is rgb(2,14,46) at the top
              corners against a #030d22 masthead — near enough that the plate
              needs softening, not hiding. The holds are measured at the artwork:
              the lit drawing stops 5.8% from the left, 2.3% from the top, 2.9%
              from the bottom and 1.6% from the right, so the feather holds at
              4.5%, 2%, 2.4% and 1.3% and touches none of it.

              Two gradients intersected rather than one radial: a radial soft
              enough to lose the corners takes the mid-edges with it, and the
              mid-edges are where every one of this plate's labels sits.
            */}
            <Reveal
              delay={220}
              kind="right"
              className="lg:col-span-6 xl:col-span-7"
            >
              <Image
                src="/images/lab_image.png"
                alt="The Innovation Lab's fields of work as one scene — a CBDC hub ringed by tokenization, programmable money, digital wallets, tokenized assets, financial institutions and API infrastructure"
                width={1536}
                height={1024}
                priority
                quality={86}
                sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 48vw, 92vw"
                className="h-auto w-full select-none [mask-composite:intersect] [mask-image:linear-gradient(180deg,transparent_0%,#000_2%,#000_97.6%,transparent_100%),linear-gradient(90deg,transparent_0%,#000_4.5%,#000_98.7%,transparent_100%)]"
              />
            </Reveal>
          </div>

          <Reveal delay={280} className="mt-6 border-t border-white/10 pt-5">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-0">
              {labPage.pillars.map((pillar, i) => (
                <li
                  key={pillar.title}
                  className={`group/item flex items-center gap-3 sm:px-5 sm:first:pl-0 sm:last:pr-0 ${
                    i > 0 ? "sm:border-l sm:border-white/10" : ""
                  }`}
                >
                  {/* Outlined — a ring rather than a fill, so the four read as a
                      set and not as four buttons. */}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sky-400 ring-1 ring-white/20 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:scale-110 group-hover/item:text-white group-hover/item:ring-sky-400">
                    <Icon
                      name={pillar.icon as IconName}
                      className="h-[1.1rem] w-[1.1rem]"
                      strokeWidth={1.6}
                    />
                  </span>
                  <span className="text-[0.875rem] leading-snug font-semibold text-white">
                    {pillar.title}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* What we explore */}
      <section className="section-tight ground-soft bg-canvas">
        <div className="shell">
          <Reveal>
            <SectionHead
              heading={labPage.explore.heading}
              accent={labPage.explore.headingAccent}
              intro={labPage.explore.intro}
            />
          </Reveal>

          {/*
            Seven cards that turn over, the same idiom as the solution areas:
            the front names the field, the back carries what we actually do in
            it. That split is also what lets these sit four to a row without the
            grid becoming seven paragraphs. The design puts all seven across,
            which is a poster's proportion — at page scale "Researching asset
            tokenization, digital securities, tokenized bonds…" runs to a dozen
            lines in a 170px column.

            `FlipCard` does the rest: hover on a pointer, tap on a touchscreen,
            Enter or Space from the keyboard, and a cross-fade instead of a
            rotation under reduced motion. Only the face you can see is exposed
            to a screen reader.

            `auto-rows-fr` because a card that turns has to be the same size on
            both sides, which means every card in a row has to be the size of
            the tallest.
          */}
          <PointerSpotlight className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {labPage.explore.items.map((item, i) => {
              const tone = TONES[i % TONES.length];
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={i * 60}
                  className="h-full"
                >
                  <FlipCard
                    label={item.title}
                    minHeight="min-h-[12.5rem]"
                    className={`h-full ${tone.halo}`}
                    faceClassName={`${FACE} bg-[linear-gradient(180deg,#ffffff,var(--color-surface))] ring-line`}
                    backClassName={`${FACE} ${tone.back}`}
                    front={
                      <>
                        {/*
                          The cursor wash. `PointerSpotlight` puts the pointer's
                          position on this card into `--spot-x` / `--spot-y`, in
                          the card's own coordinates, and this paints a soft disc
                          of the card's tone there. It exists only where a cursor
                          does — the component binds nothing on a touchscreen or
                          under reduced motion — and the fallback centres the
                          wash rather than leaving it unresolved.
                        */}
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/flip:opacity-100 ${tone.spot}`}
                        />

                        {/* The same icon again, oversized and nearly out of the
                            corner. A front carrying a title and a rule is a
                            third full at the height the back needs, and this
                            gives it weight at rest without inventing anything
                            to put there. It drifts on hover, so the card is
                            already moving before it turns. */}
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute -right-6 -bottom-7 -z-10 opacity-[0.07] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:-translate-x-2 group-hover/flip:-translate-y-1 group-hover/flip:rotate-6 motion-reduce:transition-none ${tone.text}`}
                        >
                          <Icon
                            name={item.icon as IconName}
                            className="h-32 w-32"
                            strokeWidth={1.1}
                          />
                        </span>

                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:scale-110 ${tone.tile} ${tone.hoverTile}`}
                        >
                          <Icon
                            name={item.icon as IconName}
                            className="h-5 w-5"
                            strokeWidth={1.6}
                          />
                        </span>

                        <h3 className="mt-3.5 text-[1rem] leading-snug">
                          {item.title}
                        </h3>

                        <span
                          aria-hidden="true"
                          className={`mt-3 block h-[3px] w-7 rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:w-14 ${tone.bar}`}
                        />

                        <FlipHint />
                      </>
                    }
                    back={
                      <span className="on-dark flex h-full flex-col">
                        <span className="font-mono text-[0.625rem] tracking-[0.16em] text-white/55 uppercase">
                          {item.title}
                        </span>
                        <span className="mt-2.5 text-[0.875rem] leading-relaxed text-white">
                          {item.body}
                        </span>
                        <FlipHint onDark />
                      </span>
                    }
                  />
                </Reveal>
              );
            })}
          </PointerSpotlight>
        </div>
      </section>

      {/*
        Enterprise Impact.

        Between what the Lab explores and how it works, at the client's
        placement — so the page answers "what do we get out of this" while the
        reader still has the seven fields in mind, and then goes on to how the
        work is actually done. Six verbs, in the client's own order and words.

        Dark, between two light bands. That is the reason it sits well here as
        well as the reason it can paint its numerals in the brand gradient,
        which it could not on canvas: light-dark-light gives the page a rhythm
        where the previous order ran two light bands together and then went
        dark only at the very foot.
      */}
      <section className="on-dark surface-deep grid-veil section-tight relative isolate overflow-hidden">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-sky-400 uppercase">
                {labPage.impact.eyebrow}
              </p>
              <h2 className="h-display-3 text-white">
                {labPage.impact.heading.split(labPage.impact.headingAccent)[0]}
                <span className="text-brand-gradient-inv">
                  {labPage.impact.headingAccent}
                </span>
              </h2>
              <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-ink-inv-2 md:text-[1rem]">
                {labPage.impact.intro}
              </p>
              <span
                aria-hidden="true"
                className="block h-[3px] w-20 rounded-full bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-green-500))]"
              />
            </div>
          </Reveal>

          {/*
            Six cards, three up.

            The numeral opens the card and the icon closes the row opposite it,
            rather than the two sitting shoulder to shoulder on the left — that
            gave the card two marks competing an inch apart and left the top
            right corner empty. Split, the row frames the card's head.
          */}
          <ol className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {labPage.impact.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.num}
                delay={i * 70}
                className="group/impact relative isolate flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white/[0.04] p-6 ring-1 ring-white/10 transition-[background-color,translate,--tw-ring-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-white/[0.07] hover:ring-sky-400/35 motion-reduce:hover:translate-y-0 md:p-7"
              >
                {/* Draws across the card's head on hover, the same gesture the
                    disciplines on /solutions use. Under reduced motion it is
                    simply already drawn. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-green-400))] transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/impact:scale-x-100 motion-reduce:transition-none motion-reduce:group-hover/impact:scale-x-100"
                />
                {/* Colour washing in behind the head — depth, not movement, so
                    it costs nothing under reduced motion. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(62%_54%_at_14%_0%,rgba(1,164,255,.16),transparent_72%)] opacity-0 transition-opacity duration-500 group-hover/impact:opacity-100"
                />

                <div className="flex items-center justify-between gap-3">
                  {/*
                    `leading-[1.4]`, and it is load-bearing.

                    `text-brand-gradient-inv` paints through `background-clip:
                    text` with `background-size: auto`, so the gradient only
                    covers the element's own box. At `leading-none` that box was
                    28px tall while the glyphs measured 37 — 5px of each numeral
                    above it and 4px below fell outside the painted area and, with
                    `-webkit-text-fill-color: transparent` under them, rendered as
                    nothing at all. The tops looked sliced off. 1.4 gives the box
                    39px, which contains the ink with room to spare.
                  */}
                  <span className="text-brand-gradient-inv font-mono text-[2.125rem] leading-[1.4] font-bold tabular-nums transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/impact:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover/impact:translate-y-0">
                    {item.num}
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8 text-sky-400 ring-1 ring-white/15 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/impact:bg-sky-500 group-hover/impact:text-white group-hover/impact:ring-sky-500 group-hover/impact:[transform:perspective(520px)_rotateY(-16deg)_scale(1.08)] motion-reduce:transition-none motion-reduce:group-hover/impact:transform-none">
                    <Icon
                      name={item.icon as IconName}
                      className="h-5 w-5"
                      strokeWidth={1.6}
                    />
                  </span>
                </div>

                <h3 className="mt-4 text-[1.125rem] leading-snug text-white">
                  {item.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="mt-2.5 block h-[2px] w-8 rounded-full bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-green-400))] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/impact:w-14"
                />
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-inv-2">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/*
        The pair, as the design has it: the process running wide on the left,
        co-innovation held in a narrower panel beside it.

        Seven to five of twelve, which is what puts five steps at about 135px
        each and four collaborators at 117px — the proportions the design uses.
        The split only happens at xl. Below 1280 the left panel drops under 600px
        and five steps start running to six lines apiece, so the two stack and
        each takes the full width instead.

        Both are panels now rather than bare sections, which is the change the
        placement actually needs: side by side, two blocks of loose content with
        no edges would read as one confused column.
      */}
      <section className="section-tight bg-surface">
        <div className="shell">
          <div className="grid items-stretch gap-5 xl:grid-cols-12">
            {/* How we innovate */}
            <Reveal className="xl:col-span-7">
              <div className="flex h-full flex-col rounded-[2rem] bg-white p-6 shadow-[0_1px_2px_rgba(10,21,51,.04),0_18px_44px_-30px_rgba(10,21,51,.26)] ring-1 ring-line md:p-8">
                <PanelHead
                  heading={labPage.process.heading}
                  accent={labPage.process.headingAccent}
                />

                {/*
                  Five steps on one track, joined by a rule that runs behind the
                  discs rather than between them — drawn once as a single line at
                  the discs' own centre height, so it cannot fall out of
                  alignment the way five separate connectors would. It only
                  appears from sm, where the five sit in a row; stacked, a
                  horizontal rule would join nothing.

                  Two rails, not one: a hairline that is always there, and a
                  brand-coloured one over it that scales in from the left when
                  the track arrives, so the process reads as being drawn through
                  the discs. The draw is keyed off `Reveal`'s own `is-revealed` —
                  see `.om-rail` in globals.css — rather than given a second
                  observer, and the Reveal it keys off is the panel's.
                */}
                <div className="relative mt-7 flex-1">
                  <span
                    aria-hidden="true"
                    className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-[linear-gradient(90deg,transparent,var(--color-line-strong),transparent)] sm:block"
                  />
                  <span
                    aria-hidden="true"
                    className="om-rail absolute top-7 right-[10%] left-[10%] hidden h-px origin-left bg-[linear-gradient(90deg,var(--color-navy-600),var(--color-sky-500)_50%,var(--color-green-500))] sm:block"
                  />
                  <ol className="relative grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-5 sm:gap-x-3">
                    {labPage.process.steps.map((step, i) => {
                      const tone = TONES[i % TONES.length];
                      return (
                        <Reveal
                          as="li"
                          key={step.title}
                          delay={i * 80}
                          className="group/step flex flex-col items-center gap-2.5 text-center"
                        >
                          {/* The disc answers the cursor twice: it grows, and a
                              ring of its own tone opens out behind it. Nothing
                              is hidden behind either, so these stay plain list
                              items — a step that only glows has no business
                              being a button. */}
                          <span className="relative flex h-14 w-14 items-center justify-center">
                            <span
                              aria-hidden="true"
                              className={`absolute inset-0 scale-90 rounded-full opacity-0 blur-md transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/step:scale-150 group-hover/step:opacity-45 motion-reduce:hidden ${tone.solid}`}
                            />
                            {/* Ringed in white, not surface: the panel under
                                these is white now, and the ring is what keeps
                                the rail from running visibly into the disc. */}
                            <span
                              className={`relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_24px_-12px_rgba(10,21,51,.5)] ring-4 ring-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/step:scale-110 motion-reduce:group-hover/step:scale-100 ${tone.solid}`}
                            >
                              <Icon
                                name={step.icon as IconName}
                                className="h-6 w-6"
                                strokeWidth={1.7}
                              />
                            </span>
                          </span>
                          {/* Ink, not the step's own tone. The disc above
                              already carries the colour, and five coloured
                              headings in a row read as five categories rather
                              than one sequence. */}
                          <h3 className="text-[0.875rem] leading-snug">
                            <span className={`tabular ${tone.text}`}>
                              {i + 1}.
                            </span>{" "}
                            {step.title}
                          </h3>
                          <p className="text-[0.8125rem] leading-relaxed text-ink-2">
                            {step.body}
                          </p>
                        </Reveal>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </Reveal>

            {/* Co-innovation is at our core */}
            <Reveal delay={140} className="xl:col-span-5">
              <div className="on-dark relative isolate flex h-full flex-col overflow-hidden rounded-[2rem] bg-abyss px-6 py-8 ring-1 ring-white/10 md:px-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_75%_at_50%_0%,rgba(1,164,255,.20),transparent_66%),radial-gradient(50%_60%_at_12%_100%,rgba(1,172,50,.14),transparent_70%)]"
                />

                <PanelHead heading={labPage.coInnovation.heading} onDark />

                <p className="mx-auto mt-3 max-w-md text-center text-[0.875rem] leading-relaxed text-ink-inv-2">
                  {labPage.coInnovation.body}
                </p>

                {/*
                  Four across even in the narrow panel, as the design has them,
                  divided by hairlines rather than spaced apart — at 117px a gap
                  wide enough to separate them would take a third of the column.
                  Two-up below sm, where four would leave 70px each.
                */}
                <ul className="mt-auto grid grid-cols-2 gap-y-7 pt-8 sm:grid-cols-4 sm:gap-y-0">
                  {labPage.coInnovation.partners.map((partner, i) => (
                    <Reveal
                      as="li"
                      key={partner.title}
                      delay={i * 70}
                      className={`group/item flex flex-col items-center gap-2.5 px-2 text-center sm:px-3 ${
                        i > 0 ? "sm:border-l sm:border-white/12" : ""
                      }`}
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full text-sky-400 ring-1 ring-white/20 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:scale-110 group-hover/item:text-white group-hover/item:ring-sky-400">
                        <Icon
                          name={partner.icon as IconName}
                          className="h-5 w-5"
                          strokeWidth={1.6}
                        />
                      </span>
                      <span className="text-[0.8125rem] leading-snug font-semibold text-white">
                        {partner.title}
                      </span>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/*
        The bar the page closes on.

        The Lab was the one page on the site with no ask of its own — a reader
        who had read the whole thing had nowhere to go but back to the header.
        It points at /contact rather than at an anchor, because there is no form
        on this page to jump to.
      */}
      <section className="ground-soft bg-surface py-10 md:py-12">
        <div className="shell">
          <Reveal className="flex flex-col items-start gap-5 rounded-[2rem] bg-[linear-gradient(100deg,#0a1533,#002583)] px-7 py-8 ring-1 ring-navy-800 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-9">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[1.375rem] leading-snug text-white md:text-[1.625rem]">
                {labPage.connect.heading}
              </h2>
              <p className="text-[0.9375rem] leading-relaxed text-ink-inv-2">
                {labPage.connect.body}
              </p>
            </div>
            <ButtonLink
              href={labPage.connect.href}
              tone="onDark"
              size="lg"
              icon="arrowRight"
              className="shrink-0"
            >
              {labPage.connect.cta}
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
