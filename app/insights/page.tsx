import type { Metadata } from "next";
import Link from "next/link";
import {
  estimateReadingTime,
  getAllInsights,
  getFeaturedInsight,
  insightsPage,
} from "@/content/insights";
import { PageHero } from "@/components/PageHero";
import { InsightCover } from "@/components/InsightCard";
import { InsightsExplorer } from "@/components/InsightsExplorer";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Section";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Research, analysis and field notes from practitioners engineering financial infrastructure — covering digital money, payments, AI, risk and the evolving regulatory landscape.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const insights = getAllInsights();
  const featured = getFeaturedInsight();
  const rest = insights.filter((i) => i.slug !== featured.slug);

  return (
    <>
      <PageHero
        eyebrow={insightsPage.eyebrow}
        title={insightsPage.headline}
        accent={insightsPage.headlineAccent}
        intro={insightsPage.intro}
        crumbs={[{ label: "Insights" }]}
      />

      {/* Featured */}
      <section className="bg-canvas pt-12 md:pt-16">
        <div className="shell">
          <Reveal>
            <article className="group/card relative grid overflow-hidden rounded-[--radius-card] bg-white ring-1 ring-line transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] lg:grid-cols-12">
              <InsightCover
                insight={featured}
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="aspect-[16/9] w-full lg:col-span-5 lg:aspect-auto"
              />
              <div className="flex flex-col gap-4 p-8 lg:col-span-7 lg:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-navy-600 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white">
                    Featured
                  </span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-navy-600">
                    {featured.category}
                  </span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-3">
                    {featured.type}
                  </span>
                </div>

                <h2 className="max-w-2xl h-display-4 leading-snug transition-colors group-hover/card:text-navy-600">
                  <Link href={`/insights/${featured.slug}`} className="after:absolute after:inset-0">
                    {featured.title}
                  </Link>
                </h2>

                <p className="max-w-2xl text-[1rem] leading-relaxed text-ink-2">
                  {featured.excerpt}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 text-[0.75rem] text-ink-3">
                  <span>{featured.author}</span>
                  <span aria-hidden="true" className="h-2.5 w-px bg-line-strong" />
                  <span className="flex items-center gap-1.5">
                    <Icon name="clock" className="h-3.5 w-3.5" />
                    <span className="tabular">{estimateReadingTime(featured)} min read</span>
                  </span>
                  <span aria-hidden="true" className="h-2.5 w-px bg-line-strong" />
                  <span>{featured.topic}</span>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Explorer */}
      <section className="bg-canvas pt-14 pb-24 md:pt-20">
        <div className="shell">
          <div className="mb-8 flex flex-col gap-2">
            <Eyebrow>All insights</Eyebrow>
            <p className="max-w-2xl text-[0.9375rem] text-ink-2">
              Filter by theme, format or keyword. Open any piece to read it in full.
            </p>
          </div>
          <InsightsExplorer insights={rest} />
        </div>
      </section>
    </>
  );
}
