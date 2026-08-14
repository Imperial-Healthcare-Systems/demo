import type { Metadata } from "next";
import { labPage } from "@/content/about";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Section";

export const metadata: Metadata = {
  title: "OrbisMoneta Lab",
  description:
    "Our innovation lab explores emerging technology — from AI-native payment rails to tokenized settlement — before it reaches production.",
  alternates: { canonical: "/lab" },
};

export default function LabPage() {
  return (
    <>
      <PageHero
        eyebrow={labPage.eyebrow}
        title={labPage.headline}
        accent={labPage.headlineAccent}
        intro={labPage.intro}
        crumbs={[{ label: "Lab" }]}
        actions={
          <ButtonLink href="/contact" icon="arrowRight">
            Collaborate with the Lab
          </ButtonLink>
        }
      />

      <section className="section ground-soft bg-canvas">
        <div className="shell">
          <ul className="grid gap-5 md:grid-cols-3">
            {labPage.themes.map((theme, i) => (
              <Reveal
                as="li"
                key={theme.title}
                delay={i * 80}
                className="group/theme relative flex h-full flex-col gap-4 overflow-hidden rounded-[--radius-card] bg-surface p-7 ring-1 ring-line"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(1,164,255,.16),transparent_68%)] transition-transform duration-500 group-hover/theme:scale-125"
                />
                <span className="relative font-mono text-[0.6875rem] tabular text-navy-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="relative text-[1.125rem] leading-snug">{theme.title}</h2>
                <p className="relative text-[0.9375rem] leading-relaxed text-ink-2">
                  {theme.body}
                </p>
              </Reveal>
            ))}
          </ul>

          {/* Honest empty state rather than filler imagery */}
          <Reveal className="mt-10 flex flex-col items-start gap-4 rounded-[--radius-card] border border-dashed border-line-strong bg-white p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-navy-600">
                <Icon name="document" className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div className="flex flex-col gap-1">
                <Eyebrow>In preparation</Eyebrow>
                <p className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-2">
                  {labPage.note}
                </p>
              </div>
            </div>
            <ButtonLink href="/insights" tone="secondary" icon="arrowRight" className="shrink-0">
              Read our insights
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
