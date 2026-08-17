import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The OrbisMoneta mark, in the two forms the brand actually has.
 *
 * `lockup` is the full glyph-plus-wordmark supplied by the client. It needs
 * roughly 120px of width before the wordmark closes up, so anywhere narrower or
 * square — dialog headers, the floating widget, watermarks, app icons — takes
 * `symbol`, the glyph on its own.
 *
 * Both come in a light-ground and a dark-ground variant. The dark variant is
 * not a filter or an `invert()`: the supplied artwork paints the letter
 * counters back in white over navy, so inverting it produces a white slab. The
 * variants are separate files, repainted properly in `scripts/prepare-assets.mjs`.
 *
 * These are keyed out of the supplied PNG rather than derived from the SVG. In
 * the SVG the counters — the holes in O, b, o, e, a — are solid white shapes
 * painted over the letterforms, which is invisible on a white header but shows
 * as white blobs on any other ground, and deleting them fills the letters in
 * solid. Keying white out of the raster clears the background and the counters
 * in the same pass.
 *
 * Every brand surface goes through this component so a future artwork change is
 * one edit rather than a hunt through the tree.
 */

/*
  WebP, not the PNG beside it. These ship `unoptimized` — see the note on the
  `Image` below — which means whatever is named here is what every visitor
  downloads at full size on every page. As PNGs that was 158KB of brand marks,
  and on a phone it was 45% of the page's entire image budget.

  The WebPs are *lossless*, so this gives nothing up: same flat colour, same
  hard edges, decoded pixels byte-identical to the PNGs'. It is 37% smaller for
  no visual difference at all. The PNGs are still built and still in /public as
  the fallback of record; nothing requests them.
*/
const SOURCES = {
  lockup: {
    light: "/images/brand/orbismoneta-logo.webp",
    dark: "/images/brand/orbismoneta-logo-inverse.webp",
    width: 1400,
    height: 338,
  },
  symbol: {
    light: "/images/brand/orbismoneta-symbol.webp",
    dark: "/images/brand/orbismoneta-symbol-inverse.webp",
    width: 512,
    height: 512,
  },
} as const;

export function BrandMark({
  variant = "lockup",
  tone = "light",
  className,
  priority,
  decorative = false,
}: {
  variant?: keyof typeof SOURCES;
  /** The ground it sits on, not the colour of the mark itself. */
  tone?: "light" | "dark";
  className?: string;
  priority?: boolean;
  /**
   * True where the mark repeats something already named nearby — a watermark,
   * or a panel that is already labelled "OrbisMoneta". Screen readers should
   * not hear the brand name twice in a row.
   */
  decorative?: boolean;
}) {
  const source = SOURCES[variant];
  return (
    <Image
      src={source[tone]}
      alt={decorative ? "" : site.name}
      aria-hidden={decorative || undefined}
      width={source.width}
      height={source.height}
      priority={priority}
      /*
        Served as-is. These are flat-colour marks with hard edges, exactly where
        lossy re-encoding shows, and the source is already sized generously
        enough for a 2x header. Skipping the optimiser also avoids the
        `images.qualities` trap that silently 400s an unlisted quality.
      */
      unoptimized
      className={cn("w-auto", className)}
    />
  );
}
