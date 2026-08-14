import type { Metadata } from "next";
import { contactPage, contactRoutes } from "@/content/contact";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you are working on — a strategy question, a product challenge, a partnership opportunity or a media enquiry. The right person at OrbisMoneta will respond directly.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        title={
          <>
            Start a <span className="text-brand-gradient">conversation</span>.
          </>
        }
        intro={contactPage.intro}
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section ground-soft bg-canvas">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Form — the primary action on this page */}
          <div className="lg:col-span-7">
            <Reveal className="rounded-[--radius-card] bg-white p-8 ring-1 ring-line shadow-[var(--shadow-card)] md:p-10">
              <EnquiryForm mode="requirements" />
            </Reveal>
          </div>

          {/* Supporting detail */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/*
              Per the client brief the four contact routes now live inside the
              form's first dropdown. They are repeated here as reference only,
              collapsed by default so the form stays the focus of the page.
            */}
            <Reveal delay={80} className="rounded-[--radius-card] bg-surface ring-1 ring-line">
              <details className="group/routes">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden">
                  <span className="flex flex-col gap-1">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-navy-600">
                      Where your enquiry goes
                    </span>
                    <span className="text-[0.9375rem] font-medium text-ink">
                      Four desks, one form
                    </span>
                  </span>
                  <Icon
                    name="chevronDown"
                    className="h-4 w-4 shrink-0 text-ink-2 transition-transform duration-200 group-open/routes:rotate-180"
                    strokeWidth={2}
                  />
                </summary>
                <ul className="flex flex-col gap-px border-t border-line bg-line">
                  {contactRoutes.map((route) => (
                    <li key={route.id} className="flex flex-col gap-1.5 bg-surface px-6 py-5">
                      <h2 className="text-[0.9375rem] font-medium text-ink">{route.title}</h2>
                      <p className="text-[0.8125rem] leading-relaxed text-ink-2">{route.body}</p>
                      <a
                        href={`mailto:${route.email}`}
                        className="w-fit text-[0.8125rem] font-medium text-navy-600 underline underline-offset-4 hover:text-navy-800"
                      >
                        {route.email}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </Reveal>

            {/* Registered office */}
            <Reveal delay={140} className="flex flex-col gap-5 rounded-[--radius-card] bg-white p-7 ring-1 ring-line">
              <Eyebrow>Registered office</Eyebrow>
              <address className="flex flex-col gap-4 text-[0.875rem] not-italic text-ink-2">
                <div className="flex items-start gap-3">
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-navy-600" />
                  <span>
                    {site.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </div>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-navy-600"
                >
                  <Icon name="mail" className="h-4 w-4 shrink-0 text-navy-600" />
                  {site.email}
                </a>
                <a
                  href={site.url}
                  className="flex items-center gap-3 transition-colors hover:text-navy-600"
                >
                  <Icon name="globe" className="h-4 w-4 shrink-0 text-navy-600" />
                  www.orbismoneta.com
                </a>
              </address>
            </Reveal>

            {/* Trust note */}
            <Reveal
              delay={200}
              className="surface-deep on-dark flex gap-4 rounded-[--radius-card] p-6"
            >
              <Icon name="lock" className="h-5 w-5 shrink-0 text-sky-400" strokeWidth={1.6} />
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[0.9375rem] text-white">What happens next</h2>
                <p className="text-[0.8125rem] leading-relaxed text-ink-inv-2">
                  {contactPage.reassurance}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
