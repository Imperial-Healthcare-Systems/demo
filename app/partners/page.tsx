import type { Metadata } from "next";
import { partnersPage } from "@/content/about";
import { site } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Section";

export const metadata: Metadata = {
  title: "Ecosystem & Partners",
  description:
    "OrbisMoneta integrates, certifies and co-engineers alongside cloud providers, fintech platforms, core banking vendors and specialist technology partners.",
  alternates: { canonical: "/partners" },
};

/**
 * One tone per tier, cycling the logo's own order — navy, green, sky. The same
 * system as the reason cards on the home page and the Lab's themes, so a reader
 * crossing those pages meets one idea rather than three.
 */
const SAT_POSITIONS = [
  "top-[14%] left-[13%]",
  "top-[19%] right-[11%]",
  "bottom-[13%] right-[24%]",
];

const TIER_TONES = [
  {
    ring: "ring-navy-600/20",
    art: "bg-[linear-gradient(155deg,rgba(0,46,166,.10),rgba(1,164,255,.05)_58%,rgba(255,255,255,0))]",
    dashed: "border-navy-600/20",
    core: "bg-[linear-gradient(140deg,var(--color-navy-600),var(--color-sky-500))]",
    coreIcon: "cloud" as IconName,
    badge: "text-navy-600 ring-navy-600/15",
    badgeIcon: "chip" as IconName,
    sats: ["chip", "shield", "bars"] as IconName[],
    chip: "text-navy-600 ring-navy-600/12",
    label: "text-navy-600",
    rule: "bg-[linear-gradient(90deg,var(--color-navy-600),var(--color-sky-500))]",
    ghost: "text-navy-600/10 group-hover/tier:text-navy-600/20",
    lift: "hover:ring-navy-600/40 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_24px_46px_-20px_rgba(10,21,51,.28),0_44px_70px_-42px_rgba(0,46,166,.5)]",
  },
  {
    ring: "ring-green-500/25",
    art: "bg-[linear-gradient(155deg,rgba(1,172,50,.10),rgba(62,203,106,.05)_58%,rgba(255,255,255,0))]",
    dashed: "border-green-500/22",
    core: "bg-[linear-gradient(140deg,var(--color-green-600),var(--color-green-400))]",
    coreIcon: "globe" as IconName,
    badge: "text-green-600 ring-green-500/20",
    badgeIcon: "user" as IconName,
    sats: ["nodes", "building", "layers"] as IconName[],
    chip: "text-green-600 ring-green-500/15",
    label: "text-green-600",
    rule: "bg-[linear-gradient(90deg,var(--color-green-600),var(--color-green-400))]",
    ghost: "text-green-500/12 group-hover/tier:text-green-500/25",
    lift: "hover:ring-green-500/45 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_24px_46px_-20px_rgba(10,21,51,.28),0_44px_70px_-42px_rgba(1,172,50,.5)]",
  },
  {
    ring: "ring-sky-500/25",
    art: "bg-[linear-gradient(155deg,rgba(1,164,255,.10),rgba(0,46,166,.05)_58%,rgba(255,255,255,0))]",
    dashed: "border-sky-500/22",
    core: "bg-[linear-gradient(140deg,var(--color-sky-600),var(--color-navy-600))]",
    coreIcon: "bank" as IconName,
    badge: "text-sky-600 ring-sky-500/20",
    badgeIcon: "nodes" as IconName,
    sats: ["shield", "document", "refresh"] as IconName[],
    chip: "text-sky-600 ring-sky-500/15",
    label: "text-sky-600",
    rule: "bg-[linear-gradient(90deg,var(--color-sky-600),var(--color-navy-600))]",
    ghost: "text-sky-500/12 group-hover/tier:text-sky-500/25",
    lift: "hover:ring-sky-500/45 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_24px_46px_-20px_rgba(10,21,51,.28),0_44px_70px_-42px_rgba(1,164,255,.5)]",
  },
];

export default function PartnersPage() {
  /* "Become an OrbisMoneta partner." with the brand name painted. Split on the
     name rather than stored pre-split, so the sentence stays one string. */
  const [ctaLead, ctaTail] = partnersPage.cta.headline.split(site.name);

  return (
    <>
      <PageHero
        eyebrow={partnersPage.eyebrow}
        title={partnersPage.headline}
        accent={partnersPage.headlineAccent}
        intro={partnersPage.intro}
        crumbs={[{ label: "Partners" }]}
        actions={
          <ButtonLink href={`mailto:${partnersPage.cta.email}`} icon="arrowRight">
            {partnersPage.cta.label}
          </ButtonLink>
        }
      />

      <section className="section ground-soft bg-canvas">
        <div className="shell">
          <Reveal kind="fade" className="mb-10 md:mb-12">
            <Eyebrow>Our partner ecosystem</Eyebrow>
          </Reveal>

          <ol className="grid gap-6 lg:grid-cols-3">
            {partnersPage.tiers.map((tier, i) => {
              const tone = TIER_TONES[i % TIER_TONES.length];
              return (
                <Reveal
                  as="li"
                  key={tier.title}
                  delay={i * 90}
                  className={`group/tier relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_1px_2px_rgba(10,21,51,.04),0_14px_32px_-22px_rgba(10,21,51,.26)] ring-1 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 motion-reduce:hover:translate-y-0 ${tone.ring} ${tone.lift}`}
                >
                  {/*
                    The illustration.

                    The design this follows uses 3D isometric renders. There are
                    none in the project and inventing them is not on the table,
                    so each tier is composed instead — a core tile and three
                    satellites on a turning ring, drawn from the icon set the
                    site already uses. Vector: sharp at any size, weighs nothing,
                    and carries no ground of its own to clash with the card,
                    which is what every raster plate on this site has had to be
                    masked around. Real artwork later replaces only this block.
                  */}
                  <div className={`relative aspect-[16/10] overflow-hidden ${tone.art}`}>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,21,51,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,21,51,.05)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(72%_72%_at_50%_46%,#000,transparent)]"
                    />

                    <span
                      aria-hidden="true"
                      className={`absolute top-1/2 left-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 animate-[om-orbit_38s_linear_infinite] rounded-full border border-dashed motion-reduce:animate-none ${tone.dashed}`}
                    />

                    {/* The satellites spread a little as the card lifts. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tier:scale-[1.08] motion-reduce:transition-none"
                    >
                      {tone.sats.map((icon, s) => (
                        <span
                          key={icon}
                          style={{ animationDelay: `${s * 900}ms` }}
                          className={`absolute flex h-10 w-10 animate-[om-satellite_6.5s_var(--ease-in-out-soft)_infinite] items-center justify-center rounded-xl bg-white/90 shadow-[0_6px_16px_-8px_rgba(10,21,51,.4)] ring-1 backdrop-blur-sm motion-reduce:animate-none ${SAT_POSITIONS[s]} ${tone.chip}`}
                        >
                          <Icon name={icon} className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.7} />
                        </span>
                      ))}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`absolute top-1/2 left-1/2 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl text-white shadow-[0_14px_30px_-12px_rgba(10,21,51,.55)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tier:scale-110 group-hover/tier:[transform:perspective(520px)_rotateY(-12deg)] motion-reduce:transition-none ${tone.core}`}
                    >
                      <Icon name={tone.coreIcon} className="h-7 w-7" strokeWidth={1.6} />
                    </span>

                    {/* Light raking across the panel as the pointer arrives. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 -left-1/4 w-1/4 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.8),transparent)] opacity-0 group-hover/tier:animate-[om-sheen_1.1s_ease-out] group-hover/tier:opacity-100 motion-reduce:hidden"
                    />
                  </div>

                  <div className="relative flex flex-1 flex-col gap-3 px-7 pt-11 pb-24">
                    {/* Badge, straddling the seam between artwork and copy. */}
                    <span
                      aria-hidden="true"
                      className={`absolute -top-7 left-0 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_-12px_rgba(10,21,51,.45)] ring-1 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tier:scale-110 group-hover/tier:[transform:perspective(520px)_rotateY(-12deg)] ${tone.badge}`}
                    >
                      <Icon name={tone.badgeIcon} className="h-6 w-6" strokeWidth={1.6} />
                    </span>

                    {/* Oversized numeral, sunk into the corner. */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute right-6 bottom-4 font-display text-[4.5rem] leading-none font-bold tabular transition-colors duration-300 ${tone.ghost}`}
                    >
                      {tier.tier.replace("Tier ", "")}
                    </span>

                    <span
                      className={`font-mono text-[0.6875rem] uppercase tracking-[0.18em] ${tone.label}`}
                    >
                      {tier.tier}
                    </span>
                    <h2 className="text-[1.25rem] leading-snug">{tier.title}</h2>
                    <span
                      aria-hidden="true"
                      className={`h-[3px] w-10 rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/tier:w-20 ${tone.rule}`}
                    />
                    <p className="relative mt-1 text-[0.9375rem] leading-relaxed text-ink-2">
                      {tier.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/*
        The partnership banner.

        A contained card on a light ground rather than the full-bleed dark band
        that was here: the page already ends on the footer's navy, and two dark
        slabs stacked read as one long dark run with a seam in it.

        The wave is drawn, not an image — fourteen stroked paths fanned out of
        one curve. Same reasoning as the tier artwork: no ground of its own to
        mask around, sharp at any width, and it costs nothing.
      */}
      <section className="section-tight bg-canvas">
        <div className="shell">
          <Reveal
            kind="scale"
            className="on-dark group/partner-cta relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(115deg,#04123a_0%,#072055_48%,#03153f_100%)] ring-1 ring-white/10 shadow-[0_30px_70px_-40px_rgba(3,13,34,.75)]"
          >
            {/* Dotted patches, top-right and bottom-left, as in the design. */}
            <span
              aria-hidden="true"
              className="absolute top-7 right-8 h-16 w-28 bg-[radial-gradient(circle,rgba(255,255,255,.22)_1.1px,transparent_1.1px)] bg-[size:14px_14px] opacity-70"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-8 left-7 hidden h-16 w-24 bg-[radial-gradient(circle,rgba(255,255,255,.16)_1.1px,transparent_1.1px)] bg-[size:14px_14px] sm:block"
            />

            {/* Ribbon. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 240"
              preserveAspectRatio="none"
              fill="none"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[82%] w-full"
            >
              <defs>
                <linearGradient id="om-partner-wave" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--color-navy-500)" stopOpacity="0.2" />
                  <stop offset="55%" stopColor="var(--color-sky-500)" />
                  <stop offset="100%" stopColor="var(--color-green-400)" />
                </linearGradient>
              </defs>
              {Array.from({ length: 14 }, (_, i) => (
                <path
                  key={i}
                  /* The fan has to live inside the viewBox. The first pass
                     started these at y=196 of 240 and stepped down from there,
                     so ten of the fourteen were below the frame and the ribbon
                     rendered as a single faint line. */
                  d={`M0 ${118 + i * 8} C 240 ${94 + i * 7}, 470 ${186 - i * 2}, 700 ${138 + i * 3} S 1010 ${68 - i * 2}, 1200 ${26 - i * 3}`}
                  stroke="url(#om-partner-wave)"
                  strokeWidth="1"
                  opacity={0.16 + i * 0.05}
                />
              ))}
            </svg>
            {/* Two lit points riding the ribbon. */}
            <span
              aria-hidden="true"
              className="absolute right-[9%] bottom-[38%] h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_12px_3px_rgba(1,164,255,.8)]"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-[12%] left-[46%] hidden h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,.7)] md:block"
            />

            <div className="relative flex flex-col items-start gap-7 p-8 md:p-12 lg:flex-row lg:items-center lg:gap-10 lg:py-14">
              {/* Glass badge. */}
              <span
                aria-hidden="true"
                className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/[0.07] ring-1 ring-white/15 backdrop-blur-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/partner-cta:scale-105 motion-reduce:transition-none"
              >
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(1,164,255,.30),transparent_70%)]" />
                <Icon name="nodes" className="relative h-9 w-9 text-sky-400" strokeWidth={1.5} />
              </span>

              <div className="flex flex-col gap-3 lg:flex-1">
                <h2 className="text-[1.625rem] leading-[1.15] font-semibold tracking-[-0.03em] text-white md:text-[2rem]">
                  {ctaLead}
                  <span className="text-brand-gradient-inv">{site.name}</span>
                  {ctaTail}
                </h2>
                <p className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-inv-2 md:text-[1rem]">
                  {partnersPage.cta.body}
                </p>
              </div>

              <div className="flex shrink-0 flex-col items-start gap-2.5 lg:items-end">
                <ButtonLink
                  href={`mailto:${partnersPage.cta.email}`}
                  tone="brand"
                  size="lg"
                  icon="arrowRight"
                >
                  {partnersPage.cta.label}
                </ButtonLink>
                {/* The button is a mailto, so the address it opens is worth
                    showing — people copy it as often as they click it. */}
                <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink-inv-3">
                  {partnersPage.cta.email}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
