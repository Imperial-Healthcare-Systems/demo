import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/BrandMark";

/**
 * The Lab's orbit — the mark inside a ringed sphere.
 *
 * Built from CSS and SVG rather than dropped in as a render, for the reason
 * that keeps coming up with artwork on this site: a raster plate carries its
 * own ground, and a ground that does not match the section behind it shows as
 * a rectangle. This has no ground at all, so it sits on the pale hero and on
 * the near-black panel without either one needing a mask. It also costs no
 * bytes, stays sharp at any size, and can move.
 *
 * Two tones because it does two jobs. `light` is the watermark beside the hero
 * copy — barely there, no sphere, nothing that competes with the headline.
 * `dark` is the subject of the coming-soon panel: lit core, meridians, and a
 * platform under it.
 *
 * Everything that moves is decorative, so all of it stops under
 * `prefers-reduced-motion` and the whole thing is `aria-hidden`. The mark
 * itself is `decorative` too — every place this appears is already headed by
 * the brand name in text.
 */
export function LabOrbit({
  tone = "dark",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "group/orbit pointer-events-none relative aspect-square w-full select-none",
        className,
      )}
    >
      {/* Light source behind the core, breathing. */}
      <div
        className={cn(
          "absolute inset-[12%] rounded-full blur-2xl",
          dark
            ? "animate-[om-core-halo_5.5s_var(--ease-in-out-soft)_infinite] bg-[radial-gradient(circle,rgba(1,164,255,.42),rgba(1,172,50,.16)_52%,transparent_72%)]"
            : "bg-[radial-gradient(circle,rgba(1,164,255,.10),transparent_66%)]",
          "motion-reduce:animate-none",
        )}
      />

      {/* Two dashed rings, counter-rotating, so the piece reads as something
          running rather than something drawn. */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border border-dashed motion-reduce:animate-none",
          dark ? "border-sky-400/25" : "border-navy-600/12",
          "animate-[om-orbit_60s_linear_infinite]",
        )}
      />
      <div
        className={cn(
          "absolute inset-[13%] rounded-full border border-dashed motion-reduce:animate-none",
          dark ? "border-green-400/22" : "border-navy-600/10",
          "animate-[om-orbit_44s_linear_infinite_reverse]",
        )}
      />

      {/* Marker beads on the outer ring, in the brand's three. */}
      {dark &&
        [
          { cls: "top-0 left-1/2 -translate-x-1/2 bg-sky-400", delay: "0ms" },
          { cls: "top-1/2 right-0 -translate-y-1/2 bg-green-400", delay: "700ms" },
          { cls: "bottom-[8%] left-[12%] bg-navy-400", delay: "1400ms" },
        ].map((bead) => (
          <span
            key={bead.cls}
            style={{ animationDelay: bead.delay }}
            className={cn(
              "absolute h-1.5 w-1.5 rounded-full animate-pulse [animation-duration:3.2s] motion-reduce:animate-none",
              bead.cls,
            )}
          />
        ))}

      {/* The sphere. Latitudes are ellipses squashed by their own ry, longitudes
          are ellipses squashed by rx — the standard wireframe globe, and far
          fewer nodes than plotting a graticule properly would take. */}
      {dark && (
        <svg
          viewBox="0 0 200 200"
          fill="none"
          className="absolute inset-[19%] h-auto w-[62%] text-sky-400/45"
        >
          <circle cx="100" cy="100" r="72" className="fill-[rgba(1,60,140,0.20)] stroke-current" strokeWidth="0.9" />
          {[20, 42, 60].map((ry) => (
            <ellipse key={`lat-${ry}`} cx="100" cy="100" rx="72" ry={ry} stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
          ))}
          {[20, 42, 60].map((rx) => (
            <ellipse key={`lon-${rx}`} cx="100" cy="100" rx={rx} ry="72" stroke="currentColor" strokeWidth="0.7" opacity="0.45" />
          ))}
        </svg>
      )}

      {/* The mark, floating a beat out of phase with the halo. */}
      <BrandMark
        variant="symbol"
        tone={dark ? "dark" : "light"}
        decorative
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 motion-reduce:animate-none",
          dark
            ? "h-[26%] animate-[om-satellite_7s_var(--ease-in-out-soft)_infinite] drop-shadow-[0_0_22px_rgba(1,164,255,.5)]"
            : "h-[38%] opacity-[0.14]",
        )}
      />

      {/* Platform. Three flattened ellipses and a bright leading edge — the
          disc the sphere sits above in the client's own artwork. */}
      {dark && (
        <>
          <span className="absolute inset-x-[16%] bottom-[13%] h-[13%] rounded-[50%] bg-[linear-gradient(180deg,rgba(1,164,255,.55),rgba(0,46,166,.15))] ring-1 ring-sky-400/45" />
          <span className="absolute inset-x-[10%] bottom-[9%] h-[11%] rounded-[50%] ring-1 ring-sky-400/25" />
          <span className="absolute inset-x-[3%] bottom-[5%] h-[9%] rounded-[50%] ring-1 ring-sky-400/12" />
          {/* Beam from the platform up into the core. */}
          <span className="absolute bottom-[18%] left-1/2 h-[26%] w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(1,164,255,.7))]" />
        </>
      )}
    </div>
  );
}
