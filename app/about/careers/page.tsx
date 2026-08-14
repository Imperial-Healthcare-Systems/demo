import type { Metadata } from "next";
import { careersPage } from "@/content/about";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Eyebrow, SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "OrbisMoneta brings strategy, product and engineering together in one accountable team building financial infrastructure for regulated institutions.",
  alternates: { canonical: "/about/careers" },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow={careersPage.eyebrow}
        title={careersPage.headline}
        accent={careersPage.headlineAccent}
        intro={careersPage.intro}
        crumbs={[{ label: "About", href: "/about" }, { label: "Careers" }]}
        actions={
          <ButtonLink href={`mailto:${careersPage.cta.email}`} icon="arrowRight">
            Introduce yourself
          </ButtonLink>
        }
      />

      <section className="section ground-soft bg-canvas">
        <div className="shell">
          <SectionHeading
            eyebrow="How we work"
            title="Three principles that shape every engagement — and every hire."
            className="mb-12"
          />
          <ul className="grid gap-5 md:grid-cols-3">
            {careersPage.principles.map((principle, i) => (
              <Reveal
                as="li"
                key={principle.title}
                delay={i * 80}
                className="flex h-full flex-col gap-3 rounded-[--radius-card] bg-surface p-7 ring-1 ring-line"
              >
                <span className="font-mono text-[0.6875rem] tabular text-navy-600">
                  0{i + 1}
                </span>
                <h2 className="text-[1.125rem] leading-snug">{principle.title}</h2>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">{principle.body}</p>
              </Reveal>
            ))}
          </ul>

          {/* Open roles — awaiting the client's list */}
          <Reveal className="mt-10 flex flex-col gap-6 rounded-[--radius-card] border border-dashed border-line-strong bg-white p-8 md:p-10">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-navy-600">
                <Icon name="document" className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div className="flex flex-col gap-1.5">
                <Eyebrow>Open roles</Eyebrow>
                <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-ink-2">
                  {careersPage.note}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-[1.125rem]">{careersPage.cta.heading}</h2>
                <p className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
                  {careersPage.cta.body}
                </p>
              </div>
              <ButtonLink
                href={`mailto:${careersPage.cta.email}`}
                icon="arrowRight"
                className="shrink-0"
              >
                {careersPage.cta.email}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
