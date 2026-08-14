import type { Metadata } from "next";
import { partnersPage } from "@/content/about";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { DarkSection, Eyebrow } from "@/components/Section";

export const metadata: Metadata = {
  title: "Ecosystem & Partners",
  description:
    "OrbisMoneta integrates, certifies and co-engineers alongside cloud providers, fintech platforms, core banking vendors and specialist technology partners.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow={partnersPage.eyebrow}
        title={partnersPage.headline}
        accent={partnersPage.headlineAccent}
        intro={partnersPage.intro}
        crumbs={[{ label: "Partners" }]}
        actions={
          <ButtonLink href={`mailto:${partnersPage.cta.email}`} icon="arrowRight">
            {partnersPage.cta.label}
          </ButtonLink>
        }
      />

      <section className="section ground-soft bg-canvas">
        <div className="shell">
          <ol className="flex flex-col gap-4">
            {partnersPage.tiers.map((tier, i) => (
              <Reveal
                as="li"
                key={tier.title}
                delay={i * 80}
                className="group/tier grid gap-6 rounded-[--radius-card] bg-white p-8 ring-1 ring-line transition-shadow duration-300 hover:shadow-[var(--shadow-card)] lg:grid-cols-12 lg:gap-10"
              >
                <div className="flex items-start gap-5 lg:col-span-5">
                  <span className="font-display text-[1.75rem] leading-none font-bold tabular text-navy-200 transition-colors group-hover/tier:text-navy-600">
                    {tier.tier.replace("Tier ", "")}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-3">
                      {tier.tier}
                    </span>
                    <h2 className="text-[1.25rem] leading-snug">{tier.title}</h2>
                  </div>
                </div>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2 lg:col-span-7">
                  {tier.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <DarkSection>
        <div className="shell section flex flex-col items-start gap-6 md:items-center md:text-center">
          <Eyebrow onDark>Partnership</Eyebrow>
          <h2 className="max-w-2xl h-display-2 text-white">
            {partnersPage.cta.headline}
          </h2>
          <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-ink-inv-2">
            {partnersPage.cta.body}
          </p>
          <ButtonLink
            href={`mailto:${partnersPage.cta.email}`}
            tone="onDark"
            size="lg"
            icon="arrowRight"
            className="mt-2"
          >
            {partnersPage.cta.label}
          </ButtonLink>
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-ink-inv-3">
            {partnersPage.cta.email}
          </p>
        </div>
      </DarkSection>
    </>
  );
}
