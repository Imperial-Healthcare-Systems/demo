import type { Metadata } from "next";
import { engagementModel, industries, industriesPage } from "@/content/industries";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { DarkSection, Eyebrow, SectionHeading } from "@/components/Section";
import { FlipCard, FlipHint } from "@/components/FlipCard";
import { cn } from "@/lib/utils";

/** Both faces share a shell, so the card keeps its shape through the turn. */
const FACE =
  "rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-line shadow-[0_1px_2px_rgba(10,21,51,.04)] " +
  "transition-shadow duration-300 group-hover/flip:shadow-[var(--shadow-card)]";

export const metadata: Metadata = {
  title: "Industries & Engagement Model",
  description:
    "OrbisMoneta works across the full financial ecosystem — banks, fintechs, corporates and treasuries, governments and regulators, and financial market infrastructure operators.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow={industriesPage.eyebrow}
        title={industriesPage.headline}
        accent={industriesPage.headlineAccent}
        intro={industriesPage.intro}
        crumbs={[{ label: "Industries" }]}
        actions={
          <ButtonLink href="/contact" icon="arrowRight">
            Discuss your programme
          </ButtonLink>
        }
      />

      {/* Segments */}
      <section className="section ground-soft bg-canvas">
        <div className="shell">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <Reveal as="li" key={industry.id} id={industry.id} delay={i * 70}>
                <FlipCard
                  label={industry.title}
                  minHeight="min-h-[16.5rem]"
                  faceClassName={FACE}
                  backClassName={cn(FACE, "bg-[linear-gradient(160deg,#0a1533,#002583)] ring-navy-800")}
                  front={
                    <>
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy-600 transition-colors duration-300 group-hover/flip:bg-navy-600 group-hover/flip:text-white">
                        <Icon name={industry.icon as never} className="h-6 w-6" strokeWidth={1.5} />
                      </span>
                      <h2 className="mt-4 text-[1.125rem] leading-snug">{industry.title}</h2>
                      <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-2">
                        {industry.body}
                      </p>
                      <FlipHint />
                    </>
                  }
                  back={
                    <>
                      <p className="font-mono text-[0.625rem] tracking-[0.18em] text-sky-400 uppercase">
                        {industry.title}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {industry.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-ink-inv-2 uppercase ring-1 ring-white/20"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-auto pt-4 text-[0.8125rem] leading-relaxed text-ink-inv-2">
                        {industry.body}
                      </p>
                    </>
                  }
                />
              </Reveal>
            ))}

            <Reveal
              as="li"
              delay={350}
              className="surface-deep on-dark flex h-full flex-col justify-between gap-6 rounded-[var(--radius-card)] p-7 ring-1 ring-navy-900/10"
            >
              <div className="flex flex-col gap-3">
                <Eyebrow onDark>Not listed?</Eyebrow>
                <h2 className="text-[1.125rem] text-white">
                  We work wherever value moves at institutional scale.
                </h2>
                <p className="text-[0.875rem] leading-relaxed text-ink-inv-2">
                  Tell us about your institution and the programme you are planning. We will tell
                  you honestly whether we are the right team for it.
                </p>
              </div>
              <ButtonLink href="/contact" tone="onDark" icon="arrowRight" className="w-fit">
                Start a conversation
              </ButtonLink>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* Engagement model */}
      <DarkSection id="engagement-model">
        <div className="shell section">
          <SectionHeading
            onDark
            eyebrow={engagementModel.eyebrow}
            title={engagementModel.headline}
            intro={engagementModel.intro}
            className="mb-14"
          />

          <ol className="grid gap-px overflow-hidden rounded-xl ring-1 ring-white/10 md:grid-cols-2 lg:grid-cols-4">
            {engagementModel.phases.map((phase, i) => (
              <Reveal
                as="li"
                key={phase.step}
                delay={i * 80}
                className="group/phase relative flex h-full flex-col gap-3 bg-white/[0.03] p-7 transition-colors hover:bg-white/[0.07]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-green-500))] transition-transform duration-500 group-hover/phase:scale-x-100"
                />
                <span className="font-display text-[1.75rem] leading-none font-bold tabular text-white/15 transition-colors group-hover/phase:text-sky-400">
                  {phase.step}
                </span>
                <h3 className="text-[1.0625rem] text-white">{phase.title}</h3>
                <p className="text-[0.875rem] leading-relaxed text-ink-inv-3">{phase.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </DarkSection>
    </>
  );
}
