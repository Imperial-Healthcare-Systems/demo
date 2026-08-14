import Image from "next/image";
import Link from "next/link";
import {
  closingCta,
  futureOfMoney,
  industryContext,
  proposition,
  whyOrbisMoneta,
} from "@/content/home";
import { ButtonLink } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { DarkSection, Eyebrow, SectionHeading } from "@/components/Section";

/* ------------------------------------------------------------------ context */

export function IndustryContext() {
  const [lead, accent] = industryContext.headline.split(industryContext.headlineAccent);

  return (
    <section className="section relative isolate overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f6fc_55%,#eef1f9_100%)]">
      {/* Same aurora and contour language as the sub-page heroes, so the home
          page and the rest of the site read as one system rather than two. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_82%_22%,rgba(1,164,255,.12),transparent_64%),radial-gradient(40%_50%_at_8%_88%,rgba(1,172,50,.07),transparent_68%)]"
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-48 -z-10 hidden h-[42rem] w-[42rem] text-navy-600/[0.05] xl:block"
        viewBox="0 0 600 600"
        fill="none"
      >
        {[170, 240, 310].map((r) => (
          <circle key={r} cx="300" cy="300" r={r} stroke="currentColor" strokeWidth="1" />
        ))}
      </svg>
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Copy */}
        <div className="flex flex-col lg:col-span-6 xl:col-span-5">
          <Reveal kind="fade">
            <Eyebrow>{industryContext.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="mt-4 text-[2rem] leading-[1.02] font-semibold tracking-[-0.038em] text-ink md:text-[2.5rem]">
              {lead}
              <span className="text-brand-gradient">{industryContext.headlineAccent}</span>
              {accent}
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <span
              aria-hidden="true"
              className="mt-5 block h-[3px] w-16 rounded-full bg-[linear-gradient(90deg,#01a4ff,#01ac32)]"
            />
          </Reveal>

          {/*
            The four shifts as live text. They are also lettered into the globe
            artwork alongside, but baked pixels are not selectable, do not
            reflow and are invisible to a screen reader — so the words exist
            here, and the artwork reinforces them.
          */}
          <Reveal delay={140}>
            <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-5">
              {industryContext.shifts.map((shift) => (
                <li key={shift.label} className="group/shift flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-600 ring-1 ring-navy-100 transition-colors duration-200 group-hover/shift:bg-navy-600 group-hover/shift:text-white group-hover/shift:ring-navy-600">
                    <Icon name={shift.icon as IconName} className="h-3.5 w-3.5" strokeWidth={1.7} />
                  </span>
                  <span className="text-[0.8125rem] font-medium whitespace-nowrap text-ink">
                    {shift.label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-7 max-w-lg text-[0.9375rem] leading-relaxed text-ink-2 md:text-[1rem]">
              {industryContext.body[0]}
            </p>
          </Reveal>

          {/* Closing statement, given the weight of a card because it is the
              only line in the section that says what OrbisMoneta does. */}
          <Reveal delay={260}>
            <div className="mt-7 flex items-start gap-5 rounded-[--radius-card] bg-white/80 p-6 shadow-[0_18px_44px_-28px_rgba(10,21,51,.4)] ring-1 ring-line backdrop-blur-sm">
              <Link
                href="/advisory"
                aria-label="Explore our advisory and engineering services"
                className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-600 text-white transition-colors hover:bg-navy-700"
              >
                <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2.2} />
              </Link>
              <p className="text-[0.9375rem] leading-relaxed font-medium text-ink">
                {industryContext.closing}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Globe */}
        <Reveal kind="right" delay={120} className="lg:col-span-6 xl:col-span-7">
          <div className="relative aspect-[3/2] w-full">
            <Image
              src={industryContext.image}
              alt={industryContext.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              quality={82}
              /* The artwork's own ground is a pale lavender wash, not white, so
                 its edges would show as a rectangle against the section. Two
                 crossed linear masks feather all four sides; a radial mask does
                 not work here because the artwork is exactly 3:2 and fills the
                 frame, leaving the box edges fully opaque. */
              className="object-contain [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent),linear-gradient(to_bottom,transparent,#000_6%,#000_94%,transparent)]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------- future of money diagram */

export function FutureOfMoney() {
  return (
    <DarkSection>
      <div className="shell section relative">
        <SectionHeading
          onDark
          align="center"
          eyebrow={futureOfMoney.eyebrow}
          title={futureOfMoney.headline}
          className="mx-auto mb-14 md:mb-16"
        />

        {/* Three forces */}
        <div className="grid gap-4 md:grid-cols-3">
          {futureOfMoney.pillars.map((pillar, i) => (
            <Reveal
              key={pillar.title}
              delay={i * 90}
              className="flex h-full flex-col gap-4 rounded-xl bg-white/[0.045] p-6 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/[0.07]"
            >
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-sky-400">
                0{i + 1}
              </span>
              <h3 className="text-lg text-white">{pillar.title}</h3>
              <ul className="flex flex-col gap-2">
                {pillar.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.875rem] text-ink-inv-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-green-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Connector />

        {/* Convergence */}
        <Reveal className="rounded-xl bg-[linear-gradient(100deg,rgba(0,46,166,.5),rgba(1,164,255,.22)_55%,rgba(1,172,50,.22))] p-px">
          <div className="flex flex-col items-center gap-4 rounded-[calc(0.75rem-1px)] bg-abyss/85 px-6 py-7 text-center">
            <h3 className="text-[1.0625rem] tracking-[0.02em] text-white uppercase md:text-xl">
              {futureOfMoney.convergence.title}
            </h3>
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {futureOfMoney.convergence.attributes.map((attribute) => (
                <li
                  key={attribute}
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-inv-2"
                >
                  {attribute}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Connector />

        {/* Platform band */}
        <Reveal className="flex flex-col items-center gap-3 rounded-xl bg-navy-600 px-6 py-7 text-center ring-1 ring-sky-500/40">
          <p className="font-display text-lg font-bold tracking-[0.04em] text-white uppercase md:text-xl">
            {futureOfMoney.centre.name}
          </p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-sky-300">
            {futureOfMoney.centre.line}
          </p>
        </Reveal>

        <Connector />

        {/* Audiences */}
        <Reveal>
          <ul className="grid gap-px overflow-hidden rounded-xl ring-1 ring-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {futureOfMoney.audiences.map((audience) => (
              <li
                key={audience}
                className="flex items-center gap-3 bg-white/[0.03] px-5 py-4 text-[0.875rem] text-ink-inv-2 transition-colors hover:bg-white/[0.07] hover:text-white"
              >
                <Icon name="check" className="h-4 w-4 shrink-0 text-green-400" strokeWidth={2} />
                {audience}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Principles */}
        <div className="mt-14 grid gap-8 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {futureOfMoney.principles.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 80} className="flex flex-col gap-2.5">
              <div aria-hidden="true" className="rule-brand" />
              <h3 className="text-[0.9375rem] tracking-[0.04em] text-white uppercase">
                {principle.title}
              </h3>
              <p className="text-[0.875rem] leading-relaxed text-ink-inv-3">{principle.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </DarkSection>
  );
}

function Connector() {
  return (
    <div aria-hidden="true" className="flex justify-center py-5">
      <span className="h-10 w-px bg-[linear-gradient(to_bottom,transparent,rgba(1,164,255,.55),transparent)]" />
    </div>
  );
}

/* -------------------------------------------------------------- proposition */

export function Proposition() {
  return (
    <section className="section bg-surface">
      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Reveal kind="fade">
            <Eyebrow>{proposition.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="h-display-2">{proposition.headline}</h2>
          </Reveal>
          <Reveal delay={110}>
            <div className="rule-brand" aria-hidden="true" />
          </Reveal>
          <Reveal delay={150}>
            <p className="text-[1.0625rem] leading-relaxed text-ink-2 md:text-lg">
              {proposition.body}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <ul className="mt-2 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2">
              {proposition.nodes.map((node) => (
                <li
                  key={node}
                  className="flex items-center gap-3 bg-white px-5 py-4 text-[0.875rem] font-medium text-ink transition-colors hover:bg-navy-50"
                >
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  {node}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal kind="right" delay={120} className="lg:col-span-6 xl:col-span-7">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[--radius-card] shadow-[var(--shadow-lift)]">
            <Image
              src={proposition.image}
              alt={proposition.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              quality={80}
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ why orbismoneta */

export function WhyOrbisMoneta() {
  return (
    <section className="section bg-canvas" id="why-orbismoneta">
      <div className="shell">
        {/* Centred opening, so the two-column body below reads as one block
            rather than two competing columns. */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Reveal kind="fade">
            <Eyebrow>{whyOrbisMoneta.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-[1.875rem] leading-[1.04] font-semibold tracking-[-0.038em] text-ink md:text-[2.375rem]">
              {whyOrbisMoneta.headline}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <span
              aria-hidden="true"
              className="block h-[3px] w-14 rounded-full bg-[linear-gradient(90deg,#01a4ff,#01ac32)]"
            />
          </Reveal>
          <Reveal delay={140}>
            <p className="text-[0.9375rem] leading-relaxed text-ink-2 md:text-[1.0625rem]">
              {whyOrbisMoneta.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          <Reveal kind="left" delay={80} className="lg:col-span-5">
            {/*
              Two elements, not one. `lg:sticky` and `relative` cannot share an
              element that parents a `fill` image: from lg the sticky wins the
              cascade, and `next/image` warns because it only recognises
              absolute/fixed/relative as a containing block. Sticky does in fact
              establish one, so this rendered correctly — but the warning is
              real in the sense that the guarantee was accidental. Sticking the
              outer element and positioning the inner one makes it explicit.
            */}
            <div className="lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[--radius-card] shadow-[var(--shadow-card)] lg:aspect-[5/6]">
                <Image
                  src={whyOrbisMoneta.image}
                  alt={whyOrbisMoneta.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  quality={80}
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <ol className="flex flex-col gap-4 lg:col-span-7">
            {whyOrbisMoneta.reasons.map((reason, i) => (
              <Reveal
                as="li"
                key={reason.title}
                delay={140 + i * 80}
                className="group/reason flex items-start gap-5 rounded-[--radius-card] bg-white p-6 ring-1 ring-line transition-shadow duration-300 hover:shadow-[var(--shadow-card)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600 ring-1 ring-navy-100 transition-colors group-hover/reason:bg-navy-600 group-hover/reason:text-white">
                  <Icon name={reason.icon as IconName} className="h-5 w-5" strokeWidth={1.6} />
                </span>

                <span
                  aria-hidden="true"
                  className="font-display text-[1.375rem] leading-none font-bold tabular text-navy-200 transition-colors group-hover/reason:text-navy-600"
                >
                  0{i + 1}
                </span>

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[1.0625rem] leading-snug text-ink">{reason.title}</h3>
                  <p className="text-[0.875rem] leading-relaxed text-ink-2">{reason.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {whyOrbisMoneta.highlights.map((highlight, i) => (
            <Reveal
              key={highlight.label}
              delay={i * 90}
              className="flex h-full flex-col gap-3 rounded-[--radius-card] bg-surface p-7 ring-1 ring-line transition-shadow duration-300 hover:shadow-[var(--shadow-card)]"
            >
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-navy-600">
                {highlight.label}
              </p>
              <h3 className="text-[1.0625rem] leading-snug">{highlight.title}</h3>
              <p className="text-[0.875rem] leading-relaxed text-ink-2">{highlight.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- closing cta */

const ROUTE_ICONS: Record<string, IconName> = {
  bank: "bank",
  chip: "chip",
  target: "target",
};

export function ClosingCta() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-abyss">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={closingCta.image}
          alt=""
          fill
          sizes="100vw"
          quality={78}
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#030d22_10%,rgba(3,13,34,.95)_42%,rgba(3,13,34,.5)_72%,rgba(3,13,34,.25)_100%)]" />
      </div>

      <div className="shell section relative">
        <div className="flex max-w-2xl flex-col gap-6">
          <Reveal kind="fade">
            <Eyebrow onDark>{closingCta.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="h-display-2 text-white">
              Ready to engineer the{" "}
              <span className="text-brand-gradient-inv">future of money</span> with us?
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-[1.0625rem] leading-relaxed text-ink-inv-2">{closingCta.body}</p>
          </Reveal>

          <Reveal delay={190}>
            <ul className="mt-2 grid gap-6 sm:grid-cols-3">
              {closingCta.routes.map((route) => (
                <li key={route.title} className="flex flex-col gap-2.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-sky-500/40">
                    <Icon
                      name={ROUTE_ICONS[route.icon]}
                      className="h-5 w-5 text-sky-400"
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className="text-[0.875rem] leading-snug font-medium text-white">
                    {route.title}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={260} className="mt-3 flex flex-wrap items-center gap-3">
            <ButtonLink href={closingCta.primaryCta.href} tone="onDark" size="lg" icon="arrowRight">
              {closingCta.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={closingCta.secondaryCta.href} tone="onDarkGhost" size="lg">
              {closingCta.secondaryCta.label}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
