import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite capability ticker. The list is rendered `copies` times and travels
 * the width of one copy, which gives a seamless loop with no JS. The duplicates
 * are hidden from the accessibility tree, and the whole strip pauses on hover
 * or keyboard focus.
 */
export function Marquee({
  items,
  duration = 52,
  className,
  itemClassName,
  separator = true,
  onDark = false,
  copies = 2,
  reverse = false,
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
  itemClassName?: string;
  separator?: boolean;
  onDark?: boolean;
  /**
   * How many times the row is repeated in the track.
   *
   * Two is enough only while one row is wider than the window: the track
   * travels one row per cycle, so it needs at least a row's width of content
   * standing to the right of the viewport at all times. Six short labels come
   * to 1582px, which is under a 1920px screen, and at two copies the strip ran
   * out mid-cycle and swept a band of empty space across itself.
   *
   * Four covers a 4746px window, which is past any real one. The cost is three
   * extra copies of seven spans, all `aria-hidden`; the speed is unchanged,
   * because a cycle is still exactly one row of travel however many rows stand
   * behind it.
   */
  copies?: number;
  /**
   * Run the track right-to-left instead of left-to-right.
   *
   * `animation-direction`, not a second keyframe set — the travel distance is
   * already correct and only its sign changes, so reversing the same animation
   * keeps the two directions from drifting apart if the distance is ever
   * retuned.
   *
   * Used where a page carries a second ticker: two identical strips at the
   * same speed in the same direction read as the same element rendered twice
   * by mistake.
   */
  reverse?: boolean;
}) {
  const row = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
      {...(ariaHidden ? {} : { "aria-label": "Capability areas" })}
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center">
          <span
            className={cn(
              "px-6 font-mono text-[0.75rem] font-medium uppercase tracking-[0.16em] whitespace-nowrap",
              onDark ? "text-ink-inv-2" : "text-ink-2",
              itemClassName,
            )}
          >
            {item}
          </span>
          {separator && (
            <span
              aria-hidden="true"
              className={cn(
                "h-1 w-1 rounded-full",
                onDark ? "bg-sky-500/70" : "bg-navy-600/35",
              )}
            />
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={cn(
        "marquee group relative flex overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]",
        className,
      )}
    >
      <div
        className="marquee-track flex w-max"
        style={
          {
            "--marquee-duration": `${duration}s`,
            "--marquee-copies": copies,
            ...(reverse ? { "--marquee-direction": "reverse" } : {}),
          } as React.CSSProperties
        }
      >
        {Array.from({ length: Math.max(2, copies) }, (_, i) => (
          <Fragment key={i}>{row(i > 0)}</Fragment>
        ))}
      </div>
    </div>
  );
}
