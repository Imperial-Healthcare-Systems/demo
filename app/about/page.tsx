import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutPage, leadershipPage } from "@/content/about";
import { PageHero } from "@/components/PageHero";
import { ExperienceSlider } from "@/components/ExperienceSlider";
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
      <PageHero
        eyebrow={aboutPage.eyebrow}
        title={
          <>
            Engineering the <span className="text-brand-gradient">Future of Finance</span>
          </>
        }
        intro={aboutPage.intro}
        crumbs={[{ label: "About" }]}
        actions={
          <>
            <ButtonLink href="/about/leadership" icon="arrowRight">
              Meet the leadership
            </ButtonLink>
            <ButtonLink href="/about/careers" tone="secondary">
              Careers
            </ButtonLink>
          </>
        }
      />

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
          <div className="flex flex-col gap-6 lg:col-span-7">
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

            <div className="mt-4 flex flex-col gap-3">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-sky-400">
                Core capabilities
              </p>
              <ul className="flex flex-wrap gap-2">
                {aboutPage.coreCapabilities.map((capability) => (
                  <li
                    key={capability}
                    className="group/cap flex items-center gap-2 rounded-full bg-white/[0.04] px-3.5 py-1.5 text-[0.75rem] text-ink-inv-2 ring-1 ring-white/15 backdrop-blur-sm transition-colors duration-200 hover:bg-white/[0.09] hover:text-white hover:ring-white/40"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400/70 transition-colors duration-200 group-hover/cap:bg-sky-400"
                    />
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ExperienceSlider />
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

      {/* Philosophy */}
      <section className="section-tight ground-soft bg-surface">
        <div className="shell-narrow flex flex-col items-center gap-6 text-center">
          <Reveal kind="fade">
            <Icon name="quote" className="h-8 w-8 text-navy-200" />
          </Reveal>
          <Reveal delay={80}>
            <blockquote className="font-display text-[1.25rem] leading-[1.24] font-semibold tracking-[-0.03em] text-ink md:text-[1.625rem]">
              {aboutPage.philosophy.quote}
            </blockquote>
          </Reveal>
          <Reveal delay={160}>
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-navy-600">
              {aboutPage.philosophy.label}
            </p>
          </Reveal>
        </div>
      </section>

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
              className="group/card flex h-full flex-col justify-center gap-6 rounded-[--radius-card] bg-surface p-8 ring-1 ring-line transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
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
