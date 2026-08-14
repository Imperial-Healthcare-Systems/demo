import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutPage, leadershipPage } from "@/content/about";
import { Breadcrumbs } from "@/components/PageHero";
import { BrandMark } from "@/components/BrandMark";
import { CapabilityDeck } from "@/components/CapabilityDeck";
import { ButtonLink, TextLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { DarkSection, Eyebrow, SectionHeading } from "@/components/Section";

/**
 * The wordmark splits the way the logo does — "Orbis" plain, "Moneta" in the
 * brand blue. Derived from the name rather than hard-coded, so it cannot drift
 * from `brandPanel.name`.
 */
const BRAND_TAIL = aboutPage.brandPanel.name.slice(
  aboutPage.brandPanel.name.toLowerCase().indexOf("moneta"),
);
const BRAND_LEAD = aboutPage.brandPanel.name.slice(0, aboutPage.brandPanel.name.length - BRAND_TAIL.length);

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
        do not want it. `Breadcrumbs` is imported from the same module, so the
        crumb markup and its `aria-label` stay identical across the site.
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
            <circle key={r} cx="300" cy="300" r={r} stroke="currentColor" strokeWidth="1" />
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
              <Reveal kind="fade">
                <Breadcrumbs items={[{ label: "About" }]} />
              </Reveal>

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

              <Reveal delay={230} className="mt-2 flex flex-wrap items-center gap-3">
                <ButtonLink href="/about/leadership" icon="arrowRight" size="lg" shape="soft">
                  Meet the leadership
                </ButtonLink>
                <ButtonLink href="/about/careers" tone="secondary" size="lg" shape="soft">
                  Careers
                </ButtonLink>
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

              <blockquote className="relative font-serif text-[1.4375rem] leading-[1.44] font-light text-ink italic md:text-[1.625rem] xl:text-[1.8125rem]">
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

      {/* Brand panel + experience */}
      <DarkSection>
        {/*
          The network globe already used by the home hero, reused here as the
          ground rather than a new asset. Pushed right and heavily veiled so it
          sits behind the experience panel without ever competing with type —
          the two gradients below are what keep the left column readable.
        */}
        <Image
          src="/images/hero-network-globe.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          quality={80}
          className="pointer-events-none -z-10 object-cover object-right opacity-45"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,13,34,.97)_0%,rgba(3,13,34,.86)_42%,rgba(3,13,34,.55)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,13,34,.75)_0%,transparent_28%,transparent_72%,rgba(3,13,34,.8)_100%)]"
        />

        <div className="shell section grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Eyebrow onDark>Positioning</Eyebrow>
            <div className="flex flex-col gap-3">
              {/*
                One word, two weights of emphasis — the same split the logo
                makes. `tracking-[0.04em]` is positive here because the
                wordmark is set in caps, where letters need opening up, not
                closing down.
              */}
              <p className="font-display text-[2rem] leading-none font-bold tracking-[0.04em] text-white uppercase md:text-[2.75rem]">
                {BRAND_LEAD}
                <span className="text-sky-400">{BRAND_TAIL}</span>
              </p>
              <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-inv-2 uppercase">
                {aboutPage.brandPanel.positioning}
              </p>
            </div>
            <div className="rule-brand" aria-hidden="true" />
            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-ink-inv-2 md:text-lg">
              {aboutPage.brandPanel.statement}
            </p>

            {/*
              The capability chips that used to close this column are gone. The
              deck alongside now names the same nine things, and printing them
              twice inside one section made the panel read as a list repeated
              rather than a statement supported.
            */}
          </div>

          <div className="lg:col-span-8">
            <CapabilityDeck />
          </div>
        </div>
      </DarkSection>

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
              <Reveal key={block.title} delay={i * 70} className="flex flex-col gap-3">
                <span className="font-mono text-[0.6875rem] tabular text-navy-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[1.25rem] leading-snug">{block.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">{block.body}</p>
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

      {/* Expertise ticker */}
      <section className="border-y border-line bg-surface py-10" id="expertise">
        <div className="shell mb-6 flex flex-wrap items-end justify-between gap-4">
          <Eyebrow>{aboutPage.expertise.eyebrow}</Eyebrow>
          <TextLink href="/advisory">Explore our services</TextLink>
        </div>
        <Marquee items={aboutPage.expertise.areas} duration={70} />
      </section>
    </>
  );
}
