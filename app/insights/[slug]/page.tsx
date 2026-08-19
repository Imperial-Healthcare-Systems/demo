import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  estimateReadingTime,
  getAllInsights,
  getInsight,
  getRelatedInsights,
} from "@/content/insights";
import { site } from "@/content/site";
import { InsightBody } from "@/components/InsightBody";
import { InsightCard, InsightCover } from "@/components/InsightCard";
import { ShareLinks } from "@/components/ShareLinks";
import { ButtonLink, TextLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { TimeAgo } from "@/components/TimeAgo";
import { Reveal } from "@/components/Reveal";
import { DarkSection, Eyebrow } from "@/components/Section";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllInsights().map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return { title: "Insight not found" };

  return {
    title: insight.title,
    description: insight.excerpt,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      type: "article",
      title: insight.title,
      description: insight.excerpt,
      url: `${site.url}/insights/${insight.slug}`,
      ...(insight.publishedAt ? { publishedTime: insight.publishedAt } : {}),
      authors: [insight.author],
    },
    twitter: {
      card: "summary_large_image",
      title: insight.title,
      description: insight.excerpt,
    },
  };
}

export default async function InsightPage({ params }: Params) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const related = getRelatedInsights(slug);
  const minutes = estimateReadingTime(insight);
  const url = `${site.url}/insights/${insight.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    articleSection: insight.category,
    author: { "@type": "Organization", name: insight.author },
    publisher: {
      "@type": "Organization",
      name: site.legalEntity,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/images/brand/orbismoneta-logo.png`,
      },
    },
    mainEntityOfPage: url,
    ...(insight.publishedAt ? { datePublished: insight.publishedAt } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Article hero */}
      <article>
        <header className="relative isolate overflow-hidden border-b border-line bg-surface pt-28 pb-14 md:pt-36 md:pb-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:linear-gradient(to_right,rgba(0,46,166,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,46,166,.05)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]"
          />
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="flex flex-col gap-6 lg:col-span-7">
                {/*
                  The way back, at the top of the article rather than only at
                  the foot of it — a reader who opens a piece, reads two
                  paragraphs and wants the list again should not have to scroll
                  past the whole thing to find the door.

                  `scroll={false}` because the listing restores its own offset:
                  Next would otherwise reset to the top on navigation and the
                  restored position would land as a visible jump a frame later.
                  With no saved view the listing scrolls to the top itself, so
                  the direct-landing case is covered too.

                  A plain link, not `router.back()`. Back would work when the
                  reader came from the listing and take them somewhere else
                  entirely when they did not — from a related-article card, a
                  search result, a shared URL. This goes to the listing every
                  time, and the listing is what remembers where they were.
                */}
                <Link
                  href="/insights"
                  scroll={false}
                  className="group/back -mt-2 inline-flex w-fit items-center gap-2 text-[0.8125rem] font-medium text-ink-2 transition-colors hover:text-navy-600"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-line transition-[background-color,color,box-shadow] duration-200 group-hover/back:bg-navy-600 group-hover/back:text-white group-hover/back:ring-navy-600">
                    <Icon name="arrowLeft" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  Back to insights
                </Link>

                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full bg-navy-600 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white">
                    {insight.category}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-2 ring-1 ring-line">
                    {insight.type}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-2 ring-1 ring-line">
                    {insight.topic}
                  </span>
                </div>

                <h1 className="h-display-2 leading-[1.1]">{insight.title}</h1>

                <p className="max-w-2xl text-[1.125rem] leading-relaxed text-ink-2">
                  {insight.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
                  <div className="flex items-center gap-3">
                    {/* The author's own initials, not a hard-coded "OM".
                        Nine of these are bylined to OrbisMoneta and read the
                        same either way; the tenth is bylined to a person, and
                        an "OM" disc beside "Sanjay Bhoite" was simply wrong. */}
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-600 font-display text-[0.6875rem] font-bold text-white">
                      {insight.author
                        .split(/\s+/)
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[0.875rem] font-medium text-ink">
                        {insight.author}
                      </span>
                      <span className="text-[0.75rem] text-ink-3">
                        {insight.authorRole}
                      </span>
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="hidden h-8 w-px bg-line sm:block"
                  />
                  <span className="flex items-center gap-2 text-[0.8125rem] text-ink-2">
                    <Icon name="clock" className="h-4 w-4 text-ink-3" />
                    <span className="tabular">{minutes} min read</span>
                  </span>
                  {insight.publishedAt ? (
                    /* The date, and how long ago that was. `TimeAgo` renders
                       the absolute date on the server and swaps to a live
                       relative one on the client, so the pair reads "6 August
                       2026 · 12 days ago" and stays true however long this
                       build has been deployed. */
                    <span className="flex items-center gap-2 text-[0.8125rem] text-ink-2">
                      <Icon name="calendar" className="h-4 w-4 text-ink-3" />
                      <time dateTime={insight.publishedAt}>
                        {new Date(insight.publishedAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </time>
                      <span aria-hidden="true" className="text-ink-3">
                        ·
                      </span>
                      <TimeAgo
                        date={insight.publishedAt}
                        className="text-ink-3"
                      />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 rounded-full bg-gold-400/12 px-3 py-1 text-[0.75rem] font-medium text-gold-600">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-gold-500"
                        aria-hidden="true"
                      />
                      Draft outline — full copy in preparation
                    </span>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5">
                <InsightCover
                  insight={insight}
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  /* 16:9, the ratio supplied covers arrive in. At 16:10 this
                     box cropped 5% off each side of the artwork. */
                  className="aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)]"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="section bg-canvas">
          <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              {insight.body && insight.body.length > 0 ? (
                <InsightBody blocks={insight.body} />
              ) : (
                <div className="flex flex-col gap-8">
                  <p className="text-[1.125rem] leading-[1.75] text-ink-2">
                    {insight.excerpt}
                  </p>

                  <div className="flex flex-col gap-5">
                    <h2 className="h-display-4">What this piece covers</h2>
                    <ol className="flex flex-col gap-px overflow-hidden rounded-[var(--radius-card)] bg-line ring-1 ring-line">
                      {insight.outline.map((item, i) => (
                        <li
                          key={item}
                          className="flex items-start gap-4 bg-white px-6 py-5 text-[1rem] text-ink"
                        >
                          <span className="font-mono text-[0.75rem] tabular text-navy-600">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <aside className="flex gap-4 rounded-[var(--radius-card)] border border-dashed border-line-strong bg-surface/60 p-6">
                    <Icon
                      name="document"
                      className="h-5 w-5 shrink-0 text-navy-600"
                      strokeWidth={1.6}
                    />
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-[1rem]">
                        Full article in preparation
                      </h3>
                      <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                        The body copy, photography and video for this piece are
                        being finalised with the OrbisMoneta team. In the
                        meantime, speak to a practitioner directly about the
                        subject.
                      </p>
                    </div>
                  </aside>
                </div>
              )}

              {insight.media && insight.media.length > 0 && (
                <div className="mt-12 flex flex-col gap-6 border-t border-line pt-10">
                  <Eyebrow>Media</Eyebrow>
                  <InsightBody blocks={insight.media} />
                </div>
              )}

              <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
                <TextLink href="/insights" scroll={false}>
                  Back to all insights
                </TextLink>
                <ShareLinks url={url} title={insight.title} />
              </div>
            </div>

            {/* Rail */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 flex flex-col gap-5">
                {insight.relatedService && (
                  <div className="surface-deep on-dark flex flex-col gap-4 rounded-[var(--radius-card)] p-7">
                    <Eyebrow onDark>Related capability</Eyebrow>
                    <h2 className="text-[1.125rem] text-white">
                      {insight.relatedService.label}
                    </h2>
                    <p className="text-[0.875rem] leading-relaxed text-ink-inv-2">
                      Talk to the practitioners who build and operate this
                      capability for financial institutions.
                    </p>
                    <div className="flex flex-col gap-2.5">
                      <ButtonLink
                        href={insight.relatedService.href}
                        tone="onDark"
                        size="sm"
                        icon="arrowRight"
                      >
                        Explore the service
                      </ButtonLink>
                      <ButtonLink href="/contact" tone="onDarkGhost" size="sm">
                        Contact us
                      </ButtonLink>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3 rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line">
                  <Eyebrow>Details</Eyebrow>
                  <dl className="flex flex-col gap-3 text-[0.8125rem]">
                    <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                      <dt className="text-ink-3">Category</dt>
                      <dd className="text-right font-medium text-ink">
                        {insight.category}
                      </dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                      <dt className="text-ink-3">Format</dt>
                      <dd className="font-medium text-ink">{insight.type}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-ink-3">Reading time</dt>
                      <dd className="tabular font-medium text-ink">
                        {minutes} min
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related */}
      <DarkSection grid={false}>
        <div className="shell section">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-3">
              <Eyebrow onDark>Keep reading</Eyebrow>
              <h2 className="h-display-3 text-white">Related insights</h2>
            </div>
            <Link
              href="/insights"
              className="group/all inline-flex items-center gap-2 text-sm font-medium text-sky-400 hover:text-white"
            >
              View all
              <Icon
                name="arrowRight"
                className="h-4 w-4 transition-transform group-hover/all:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </div>
          <ul className="grid gap-6 md:grid-cols-3">
            {related.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 80} className="h-full">
                <InsightCard insight={item} />
              </Reveal>
            ))}
          </ul>
        </div>
      </DarkSection>
    </>
  );
}
