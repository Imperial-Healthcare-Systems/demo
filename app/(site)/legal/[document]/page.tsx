import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import {
  legalDocuments,
  type LegalBlock,
  type LegalDocumentKey,
} from "@/content/legal";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Section";
import { slugify } from "@/lib/utils";

/**
 * Legal pages — Privacy Policy, Terms of Use and Disclaimer.
 *
 * These carried a "approved copy pending" panel and a list of the headings the
 * finished document would cover. The wording now lives in content/legal.ts.
 * Read the header of that file before treating any of it as settled: it is
 * careful, it is written against what this site actually does, and it has not
 * been through a lawyer.
 */

type Params = { params: Promise<{ document: string }> };

export function generateStaticParams() {
  return (Object.keys(legalDocuments) as LegalDocumentKey[]).map((document) => ({
    document,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { document } = await params;
  const doc = legalDocuments[document as LegalDocumentKey];
  if (!doc) return { title: "Not found" };
  return {
    title: doc.title,
    description: doc.intro,
    alternates: { canonical: `/legal/${document}` },
    /*
      Indexed, where these used to be `index: false`.

      That was right while they were placeholders — there was nothing worth
      finding and a page saying "copy pending" is not what you want returned
      for "OrbisMoneta privacy". Now that they are real they should be
      findable: a procurement or vendor-risk team looks for exactly these
      pages before they will talk to you, and some jurisdictions expect a
      privacy notice to be publicly accessible.
    */
    robots: { index: true, follow: true },
  };
}

/** The date, spelled out. "19 August 2026", not "19/08/2026", which is
 *  ambiguous to half the world this site is written for. */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="text-[1rem] leading-[1.75] text-ink-2">{block.text}</p>
    );
  }

  if (block.type === "note") {
    // The points people actually need to notice — that no relationship is
    // created by reading, that no trackers are set. Set apart rather than
    // buried in a run of paragraphs that all look the same.
    return (
      <div className="flex gap-3.5 rounded-[var(--radius-tile)] border border-navy-600/20 bg-navy-50/60 p-5">
        <Icon
          name="spark"
          className="h-5 w-5 shrink-0 text-navy-600"
          strokeWidth={1.6}
          aria-hidden="true"
        />
        <p className="text-[0.9375rem] leading-relaxed text-ink">{block.text}</p>
      </div>
    );
  }

  const Tag = block.ordered ? "ol" : "ul";
  return (
    <Tag className="flex flex-col gap-2.5 pl-1">
      {block.items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-[1rem] leading-relaxed text-ink-2"
        >
          {block.ordered ? (
            <span className="mt-0.5 font-mono text-[0.75rem] tabular text-navy-600">
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-600/45"
            />
          )}
          {item}
        </li>
      ))}
    </Tag>
  );
}

export default async function LegalPage({ params }: Params) {
  const { document } = await params;
  const doc = legalDocuments[document as LegalDocumentKey];
  if (!doc) notFound();

  const sections = doc.sections.map((section) => ({
    ...section,
    id: slugify(section.heading),
  }));

  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} intro={doc.intro} />

      <section className="section bg-canvas">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-10 lg:col-span-8">
            <p className="text-[0.875rem] text-ink-3">
              Last updated{" "}
              <time dateTime={doc.effective}>{formatDate(doc.effective)}</time>
            </p>

            {sections.map((section, i) => (
              <Reveal
                key={section.id}
                delay={Math.min(i, 4) * 50}
                /*
                  `scroll-mt` because the header is fixed. Without it a jump
                  from the contents list lands the heading underneath the bar,
                  which reads as the link having gone to the wrong place.
                */
                className="flex scroll-mt-28 flex-col gap-4"
                id={section.id}
              >
                <h2 className="text-[1.375rem] leading-snug">
                  {section.heading}
                </h2>
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </Reveal>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-6">
              {/*
                A contents list, because these are long and people arrive
                looking for one clause — "how long do you keep it", "which
                courts" — rather than to read the whole thing.
              */}
              <nav
                aria-label={`${doc.title} contents`}
                className="flex flex-col gap-3 rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line"
              >
                <Eyebrow>On this page</Eyebrow>
                <ol className="flex flex-col">
                  {sections.map((section, i) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex min-h-11 items-center gap-3 text-[0.875rem] leading-snug text-ink-2 transition-colors hover:text-navy-600 md:min-h-0 md:py-1.5"
                      >
                        <span className="font-mono text-[0.75rem] tabular text-ink-3 md:text-[0.6875rem]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line">
                <Eyebrow>Questions?</Eyebrow>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                  For any question about this {doc.title.toLowerCase()} or about
                  how we handle your information, contact us and we will respond
                  within one business day.
                </p>
                <ButtonLink href="/contact" icon="arrowRight" size="sm" className="w-fit">
                  Contact us
                </ButtonLink>
                <p className="border-t border-line pt-4 text-[0.75rem] leading-relaxed text-ink-3">
                  {site.legal.brandLine}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
