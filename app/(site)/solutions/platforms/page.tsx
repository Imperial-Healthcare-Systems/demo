import type { Metadata } from "next";
import Link from "next/link";
import { platformsPage, proprietaryPlatforms } from "@/content/platforms";
import { Icon } from "@/components/Icon";
import { TrackedLink } from "@/components/TrackedLink";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Proprietary Platforms",
  description:
    "Digital Currency Hub™ and the Lending Integration Hub — purpose-built proprietary platforms engineered to simplify ecosystem integration and enable secure participation in emerging digital-money networks.",
  alternates: { canonical: "/solutions/platforms" },
};

/**
 * Proprietary Platforms.
 *
 * This page is drawn in the client's own palette rather than the site's, at
 * their request — the graphite ground, the emerald and azure card glows and the
 * status badges are all lifted from `source-assets/Solution-page-contents.html`
 * and kept as they are there. It is the only page that does this; /solutions and
 * everything else stay on the site's own system, which is the other half of the
 * same instruction.
 *
 * The values are written out rather than added to the theme precisely because
 * they are local to this one page. Tailwind only emits class names it can find
 * written out in source, so each variant below is a whole literal string and not
 * anything composed at runtime.
 */

/** #070a11 → #0c111d, the client's graphite range. */
const GRAPHITE_BORDER = "border-[#1e293b]";

/*
  The two card treatments. Same geometry, different accent: emerald for the
  platform that exists, azure for the one being built. Both carry the client's
  own double shadow — a deep drop plus a coloured bloom, which is what stops
  these reading as flat panels on a flat ground.
*/
const CARD_TONES = {
  mvp: {
    card:
      "border-[rgba(0,166,81,.35)] bg-[radial-gradient(circle_at_90%_10%,rgba(0,166,81,.08)_0%,transparent_60%),linear-gradient(180deg,#111827_0%,#0c111d_100%)] " +
      "shadow-[0_20px_50px_rgba(0,0,0,.5),0_0_35px_rgba(0,166,81,.16)]",
    badge: "bg-[rgba(0,166,81,.12)] text-[#34d399] border-[rgba(0,166,81,.4)]",
    dot: "bg-[#00a651] shadow-[0_0_6px_#00a651]",
    icon: "bg-[rgba(0,166,81,.12)] text-[#34d399] ring-[rgba(0,166,81,.35)]",
    cta: "bg-[#00a651] hover:bg-[#00bd5c] border-[rgba(255,255,255,.2)] shadow-[0_4px_14px_rgba(0,166,81,.3)]",
  },
  dev: {
    card:
      "border-[rgba(0,136,204,.35)] bg-[radial-gradient(circle_at_90%_10%,rgba(0,136,204,.08)_0%,transparent_60%),linear-gradient(180deg,#111827_0%,#0c111d_100%)] " +
      "shadow-[0_20px_50px_rgba(0,0,0,.5),0_0_35px_rgba(0,136,204,.18)]",
    badge:
      "bg-[rgba(0,136,204,.12)] text-[#38bdf8] border-[rgba(0,136,204,.4)]",
    dot: "bg-[#0088cc] shadow-[0_0_6px_#0088cc]",
    icon: "bg-[rgba(0,136,204,.12)] text-[#38bdf8] ring-[rgba(0,136,204,.35)]",
    cta: "bg-[#0b2e9a] hover:bg-[#0f3bc4] border-[rgba(255,255,255,.15)] shadow-[0_4px_14px_rgba(11,46,154,.35)]",
  },
} as const;

export default function PlatformsPage() {
  return (
    <div className="on-dark bg-[#070a11]">
      {/*
        Opening. The client's own hero is centred with a gradient-filled
        headline; that is kept, with a breadcrumb added so the reader has a way
        back to the top of the site.
      */}
      <section
        className={cn(
          "relative isolate overflow-hidden border-b pt-28 pb-16 md:pt-36 md:pb-20",
          GRAPHITE_BORDER,
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_12%,rgba(11,46,154,.28)_0%,rgba(7,30,104,.08)_45%,transparent_75%)]"
        />
        <div className="shell">
          {/* The breadcrumb that opened this page is gone with every other
              one on the site, so the eyebrow starts at the section's padding. */}
          <div className="flex max-w-3xl flex-col items-start gap-5">
            <Reveal kind="fade">
              {/* `.section-tag.emerald` from the client's stylesheet. */}
              <span className="inline-flex items-center gap-2 rounded-md border border-[rgba(0,166,81,.25)] bg-[rgba(0,166,81,.08)] px-3 py-1.5 font-mono text-[0.76rem] tracking-[0.12em] text-[#00a651] uppercase">
                {platformsPage.eyebrow}
              </span>
            </Reveal>
            <Reveal delay={60}>
              {/* The client fills the headline with a white-to-slate gradient
                  rather than the site's brand gradient. Kept. */}
              <h1 className="bg-[linear-gradient(180deg,#ffffff_40%,#cbd5e1_100%)] bg-clip-text text-[2.25rem] leading-[1.15] font-extrabold tracking-[-0.03em] text-transparent md:text-[3rem]">
                {platformsPage.headline}
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-[1.08rem] leading-relaxed text-[#94a3b8]">
                {platformsPage.intro}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The duo. `.platforms-section` + `.featured-grid-duo`. */}
      <section
        className={cn(
          "border-b bg-[linear-gradient(180deg,#090d16_0%,#0c111d_100%)] py-20 md:py-24",
          GRAPHITE_BORDER,
        )}
      >
        <div className="shell">
          <ul className="grid items-stretch gap-7 lg:grid-cols-2">
            {proprietaryPlatforms.map((p, i) => {
              const tone = CARD_TONES[p.status];
              return (
                <Reveal
                  as="li"
                  key={p.id}
                  id={p.id}
                  delay={i * 100}
                  className={cn(
                    /*
                      `min-h` because the cards were emptied, not resized.

                      Seven chips and two deployment boxes came off the first
                      card and seven chips off the second, which took the pair
                      from 608px to a little over 400 — the client asked for the
                      card size and the spacing to stand. 38rem is the height
                      they measured at before the cut, so the block keeps its
                      mass and `justify-between` spends the difference between
                      the copy and the button rather than closing up.

                      Only from lg, where the two sit side by side. Stacked on a
                      phone they are naturally taller than this anyway, and a
                      floor there would be dead space nobody asked for.
                    */
                    "flex h-full flex-col justify-between rounded-[20px] border p-8 md:p-10 lg:min-h-[38rem]",
                    tone.card,
                  )}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      {/* `.badge` — the dot is `::before` in the client's CSS;
                          here it is a real element so it can be aria-hidden.
                          The label beside it is what a screen reader reads. */}
                      {p.statusLabel && (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-[0.75rem] md:text-[0.72rem] font-bold tracking-[0.06em] uppercase",
                            tone.badge,
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={cn("h-1.5 w-1.5 rounded-full", tone.dot)}
                          />
                          {p.statusLabel}
                        </span>
                      )}
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg ring-1",
                          tone.icon,
                        )}
                      >
                        <Icon
                          name={p.icon as never}
                          className="h-4.5 w-4.5"
                          strokeWidth={1.7}
                        />
                      </span>
                    </div>

                    <h2 className="mt-4 text-[1.625rem] leading-tight font-extrabold tracking-[-0.02em] text-white md:text-[1.95rem]">
                      {p.title}
                    </h2>
                    <p className="mt-1.5 text-[1.02rem] font-semibold text-[#0aa2e6]">
                      {p.subtitle}
                    </p>
                    <p className="mt-3.5 text-[0.95rem] leading-relaxed text-[#94a3b8]">
                      {p.body}
                    </p>

                    {/* `.caps-tag-list`. Guarded, because an empty list still
                        carries its own top margin — 24px of nothing under the
                        description on both cards, which are empty now. */}
                    {p.capabilities.length > 0 && (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {p.capabilities.map((c) => (
                          <li
                            key={c}
                            className={cn(
                              "rounded border bg-white/[0.04] px-2.5 py-1 text-[0.74rem] font-semibold text-[#cbd5e1]",
                              GRAPHITE_BORDER,
                            )}
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/*
                      `.deployment-models` is two-up; the lending card has a
                      single box and the client runs that one full width. Driven
                      off the count rather than the platform, so a third box or a
                      second single would both land correctly.
                    */}
                    {p.boxes.length > 0 && (
                      <ul
                        className={cn(
                          "mt-6 grid gap-3",
                          p.boxes.length > 1 && "sm:grid-cols-2",
                        )}
                      >
                        {p.boxes.map((b) => (
                          <li
                            key={b.title}
                            className={cn(
                              "rounded-md border bg-white/[0.02] p-3.5 text-[0.8rem]",
                              GRAPHITE_BORDER,
                            )}
                          >
                            <p className="font-bold text-white">{b.title}</p>
                            <p className="mt-1 leading-relaxed text-[#94a3b8]">
                              {b.body}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/*
                    `.btn-emerald` / `.btn-primary`, full width at the card's
                    foot. Written as a plain styled link rather than the site's
                    ButtonLink: that component decides its own background from
                    its `tone`, and a background handed in through `className`
                    would land beside the tone's rather than replacing it.
                  */}
                  {/*
                    `TrackedLink`, because this is the click the client asked to
                    be able to count — "Explore Digital Currency Hub" is the one
                    action on this page that means somebody is interested in the
                    product rather than reading about it. The label sent to the
                    dashboard is the button's own text, so the two always agree.
                  */}
                  <TrackedLink
                    href={p.cta.href}
                    label={p.cta.label}
                    className={cn(
                      "mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border text-[0.9rem] font-semibold text-white transition-[background-color,transform] duration-200 hover:-translate-y-px motion-reduce:hover:translate-y-0",
                      tone.cta,
                    )}
                  >
                    {p.cta.label}
                    <Icon
                      name="arrowRight"
                      className="h-4 w-4"
                      strokeWidth={2}
                    />
                  </TrackedLink>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Closing — `.final-cta`, trimmed to the one ask this page needs. */}
      <section className="bg-[radial-gradient(circle_at_50%_0%,rgba(11,46,154,.35)_0%,rgba(7,10,17,.95)_75%)] py-24 text-center">
        <div className="shell mx-auto flex max-w-2xl flex-col items-center gap-5">
          <h2 className="text-[2rem] leading-tight font-extrabold tracking-[-0.025em] text-white md:text-[2.5rem]">
            Let&rsquo;s Build the Future of Finance
          </h2>
          <p className="text-[1.05rem] leading-relaxed text-[#94a3b8]">
            Whether modernizing an existing financial platform, integrating new
            ecosystems or developing a new digital financial capability,
            OrbisMoneta brings together strategy, domain expertise and
            technology execution.
          </p>
          <Link
            href="/contact"
            className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-md border border-[rgba(255,255,255,.2)] bg-[#00a651] px-7 text-[0.9rem] font-semibold text-white shadow-[0_4px_14px_rgba(0,166,81,.3)] transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#00bd5c] motion-reduce:hover:translate-y-0"
          >
            Contact OrbisMoneta
            <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}
