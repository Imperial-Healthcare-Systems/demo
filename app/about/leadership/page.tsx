import type { Metadata } from "next";
import { aboutPage, leadershipPage } from "@/content/about";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { DarkSection, Eyebrow } from "@/components/Section";

export const metadata: Metadata = {
  title: "Leadership Team",
  description:
    "A senior team of financial infrastructure practitioners, product leaders and engineers guiding OrbisMoneta's strategy, platforms and client engagements.",
  alternates: { canonical: "/about/leadership" },
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow={leadershipPage.eyebrow}
        title={leadershipPage.headline}
        accent={leadershipPage.headlineAccent}
        intro={leadershipPage.intro}
        crumbs={[{ label: "About", href: "/about" }, { label: "Leadership" }]}
      />

      <section className="section ground-soft bg-canvas">
        <div className="shell flex flex-col gap-6">
          {leadershipPage.people.map((person) => (
            <Reveal
              key={person.name}
              className="grid gap-8 rounded-[--radius-card] bg-white p-8 ring-1 ring-line md:p-10 lg:grid-cols-12 lg:gap-12"
            >
              <div className="flex flex-col gap-5 lg:col-span-4">
                <div className="surface-deep relative flex aspect-[4/5] w-full max-w-[16rem] items-center justify-center overflow-hidden rounded-[--radius-card] ring-1 ring-navy-900/10">
                  {person.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={person.photo}
                      alt={`${person.name}, ${person.role}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-display text-[3rem] font-bold tracking-[-0.042em] text-white/85">
                      {person.initials}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[1.375rem]">{person.name}</h2>
                  <p className="text-[0.9375rem] text-navy-600">{person.role}</p>
                </div>
              </div>

              <div className="flex flex-col gap-5 lg:col-span-8">
                <div className="rule-brand" aria-hidden="true" />
                <p className="text-[1.0625rem] leading-relaxed text-ink-2">{person.bio}</p>
                <ul className="mt-2 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-3">
                  {aboutPage.experience.slides.slice(0, 3).map((slide) => (
                    <li key={slide.label} className="flex flex-col gap-1 bg-surface px-5 py-4">
                      <span className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-ink-3">
                        {slide.label}
                      </span>
                      <span className="stat-value text-[0.9375rem] font-semibold text-ink">
                        {slide.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          {/* Profiles the client has still to supply */}
          <ul className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: leadershipPage.pendingProfiles }, (_, i) => (
              <Reveal
                as="li"
                key={i}
                delay={i * 80}
                className="flex items-center gap-5 rounded-[--radius-card] border border-dashed border-line-strong bg-surface/60 p-7"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-ink-3 ring-1 ring-line">
                  <Icon name="plus" className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[0.9375rem] font-medium text-ink-2">
                    {leadershipPage.pendingLabel}
                  </p>
                  <p className="text-[0.8125rem] text-ink-3">{leadershipPage.pendingNote}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <DarkSection>
        <div className="shell section-tight flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <Eyebrow onDark>Careers</Eyebrow>
            <h2 className="h-display-4 text-white">
              Want to build financial infrastructure with this team?
            </h2>
          </div>
          <ButtonLink href="/about/careers" tone="onDark" icon="arrowRight" className="shrink-0">
            View careers
          </ButtonLink>
        </div>
      </DarkSection>
    </>
  );
}
