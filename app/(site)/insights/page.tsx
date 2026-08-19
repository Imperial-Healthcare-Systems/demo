import type { Metadata } from "next";
import Link from "next/link";
import { insightsPage } from "@/content/insights";
import {
  deriveCategories,
  estimateReadingTime,
  getAllInsights,
  getFeaturedInsight,
} from "@/lib/insights-store";
import { PageHero } from "@/components/PageHero";
import { InsightCover } from "@/components/InsightCard";
import { InsightsExplorer } from "@/components/InsightsExplorer";
import { Icon } from "@/components/Icon";
import { TimeAgo } from "@/components/TimeAgo";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Section";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Research, analysis and field notes from practitioners engineering financial infrastructure — covering digital money, payments, AI, risk and the evolving regulatory landscape.",
  alternates: { canonical: "/insights" },
};

/**
 * Rebuilt at most once a minute, and immediately when something is published.
 *
 * The listing is a database read now, so it cannot be baked once at build time
 * and left. It is also not worth querying on every request: this page changes
 * when the client writes a post and at no other moment. So it is cached and
 * regenerated on a 60-second floor, and the admin save route calls
 * `revalidatePath("/insights")` — which means a new article is live the second
 * it is published, and the 60 seconds is only a backstop for anything that
 * changes the database without going through the portal.
 */
export const revalidate = 60;

export default async function InsightsPage() {
  const insights = await getAllInsights();
  const featured = await getFeaturedInsight();
  const categories = deriveCategories(insights);

  return (
    <>
      <PageHero
        eyebrow={insightsPage.eyebrow}
        title={insightsPage.headline}
        accent={insightsPage.headlineAccent}
        intro={insightsPage.intro}
      />

      {/*
        Featured — the most recent published piece.

        Guarded, because it can now genuinely be missing: a database with no
        published posts in it has no newest one. It could not happen when the
        articles were compiled into the bundle, and an unguarded `featured.title`
        would take the whole page down with it.
      */}
      {featured && (
      <section className="bg-canvas pt-12 md:pt-16">
        <div className="shell">
          <Reveal>
            <article className="group/card relative grid overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-line transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] lg:grid-cols-12">
              <InsightCover
                insight={featured}
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                /*
                  16:9 at every width, where it used to stretch to the row
                  height above lg. Covers are supplied artwork now, not
                  generated grounds, and the first one is a designed card with
                  its title, its five marks and its footer line all running to
                  the edges. Stretched to the row it was cropped 5% either side
                  — enough to take the I off "ISO" and the F off "Faster". Held
                  at the source's own ratio nothing is cut, and the shorter
                  image is centred against the copy instead of filling behind
                  it.
                */
                className="aspect-[16/9] w-full self-center lg:col-span-5"
              />
              <div className="flex flex-col gap-4 p-8 lg:col-span-7 lg:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-navy-600 px-3 py-1 font-mono text-[0.75rem] md:text-[0.625rem] uppercase tracking-[0.14em] text-white">
                    Featured
                  </span>
                  <span className="font-mono text-[0.75rem] md:text-[0.625rem] uppercase tracking-[0.14em] text-navy-600">
                    {featured.category}
                  </span>
                  <span className="font-mono text-[0.75rem] md:text-[0.625rem] uppercase tracking-[0.14em] text-ink-3">
                    {featured.type}
                  </span>
                </div>

                <h2 className="max-w-2xl h-display-4 leading-snug transition-colors group-hover/card:text-navy-600">
                  <Link
                    href={`/insights/${featured.slug}`}
                    className="after:absolute after:inset-0"
                  >
                    {featured.title}
                  </Link>
                </h2>

                <p className="max-w-2xl text-[1rem] leading-relaxed text-ink-2">
                  {featured.excerpt}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 text-[0.75rem] text-ink-3">
                  <span>{featured.author}</span>
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-px bg-line-strong"
                  />
                  <span className="flex items-center gap-1.5">
                    <Icon name="clock" className="h-3.5 w-3.5" />
                    <span className="tabular">
                      {estimateReadingTime(featured)} min read
                    </span>
                  </span>
                  {featured.publishedAt && (
                    <>
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-px bg-line-strong"
                      />
                      <TimeAgo date={featured.publishedAt} />
                    </>
                  )}
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-px bg-line-strong"
                  />
                  <span>{featured.topic}</span>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
      )}

      {/* Explorer */}
      <section className="bg-canvas pt-14 pb-24 md:pt-20">
        <div className="shell">
          <div className="mb-8 flex flex-col gap-2">
            <Eyebrow>All insights</Eyebrow>
            <p className="max-w-2xl text-[0.9375rem] text-ink-2">
              Filter by theme, format or keyword. Open any piece to read it in
              full.
            </p>
          </div>
          {/*
            Every insight, the featured one included.

            It used to be `rest` — the full list minus whatever the featured
            slot was showing — on the reasoning that printing it twice on one
            screen was a duplicate. It is not: the slot above is a highlight,
            and this is the index. Filtering to ISO 20022 returned a single
            older draft and no sign of the piece whose headline was six inches
            up the page, which reads as the filter being broken.
          */}
          <InsightsExplorer insights={insights} categories={categories} />
        </div>
      </section>
    </>
  );
}
