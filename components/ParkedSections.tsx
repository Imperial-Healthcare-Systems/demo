import Link from "next/link";
import { services } from "@/content/advisory";
import { getAllInsights } from "@/content/insights";
import { capabilityTicker } from "@/content/site";
import { InsightCard } from "@/components/InsightCard";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/Section";
import { ButtonLink, TextLink } from "@/components/Button";
import { Icon } from "@/components/Icon";

/**
 * Parked home-page sections.
 *
 * The home page was cut back to hero → industries → why → one ask. These blocks
 * came off it and are held here, built and working, until the client says where
 * they should go. They were inline in `app/page.tsx`; lifting them into
 * components rather than deleting them means re-mounting any of them is a
 * single line, and nothing had to be rewritten from scratch.
 *
 * Also parked, and already components elsewhere:
 *   · `Proposition`   — components/home/sections.tsx
 *   · `FutureOfMoney` — components/home/sections.tsx
 *   · `ClosingCta`    — components/home/sections.tsx
 *
 * Nothing here is dead code the linter should strip — it is deliberately
 * retained. Do not delete without asking.
 */

/** The twelve-capability ticker that used to sit under the hero. */
export function CapabilityTicker() {
  return (
    <div className="border-y border-line bg-canvas py-4">
      <Marquee items={capabilityTicker} duration={62} />
    </div>
  );
}

/** Six service lines, linking through to the Services page. */
export function ServicesIndex() {
  return (
    <section className="section bg-surface">
      <div className="shell">
        <SectionHeading
          eyebrow="Strategic advisory & engineering"
          title="Six service lines across the modern financial stack."
          intro="Advise, architect and build — delivered by one accountable team from strategy through to production."
          action={
            <ButtonLink href="/advisory" tone="secondary" icon="arrowRight">
              All services
            </ButtonLink>
          }
          className="mb-12"
        />

        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-line ring-1 ring-line md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal
              as="li"
              key={service.id}
              delay={i * 60}
              className="group/service relative flex flex-col gap-3 bg-white p-7 transition-colors hover:bg-navy-50/50"
            >
              <div className="flex items-center justify-between">
                <Icon
                  name={service.icon as never}
                  className="h-6 w-6 text-navy-600"
                  strokeWidth={1.5}
                />
                <span className="font-mono text-[0.6875rem] tabular text-ink-3">
                  {service.index}
                </span>
              </div>
              <h3 className="text-[1.0625rem] leading-snug">
                <Link
                  href={`/advisory#${service.id}`}
                  className="after:absolute after:inset-0 group-hover/service:text-navy-600"
                >
                  {service.title}
                </Link>
              </h3>
              <p className="text-[0.875rem] leading-relaxed text-ink-2">{service.promise}</p>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {service.focusAreas.slice(0, 3).map((area) => (
                  <li
                    key={area}
                    className="rounded-full bg-surface px-2.5 py-1 text-[0.6875rem] text-ink-3 ring-1 ring-line"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The three most recent insights. */
export function InsightsTeaser() {
  const latestInsights = getAllInsights().slice(0, 3);
  return (
    <section className="section bg-canvas">
      <div className="shell">
        <SectionHeading
          eyebrow="Insights"
          title="Perspectives on the future of money."
          intro="Research, analysis and field notes from practitioners engineering financial infrastructure."
          action={
            <TextLink href="/insights" className="text-base">
              View all insights
            </TextLink>
          }
          className="mb-12"
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {latestInsights.map((insight, i) => (
            <Reveal as="li" key={insight.slug} delay={i * 80} className="h-full">
              <InsightCard insight={insight} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
