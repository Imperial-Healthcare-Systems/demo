import type { Metadata } from "next";
import { services, advisoryPage } from "@/content/advisory";
import { PageHero } from "@/components/PageHero";
import { CapabilityOrbit } from "@/components/CapabilityOrbit";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { DarkSection, Eyebrow, SectionHeading } from "@/components/Section";
import type { IconName } from "@/components/Icon";

/** Advise · Architect · Build, in the order the content declares them. */
const STEP_ICONS: IconName[] = ["target", "layers", "code"];

export const metadata: Metadata = {
  title: "Strategic Advisory & Engineering Services",
  description:
    "OrbisMoneta helps banks, financial institutions, payment providers and fintechs design, modernize and build next-generation financial infrastructure across six service lines.",
  alternates: { canonical: "/advisory" },
};

/**
 * One tone per service line, cycling navy · sky · green — the logo's order, and
 * the same rotation the home page's reason cards, the Lab themes, the partner
 * tiers and the About capability deck use. Literal class strings, because
 * Tailwind only generates names it can find as text.
 */
const SERVICE_TONES = [
  {
    tile: "bg-navy-600/10 text-navy-600 ring-navy-600/15 group-hover/svc:bg-[linear-gradient(140deg,var(--color-navy-600),var(--color-navy-400))] group-hover/svc:text-white group-hover/svc:ring-navy-600 group-hover/svc:shadow-[0_10px_22px_-10px_rgba(0,46,166,.6)]",
    index: "text-ink-3 group-hover/svc:text-navy-600",
    bar: "bg-[linear-gradient(90deg,var(--color-navy-600),var(--color-navy-400))]",
    lift: "hover:ring-navy-600/25 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_24px_46px_-20px_rgba(10,21,51,.26),0_44px_72px_-44px_rgba(0,46,166,.5)]",
  },
  {
    tile: "bg-sky-500/12 text-sky-600 ring-sky-500/20 group-hover/svc:bg-[linear-gradient(140deg,var(--color-sky-500),var(--color-sky-400))] group-hover/svc:text-white group-hover/svc:ring-sky-500 group-hover/svc:shadow-[0_10px_22px_-10px_rgba(1,164,255,.6)]",
    index: "text-ink-3 group-hover/svc:text-sky-600",
    bar: "bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-sky-400))]",
    lift: "hover:ring-sky-500/30 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_24px_46px_-20px_rgba(10,21,51,.26),0_44px_72px_-44px_rgba(1,164,255,.5)]",
  },
  {
    tile: "bg-green-500/12 text-green-600 ring-green-500/20 group-hover/svc:bg-[linear-gradient(140deg,var(--color-green-500),var(--color-green-400))] group-hover/svc:text-white group-hover/svc:ring-green-500 group-hover/svc:shadow-[0_10px_22px_-10px_rgba(1,172,50,.6)]",
    index: "text-ink-3 group-hover/svc:text-green-600",
    bar: "bg-[linear-gradient(90deg,var(--color-green-500),var(--color-green-400))]",
    lift: "hover:ring-green-500/30 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_24px_46px_-20px_rgba(10,21,51,.26),0_44px_72px_-44px_rgba(1,172,50,.5)]",
  },
];

export default function AdvisoryPage() {
  return (
    <>
      <PageHero
        eyebrow={advisoryPage.eyebrow}
        title={advisoryPage.headline}
        accent={advisoryPage.headlineAccent}
        intro={advisoryPage.intro}
        crumbs={[{ label: "Advisory" }]}
        aside={<CapabilityOrbit />}
        actions={
          <>
            <ButtonLink href="/contact" icon="arrowRight">
              Talk to Our Experts
            </ButtonLink>
            <ButtonLink href="/products/digital-currency-hub" tone="secondary">
              See our platform
            </ButtonLink>
          </>
        }
        /*
          The reference puts a row of proof points here. Rather than write new
          claims for it, this is the page's own Advise / Architect / Build spine
          stated once up front — the Approach section below then expands each.
        */
        footer={
          <ul className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            {advisoryPage.approach.steps.map((step, i) => (
              <li key={step.step} className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600">
                  <Icon name={STEP_ICONS[i]} className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.7} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[0.9375rem] leading-snug font-semibold text-ink">
                    {step.step}
                  </span>
                  <span className="text-[0.8125rem] leading-relaxed text-ink-2">{step.body}</span>
                </span>
              </li>
            ))}
          </ul>
        }
      />

      {/* Service lines */}
      <section className="section ground-soft bg-canvas">
        <div className="shell">
          <SectionHeading
            eyebrow="Six service lines"
            title="Our Services"
            intro="Each engagement pairs domain practitioners with engineers, so the recommendation and the implementation come from the same team."
            className="mb-14"
          />

          <div className="flex flex-col gap-4">
            {services.map((service, i) => {
              const tone = SERVICE_TONES[i % SERVICE_TONES.length];
              return (
              <Reveal
                key={service.id}
                id={service.id}
                delay={i * 50}
                /*
                  Lift, a brand rule drawn across the top, a tone-filled tile
                  and a sheen raking over as the pointer arrives — the same
                  vocabulary the partner tiers and capability deck use, so the
                  pages read as one system rather than six treatments.
                  `transition-[transform,box-shadow]` and not `all`: `all` drags
                  the ring and the tile background onto the same curve, and both
                  of those want to snap.
                */
                className={`group/svc relative overflow-hidden rounded-[var(--radius-card)] bg-white p-7 ring-1 ring-line shadow-[0_1px_2px_rgba(10,21,51,.04),0_12px_28px_-20px_rgba(10,21,51,.22)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 motion-reduce:hover:translate-y-0 md:p-9 ${tone.lift}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/svc:scale-x-100 ${tone.bar}`}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/4 w-1/4 bg-[linear-gradient(90deg,transparent,rgba(1,164,255,.10),transparent)] opacity-0 group-hover/svc:animate-[om-sheen_1.15s_ease-out] group-hover/svc:opacity-100 motion-reduce:hidden"
                />

                <div className="relative grid gap-7 lg:grid-cols-12 lg:gap-10">
                  <div className="flex items-start gap-5 lg:col-span-5">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/svc:scale-110 group-hover/svc:[transform:perspective(520px)_rotateY(-12deg)] ${tone.tile}`}>
                      <Icon name={service.icon as never} className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <div className="flex flex-col gap-2">
                      <span className={`font-mono text-[0.6875rem] tabular transition-colors duration-300 ${tone.index}`}>
                        {service.index}
                      </span>
                      <h3 className="text-[1.25rem] leading-snug md:text-[1.375rem]">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <p className="text-[0.9375rem] leading-relaxed text-ink-2">
                      {service.promise}
                    </p>
                  </div>

                  <div className="lg:col-span-3">
                    <p className="mb-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-3">
                      Focus areas
                    </p>
                    <ul className="flex flex-col gap-2">
                      {service.focusAreas.map((area) => (
                        <li
                          key={area}
                          className="flex items-start gap-2.5 text-[0.875rem] text-ink"
                        >
                          <Icon
                            name="check"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500"
                            strokeWidth={2.4}
                          />
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach — the Advisory mega-menu's feature card deep-links to #approach */}
      <DarkSection>
        <div id="approach" className="shell section">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-5 lg:col-span-5">
              <Eyebrow onDark>{advisoryPage.approach.eyebrow}</Eyebrow>
              <h2 className="h-display-2 text-white">
                {advisoryPage.approach.heading}
              </h2>
              <p className="max-w-md text-[1.0625rem] leading-relaxed text-ink-inv-2">
                {advisoryPage.approach.body}
              </p>
            </div>

            <ol className="flex flex-col lg:col-span-7">
              {advisoryPage.approach.steps.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.step}
                  delay={i * 90}
                  className="flex gap-6 border-b border-white/10 py-6 first:border-t"
                >
                  <span className="font-mono text-[0.6875rem] tabular text-sky-400">
                    0{i + 1}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-lg text-white">{step.step}</h3>
                    <p className="text-[0.9375rem] leading-relaxed text-ink-inv-2">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </DarkSection>

      {/* Closing */}
      <section className="section ground-soft bg-surface">
        <div className="shell flex flex-col items-start gap-6 md:items-center md:text-center">
          <Eyebrow>{advisoryPage.closing.eyebrow}</Eyebrow>
          <h2 className="max-w-3xl h-display-2">
            Let&apos;s Shape the{" "}
            <span className="text-brand-gradient">Future of Financial Infrastructure</span>.
          </h2>
          <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2">
            {advisoryPage.closing.body}
          </p>
          <ButtonLink
            href={advisoryPage.closing.cta.href}
            size="lg"
            icon="arrowRight"
            className="mt-2"
          >
            {advisoryPage.closing.cta.label}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
