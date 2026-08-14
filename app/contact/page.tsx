import type { Metadata } from "next";
import { contactPage, contactRoutes } from "@/content/contact";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us what you are working on — a strategy question, a product challenge, a partnership opportunity or a media enquiry. The right person at OrbisMoneta will respond directly.",
  alternates: { canonical: "/contact" },
};

/** Icon per desk. Presentation only — each says nothing the title does not. */
const ROUTE_ICONS: Record<string, IconName> = {
  strategy: "phone",
  partnership: "user",
  media: "document",
  general: "clock",
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
        {/*
          Routes on the left, form on the right — the order the reference puts
          them in, and the order that reads: what each desk is for, then the one
          form that reaches them. The split is 5/7 rather than an even half, so
          the form gets the wider column; it is the thing people came to fill in.
        */}
        <div className="shell grid items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-14">
          {/* ── Left: where an enquiry goes ─────────────────────────────── */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {/*
              The four desks, open rather than folded into a `details`. They
              were collapsed to keep the form the focus; with the form now in
              its own column there is nothing to compete with, and a summary
              nobody opens is a list nobody reads.
            */}
            {contactRoutes.map((route, i) => (
              <Reveal
                key={route.id}
                delay={i * 70}
                className="group/route flex items-start gap-4 rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line shadow-[0_1px_2px_rgba(10,21,51,.03)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_2px_6px_rgba(10,21,51,.05),0_20px_38px_-22px_rgba(0,46,166,.35)] motion-reduce:hover:translate-y-0"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-600/10 text-navy-600 ring-1 ring-navy-600/12 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/route:scale-110 group-hover/route:[transform:perspective(520px)_rotateY(-12deg)] group-hover/route:bg-navy-600 group-hover/route:text-white group-hover/route:ring-navy-600">
                  <Icon name={ROUTE_ICONS[route.id] ?? "mail"} className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-[0.9375rem] font-medium text-ink">{route.title}</h2>
                  <p className="text-[0.8125rem] leading-relaxed text-ink-2">{route.body}</p>
                  <a
                    href={`mailto:${route.email}`}
                    className="w-fit text-[0.8125rem] font-medium text-navy-600 underline underline-offset-4 transition-colors hover:text-navy-800"
                  >
                    {route.email}
                  </a>
                </div>
              </Reveal>
            ))}

            {/* Registered office */}
            <Reveal delay={300} className="flex flex-col gap-5 rounded-[var(--radius-card)] bg-surface p-6 ring-1 ring-line">
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
              delay={360}
              className="surface-deep on-dark flex gap-4 rounded-[var(--radius-card)] p-6"
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

          {/* ── Right: the form ─────────────────────────────────────────── */}
          <div className="lg:col-span-7">
            <Reveal
              delay={60}
              className="relative overflow-hidden rounded-[var(--radius-card)] bg-white p-8 ring-1 ring-line shadow-[0_2px_6px_rgba(10,21,51,.04),0_28px_60px_-34px_rgba(10,21,51,.28)] md:p-10"
            >
              {/* Brand edge across the top of the card. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-navy-600),var(--color-sky-500)_58%,var(--color-green-500))]"
              />
              <EnquiryForm mode="requirements" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
