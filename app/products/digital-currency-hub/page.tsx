import type { Metadata } from "next";
import { digitalCurrencyHub as dch } from "@/content/product";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { DemoCta } from "@/components/DemoCta";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { DarkSection, Eyebrow, SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Digital Currency Hub™ — Retail CBDC Platform for Commercial Banks",
  description:
    "The OrbisMoneta Digital Currency Hub enables commercial banks to launch and manage Retail CBDC services through seamless integration with a Central Bank's CBDC infrastructure.",
  alternates: { canonical: "/products/digital-currency-hub" },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Digital Currency Hub",
  applicationCategory: "BusinessApplication",
  description: dch.intro[0],
  brand: { "@type": "Brand", name: site.name },
  publisher: { "@type": "Organization", name: site.legalEntity },
  offers: {
    "@type": "AggregateOffer",
    offerCount: dch.deployment.models.length,
    availability: "https://schema.org/InStock",
  },
};

export default function DigitalCurrencyHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <PageHero
        eyebrow={dch.eyebrow}
        title={
          <>
            {dch.name}
            <span className="mt-3 block h-display-4 font-semibold text-ink-2">
              {dch.descriptor}
            </span>
          </>
        }
        intro={dch.intro[0]}
        crumbs={[{ label: "Products", href: "/products/digital-currency-hub" }, { label: dch.name }]}
        actions={
          <>
            <DemoCta />
            <ButtonLink href="#deployment" tone="secondary">
              Deployment options
            </ButtonLink>
          </>
        }
        aside={
          <div className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-line shadow-[var(--shadow-card)]">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-navy-600">
              Designed for
            </p>
            <ul className="flex flex-col gap-3">
              {dch.designedFor.map((audience) => (
                <li key={audience} className="flex items-center gap-3 text-[0.9375rem] text-ink">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-green-500" strokeWidth={2.4} />
                  {audience}
                </li>
              ))}
            </ul>
            <p className="mt-2 border-t border-line pt-4 text-[0.875rem] leading-relaxed text-ink-2">
              {dch.intro[1]}
            </p>
          </div>
        }
      />

      {/* Why */}
      <section className="section ground-soft bg-canvas">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal kind="fade">
              <Eyebrow>The case</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 h-display-2">{dch.why.heading}</h2>
            </Reveal>
          </div>
          <div className="flex flex-col gap-5 lg:col-span-7">
            {dch.why.body.map((paragraph, i) => (
              <Reveal key={i} delay={100 + i * 80}>
                <p className="text-[1.0625rem] leading-relaxed text-ink-2 md:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <DarkSection id="architecture">
        <div className="shell section">
          <SectionHeading
            onDark
            align="center"
            eyebrow={dch.architecture.eyebrow}
            title={dch.architecture.headline}
            intro={dch.architecture.subline}
            className="mx-auto mb-14"
          />

          <div className="mx-auto flex max-w-4xl flex-col items-center">
            {/* Central bank */}
            <Reveal className="w-full rounded-xl bg-white/[0.045] px-6 py-5 text-center ring-1 ring-white/12">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-sky-400">
                {dch.architecture.top.title}
              </p>
              <p className="mt-1.5 text-[0.9375rem] text-white">{dch.architecture.top.body}</p>
              <p className="mt-1 text-[0.75rem] text-ink-inv-3">{dch.architecture.top.note}</p>
            </Reveal>

            <Rail />

            {/* Hub */}
            <Reveal className="w-full rounded-xl bg-[linear-gradient(100deg,rgba(0,46,166,.85),rgba(1,164,255,.32)_60%,rgba(1,172,50,.28))] p-px">
              <div className="flex flex-col items-center gap-1.5 rounded-[calc(0.75rem-1px)] bg-abyss/90 px-6 py-7 text-center">
                <p className="font-mono text-[0.625rem] tracking-[0.2em] text-sky-300 uppercase">
                  {dch.architecture.centre.brand}
                </p>
                <h3 className="text-[1.375rem] text-white md:text-[1.625rem]">
                  {dch.architecture.centre.title}
                </h3>
                <p className="text-[0.875rem] text-ink-inv-2">{dch.architecture.centre.body}</p>
              </div>
            </Reveal>

            <Rail />

            {/* Commercial banks */}
            <Reveal className="w-full rounded-xl bg-white/[0.045] px-6 py-5 text-center ring-1 ring-white/12">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-green-400">
                {dch.architecture.bank.title}
              </p>
              <p className="mx-auto mt-1.5 max-w-lg text-[0.9375rem] text-ink-inv-2">
                {dch.architecture.bank.body}
              </p>
            </Reveal>

            <Rail />

            {/* Participants */}
            <ul className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {dch.architecture.participants.map((participant, i) => (
                <Reveal
                  as="li"
                  key={participant.title}
                  delay={i * 70}
                  className="flex h-full flex-col gap-2.5 rounded-xl bg-white/[0.035] p-5 ring-1 ring-white/10 transition-colors hover:bg-white/[0.07]"
                >
                  <Icon
                    name={participant.icon as never}
                    className="h-5 w-5 text-sky-400"
                    strokeWidth={1.5}
                  />
                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-white">
                    {participant.title}
                  </p>
                  <p className="text-[0.8125rem] leading-relaxed text-ink-inv-3">
                    {participant.body}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Attributes */}
          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {dch.architecture.attributes.map((attribute) => (
              <li
                key={attribute.title}
                className="flex flex-col gap-2 bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.07]"
              >
                <Icon
                  name={attribute.icon as never}
                  className="h-5 w-5 text-green-400"
                  strokeWidth={1.5}
                />
                <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-white uppercase">
                  {attribute.title}
                </h3>
                <p className="text-[0.8125rem] leading-relaxed text-ink-inv-3">{attribute.body}</p>
              </li>
            ))}
          </ul>

          <Reveal className="mt-10 flex flex-col items-center gap-1.5 text-center">
            <p className="font-display text-lg font-bold tracking-[0.06em] text-white uppercase">
              {dch.architecture.footer.title}
            </p>
            <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-sky-300 uppercase">
              {dch.architecture.footer.body}
            </p>
          </Reveal>
        </div>
      </DarkSection>

      {/* Capabilities / benefits */}
      <section className="section ground-soft bg-canvas" id="capabilities">
        <div className="shell">
          <SectionHeading
            eyebrow="Platform"
            title="Capabilities, audience and business outcomes."
            className="mb-12"
          />
          <div className="grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Panel title="Key capabilities" tone="primary">
                <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                  {dch.capabilities.map((capability) => (
                    <li key={capability} className="flex items-start gap-2.5 text-[0.9375rem]">
                      <Icon
                        name="check"
                        className="mt-0.5 h-4 w-4 shrink-0 text-navy-600"
                        strokeWidth={2.4}
                      />
                      {capability}
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>

            <Reveal delay={80} className="lg:col-span-3">
              <Panel title="Designed for">
                <ul className="flex flex-col gap-2.5">
                  {dch.designedFor.map((audience) => (
                    <li key={audience} className="flex items-start gap-2.5 text-[0.9375rem]">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
                      />
                      {audience}
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>

            <Reveal delay={160} className="lg:col-span-4">
              <Panel title="Business benefits">
                <ul className="flex flex-col gap-2.5">
                  {dch.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-[0.9375rem]">
                      <Icon
                        name="arrowUpRight"
                        className="mt-0.5 h-4 w-4 shrink-0 text-green-500"
                        strokeWidth={2}
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Panel>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Deployment */}
      <section className="section ground-soft bg-surface" id="deployment">
        <div className="shell">
          <SectionHeading
            eyebrow={dch.deployment.eyebrow}
            title={dch.deployment.lead}
            intro={dch.deployment.body}
            className="mb-12"
          />

          <div className="grid gap-5 md:grid-cols-2">
            {dch.deployment.editions.map((edition, i) => (
              <Reveal
                key={edition.name}
                delay={i * 90}
                className="flex h-full flex-col gap-4 rounded-[var(--radius-card)] bg-white p-8 ring-1 ring-line transition-shadow duration-300 hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex items-baseline gap-3">
                  <h3 className="text-[1.25rem]">{edition.name}</h3>
                  {edition.aside && (
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-3">
                      {edition.aside}
                    </span>
                  )}
                </div>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">{edition.body}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-3">
                  {edition.traits.map((trait) => (
                    <li
                      key={trait}
                      className="rounded-full bg-surface px-3 py-1.5 text-[0.75rem] text-ink-2 ring-1 ring-line"
                    >
                      {trait}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 rounded-[var(--radius-card)] bg-white px-7 py-5 ring-1 ring-line">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-3">
              Delivery models
            </p>
            {dch.deployment.models.map((model) => (
              <span key={model} className="text-[0.875rem] font-medium text-ink">
                {model}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Why banks choose us */}
      <DarkSection>
        <div className="shell section grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow onDark>Confidence</Eyebrow>
            <h2 className="mt-4 h-display-2 text-white">
              {dch.whyBanks.heading}
            </h2>
            <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-ink-inv-2">
              {dch.closing.tagline}
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-xl ring-1 ring-white/10 lg:col-span-7">
            {dch.whyBanks.reasons.map((reason, i) => (
              <li
                key={reason}
                className="flex items-start gap-4 bg-white/[0.03] px-6 py-5 transition-colors hover:bg-white/[0.07]"
              >
                <span className="font-mono text-[0.6875rem] tabular text-sky-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem] text-ink-inv-2">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </DarkSection>

      {/* Closing */}
      <section className="section ground-soft bg-canvas">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="flex flex-col gap-4 lg:col-span-7">
            <Eyebrow>{dch.closing.heading}</Eyebrow>
            <h2 className="h-display-2">{dch.cta.headline}</h2>
            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-ink-2">
              {dch.closing.body}
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-surface p-8 ring-1 ring-line lg:col-span-5">
            <p className="text-[0.9375rem] leading-relaxed text-ink-2">{dch.cta.body}</p>
            <DemoCta size="lg" className="w-full" />
          </div>
        </div>
      </section>
    </>
  );
}

function Rail() {
  return (
    <div aria-hidden="true" className="flex h-12 items-center justify-center">
      <span className="h-full w-px bg-[linear-gradient(to_bottom,transparent,rgba(1,164,255,.6),transparent)]" />
    </div>
  );
}

function Panel({
  title,
  tone = "default",
  children,
}: {
  title: string;
  tone?: "default" | "primary";
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        tone === "primary"
          ? "flex h-full flex-col gap-4 rounded-[var(--radius-card)] bg-navy-50/60 p-7 ring-1 ring-navy-100"
          : "flex h-full flex-col gap-4 rounded-[var(--radius-card)] bg-surface p-7 ring-1 ring-line"
      }
    >
      <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-navy-600">
        {title}
      </h3>
      <div className="text-ink">{children}</div>
    </div>
  );
}
