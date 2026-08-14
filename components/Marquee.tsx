import { cn } from "@/lib/utils";

/**
 * Infinite capability ticker. The list is rendered twice and translated -50%,
 * which gives a seamless loop with no JS. The duplicate is hidden from the
 * accessibility tree, and the whole strip pauses on hover or keyboard focus.
 */
export function Marquee({
  items,
  duration = 52,
  className,
  itemClassName,
  separator = true,
  onDark = false,
}: {
  items: readonly string[];
  duration?: number;
  className?: string;
  itemClassName?: string;
  separator?: boolean;
  onDark?: boolean;
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
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
