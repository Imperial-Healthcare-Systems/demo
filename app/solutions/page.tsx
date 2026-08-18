import type { Metadata } from "next";
import Image from "next/image";
import {
  deliveryLifecycle,
  disciplines,
  solutionDomains,
  solutionsPage,
} from "@/content/solutions";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { DarkSection, Eyebrow, SectionHeading } from "@/components/Section";
import { FlipCard, FlipHint } from "@/components/FlipCard";
import { cn } from "@/lib/utils";

/** Both faces share a shell, so the card keeps its shape through the turn. */
/*
  No `relative` here, deliberately. `FACE` is handed to `backClassName` too, and
  the back is positioned by `FlipCard` — a `relative` in this string used to
  outrank that and drop the back into flow below the front. `FlipCard` puts
  `relative` on the front face itself, which is all the plate below needs.

  `isolate` gives the face its own stacking context so the plate can sit on
  `-z-10` — behind the copy, still in front of the card's own background.
  `overflow-hidden` is what clips the plate to the rounded edge.
*/
const FACE =
  "isolate overflow-hidden rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line shadow-[0_1px_2px_rgba(10,21,51,.04)] " +
  "transition-shadow duration-300 group-hover/flip:shadow-[var(--shadow-card)]";

/*
  Badge and rule alternate navy / green down the grid, which is what the
  reference does and what the logo supports. Literal strings — Tailwind only
  generates class names it can find as text.
*/
const CARD_TONES = [
  {
    badge:
      "bg-navy-600 text-white shadow-[0_8px_18px_-8px_rgba(0,46,166,.7)] group-hover/flip:shadow-[0_12px_24px_-8px_rgba(0,46,166,.85)]",
    rule: "bg-[linear-gradient(90deg,var(--color-navy-600),var(--color-sky-500))]",
  },
  {
    badge:
      "bg-green-500 text-white shadow-[0_8px_18px_-8px_rgba(1,172,50,.7)] group-hover/flip:shadow-[0_12px_24px_-8px_rgba(1,172,50,.85)]",
    rule: "bg-[linear-gradient(90deg,var(--color-green-600),var(--color-green-400))]",
  },
];

/**
 * The three disciplines, one logo colour each: navy for strategy, sky for
 * architecture, green for what ships.
 *
 * Rebuilt for a dark ground. These cards used to sit on their own white band
 * below the hero; they are inside it now, so every value here changed — the
 * panel is a translucent white wash rather than white, the rules and blooms are
 * brighter to survive being read against near-black, and the labels take the
 * ramp's *light* end rather than the text-safe dark end they needed on white.
 *
 * `edge` is new and is what the reference draws: a coloured line along the
 * card's foot, one per discipline, which is what tells the three apart at a
 * glance before any of them is read.
 *
 * Nothing here moves on its own. Everything is behind hover or focus, plus the
 * scroll reveal the cards already had. Each card animates three things and no
 * more: the rule draws, the card lifts, the tile turns.
 *
 * Whole literal strings, because Tailwind only emits class names it can find
 * written out in the source.
 */
const DISCIPLINE_TONES = [
  {
    tile: "bg-[linear-gradient(140deg,var(--color-navy-500),var(--color-navy-700))] shadow-[0_10px_22px_-10px_rgba(0,46,166,.8)]",
    rule: "bg-[linear-gradient(90deg,var(--color-navy-400),var(--color-sky-500))]",
    edge: "bg-[linear-gradient(90deg,rgba(0,46,166,0),var(--color-navy-400)_45%,var(--color-sky-500))]",
    dot: "bg-sky-400",
    /* Decorative — the watermark takes the logo colour itself. */
    mark: "text-sky-400",
    /* Read as text on near-black, so it takes the ramp's light end. */
    label: "text-sky-400",
    bloom:
      "bg-[radial-gradient(62%_54%_at_14%_0%,rgba(1,110,255,.20),transparent_72%)]",
    hover:
      "hover:ring-sky-400/40 hover:shadow-[0_24px_50px_-26px_rgba(0,46,166,.9)]",
  },
  {
    tile: "bg-[linear-gradient(140deg,var(--color-sky-400),var(--color-sky-600))] shadow-[0_10px_22px_-10px_rgba(1,164,255,.8)]",
    rule: "bg-[linear-gradient(90deg,var(--color-sky-400),var(--color-green-400))]",
    edge: "bg-[linear-gradient(90deg,rgba(1,164,255,0),var(--color-sky-400)_45%,var(--color-sky-400))]",
    dot: "bg-sky-400",
    mark: "text-sky-400",
    label: "text-sky-400",
    bloom:
      "bg-[radial-gradient(62%_54%_at_14%_0%,rgba(1,164,255,.22),transparent_72%)]",
    hover:
      "hover:ring-sky-400/45 hover:shadow-[0_24px_50px_-26px_rgba(1,164,255,.8)]",
  },
  {
    tile: "bg-[linear-gradient(140deg,var(--color-green-400),var(--color-green-600))] shadow-[0_10px_22px_-10px_rgba(1,172,50,.8)]",
    rule: "bg-[linear-gradient(90deg,var(--color-green-400),var(--color-sky-400))]",
    edge: "bg-[linear-gradient(90deg,rgba(1,172,50,0),var(--color-green-400)_45%,var(--color-green-400))]",
    dot: "bg-green-400",
    mark: "text-green-400",
    label: "text-green-400",
    bloom:
      "bg-[radial-gradient(62%_54%_at_14%_0%,rgba(1,172,50,.20),transparent_72%)]",
    hover:
      "hover:ring-green-400/45 hover:shadow-[0_24px_50px_-26px_rgba(1,172,50,.75)]",
  },
];

export const metadata: Metadata = {
  title: "Solutions & Services",
  description:
    "Financial-domain advisory, enterprise architecture and specialized engineering across payment and rail infrastructure, digital banking channels, digital money and CBDC, open finance and digital value interoperability.",
  alternates: { canonical: "/solutions" },
};

/**
 * Solutions & Services.
 *
 * Rebuilt on the client's own page content — the triad of disciplines, the
 * functional domains, and the delivery lifecycle it closes on. The layout,
 * the plates and the flip cards are the ones this page already had; only the
 * words changed, which is what was asked for.
 *
 * The platforms used to be a section at the foot of this page. They are now
 * /solutions/platforms, so what sits here is a pointer to them rather than the
 * cards themselves — see the note on that band below. The old section is kept,
 * commented out, at the foot of this file.
 */
export default function SolutionsPage() {
  return (
    <>
      {/*
        The opening. The band artwork used to sit under the hero as a separate
        strip, which made the top of this page two blocks saying one thing —
        and it was that strip, plus the heading below it, that put the same
        three lines on screen twice. It is now the hero's own ground, with the
        copy on top of it, the way the dark headers elsewhere on the site work.

        `min-h` rather than a fixed aspect: the artwork is the ground, so its
        own proportions no longer decide the section's height — the copy does,
        and the floor only stops it collapsing on a wide, short viewport.

        Top-aligned, not centred, and that is what makes this read as the same
        page family as /advisory. Both open on 144px of padding and both start
        the breadcrumb there; centring inside a floor taller than the copy
        pushed it to 187px and pulled the trailing space in to match, so the
        block sat lower and tighter than every other inner page. The padding
        values are `PageHero`'s own — 28/14, 36/20 — for the same reason.

        The 51.5rem floor is set from /advisory, not from the artwork. That page
        runs 938px tall and leaves 258px under its buttons; this copy is two
        lines shorter, so 824px puts the same 258px under its own. Matching the
        gap rather than the height is what makes the two pages feel alike —
        copying 938 would have left this one visibly emptier at the foot.

        It happens to be the crop's best case too. The plate is 16:9 and
        `object-cover` cuts whichever axis overflows, so the taller the band the
        more survives: 76% of the picture at 1920 against 68% at the previous
        floor, and 57% at 2560 against 51%.
      */}
      {/*
        The opening, and the triad, as one block.

        They were two sections — a dark hero, then the three discipline cards on
        their own white band under it. The client's own design has them as one:
        the cards sit inside the dark, directly under the buttons, so the page
        opens on a single statement rather than a statement and then a separate
        row repeating its premise. That is also why the cards are drawn on a
        translucent wash rather than on white.

        `bg-abyss-2` is the section's own ground and it is load-bearing now.
        While the artwork filled the whole block there was nothing behind it to
        see; the artwork is the top of the section only, so everything under it
        would otherwise fall through to the page's white.

        Top-aligned, not centred, which is what makes this read as the same page
        family as /advisory: both open on 144px of padding and both start the
        breadcrumb there. The padding values are `PageHero`'s own — 28/14,
        36/20 — for the same reason. No `min-h` any more: the cards set the
        height, and a floor tuned to a copy-only block would only fight them.
      */}
      <section className="on-dark relative isolate flex flex-col overflow-hidden rounded-b-[2rem] bg-abyss-2 pt-28 pb-16 md:rounded-b-[3rem] md:pt-36 md:pb-20">
        {/*
          The artwork holds the top right, not the whole block.

          Full width was tried and it is the wrong shape twice over. The plate
          is 1536x1024; a full-width band across a section this tall is about
          2.1:1, so `object-cover` scales the picture to the width and throws
          away nearly a third of its height — the bank arrives cropped and
          enormous, its columns running behind the headline. At 64% of the
          width and 40rem tall the box is 1.44:1 against the plate's 1.50:1, so
          the crop is under four percent and the bank renders at a little over
          half size.

          Two masks intersected. The first fades the left, so the plate
          dissolves into `bg-abyss-2` before it reaches the copy rather than
          being covered by a veil there. The second fades the foot, so the
          artwork is gone well above the first card instead of showing through
          it.

          Below lg there is no room for a side-by-side, so the plate goes back
          to full width behind the copy and reads as texture — the veil under
          it runs 88-94% there, which is what keeps the words legible.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[26rem] [mask-image:linear-gradient(180deg,#000_52%,transparent_100%)] md:h-[32rem] lg:right-0 lg:left-auto lg:h-[40rem] lg:w-[64%] lg:[mask-composite:intersect] lg:[mask-image:linear-gradient(90deg,transparent_0%,#000_38%),linear-gradient(180deg,#000_58%,transparent_100%)]"
        >
          <Image
            src={solutionsPage.image}
            /* Decorative. It was the subject when it had a band of its own; as
               a ground behind the headline it adds nothing a screen reader
               needs, and the description would interrupt the copy it sits
               under. */
            alt=""
            fill
            priority
            sizes="100vw"
            quality={82}
            className="object-cover object-center"
          />
        </div>
        {/*
          Two veils, because one cannot do both jobs. The first runs across and
          is what the copy is legible against — heavy at the left where the
          words are, clearing by the middle so the bank and its rings still
          read. The second is a short fall to the section's foot, so the
          artwork meets the white band below it on a shoulder rather than a cut.
          Below `lg` the copy spans the full width, so the first turns vertical.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,13,34,.94)_0%,rgba(3,13,34,.88)_52%,rgba(3,13,34,.78)_100%)] lg:bg-[linear-gradient(100deg,#030d22_6%,rgba(3,13,34,.94)_32%,rgba(3,13,34,.55)_54%,rgba(3,13,34,.15)_74%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(3,13,34,.85)_0%,transparent_26%)]"
        />

        <div className="shell">
          {/*
            58px at lg, re-measured after the breadcrumb came off.

            The offset was 90 and every pixel of it cleared the trail plus put
            this page's eyebrow where /advisory's sits. With no trail on either
            page /advisory did not rise as far as this one did: it has an aside,
            and the grid bottom-aligns the copy against it with `items-end`, so
            its copy is positioned by the artwork's height rather than by the
            section's padding. That left it at 240 and this page at 182.

            58 is the difference, and it is held for the same reason the 90 was:
            the client wants these two pages to open alike, and this page cannot
            reproduce /advisory's alignment because its artwork is a background
            rather than a grid column.

            `lg:` only — /advisory's aside stacks below lg and its own copy
            starts at the padding there, which is where this one already is.
          */}
          <div className="flex max-w-2xl flex-col gap-5 lg:mt-[3.625rem]">
            <Reveal kind="fade">
              <Eyebrow onDark>{solutionsPage.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="h-display-2 text-white">
                {solutionsPage.headline.replace(
                  solutionsPage.headlineAccent,
                  "",
                )}
                <span className="text-brand-gradient-inv">
                  {solutionsPage.headlineAccent}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-[1.0625rem] leading-relaxed text-ink-inv-2 md:text-lg">
                {solutionsPage.intro}
              </p>
            </Reveal>
            <Reveal
              delay={180}
              className="mt-2 flex flex-wrap items-center gap-3"
            >
              <ButtonLink href="/contact" tone="onDark" icon="arrowRight">
                Talk to Our Experts
              </ButtonLink>
              <ButtonLink href="/solutions/platforms" tone="onDarkGhost">
                Explore Platforms
              </ButtonLink>
            </Reveal>
          </div>
          {/*
            The triad, inside the opening rather than under it. Advisory,
            architecture and engineering are one engagement in the client's
            telling — "we combine" — so they are three columns of one block,
            and they read as the proof of the sentence directly above them.

            No heading of its own: the hero carries it, and a second copy of
            the same three lines is exactly what this band used to hold.

            80px off the buttons at lg, and it had to be measured rather than
            left alone: merging the two sections took the gap to exactly 0 —
            the card row began on the pixel the button row ended — because the
            80px of hero padding and the 126px of band padding that used to
            separate them both went with the section boundary. 80 is the hero's
            own bottom padding, so the copy is spaced from the cards by what it
            used to be spaced from the band by. 56 and 64 below, where the row
            is stacked and a desktop gap reads as a hole.
          */}
          <ul className="mt-14 grid gap-5 md:mt-16 lg:mt-20 lg:grid-cols-3">
            {disciplines.map((d, i) => {
              const tone = DISCIPLINE_TONES[i];
              return (
                <Reveal
                  as="li"
                  key={d.id}
                  id={d.id}
                  delay={i * 80}
                  className="h-full"
                >
                  {/*
                    The hover treatment sits on this inner element, not on the
                    `Reveal` above it, and that is not tidiness — it is the only
                    place it works. `[data-js] [data-reveal]` in globals.css
                    declares `transition: opacity, transform` at specificity
                    (0,2,0), which outranks any single utility class on the same
                    element. A `transition-[…]` there is silently discarded and
                    the lift snaps instead of easing. Reveal owns the entrance;
                    this owns the hover; neither overwrites the other.
                  */}
                  <div
                    className={cn(
                      /*
                       An opaque panel, not a translucent wash. A 4% white
                       over the section let the artwork behind read straight
                       through the first two cards, and a card you can see a
                       building through is not a card. These two stops are
                       the section's own ground lifted a little, so the panel
                       still belongs to the block it sits in.
                    */
                      "group/disc relative isolate flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-[linear-gradient(180deg,#0c1c3e_0%,#091734_100%)] p-7 ring-1 ring-white/12 md:p-8",
                      /* `translate`, not `transform`. Tailwind v4 emits
                         translate, scale and rotate as their own CSS
                         properties, so a transition list naming only
                         `transform` animates none of them. Same trap the
                         buttons hit. */
                      "transition-[box-shadow,translate,--tw-ring-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      "hover:-translate-y-1 motion-reduce:hover:translate-y-0",
                      tone.hover,
                    )}
                  >
                    {/* The rule draws across the card's head on hover. It is the
                      one element that says "this card is live" without moving
                      anything the reader is trying to read. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        /* `transition-[scale]` for the same reason as the card's
                         `translate` — `scale-x-*` writes the `scale` property
                         in v4, which `transition-transform` alone would miss. */
                        "absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/disc:scale-x-100 motion-reduce:transition-none motion-reduce:group-hover/disc:scale-x-100",
                        tone.rule,
                      )}
                    />
                    {/* Colour washing in behind the head. No movement — it is
                      depth, not motion, so it costs nothing under reduced
                      motion and is left on there. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/disc:opacity-100",
                        tone.bloom,
                      )}
                    />
                    {/*
                    The index, as a watermark. Decorative: the heading names the
                    card, and a screen reader gains nothing from "01".

                    `top-6`, and it has to be positive. The card clips to its
                    rounded corner with `overflow-hidden`, so anything above its
                    top edge is cut — and the glyphs start higher than the box
                    they sit in: IBM Plex Mono's ascent and descent total 1.3em
                    against a 1em `leading-none`, so the ink overflows its own
                    72px line box by 11px at the top. At `-top-3` that put the
                    ink 23px past the edge and sliced the digits flat. 24px down
                    lands them 13px inside it.
                  */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute top-6 right-5 -z-10 font-mono text-[4.5rem] leading-none font-bold tabular-nums opacity-[0.13] transition-opacity duration-500 group-hover/disc:opacity-[0.22]",
                        tone.mark,
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        /* One arbitrary `transform` rather than `scale-110` plus a
                         transform — mixing the two in v4 means two properties
                         fighting over the same visual result. */
                        "flex h-12 w-12 items-center justify-center rounded-xl text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/disc:[transform:perspective(560px)_rotateY(-16deg)_scale(1.09)] motion-reduce:transition-none motion-reduce:group-hover/disc:transform-none",
                        tone.tile,
                      )}
                    >
                      <Icon
                        name={d.icon as never}
                        className="h-5 w-5"
                        strokeWidth={1.6}
                      />
                    </span>

                    <p
                      className={cn(
                        "mt-5 font-mono text-[0.6875rem] tracking-[0.16em] uppercase",
                        tone.label,
                      )}
                    >
                      {d.tag}
                    </p>
                    <h3 className="mt-2 text-[1.25rem] leading-snug text-white">
                      {d.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-inv-2">
                      {d.body}
                    </p>

                    {/* The four lines each discipline actually covers. Divided
                      rather than bulleted — they are peers, not a sequence. The
                      markers carry the card's colour so the list belongs to it
                      rather than to the page. */}
                    <ul className="mt-6 flex flex-col border-t border-white/10">
                      {d.points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2.5 border-b border-white/10 py-2.5 text-[0.875rem] leading-snug text-ink-inv-2 last:border-b-0"
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                              tone.dot,
                            )}
                          />
                          {p}
                        </li>
                      ))}
                    </ul>

                    {/* The coloured foot. It is what tells the three apart
                        before any of them is read, and on a dark ground it
                        does the job the white panel's own edge used to do. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 bottom-0 h-[3px]",
                        tone.edge,
                      )}
                    />
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Functional solution domains */}
      <section id="solution-areas" className="section bg-surface">
        <div className="shell">
          {/* No eyebrow and no intro. "Functional Solution Domains" was the
              eyebrow above "Where we build"; the client has promoted it to the
              heading, so leaving it in both places would print it twice. */}
          <SectionHeading
            title="Functional Solution Domains"
            className="mb-14"
          />

          {/*
            Each card turns over: the front states the domain, the back carries
            what it covers and the way in. Five cards in a three-up grid leaves
            a gap in the second row, which the closing card fills rather than
            leaving as a hole.
          */}
          <ul className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutionDomains.map((domain, i) => {
              const tone = CARD_TONES[i % CARD_TONES.length];
              return (
                <Reveal
                  as="li"
                  key={domain.id}
                  id={domain.id}
                  delay={i * 70}
                  className="flex h-full flex-col gap-3"
                >
                  <FlipCard
                    label={domain.title}
                    /* The card is sized by its copy, not by the plate — the
                       reference cards are wide and shallow, roughly 3:2. This
                       floor only keeps the shortest card from collapsing below
                       the others; `auto-rows-fr` equalises the rest. */
                    minHeight="min-h-[14.5rem]"
                    className="flex-1"
                    faceClassName={FACE}
                    backClassName={cn(
                      FACE,
                      "bg-[linear-gradient(160deg,#0a1533,#002583)] ring-navy-800",
                    )}
                    front={
                      <>
                        {/*
                          The plate, and the wedge it stands on.

                          The plate's ground is a pale grey-blue, not the card's
                          white, so pasting it flat would read as a rectangle
                          dropped on the card. The reference solves this by
                          cutting the right-hand side of the card on a diagonal
                          and letting the plate live inside that band — so the
                          ground stops being an accident and becomes part of the
                          design. The wedge is that band; the plate then only
                          needs a soft corner mask to lose its own straight edges.

                          Decorative: `alt=""` and `aria-hidden`, because the
                          heading beside it already names the thing.

                          `sizes` is the width it actually paints at — about
                          190px — not a viewport fraction. The source files are
                          1.6MB PNGs; this is what keeps the delivered asset in
                          the tens of kilobytes.
                        */}
                        {domain.image && (
                          <>
                            <span
                              aria-hidden="true"
                              /* Full-bleed on purpose. Boxing this to the right
                                 64% put a straight vertical element edge down the
                                 card — the gradient had already ramped in by the
                                 time it reached the box's own left boundary, so
                                 the boundary showed. Spanning the whole face
                                 leaves the gradient as the only edge there is. */
                              className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(152deg,transparent_48%,rgba(226,236,249,.6)_92%)]"
                            />
                            <Image
                              src={domain.image}
                              alt=""
                              aria-hidden="true"
                              width={420}
                              height={420}
                              sizes="200px"
                              quality={72}
                              /*
                                Two edges of this square sit inside the card — the
                                top and the left — and both are plain ground, so
                                both read as a ruled line. The other two are the
                                card's own right and bottom, where `overflow-hidden`
                                turns the same ground into a bleed.

                                So: fade exactly those two, each over the ~22% of
                                ground that sits outside the artwork, and composite
                                the pair with `intersect` so a pixel survives only
                                where both say so. A corner-anchored radial cannot
                                do this — the plate's top edge is nearer that corner
                                than the artwork's own top corner is, so any radial
                                soft enough to kill the edge washes out the subject.

                                Tinting the card to match the ground was the other
                                option, and it fails on the evidence: plate 1's
                                ground is rgb(216,226,253) and the rest are around
                                rgb(240,244,249), so one tint cannot serve six.
                              */
                              className="pointer-events-none absolute right-0 -bottom-1 -z-10 w-[48%] max-w-[11.5rem] select-none [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_24%),linear-gradient(to_right,transparent_0%,#000_22%)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:scale-[1.07] motion-reduce:transition-none"
                            />
                          </>
                        )}

                        <span
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:scale-110 group-hover/flip:[transform:perspective(520px)_rotateY(-14deg)]",
                            tone.badge,
                          )}
                        >
                          <Icon
                            name={domain.icon as never}
                            className="h-5 w-5"
                            strokeWidth={1.6}
                          />
                        </span>

                        <p className="mt-4 font-mono text-[0.625rem] tracking-[0.16em] text-navy-600 uppercase">
                          {domain.tag}
                        </p>

                        {/*
                          The front names the domain; the back explains it. The
                          description used to sit on both faces, so turning a
                          card re-read the reader the paragraph they had just
                          finished and the flip bought them only the tags.

                          With it gone the title is the front's subject rather
                          than its caption, so it takes the size and the width
                          the paragraph was using — 1.125rem across 62%, which
                          is still clear of the plate in the bottom-right.
                        */}
                        <h3 className="mt-1.5 max-w-[62%] text-[1.125rem] leading-snug">
                          {domain.title}
                        </h3>

                        <span
                          aria-hidden="true"
                          className={cn(
                            "mt-3 block h-[3px] w-7 rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:w-12",
                            tone.rule,
                          )}
                        />

                        <FlipHint />
                      </>
                    }
                    back={
                      <>
                        <p className="font-mono text-[0.625rem] tracking-[0.18em] text-sky-400 uppercase">
                          {domain.title}
                        </p>
                        <ul className="mt-3.5 flex flex-wrap gap-1.5">
                          {domain.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-ink-inv-2 uppercase ring-1 ring-white/20"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-inv-2">
                          {domain.body}
                        </p>
                      </>
                    }
                  />

                  {/*
                    The card's own way in, which the source page gives every
                    domain as a full-width button at the card's foot.

                    Outside the FlipCard, not inside it. `FlipCard` is a real
                    `<button>`, and a link nested in a button is invalid HTML —
                    browsers disagree about which one a click activates, and a
                    keyboard user gets one stop where there are two controls.
                    Sitting it below keeps both operable and keeps the card a
                    single, honest flip control.
                  */}
                  <ButtonLink
                    href={domain.cta.href}
                    tone="secondary"
                    size="sm"
                    icon="arrowRight"
                    className="w-full"
                  >
                    {domain.cta.label}
                  </ButtonLink>
                </Reveal>
              );
            })}

            {/*
              The sixth cell, left empty on purpose.

              Five cards in a three-up grid leave one gap, and the client wants
              it held rather than filled — a placeholder for the domain that
              goes there next. It is a plain outline, no copy and no control,
              `aria-hidden` because there is nothing in it to announce.

              Hidden on a single column, where it would be a blank box under the
              last card rather than a gap in a row. It only appears from `sm`,
              which is where the grid starts leaving one.

              Note what left with it: this cell used to carry the pointer to
              Proprietary Platforms. That is now reachable from the masthead's
              "Explore Platforms" button, the header menu and the footer, so no
              route is orphaned — but it is one fewer way in from this section.
            */}
            <li
              aria-hidden="true"
              className="hidden rounded-[var(--radius-card)] border border-dashed border-line-strong/50 bg-white/30 sm:block"
            />
          </ul>
        </div>
      </section>

      {/*
        Delivery lifecycle — where the client's page stops, and so does this one.

        Four steps on one rule. The rule is the point: these are a sequence, not
        four things, and the numbering alone did not say so. It draws only from
        `md` up, where the steps are actually side by side; stacked, each step's
        own number does the work.
      */}
      <DarkSection id="delivery-lifecycle">
        <div className="shell section">
          <div className="flex max-w-3xl flex-col gap-5">
            <Eyebrow onDark>{deliveryLifecycle.eyebrow}</Eyebrow>
            <h2 className="h-display-2 text-white">
              {deliveryLifecycle.headline}
            </h2>
          </div>

          <ol className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-[3.25rem] right-0 left-0 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.18)_12%,rgba(255,255,255,.18)_88%,transparent)] lg:block"
            />
            {deliveryLifecycle.steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.num}
                delay={i * 90}
                className="relative flex flex-col rounded-[var(--radius-card)] bg-white/[0.04] p-6 ring-1 ring-white/10 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07] md:p-7"
              >
                <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-sky-400 uppercase">
                  {step.num} / {step.phase}
                </p>
                <h3 className="mt-3 text-[1.0625rem] leading-snug text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-ink-inv-2">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </DarkSection>
    </>
  );
}

/* ==========================================================================
   SUPERSEDED — the previous Solution areas and Platform ecosystem sections.
   ==========================================================================

   Kept rather than deleted, at the client's instruction. Restoring any of it
   means restoring the matching data too — see the commented block at the foot
   of content/solutions.ts — and re-adding the `platforms`, `platformsPage` and
   `solutions` imports, plus `ComingSoonChip`.

      {/* Solution areas *\/}
      <section id="solution-areas" className="section ground-soft bg-canvas">
        <div className="shell">
          <SectionHeading
            eyebrow="Six solution areas"
            title="Where we build"
            intro="Each area pairs domain practitioners with engineers, so the recommendation and the implementation come from the same team."
            className="mb-14"
          />
          ... six FlipCards over `solutions`, identical to the five above but
          without the tag line and the back-face button ...
        </div>
      </section>

      {/* Platform ecosystem — the destination for every /solutions#platforms link *\/}
      <DarkSection>
        <div id="platforms" className="shell section">
          <div className="flex max-w-3xl flex-col gap-5">
            <Eyebrow onDark>{platformsPage.eyebrow}</Eyebrow>
            <h2 className="h-display-2 text-white">{platformsPage.headline}</h2>
            <p className="text-[1.0625rem] leading-relaxed text-ink-inv-2">
              {platformsPage.blurb}
            </p>
          </div>

          ... two cards over `platforms` (Interoperability Fabric™ and
          Cross-Border Bridge™), each with a ComingSoonChip beside the title;
          then the "Also from OrbisMoneta" pointer at Digital Currency Hub™;
          then the #architecture split with platformsPage.architecture.image ...
        </div>
      </DarkSection>

   ========================================================================== */
