import type { Metadata } from "next";
import { labPage } from "@/content/about";
import { coreCapabilities } from "@/content/capabilities";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icon";
import Image from "next/image";
import { FlipCard, FlipHint } from "@/components/FlipCard";
import { PointerSpotlight } from "@/components/PointerSpotlight";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";

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
 * The same shell for the Enterprise Impact cards, which turn over on a dark
 * section rather than a light one.
 *
 * Separate from `FACE` rather than parameterised: that one carries a white
 * card's radius, padding and drop shadow, and every one of the three is wrong
 * here — these are larger cards on near-black, where a shadow reads as nothing
 * and the padding has to match what the section already had.
 */
const IMPACT_FACE =
  "isolate overflow-hidden rounded-[var(--radius-card)] p-6 ring-1 transition-shadow duration-300 md:p-7";

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

        The render is 1400x700 and drawn out to its own edges. A seven-of-twelve
        column gives it 721px on a 1920 screen, so it is painted at about half
        size: its labels hold at desktop widths and fall to texture on a phone.
        Nothing depends on reading them — five of the six fields they name are
        named again, in text, by "What we explore" directly below.

        Nothing is cropped. The plate keeps its own ratio, and it is no longer
        laid on this section but blended into it — see the plate itself.
      */}
      <section className="on-dark relative isolate flex min-h-svh flex-col overflow-hidden rounded-b-[2rem] bg-abyss pt-16 pb-6 md:rounded-b-[3rem] md:pt-20 md:pb-7">
        <div
          aria-hidden="true"
          /*
            Four lights, and two of them are under the plate.

            It used to be two, both on the left, on the reasoning that the
            render brought its own light and anything behind it would wash it
            out. That holds while the render is laid on top of the section. It
            is blended into it now — see the plate below — so its dark field is
            gone and whatever is painted here shows through the artwork itself.
            The third light is the pool the bulb stands in, centred where the
            bulb is; the fourth is a green echo at the lower right, under the
            node the artwork draws in green. Both are wide and low — .13 and .10
            — so they read as the section's own light reaching the drawing,
            rather than as a glow drawn around it.
          */
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_65%_at_22%_16%,rgba(1,164,255,.16),transparent_64%),radial-gradient(45%_55%_at_10%_95%,rgba(1,172,50,.12),transparent_66%),radial-gradient(44%_58%_at_66%_46%,rgba(1,164,255,.13),transparent_70%),radial-gradient(26%_34%_at_86%_74%,rgba(1,172,50,.10),transparent_72%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:radial-gradient(70%_60%_at_60%_10%,#000,transparent)]"
        />

        <div className="shell flex flex-1 flex-col justify-center">
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
              Blended into the section rather than laid on top of it.

              `mix-blend-mode: lighten` keeps, channel by channel, whichever of
              the plate and the masthead behind it is the brighter. This render
              is glow-on-black — 43.6% of its pixels are darker than the ground
              it sits on — so its field drops out and what is left is the bulb,
              the rails, the six nodes and their labels, sitting on the
              section's own light with nothing between.

              That is the whole of the rectangle problem, gone at the cause. The
              plate's own black measured 10 levels below the masthead's blue
              down both sides — (0,3,25) against (2,14,36) — and a 10-level step
              held dead straight for 360px is what the eye reads as a pasted-on
              raster. It cannot be feathered away, because the artwork runs to
              within 3.5% of its own right edge and the fade would take the
              labels with it. With no field there is no step to feather.

              The blend is on this wrapper and not on the image, deliberately.
              `Reveal` animates opacity and transform and both create a stacking
              context while the transition runs, which isolates any blend
              applied inside them — the plate would come in as a rectangle and
              snap flat when the animation finished. Applied from out here it
              blends whatever the reveal is doing at the time, so the entrance
              is a fade up out of the section's own ground.
            */}
            <div className="relative lg:col-span-6 xl:col-span-7 [mix-blend-mode:lighten]">
              <Reveal delay={220} kind="right">
                {/*
                  The feather is measured off the artwork, and it can be
                  generous now that it is only tidying stray texture rather than
                  hiding an edge.

                  Scanning for sustained lit content — six or more bright pixels
                  holding across four consecutive rows or columns — the drawing
                  starts 5.07% from the left, 3.50% from the right, 8.71% from
                  the top and 13.71% from the bottom. Everything outside those
                  is single stray dots of background texture. The holds sit
                  inside all four, at 4.5%, 3%, 7% and 10%, so no label is
                  touched and the terrain at the foot dissolves into the section
                  instead of stopping on a line.
                */}
                <Image
                  src="/images/innovation-lab.webp"
                  alt="A lightbulb with a circuit-board filament on a lit disc, linked out to six fields — digital money, tokenized finance and open finance on one side, programmable money, AI and intelligent finance and emerging infrastructure on the other"
                  width={1400}
                  height={700}
                  priority
                  quality={86}
                  sizes="(min-width: 1280px) 46vw, (min-width: 1024px) 48vw, 92vw"
                  className="h-auto w-full select-none [mask-composite:intersect] [mask-image:linear-gradient(180deg,transparent_0%,#000_7%,#000_90%,transparent_100%),linear-gradient(90deg,transparent_0%,#000_4.5%,#000_97%,transparent_100%)]"
                />
              </Reveal>
            </div>
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

          {/*
            Core capabilities, inside the masthead rather than under it.

            It was its own <section> below this one, which made it a band
            between two sections — two things where the client wanted one. As
            the last child of the masthead it becomes the foot of this panel:
            the section is `flex-col` with the shell above it on `flex-1`, so
            this sits on the bottom edge whatever the viewport height.

            The negative bottom margin cancels the section's own `pb`, so the
            strip meets the rounded bottom corner exactly. `overflow-hidden` on
            the section is what clips it to that radius — the strip needs no
            radius of its own and must not have one, or the two curves fight.

            Outside the `.shell` on purpose: this runs the full width of the
            panel, edge to edge, while everything above it is held to the
            centred measure.
          */}
          <div
            id="core-capabilities"
            className="mt-10 -mb-6 bg-[linear-gradient(90deg,var(--color-navy-800)_0%,var(--color-navy-600)_50%,var(--color-navy-800)_100%)] py-5 md:-mb-7 md:py-6"
          >
            <div className="flex flex-col gap-3 pl-5 sm:flex-row sm:items-center sm:gap-6 md:pl-8 xl:pl-10">
              <p className="shrink-0 font-mono text-[0.9375rem] font-semibold tracking-[0.14em] text-green-400 uppercase md:text-[1.0625rem]">
                {coreCapabilities.lead}
              </p>
              <span
                aria-hidden="true"
                className="hidden h-5 w-px shrink-0 bg-white/25 sm:block"
              />
              {/*
                Right to left, like every other ticker on the site — the client
                asked for it and they are right: a strip that travels the other
                way reads as running backwards, because text is read in the
                direction this one now moves.

                Slower than About's 38s, which is the whole difference between
                the two now. That is enough: they sit on different pages, on
                different grounds, and matching their direction costs nothing
                that mattered.
              */}
              <Marquee
                items={coreCapabilities.items}
                duration={46}
                copies={4}
                onDark
                itemClassName="text-white"
                className="min-w-0 flex-1"
              />
            </div>
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
                        <span className="font-mono text-[0.75rem] md:text-[0.625rem] tracking-[0.16em] text-white/55 uppercase">
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
              <p className="font-mono text-[0.75rem] md:text-[0.6875rem] tracking-[0.18em] text-sky-400 uppercase">
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

            They turn over now, at the client's request: the front carries the
            numeral and the name, and the sentence that used to sit under them
            is on the back. `FlipCard` is the same component the exploration
            cards above use, so all the interaction comes with it — hover on a
            pointer, tap on a touchscreen, Enter or Space from the keyboard, one
            face exposed to assistive technology at a time, and a cross-fade
            instead of a rotation under reduced motion.
          */}
          <ol className="mt-12 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {labPage.impact.items.map((item, i) => (
              <Reveal as="li" key={item.num} delay={i * 70} className="h-full">
                <FlipCard
                  label={item.title}
                  /* Click, and click alone. These six are read rather than
                     scanned, so a card has to stay open once it is opened —
                     on hover it shut again the moment the pointer moved off,
                     which made the sentence on the back unreadable. */
                  clickOnly
                  minHeight="min-h-[13.5rem]"
                  className="h-full group-hover/flip:shadow-[0_18px_38px_-18px_rgba(1,164,255,.55)]"
                  faceClassName={`${IMPACT_FACE} ring-white/10`}
                  backClassName={`${IMPACT_FACE} bg-[linear-gradient(160deg,#0a1533,#0086d6)] ring-sky-600/70`}
                  front={
                    <>
                      {/*
                        The card's own plate, behind everything else on the
                        front.

                        `object-cover` on a box about 408x216 against a 3:2
                        source, so it crops the sides a little — these are
                        atmospheric rather than diagrammatic, and nothing in
                        them has to survive intact the way a labelled banner
                        would. It drifts on hover, so the card is already moving
                        before it turns.
                      */}
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                        quality={78}
                        className="-z-20 object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover/flip:scale-100"
                      />
                      {/*
                        The scrim, and every stop in it is measured rather
                        than picked.

                        These plates carry lit screens and glowing nodes, so
                        white type over them unguarded lands wherever the
                        picture happens to be bright. It started at
                        .62/.86/.95, which put the type at 15.5:1 against the
                        worst pixel behind it — more than three times the 4.5
                        AA asks for, and paid for by burying the artwork the
                        client supplied. These stops hold the same type well
                        clear of the floor and let the picture through.

                        Weighted to the foot either way: lightest at the top
                        where the numeral sits over each plate's own dark sky,
                        heaviest under the name, the rule and the hint.
                      */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,13,34,.30)_0%,rgba(3,13,34,.62)_44%,rgba(3,13,34,.84)_100%)]"
                      />

                      {/* Draws across the card's head on hover, the same
                          gesture the disciplines on /solutions use. Under
                          reduced motion it is simply already drawn. */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-green-400))] transition-[scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:scale-x-100 motion-reduce:transition-none motion-reduce:group-hover/flip:scale-x-100"
                      />
                      {/* Colour washing in behind the head — depth, not
                          movement, so it costs nothing under reduced motion. */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(62%_54%_at_14%_0%,rgba(1,164,255,.22),transparent_72%)] opacity-0 transition-opacity duration-500 group-hover/flip:opacity-100"
                      />

                      <span className="flex items-center justify-between gap-3">
                        {/*
                          `leading-[1.4]`, and it is load-bearing.

                          `text-brand-gradient-inv` paints through
                          `background-clip: text` with `background-size: auto`,
                          so the gradient only covers the element's own box. At
                          `leading-none` that box was 28px tall while the glyphs
                          measured 37 — 5px of each numeral above it and 4px
                          below fell outside the painted area and, with
                          `-webkit-text-fill-color: transparent` under them,
                          rendered as nothing at all. The tops looked sliced
                          off. 1.4 gives the box 39px, which contains the ink
                          with room to spare.
                        */}
                        <span className="text-brand-gradient-inv font-mono text-[2.125rem] leading-[1.4] font-bold tabular-nums transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover/flip:translate-y-0">
                          {item.num}
                        </span>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/8 text-sky-400 ring-1 ring-white/15 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:bg-sky-500 group-hover/flip:text-white group-hover/flip:ring-sky-500 group-hover/flip:[transform:perspective(520px)_rotateY(-16deg)_scale(1.08)] motion-reduce:transition-none motion-reduce:group-hover/flip:transform-none">
                          <Icon
                            name={item.icon as IconName}
                            className="h-5 w-5"
                            strokeWidth={1.6}
                          />
                        </span>
                      </span>

                      <h3 className="mt-4 text-[1.125rem] leading-snug text-white">
                        {item.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-2.5 block h-[2px] w-8 rounded-full bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-green-400))] transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:w-14"
                      />

                      <FlipHint onDark />
                    </>
                  }
                  back={
                    <span className="on-dark flex h-full flex-col">
                      <span className="flex items-baseline gap-2.5">
                        <span className="font-mono text-[1.125rem] leading-none font-bold text-white/60 tabular-nums">
                          {item.num}
                        </span>
                        <span className="font-mono text-[0.75rem] md:text-[0.625rem] tracking-[0.16em] text-white/55 uppercase">
                          {item.title}
                        </span>
                      </span>
                      <span className="mt-3 text-[0.875rem] leading-relaxed text-white">
                        {item.body}
                      </span>
                      <FlipHint onDark />
                    </span>
                  }
                />
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/*
        Co-innovation, in one column rather than two panels side by side.

        The client's design pairs them — the process wide on the left, a
        narrower co-innovation panel beside it — but the two are not siblings:
        one states what the Lab believes, the other is how it acts on that
        belief. Set side by side they read as alternatives. Stacked, with the
        belief as the section's own heading, the process below is read as the
        answer to it, which is the order asked for.

        It also hands the five steps the whole shell instead of seven twelfths
        of it — about 230px a step rather than 135px, which is what stops the
        longer bodies running to five and six lines each.
      */}
      <section className="section-tight bg-surface">
        <div className="shell">
          <Reveal>
            <SectionHead
              heading={labPage.coInnovation.heading}
              accent={labPage.coInnovation.headingAccent}
              intro={labPage.coInnovation.body}
            />
          </Reveal>

          {/*
            The five steps, with no title of their own.

            "How we innovate" sat above them and came off at the client's
            request. The section heading directly above already says what this
            is, and the track reads as a sequence without being announced — the
            numerals and the rail do that work. `labPage.process.heading` and
            `headingAccent` stay in content/about.ts, unrendered.
          */}
          <Reveal className="mt-11 md:mt-12">
            <div className="rounded-[2rem] bg-white p-6 shadow-[0_1px_2px_rgba(10,21,51,.04),0_18px_44px_-30px_rgba(10,21,51,.26)] ring-1 ring-line md:p-8">
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
              <div className="relative">
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
        </div>
      </section>

      {/*
        The band the page closes on.

        The Lab had no ask of its own — a reader who had read the whole thing
        had nowhere to go but back to the header. This is the client's own
        closing block, and it is deliberately the last dark surface on a page
        that has alternated light and dark throughout: a finish, not another
        content band.

        Centred rather than the split bar this replaced. A split bar reads as a
        row of page furniture; a centred stack with one action reads as the end
        of a document, which is what it is.

        It is meant to read as the top of the footer rather than as a band
        above it — same ground, same light, no line between them — while
        staying a section of the page, with its own heading and its own ask.
        The two elements below are what make that true; see the note on each.
      */}
      <section className="on-dark relative isolate overflow-hidden bg-abyss py-20 md:py-24">
        {/*
          The band's own light, at the top: a soft blue arc behind the eyebrow
          and the headline, which is what lifts the middle of the block.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_78%_at_50%_0%,rgba(1,164,255,.14),transparent_62%)]"
        />
        {/*
          The footer's light, continued upward — and every number in it is the
          footer's own, converted into this box's coordinates rather than
          guessed.

          `.surface-deep` in globals.css lights the footer with
          `radial-gradient(120% 90% at 78% 8%, rgba(1,164,255,.16), transparent
          58%)` and a green counterpart at `12% 92%`. Because those are
          percentages of the *footer's* box, the wash begins exactly at the
          footer's top edge — so this band, sitting directly above it on flat
          `bg-abyss`, met it on a line. Measured across the seam that step was
          nothing at all on the left and 58 levels on the right, which is
          precisely the shape of the glow that was missing.

          Both gradients below place the footer's own centres at their true
          positions relative to this box: 78% across and just below this band's
          foot, which is about where 8% of the footer's height lands, and the
          green one 34rem below that. Their sizes are the footer's, in pixels,
          for the same reason.

          It cannot be exact, and that is worth being honest about: the
          footer's centre is 8% of *its* height, which changes as its columns
          reflow, while this band can only offer a fixed offset. So a residual
          remains. Measured as the summed RGB step across the boundary it is 6
          at 390, 4 at 768, 13 at 1440 and 15 at 1920 — against 58 before any
          of this, and against a step of 0 on the left half at every width.
          Thirteen summed across three channels is four levels each, spread
          over a soft gradient rather than falling on a hard line, which is
          under what the eye resolves as an edge.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_560px_at_78%_calc(100%+1.5rem),rgba(1,164,255,.17),transparent_60%),radial-gradient(90%_412px_at_12%_calc(100%+34rem),rgba(1,172,50,.12),transparent_62%)]"
        />

        <div className="shell">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <Reveal kind="fade">
              {/* The client's `.section-tag.emerald`, in the site's own green
                  rather than theirs. It is a label, not a control — no href,
                  nothing to click. */}
              <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3.5 py-1.5 font-mono text-[0.75rem] md:text-[0.6875rem] tracking-[0.16em] text-green-400 uppercase">
                {labPage.connect.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h2 className="h-display-3 text-white">
                {labPage.connect.heading}
              </h2>
            </Reveal>

            <Reveal delay={120}>
              {/* Sky, and it is the only coloured line in the block. The
                  headline is white and the body is muted, so this is what
                  carries the eye from one to the other. */}
              <p className="text-[1.0625rem] leading-snug font-semibold text-sky-400 md:text-[1.1875rem]">
                {labPage.connect.subhead}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-inv-2 md:text-[1rem]">
                {labPage.connect.body}
              </p>
            </Reveal>

            {/*
              One action. `onDark` is white on navy, which is this site's own
              accent against a dark ground — the same button the /solutions
              opening and the Digital Currency Hub use — rather than the green
              the client's HTML has, which appears nowhere else here.

              `lg` is 56px tall, well past the 44px a touch target needs.
            */}
            <Reveal delay={240} className="mt-3">
              <ButtonLink
                href={labPage.connect.href}
                tone="onDark"
                size="lg"
                icon="arrowRight"
              >
                {labPage.connect.cta}
              </ButtonLink>
            </Reveal>

            {/*
              The design closes on "Contact: contact@orbismoneta.com |
              www.orbismoneta.com". Two changes.

              The address is `site.email` rather than the one in the HTML: the
              client's instruction is that the site uses info@ throughout, and a
              second address here would be the one place it disagreed with the
              footer, the contact page and every mailto on the site.

              The www link is dropped. It points at this site, from this site.
            */}
            <Reveal delay={300}>
              <p className="mt-1 font-mono text-[0.75rem] tracking-[0.04em] text-ink-inv-3">
                Contact:{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-sky-400 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {site.email}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
