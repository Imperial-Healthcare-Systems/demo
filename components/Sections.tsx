import Image from "next/image";
import {
  closingCta,
  futureOfMoney,
  industryContext,
  platformPoster,
  proposition,
  whyOrbisMoneta,
} from "@/content/home";
import { engagementModel } from "@/content/industries";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icon";
import { IndustryCarousel } from "@/components/IndustryCarousel";
import { Reveal } from "@/components/Reveal";
import { DarkSection, Eyebrow, SectionHeading } from "@/components/Section";

/* ------------------------------------------------------------------ context */

export function IndustryContext() {
  const [lead, accent] = industryContext.headline.split(industryContext.headlineAccent);

  return (
    /*
      `section-tight` rather than `section`: 88px of vertical padding at 1440
      instead of 128. The full measure is right for a band of stacked text; this
      one is a two-column split whose height is set by the artwork, and the extra
      40px at each end only pushed a 1057px section further past the fold.
    */
    <section className="section-tight relative isolate overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f6fc_55%,#eef1f9_100%)]">
      {/* Same aurora and contour language as the sub-page heroes, so the home
          page and the rest of the site read as one system rather than two. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_82%_22%,rgba(1,164,255,.12),transparent_64%),radial-gradient(40%_50%_at_8%_88%,rgba(1,172,50,.07),transparent_68%)]"
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-48 -z-10 hidden h-[42rem] w-[42rem] text-navy-600/[0.05] xl:block"
        viewBox="0 0 600 600"
        fill="none"
      >
        {[170, 240, 310].map((r) => (
          <circle key={r} cx="300" cy="300" r={r} stroke="currentColor" strokeWidth="1" />
        ))}
      </svg>
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-4">
          {/* Copy */}
          <div className="flex flex-col lg:col-span-6 xl:col-span-5">
            <Reveal kind="fade">
              <Eyebrow>{industryContext.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={60}>
              <h2 className="mt-5 text-[2rem] leading-[1.04] font-semibold tracking-[-0.038em] text-ink md:text-[2.5rem] xl:text-[2.875rem]">
                {lead}
                <span className="text-brand-gradient">{industryContext.headlineAccent}</span>
                {accent}
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <span
                aria-hidden="true"
                className="mt-6 block h-1 w-[5.5rem] rounded-full bg-[linear-gradient(90deg,#01a4ff,#01ac32)]"
              />
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-lg text-[0.9375rem] leading-relaxed text-ink-2 md:text-[1.0625rem]">
                {industryContext.body[0]}
              </p>
            </Reveal>

            {/*
              The four shifts as live text. They are also lettered into the globe
              artwork alongside, but baked pixels are not selectable, do not
              reflow and are invisible to a screen reader — so the words exist
              here, and the artwork reinforces them.

              Hairline rules between them rather than plain spacing: at this size
              four icon-and-label pairs in a row read as one run-on strip, and the
              rules are what separate them into four things.
            */}
            <Reveal delay={220}>
              {/*
                Four across with rules between them from xl, a 2×2 grid below it.

                The single row needs about 484px and the copy column is 491px at
                1280 and 517px from 1440 — so it fits from xl and does not at lg,
                where the column drops to 464px. Letting it wrap instead would put
                a divider at the start of the second line, a rule with nothing to
                its left, which is worse than a grid. The breakpoint is measured
                rather than guessed: this is the width at which the fourth item
                stops fitting.
              */}
              <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-4 xl:flex xl:items-center xl:gap-0">
                {industryContext.shifts.map((shift, i) => (
                  <li key={shift.label} className="flex items-center">
                    {i > 0 && (
                      <span aria-hidden="true" className="mx-2.5 hidden h-7 w-px bg-line xl:block" />
                    )}
                    <span className="group/shift flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-600 ring-1 ring-navy-100 transition-colors duration-200 group-hover/shift:bg-navy-600 group-hover/shift:text-white group-hover/shift:ring-navy-600">
                        <Icon name={shift.icon as IconName} className="h-4 w-4" strokeWidth={1.7} />
                      </span>
                      <span className="text-[0.8125rem] font-medium whitespace-nowrap text-ink">
                        {shift.label}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Closing statement, given the weight of a card because it is the
                only line in the section that says what OrbisMoneta does. The
                brand bar down its left edge is what marks it as the conclusion
                rather than a fourth paragraph. */}
            <Reveal delay={280}>
              <div className="mt-9 flex items-start gap-5 rounded-[var(--radius-card)] border-l-[3px] border-navy-600 bg-white/85 p-6 shadow-[0_18px_44px_-28px_rgba(10,21,51,.4)] ring-1 ring-line backdrop-blur-sm">
                {/*
                  An icon, not the mark. The logo sat here for one message and
                  was wrong for a reason worth recording: the sentence beside it
                  already opens with the word "OrbisMoneta", so the mark was the
                  brand name printed twice in a row, once as a picture. A tile in
                  the logo's own three colours carries the same brand weight
                  without repeating anything.

                  `nodes` because the line is about connecting institutions to
                  infrastructure, and it is the icon this site already uses for
                  that everywhere else.

                  Decorative, and the slot is not a link: an arrow lived here
                  before the logo and was also wrong — an arrow promises
                  somewhere to go, and this card is a statement, not a call to
                  action.
                */}
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(135deg,var(--color-navy-600),var(--color-sky-500)_58%,var(--color-green-500))] text-white shadow-[0_10px_20px_-10px_rgba(0,46,166,.55)]"
                >
                  <Icon name="nodes" className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <p className="text-[0.9375rem] leading-relaxed font-medium text-ink">
                  {industryContext.closing}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Gallery */}
          <Reveal kind="right" delay={120} className="lg:col-span-6 xl:col-span-7">
            <IndustryCarousel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------- future of money diagram */

export function FutureOfMoney() {
  return (
    <DarkSection>
      <div className="shell section relative">
        <SectionHeading
          onDark
          align="center"
          eyebrow={futureOfMoney.eyebrow}
          title={futureOfMoney.headline}
          className="mx-auto mb-14 md:mb-16"
        />

        {/* Three forces */}
        <div className="grid gap-4 md:grid-cols-3">
          {futureOfMoney.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 90}
              className="flex h-full flex-col gap-4 rounded-xl bg-white/[0.045] p-6 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/[0.07]"
            >
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-sky-400">
                0{i + 1}
              </span>
              <h3 className="text-lg text-white">{pillar.title}</h3>
              <ul className="flex flex-col gap-2">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.875rem] text-ink-inv-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-green-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Connector />

        {/* Convergence */}
        <Reveal className="rounded-xl bg-[linear-gradient(100deg,rgba(0,46,166,.5),rgba(1,164,255,.22)_55%,rgba(1,172,50,.22))] p-px">
          <div className="flex flex-col items-center gap-4 rounded-[calc(0.75rem-1px)] bg-abyss/85 px-6 py-7 text-center">
            <h3 className="text-[1.0625rem] tracking-[0.02em] text-white uppercase md:text-xl">
              {futureOfMoney.convergence.title}
            </h3>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {futureOfMoney.convergence.attributes.map((attribute) => (
                <li
                  key={attribute}
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-inv-2"
                >
                  {attribute}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Connector />

        {/* Platform band */}
        <Reveal className="flex flex-col items-center gap-3 rounded-xl bg-navy-600 px-6 py-7 text-center ring-1 ring-sky-500/40">
          <p className="font-display text-lg font-bold tracking-[0.04em] text-white uppercase md:text-xl">
            {futureOfMoney.centre.name}
          </p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-sky-300">
            {futureOfMoney.centre.line}
          </p>
        </Reveal>

        <Connector />

        {/* Audiences */}
        <Reveal>
          <ul className="grid gap-px overflow-hidden rounded-xl ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {futureOfMoney.audiences.map((audience) => (
              <li
                key={audience}
                className="flex items-center gap-3 bg-white/[0.03] px-5 py-4 text-[0.875rem] text-ink-inv-2 transition-colors hover:bg-white/[0.07] hover:text-white"
              >
                <Icon name="check" className="h-4 w-4 shrink-0 text-green-400" strokeWidth={2} />
                {audience}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Principles */}
        <div className="mt-14 grid gap-8 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {futureOfMoney.principles.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 80} className="flex flex-col gap-2.5">
              <div aria-hidden="true" className="rule-brand" />
              <h3 className="text-[0.9375rem] tracking-[0.04em] text-white uppercase">
                {principle.title}
              </h3>
              <p className="text-[0.875rem] leading-relaxed text-ink-inv-3">{principle.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}

function Connector() {
  return (
    <div aria-hidden="true" className="flex justify-center py-5">
      <span className="h-10 w-px bg-[linear-gradient(to_bottom,transparent,rgba(1,164,255,.55),transparent)]" />
    </div>
  );
}

/* -------------------------------------------------------------- proposition */

export function Proposition() {
  return (
    <section className="section bg-surface">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Reveal kind="fade">
            <Eyebrow>{proposition.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="h-display-2">{proposition.headline}</h2>
          </Reveal>
          <Reveal delay={110}>
            <div className="rule-brand" aria-hidden="true" />
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[1.0625rem] leading-relaxed text-ink-2 md:text-lg">
              {proposition.body}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <ul className="mt-2 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2">
              {proposition.nodes.map((node) => (
                <li
                  key={node}
                  className="flex items-center gap-3 bg-white px-5 py-4 text-[0.875rem] font-medium text-ink transition-colors hover:bg-navy-50"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  {node}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal kind="right" delay={120} className="lg:col-span-6 xl:col-span-7">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-lift)]">
            <Image
              src={proposition.image}
              alt={proposition.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              quality={80}
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ why orbismoneta */

/**
 * One tone per reason card, cycling in the order the bars run in the logo:
 * navy, sky, green — #002ea6, #01a4ff, #01ac32, sampled from
 * brand/OrMo Logo V PNG.png and already the brand tokens in globals.css. Four
 * cards against three colours, so the fourth restarts on navy, which is also
 * the right colour for it: 04 is the regulator-and-institution card, and navy
 * is the anchor of this palette.
 *
 * Sky and green have no 50/100 tints in the theme — only 400/500/600 — so the
 * rests are alpha of the 500, not a tint token. That keeps all three at the
 * same visual weight without inventing six new scale steps for one component.
 *
 * The shadows are written out per tone rather than driven by a CSS variable:
 * `Reveal` sets `style` itself to carry the stagger delay, and a `style` passed
 * through its rest props would overwrite it and kill the stagger.
 */
/*
  A note on the 3D, because the obvious place to put it does not work.

  Tilting the whole card was tried first and silently did nothing: `Reveal`
  animates its root with `om-rise`, and that animation is `fill: both`, so its
  final `transform` value keeps overriding any `transform` a hover rule sets.
  The lift survives only because it uses `translate`, which Tailwind v4 emits as
  a standalone property the animation never touches.

  The icon tiles have no animation on them, so they own their `transform`
  outright — which is why the turn lives there.
*/
const REASON_TONES = [
  {
    tile: "bg-navy-600/10 text-navy-600 ring-navy-600/15 group-hover/reason:bg-navy-600 group-hover/reason:text-white group-hover/reason:ring-navy-600 group-hover/reason:shadow-[0_10px_20px_-10px_rgba(0,46,166,.55)]",
    numeral: "text-navy-600/30 group-hover/reason:text-navy-600",
    bar: "bg-[linear-gradient(180deg,var(--color-navy-600),var(--color-navy-400))]",
    lift: "hover:ring-navy-600/25 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_22px_44px_-20px_rgba(10,21,51,.28),0_40px_66px_-40px_rgba(0,46,166,.5)]",
  },
  {
    tile: "bg-sky-500/12 text-sky-600 ring-sky-500/20 group-hover/reason:bg-sky-500 group-hover/reason:text-white group-hover/reason:ring-sky-500 group-hover/reason:shadow-[0_10px_20px_-10px_rgba(1,164,255,.55)]",
    numeral: "text-sky-500/40 group-hover/reason:text-sky-600",
    bar: "bg-[linear-gradient(180deg,var(--color-sky-500),var(--color-sky-400))]",
    lift: "hover:ring-sky-500/30 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_22px_44px_-20px_rgba(10,21,51,.28),0_40px_66px_-40px_rgba(1,164,255,.5)]",
  },
  {
    tile: "bg-green-500/12 text-green-600 ring-green-500/20 group-hover/reason:bg-green-500 group-hover/reason:text-white group-hover/reason:ring-green-500 group-hover/reason:shadow-[0_10px_20px_-10px_rgba(1,172,50,.55)]",
    numeral: "text-green-500/40 group-hover/reason:text-green-600",
    bar: "bg-[linear-gradient(180deg,var(--color-green-500),var(--color-green-400))]",
    lift: "hover:ring-green-500/30 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_22px_44px_-20px_rgba(10,21,51,.28),0_40px_66px_-40px_rgba(1,172,50,.5)]",
  },
  {
    tile: "bg-navy-600/10 text-navy-600 ring-navy-600/15 group-hover/reason:bg-navy-600 group-hover/reason:text-white group-hover/reason:ring-navy-600 group-hover/reason:shadow-[0_10px_20px_-10px_rgba(0,46,166,.55)]",
    numeral: "text-navy-600/30 group-hover/reason:text-navy-600",
    bar: "bg-[linear-gradient(180deg,var(--color-navy-600),var(--color-sky-500))]",
    lift: "hover:ring-navy-600/25 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_22px_44px_-20px_rgba(10,21,51,.28),0_40px_66px_-40px_rgba(0,46,166,.5)]",
  },
] as const;

/* ----------------------------------------------------------- platform poster */

/**
 * The client's platform poster, shown whole.
 *
 * It is a picture of words, which decides almost everything here. Measured at
 * the file, its smallest type is a 14px glyph run across 1254px — so it stays
 * above 11px only while it paints wider than about 985px. The shell gives it
 * 1264px at 1424 and up, which is where it is fully legible; the band asks for
 * the shell and nothing narrower, and never scales it up past its own size,
 * because there is nothing above 1254px to show.
 *
 * Below that the type falls away — 704px on a tablet puts the footer strip near
 * 8px and a phone puts it near 4px. Nothing can be done about that inside the
 * image, so the words come out of it: `commitments` renders as live text under
 * the poster wherever the baked strip is too small to read, and turns `sr-only`
 * at `lg` where it isn't. Either way the words are on the page and reach a
 * screen reader; only their form changes.
 */
export function PlatformPoster() {
  return (
    <DarkSection className="section" id="intelligent-platform">
      <div className="shell">
        <Reveal kind="fade">
          <Eyebrow onDark>{platformPoster.eyebrow}</Eyebrow>
        </Reveal>

        {/* The poster sets this headline on screen in type nothing here can
            match. It is repeated as a real heading so the section has one in the
            document outline, and so it reaches anyone the picture does not. */}
        <h2 className="sr-only">{platformPoster.title}</h2>

        <Reveal delay={120} className="mt-7">
          <figure className="m-0">
            <Image
              src={platformPoster.image}
              alt={platformPoster.alt}
              width={1254}
              height={1254}
              quality={82}
              /* Below the fold on every viewport, so it waits its turn. */
              loading="lazy"
              sizes="(min-width: 1424px) 1264px, (min-width: 768px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
              /* Its ground is the same near-black navy as the band, so it needs
                 softening at the edges rather than a frame. The hold is 1.5% —
                 the poster keeps roughly 2.5% of dark margin on every side, so
                 the feather runs out before it reaches anything drawn. */
              className="mx-auto block h-auto w-full max-w-[78.375rem] [mask-composite:intersect] [mask-image:linear-gradient(180deg,transparent_0%,#000_1.5%,#000_98.5%,transparent_100%),linear-gradient(90deg,transparent_0%,#000_1.5%,#000_98.5%,transparent_100%)]"
            />

            {/*
              1050, not `lg`. The shell hands the poster the viewport less 64px
              of padding through this range, so 1050 is the width at which it
              first paints 986px and its 14px glyph run clears 11px. At `lg`
              (1024) it is still only 960px and 10.7px — the caption would go
              silent one breakpoint before the picture could carry the words.
            */}
            <figcaption className="mt-10 min-[1050px]:sr-only">
              <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
                {platformPoster.commitments.map((c) => (
                  <li key={c.title} className="flex gap-3">
                    <Icon
                      name={c.icon as IconName}
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-sky-400"
                    />
                    <div>
                      <p className="text-[0.9375rem] leading-snug font-semibold text-white">
                        {c.title}
                      </p>
                      <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-inv-2">{c.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </DarkSection>
  );
}

export function WhyOrbisMoneta() {
  return (
    <section className="section bg-canvas" id="why-orbismoneta">
      <div className="shell">
        {/* Centred opening, so the two-column body below reads as one block
            rather than two competing columns. */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Reveal kind="fade">
            <Eyebrow>{whyOrbisMoneta.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-[1.875rem] leading-[1.04] font-semibold tracking-[-0.038em] text-ink md:text-[2.375rem]">
              {whyOrbisMoneta.headline}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <span
              aria-hidden="true"
              className="block h-[3px] w-14 rounded-full bg-[linear-gradient(90deg,#01a4ff,#01ac32)]"
            />
          </Reveal>
          <Reveal delay={140}>
            <p className="text-[0.9375rem] leading-relaxed text-ink-2 md:text-[1.0625rem]">
              {whyOrbisMoneta.intro}
            </p>
          </Reveal>
        </div>

        {/*
          `lg:items-center`, not `lg:items-start`. The photograph is 6:5 and the
          four cards stack taller than it, so aligned to the top it hung off the
          start of the list with all the empty space pooled underneath it.
          Centred, the shorter column sits against the middle of the taller one.

          The sticky wrapper that used to be here went with it: sticky needs
          room to travel inside its grid area, and a centred item's area is
          exactly its own height, so it had nothing left to do.
        */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Reveal kind="left" delay={80} className="lg:col-span-5">
            <div>
              {/*
                6:5, matching the photograph's own 1.212 so the crop is about
                one percent.

                This frame used to be `lg:aspect-[5/6]` — portrait, to stand
                beside the four reason cards. The photograph that replaced the
                old one is landscape and its subject spans the full width: six
                people, shoulder to shoulder, with the table in front of them.
                Forcing it portrait means cropping a third of the width, which
                takes the person at each end out of the picture. A shorter image
                next to a taller list is the smaller cost, and the column is
                sticky, so the height difference is not read as a gap.
              */}
              <div className="relative aspect-[6/5] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]">
                <Image
                  src={whyOrbisMoneta.image}
                  alt={whyOrbisMoneta.alt}
                  fill
                  /* Fixed, not a vw fraction: the shell caps at 84rem, so this
                     column tops out at ~503px however wide the screen gets. */
                  sizes="(max-width: 1024px) 100vw, 520px"
                  quality={80}
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Reveal>

          <ol className="flex flex-col gap-4 lg:col-span-7">
            {whyOrbisMoneta.reasons.map((reason, i) => {
              const tone = REASON_TONES[i % REASON_TONES.length];
              return (
                <Reveal
                  as="li"
                  key={reason.title}
                  delay={140 + i * 80}
                  /*
                    Depth at rest, lift on hover.

                    The resting shadow is two layers — a 1px contact edge and a
                    wide soft one — because a single blur reads as a blurry card
                    rather than a card above a surface. Hover raises it 8px and
                    swaps in a third layer tinted with the card's own colour, so
                    what comes forward is lit rather than just bigger.

                    `transition-[transform,box-shadow]` and not `transition-all`:
                    `all` would also animate the ring and the tile's background
                    on the same curve, and those want to snap.

                    The translate is dropped under `prefers-reduced-motion` — the
                    stylesheet neutralises the duration there, which would make
                    this jump 8px instantly on every hover.
                  */
                  className={cn(
                    "group/reason relative flex items-start gap-5 overflow-hidden rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line",
                    "shadow-[0_1px_2px_rgba(10,21,51,.04),0_12px_28px_-20px_rgba(10,21,51,.26)]",
                    "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    "hover:-translate-y-2 motion-reduce:hover:translate-y-0",
                    tone.lift,
                  )}
                >
                  {/* Brand edge, drawn down the card on hover. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/reason:scale-y-100",
                      tone.bar,
                    )}
                  />

                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-[0_0_0_rgba(0,0,0,0)] ring-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/reason:scale-110 group-hover/reason:[transform:perspective(520px)_rotateY(-12deg)]",
                      tone.tile,
                    )}
                  >
                    <Icon name={reason.icon as IconName} className="h-5 w-5" strokeWidth={1.6} />
                  </span>

                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-display text-[1.375rem] leading-none font-bold tabular transition-colors duration-300",
                      tone.numeral,
                    )}
                  >
                    0{i + 1}
                  </span>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[1.0625rem] leading-snug text-ink">{reason.title}</h3>
                    <p className="text-[0.875rem] leading-relaxed text-ink-2">{reason.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>

        {/*
          The three-card row that closed this section — Delivery model, Coverage,
          Principle — came off at the client's request. `whyOrbisMoneta.highlights`
          still holds that copy; see the note there. What took its place is the
          engagement model, as its own section below rather than a fourth block
          inside this one: it carries an eyebrow, a headline and an intro of its
          own, and burying all three inside "Why OrbisMoneta" would have read as
          a heading inside a heading.
        */}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- engagement model */

/**
 * The client's four-phase engagement model on the home page.
 *
 * The copy is `engagementModel` from content/industries.ts, unchanged and not
 * re-typed — it was already extracted verbatim from the client's own HTML for
 * the Industries page, and re-keying it into a second file is how two copies of
 * one paragraph start drifting apart.
 *
 * This is a light treatment of the same content the Industries page shows on
 * dark. Same phases, same order, same numerals; the grid is four across on a
 * white ground so it sits with "Why OrbisMoneta" directly above it rather than
 * dropping the page into a dark band two sections before the footer already
 * does.
 */
export function EngagementModel() {
  return (
    <section className="section-tight bg-surface" id="engagement-model">
      <div className="shell">
        <SectionHeading
          eyebrow={engagementModel.eyebrow}
          title={engagementModel.headline}
          intro={engagementModel.intro}
          className="mb-12 md:mb-14"
        />

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {engagementModel.phases.map((phase, i) => (
            <Reveal
              as="li"
              key={phase.step}
              delay={i * 80}
              className="group/phase relative flex h-full flex-col gap-3 overflow-hidden rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-line transition-shadow duration-300 hover:shadow-[var(--shadow-card)]"
            >
              {/* Brand rule that draws itself in on hover — the same gesture the
                  dark version on /industries uses, so the two read as one thing
                  seen twice rather than as two different components. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-green-500))] transition-transform duration-500 group-hover/phase:scale-x-100"
              />
              <span
                aria-hidden="true"
                className="font-display text-[1.75rem] leading-none font-bold tabular text-navy-200 transition-colors group-hover/phase:text-navy-600"
              >
                {phase.step}
              </span>
              <h3 className="text-[1.0625rem] leading-snug text-ink">{phase.title}</h3>
              <p className="text-[0.875rem] leading-relaxed text-ink-2">{phase.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- closing cta */

const ROUTE_ICONS: Record<string, IconName> = {
  bank: "bank",
  chip: "chip",
  target: "target",
};

export function ClosingCta() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-abyss">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={closingCta.image}
          alt=""
          fill
          sizes="100vw"
          quality={78}
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#030d22_10%,rgba(3,13,34,.95)_42%,rgba(3,13,34,.5)_72%,rgba(3,13,34,.25)_100%)]" />
      </div>

      <div className="shell section relative">
        <div className="flex max-w-2xl flex-col gap-6">
          <Reveal kind="fade">
            <Eyebrow onDark>{closingCta.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="h-display-2 text-white">
              Ready to engineer the{" "}
              <span className="text-brand-gradient-inv">future of money</span> with us?
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[1.0625rem] leading-relaxed text-ink-inv-2">{closingCta.body}</p>
          </Reveal>

          <Reveal delay={190}>
            <ul className="mt-2 grid gap-6 sm:grid-cols-3">
              {closingCta.routes.map((route) => (
                <li key={route.title} className="flex flex-col gap-2.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-sky-500/40">
                    <Icon
                      name={ROUTE_ICONS[route.icon]}
                      className="h-5 w-5 text-sky-400"
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className="text-[0.875rem] leading-snug font-medium text-white">
                    {route.title}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={260} className="mt-3 flex flex-wrap items-center gap-3">
            <ButtonLink href={closingCta.primaryCta.href} tone="onDark" size="lg" icon="arrowRight">
              {closingCta.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={closingCta.secondaryCta.href} tone="onDarkGhost" size="lg">
              {closingCta.secondaryCta.label}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
