import { site } from "@/content/site";
import { advisoryPage } from "@/content/advisory";
import { BrandMark } from "@/components/BrandMark";
import { Icon, type IconName } from "@/components/Icon";

/**
 * The hero diagram: OrbisMoneta at the centre of the estate it connects
 * ("Banks · CBDCs · APIs · Cloud · AI · ORBISMONETA", from the content
 * document). Built from markup rather than a bitmap so it scales, stays
 * legible at any size, and costs nothing to load.
 *
 * It sits on the page rather than inside a card — the rings run out into the
 * hero's own ground, which is what makes it read as a diagram rather than an
 * illustration pasted into a box.
 *
 * Motion is layered: the rings rotate (slowly, in opposite directions), the
 * satellites breathe out of phase, and the core's halo pulses. Nothing moves
 * far, and all of it stops under reduced-motion. The satellites are positioned
 * by polar coordinates off a single radius so the ring and the cards can never
 * drift apart.
 */

/** Which mark stands for each label. Presentation only. */
const MARKS: Record<string, IconName> = {
  Banks: "bank",
  CBDCs: "coin",
  APIs: "code",
  Cloud: "cloud",
  AI: "spark",
};

/** Percentage of the container's width from centre to the satellite ring. */
const RADIUS = 35;

export function CapabilityOrbit() {
  const labels = advisoryPage.orbitLabels;

  return (
    <div
      className="relative isolate mx-auto aspect-square w-full max-w-[30rem]"
      role="img"
      aria-label={`${site.name} connecting ${labels.join(", ")}`}
    >
      {/* Light behind the hub, so the white ground is not flat */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(1,164,255,.14),transparent_70%)]"
      />

      {/* Orbit rings. Dashed, counter-rotating, and deliberately faint — they
          are the path the eye follows, not a thing to read. */}
      <div
        aria-hidden="true"
        className="absolute inset-[15%] rounded-full border border-dashed border-navy-600/20 animate-[om-orbit_60s_linear_infinite] motion-reduce:animate-none"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[32%] rounded-full border border-dashed border-navy-600/12 animate-[om-orbit_44s_linear_infinite_reverse] motion-reduce:animate-none"
      />
      <div aria-hidden="true" className="absolute inset-[2%] rounded-full ring-1 ring-navy-600/[0.07]" />

      {/* Satellites */}
      {labels.map((label, i) => {
        const angle = (i / labels.length) * 2 * Math.PI - Math.PI / 2;
        const left = 50 + RADIUS * Math.cos(angle);
        const top = 50 + RADIUS * Math.sin(angle);
        return (
          <div
            key={label}
            aria-hidden="true"
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <div
              // Out of phase with its neighbours, so the set never pulses as
              // one block.
              className="animate-[om-satellite_7s_var(--ease-in-out-soft)_infinite] motion-reduce:animate-none"
              style={{ animationDelay: `${i * 0.9}s` }}
            >
              <span className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 whitespace-nowrap shadow-[0_10px_28px_-12px_rgba(10,21,51,.35)] ring-1 ring-line">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy-600">
                  <Icon name={MARKS[label] ?? "nodes"} className="h-4 w-4" strokeWidth={1.7} />
                </span>
                <span className="font-mono text-[0.6875rem] tracking-[0.12em] text-ink uppercase">
                  {label}
                </span>
              </span>
            </div>
          </div>
        );
      })}

      {/* Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-sky-500/45 blur-2xl animate-[om-core-halo_6s_var(--ease-in-out-soft)_infinite] motion-reduce:animate-none"
        />
        {/*
          The mark itself, not the name set as type.

          The inverse lockup is the right variant here and not merely the light
          one recoloured: its wordmark is white and its glyph keeps the green
          and cyan bars, all of which hold against this disc's #1f5cf0 → #00279c.

          `decorative`, because the diagram's own `role="img"` label already
          opens with the brand name — without it a screen reader hears
          "OrbisMoneta" twice before reaching the first satellite.
        */}
        <span className="flex h-[8.5rem] w-[8.5rem] items-center justify-center rounded-full bg-[linear-gradient(155deg,#1f5cf0,#00279c)] px-3.5 shadow-[0_18px_50px_-14px_rgba(0,46,166,.7)] ring-1 ring-white/25">
          <BrandMark variant="lockup" tone="dark" decorative className="w-full select-none" />
        </span>
      </div>
    </div>
  );
}
