import type { Metadata } from "next";
import Link from "next/link";
import { aboutPage, leadershipPage } from "@/content/about";
import { BrandMark } from "@/components/BrandMark";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "About OrbisMoneta",
  description:
    "OrbisMoneta is a financial technology company helping banks, fintechs and market infrastructures modernize payments, digital assets and AI-powered financial services.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/*
        The opening statement and the innovation philosophy, as one section.

        They were two: a `PageHero` at the top and a centred pull-quote three
        sections further down, with the capability panel between them. Reading
        top to bottom you met the company, then a dark panel, then — with no
        connection to either — a quote. Set side by side they read as a claim
        and the thinking behind it, which is what they are.

        Built here rather than through `PageHero`, because this is the one page
        whose opening is a two-column editorial spread; bending the shared hero
        to take a pull-quote would push that shape onto seven other pages that
        do not want it.
      */}
      <section className="relative isolate overflow-hidden rounded-b-[2rem] border-b border-line bg-canvas pt-28 pb-20 md:rounded-b-[3rem] md:pt-36 md:pb-28">
        {/*
          Light through the page rather than a coloured background: a pale blue
          wash upper-right, a paler green lower-left, white through the middle,
          all at single-digit alpha so no edge is ever visible.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(58%_62%_at_86%_6%,rgba(1,164,255,.10),transparent_62%),radial-gradient(46%_54%_at_4%_96%,rgba(1,172,50,.08),transparent_66%)]"
        />

        {/* Concentric rings, upper right. Hairline, and drifting slowly enough
            that it registers as depth rather than as movement. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 600 600"
          fill="none"
          className="anim-breathe pointer-events-none absolute -top-40 -right-40 -z-10 hidden h-[46rem] w-[46rem] text-navy-600/[0.055] motion-reduce:animate-none lg:block"
        >
          {[150, 210, 270, 330].map((r) => (
            <circle
              key={r}
              cx="300"
              cy="300"
              r={r}
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* The mark, oversized and cropped by the section's own overflow. */}
        <BrandMark
          variant="symbol"
          decorative
          className="pointer-events-none absolute -top-16 -right-24 -z-10 hidden h-[26rem] opacity-[0.045] select-none lg:block xl:-right-16 xl:h-[32rem]"
        />

        <div className="shell">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-0">
            {/* ── Left: the company ─────────────────────────────────────── */}
            <div className="flex flex-col items-start gap-6 lg:col-span-6 lg:pr-14 xl:pr-16">
              <Reveal delay={60}>
                <Eyebrow>{aboutPage.eyebrow}</Eyebrow>
              </Reveal>

              <Reveal delay={110}>
                <h1 className="h-display-1 max-w-[16ch] text-ink">
                  Engineering the{" "}
                  <span className="text-brand-gradient">Future of Finance</span>
                </h1>
              </Reveal>

              <Reveal delay={170}>
                <p className="max-w-[46ch] text-[1.0625rem] leading-[1.7] text-ink-2 md:text-[1.1875rem]">
                  {aboutPage.intro}
                </p>
              </Reveal>

              <Reveal
                delay={230}
                className="mt-2 flex flex-wrap items-center gap-3"
              >
                <ButtonLink
                  href="/about/leadership"
                  icon="arrowRight"
                  size="lg"
                  shape="soft"
                >
                  Meet the leadership
                </ButtonLink>
                {/* A "Careers" button stood beside this one. Careers has come
                    off the site at the client's request and its page is parked,
                    unrouted, at app/about/_careers. */}
              </Reveal>
            </div>

            {/* ── The divider ───────────────────────────────────────────── */}
            {/*
              A hairline that fades out at both ends, with a blue point at the
              top and a green one at the bottom — the two ends of the brand
              gradient, used as punctuation rather than decoration. It is a
              `div` in the flow rather than a border on a column, so it can be
              shorter than the columns and centred against them.
            */}
            <div
              aria-hidden="true"
              className="relative hidden justify-center self-stretch lg:col-span-1 lg:flex"
            >
              <span className="absolute inset-y-2 w-px bg-[linear-gradient(180deg,transparent,var(--color-line-strong)_14%,var(--color-line-strong)_86%,transparent)]" />
              <span className="absolute top-1 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-sky-500" />
              <span className="absolute bottom-1 h-1.5 w-1.5 translate-y-1/2 rounded-full bg-green-500" />
            </div>

            {/* ── Right: the philosophy ─────────────────────────────────── */}
            <Reveal
              kind="fade"
              delay={300}
              className="relative flex flex-col items-start gap-7 lg:col-span-5 lg:pl-12 xl:pl-14"
            >
              {/*
                The quotation marks are type, not icons — the character itself,
                set large and pale, so it sits in the same optical world as the
                sentence it opens. `select-none` and `aria-hidden` because a
                screen reader already gets the `blockquote`.
              */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-8 -left-2 font-serif text-[7rem] leading-none text-navy-600/12 select-none lg:left-8 lg:text-[8.5rem]"
              >
                &ldquo;
              </span>

              {/*
                Weight 400, not 300, and that is what makes this read darker.

                The colour was never the problem: it was `text-ink`, #0a1533,
                which is 18.1:1 on white — the darkest type token the site has,
                and about as far from grey as a colour gets. What read as pale
                was the 300 weight of a 29px italic serif, whose strokes are
                thin enough that the line averages out light however black the
                ink is. Measured over the quote's own box, 400 puts 10.9% of
                those pixels below mid-grey against 300's 6.8% — 60% more ink
                on the page. 400 is also as heavy as this face goes here; only
                300 and 400 are loaded, and 500 silently rendered as 400.

                `text-navy-950` (#050f28) on top of that, which is a real
                darkening but a small one — 19.6:1. Worth taking since it was
                asked for and costs nothing, but it is the weight doing the
                work.
              */}
              <blockquote className="relative font-serif text-[1.4375rem] leading-[1.44] font-normal text-navy-950 italic md:text-[1.625rem] xl:text-[1.8125rem]">
                {aboutPage.philosophy.quote}
              </blockquote>

              <span
                aria-hidden="true"
                className="pointer-events-none -mt-6 self-end font-serif text-[6rem] leading-none text-navy-600/10 select-none lg:text-[7rem]"
              >
                &rdquo;
              </span>

              <div className="-mt-8 flex flex-col gap-3">
                <span aria-hidden="true" className="h-px w-10 bg-navy-600" />
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-navy-600">
                  {aboutPage.philosophy.label}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/*
        The dark band that stood here is gone at the client's request.

        It was one section carrying two things: a POSITIONING column — the
        ORBISMONETA wordmark, "Financial Infrastructure • AI • Digital Money"
        and the platform statement — and the nine CORE CAPABILITIES cards
        beside it. Both went; the instruction was the section, not a column of
        it.

        What that costs, so it is on the record: this was the page's only dark
        surface, so /about now runs light from the masthead to the foot, and
        the nine capabilities are no longer named on this page. Areas of
        Expertise, the marquee at the bottom, is the nearest thing left to
        them, and Advisory names the service lines in full.

        Nothing was deleted to make it happen. `CapabilityDeck` is intact in
        components/, `aboutPage.brandPanel` and `aboutPage.coreCapabilities`
        are intact in content/about.ts, and re-mounting the band is this
        comment replaced by the section it describes.
      */}

      {/*
        The capability ticker, directly under the opening statement.

        It closed the page until the client moved it here, and here is the
        better place for it: it now reads as the line under "About OrbisMoneta"
        rather than as a strip of leftovers above the footer, and the six things
        the company does arrive before the story of why it exists rather than
        after it.

        The label is pinned and the list runs past it — a fixed thing and a
        moving one, which is what a ticker is. It sat in the sequence before,
        scrolling past once per loop; pinned, it is on screen the whole time,
        which is what a label naming six unattributed phrases has to be.

        It is not in the `.shell`. The band is full-bleed, and a label indented
        to the content column would leave 328px of empty navy before the first
        word at 1920. It takes the shell's padding without the shell's
        centring, so it hugs the gutter the way a ticker's channel label does.

        Below 640px the label sits above the strip instead of beside it. In a
        row it takes 185px of a 390px screen, which would leave the scrolling
        half about 144px — one short phrase at a time, behind a fade at each
        end.

        Dark blue and white, as asked. Nothing sits under it now but a light
        section, so the colour has no adjacency to negotiate; navy-900 into
        navy-800 and back is brightest in the middle where the type runs and
        falls away at the ends, which is where the marquee's own mask fades the
        text out anyway. White on the lightest of it is 18.2:1, and the green
        label on the darkest is 8.7:1.
      */}
      <section
        id="core-capabilities"
        className="on-dark bg-[linear-gradient(90deg,var(--color-navy-900)_0%,var(--color-navy-800)_50%,var(--color-navy-900)_100%)] py-6 md:py-7"
      >
        <div className="flex flex-col gap-3 pl-5 sm:flex-row sm:items-center sm:gap-6 md:pl-8 xl:pl-10">
          {/*
            Green, and it is the logo's own — `green-400`, the on-dark green
            this site already uses for the Innovation Lab tagline and the
            eyebrow on the closing bands. It is the only coloured thing in the
            strip: the six labels stay white, so the colour marks what names
            the list rather than competing with it.

            Set larger than the six it introduces — 17px against their 12px —
            at the client's request, and the tracking eases from .16em to .14em
            to go with it: letterspacing that opens up 12px type starts to pull
            17px type apart. 15px below the md breakpoint, where the label sits
            on its own line above the strip.
          */}
          <p className="shrink-0 font-mono text-[0.9375rem] font-semibold tracking-[0.14em] text-green-400 uppercase md:text-[1.0625rem]">
            {aboutPage.capabilities.lead}
          </p>
          {/* The join between the fixed half and the moving one. Hidden while
              they are stacked, where the line break already makes it. */}
          <span
            aria-hidden="true"
            className="hidden h-5 w-px shrink-0 bg-white/20 sm:block"
          />
          <Marquee
            items={aboutPage.capabilities.items}
            duration={38}
            copies={4}
            onDark
            itemClassName="text-white"
            className="min-w-0 flex-1"
          />
        </div>
      </section>

      {/* Story */}
      <section className="section ground-soft bg-canvas">
        <div className="shell">
          <SectionHeading
            eyebrow="Our story"
            title="Built to close the gap between ambition and execution."
            className="mb-14"
          />
          <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
            {aboutPage.story.map((block, i) => (
              <Reveal
                key={block.title}
                delay={i * 70}
                className="flex flex-col gap-3"
              >
                <span className="font-mono text-[0.6875rem] tabular text-navy-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[1.25rem] leading-snug">{block.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                  {block.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The philosophy quote moved into the opening section above, beside
          the introduction it explains. It stood here on its own, centred
          between a dark panel and a leadership block, attached to neither. */}

      {/* Leadership summary + credentials */}
      <section className="section ground-soft bg-canvas">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-6">
            <Eyebrow>Leadership</Eyebrow>
            <h2 className="h-display-3">
              Led by practitioners who have built at institutional scale.
            </h2>
            <p className="text-[0.9375rem] leading-relaxed text-ink-2">
              {aboutPage.leadershipSummary}
            </p>
          </div>

          {/*
            The credentials that used to sit here now live inside the
            experience panel above, where they read as proof beside the figures
            rather than as a list beside an unrelated biography. The leadership
            card moves across to take the column — it was cramped under the
            summary, and this is what the summary is pointing at.
          */}
          <Reveal delay={80} className="lg:col-span-6">
            <Link
              href="/about/leadership"
              className="group/card flex h-full flex-col justify-center gap-6 rounded-[var(--radius-card)] bg-surface p-8 ring-1 ring-line transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-600 font-display text-base font-bold text-white">
                  {leadershipPage.people[0].initials}
                </span>
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="text-[1.0625rem] font-semibold text-ink">
                    {leadershipPage.people[0].name}
                  </span>
                  <span className="text-[0.875rem] text-ink-2">
                    {leadershipPage.people[0].role}
                  </span>
                </span>
              </span>
              <span className="flex items-center gap-2 text-[0.8125rem] font-medium text-navy-600">
                Meet the leadership team
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 transition-transform duration-200 group-hover/card:translate-x-1"
                  strokeWidth={2}
                />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

    </>
  );
}
