import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Section";

/**
 * Legal pages.
 *
 * OUTSTANDING FROM CLIENT: "Privacy Policy, Terms of Use and Disclaimer pages
 * are not written. Supply approved legal copy." These routes exist with the
 * correct structure, metadata and navigation so approved copy can be dropped
 * in without touching the build — we will not draft legal terms on the
 * client's behalf.
 */
const documents = {
  privacy: {
    title: "Privacy Policy",
    intro:
      "How OrbisMoneta collects, uses, stores and protects the personal information shared with us.",
    sections: [
      "Information we collect",
      "How we use information",
      "Legal basis for processing",
      "Sharing and disclosure",
      "Data retention",
      "Your rights",
      "International transfers",
      "Contacting us about privacy",
    ],
  },
  terms: {
    title: "Terms of Use",
    intro:
      "The terms governing your access to and use of the OrbisMoneta website.",
    sections: [
      "Acceptance of terms",
      "Permitted use",
      "Intellectual property",
      "Third-party links",
      "Limitation of liability",
      "Governing law",
      "Changes to these terms",
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    intro:
      "The basis on which information published on this website is provided, and its limitations.",
    sections: [
      "General information only",
      "No professional or financial advice",
      "Forward-looking statements",
      "External sources and links",
      "Product and service availability",
    ],
  },
} as const;

type DocumentKey = keyof typeof documents;
type Params = { params: Promise<{ document: string }> };

export function generateStaticParams() {
  return (Object.keys(documents) as DocumentKey[]).map((document) => ({
    document,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { document } = await params;
  const doc = documents[document as DocumentKey];
  if (!doc) return { title: "Not found" };
  return {
    title: doc.title,
    description: doc.intro,
    alternates: { canonical: `/legal/${document}` },
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({ params }: Params) {
  const { document } = await params;
  const doc = documents[document as DocumentKey];
  if (!doc) notFound();

  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} intro={doc.intro} />

      <section className="section bg-canvas">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-8 lg:col-span-8">
            <Reveal className="flex gap-4 rounded-[var(--radius-card)] border border-dashed border-line-strong bg-surface/60 p-6">
              <Icon
                name="document"
                className="h-5 w-5 shrink-0 text-navy-600"
                strokeWidth={1.6}
              />
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[1rem]">Approved copy pending</h2>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                  The final wording of this {doc.title.toLowerCase()} is being
                  prepared by {site.legalEntity}. The structure below reflects
                  the sections the published document will cover.
                </p>
              </div>
            </Reveal>

            <div className="flex flex-col gap-4">
              <Eyebrow>Sections</Eyebrow>
              <ol className="flex flex-col gap-px overflow-hidden rounded-[var(--radius-card)] bg-line ring-1 ring-line">
                {doc.sections.map((section, i) => (
                  <li
                    key={section}
                    className="flex items-center gap-4 bg-white px-6 py-4 text-[0.9375rem] text-ink"
                  >
                    <span className="font-mono text-[0.75rem] tabular text-ink-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 flex flex-col gap-4 rounded-[var(--radius-card)] bg-surface p-7 ring-1 ring-line">
              <Eyebrow>Questions?</Eyebrow>
              <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                For any question about how we handle your information, contact
                us directly and we will respond within one business day.
              </p>
              <ButtonLink href="/contact" icon="arrowRight" className="w-fit">
                Contact us
              </ButtonLink>
              <p className="border-t border-line pt-4 text-[0.75rem] text-ink-3">
                {site.legal.brandLine}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
