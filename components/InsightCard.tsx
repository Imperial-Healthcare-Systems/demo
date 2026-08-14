import Image from "next/image";
import Link from "next/link";
import { estimateReadingTime, type Insight } from "@/content/insights";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/BrandMark";
import { Icon } from "@/components/Icon";

const TONES = {
  navy: {
    surface: "from-[#031a4d] via-[#002ea6] to-[#01275c]",
    accent: "#01a4ff",
    glow: "rgba(1,164,255,.55)",
  },
  sky: {
    surface: "from-[#04244f] via-[#0169b8] to-[#012a52]",
    accent: "#4dc0ff",
    glow: "rgba(77,192,255,.5)",
  },
  green: {
    surface: "from-[#032a1e] via-[#016b34] to-[#03251c]",
    accent: "#3ecb6a",
    glow: "rgba(62,203,106,.5)",
  },
  gold: {
    surface: "from-[#2a1e04] via-[#8a6210] to-[#1f1707]",
    accent: "#e3a32c",
    glow: "rgba(227,163,44,.45)",
  },
} as const;

/**
 * Lead visual for an insight.
 *
 * The client has not yet supplied article photography, so rather than dress the
 * cards in generic stock imagery each card carries a category-tinted panel with
 * the OrbisMoneta mark itself set into it. As soon as a `cover` image is added
 * to the content record it takes over automatically.
 */
export function InsightCover({
  insight,
  className,
  sizes,
  priority,
}: {
  insight: Insight;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (insight.cover) {
    return (
      <div className={cn("relative overflow-hidden bg-surface-2", className)}>
        <Image
          src={insight.cover.src}
          alt={insight.cover.alt}
          fill
          sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.04]"
        />
      </div>
    );
  }

  const tone = TONES[insight.coverTone];
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        tone.surface,
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 260"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id={`glow-${insight.slug}`} cx="72%" cy="30%" r="62%">
            <stop offset="0%" stopColor={tone.glow} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="400" height="260" fill={`url(#glow-${insight.slug})`} />
        <g stroke={tone.accent} strokeOpacity="0.14" strokeWidth="1">
          {Array.from({ length: 7 }, (_, i) => (
            <line key={i} x1="0" y1={40 + i * 32} x2="400" y2={10 + i * 32} />
          ))}
        </g>
      </svg>

      {/*
        The real mark, not a redrawing of it. The earlier version approximated
        the orbit and the three bars in inline SVG so they could be tinted per
        category, which meant nine cards carrying a logo that was almost but not
        quite the client's. Tinting is not worth that — the glow behind it
        already does the category colouring.
      */}
      <BrandMark
        variant="symbol"
        tone="dark"
        decorative
        className="absolute top-1/2 right-[9%] h-[58%] -translate-y-1/2 opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.06]"
      />
    </div>
  );
}

export function InsightCard({
  insight,
  layout = "stacked",
  priority,
}: {
  insight: Insight;
  layout?: "stacked" | "row";
  priority?: boolean;
}) {
  const minutes = estimateReadingTime(insight);

  return (
    <article
      className={cn(
        "group/card relative flex overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-line transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]",
        layout === "stacked" ? "h-full flex-col" : "flex-col sm:flex-row",
      )}
    >
      <InsightCover
        insight={insight}
        priority={priority}
        sizes={layout === "row" ? "(max-width: 640px) 100vw, 320px" : "(max-width: 768px) 100vw, 33vw"}
        className={cn(
          layout === "stacked"
            ? "aspect-[16/10] w-full shrink-0"
            : "aspect-[16/10] w-full shrink-0 sm:aspect-auto sm:w-[16rem] lg:w-[19rem]",
        )}
      />

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="rounded-full bg-navy-50 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-navy-600">
            {insight.category}
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-3">
            {insight.type}
          </span>
        </div>

        <h3 className="text-[1.0625rem] leading-snug text-ink transition-colors group-hover/card:text-navy-600">
          <Link href={`/insights/${insight.slug}`} className="after:absolute after:inset-0">
            {insight.title}
          </Link>
        </h3>

        <p className="line-clamp-3 text-[0.875rem] leading-relaxed text-ink-2">
          {insight.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-3">
          <div className="flex items-center gap-3 text-[0.6875rem] text-ink-3">
            <span className="flex items-center gap-1.5">
              <Icon name="clock" className="h-3.5 w-3.5" />
              <span className="tabular">{minutes} min</span>
            </span>
            <span aria-hidden="true" className="h-2.5 w-px bg-line-strong" />
            <span>{insight.topic}</span>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full text-navy-600 ring-1 ring-line transition-all duration-200 group-hover/card:bg-navy-600 group-hover/card:text-white group-hover/card:ring-navy-600">
            <Icon name="arrowRight" className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        </div>
      </div>
    </article>
  );
}
