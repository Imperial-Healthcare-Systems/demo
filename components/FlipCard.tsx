"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/Icon";

/**
 * A card that turns over to show its detail.
 *
 * Hover alone would not do. Touch has no hover, and a keyboard user would never
 * reach the back at all — so the same flip is driven by four things: pointer
 * enter/leave, tap, focus, and Enter/Space. The card is a real `<button>` with
 * `aria-expanded`, which is what makes the tap and the keystroke work without
 * any extra handling.
 *
 * Only one face is exposed to assistive technology at a time; the hidden face
 * is `aria-hidden` and `inert`, so a screen reader never reads a card's front
 * and back as one run-on block, and Tab never lands on something invisible.
 *
 * Under reduced motion there is no rotation — the faces cross-fade in place.
 * A card turning over in 3D is exactly the kind of movement that setting exists
 * to suppress.
 */

function useMedia(query: string) {
  const subscribe = useCallback(
    (notify: () => void) => {
      const q = window.matchMedia(query);
      q.addEventListener("change", notify);
      return () => q.removeEventListener("change", notify);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function FlipCard({
  front,
  back,
  label,
  className,
  faceClassName,
  backClassName,
  minHeight = "min-h-[19rem]",
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  /** Names the thing being turned over, for the button's accessible name. */
  label: string;
  className?: string;
  faceClassName?: string;
  backClassName?: string;
  minHeight?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  /*
   * Hover handlers are bound only where hovering is a real thing. On a
   * touchscreen a tap synthesises `mouseenter` and then `click`, so the two
   * together flipped the card open and immediately shut again — the card
   * looked completely dead to touch. Gating on the media query lets pointer
   * users hover and touch users tap, without the two cancelling out.
   */
  const canHover = useMedia("(hover: hover) and (pointer: fine)");

  return (
    <button
      type="button"
      aria-expanded={flipped}
      aria-label={flipped ? `${label} — hide details` : `${label} — show details`}
      onClick={() => setFlipped((v) => !v)}
      onMouseEnter={canHover ? () => setFlipped(true) : undefined}
      onMouseLeave={canHover ? () => setFlipped(false) : undefined}
      onFocus={canHover ? () => setFlipped(true) : undefined}
      onBlur={canHover ? () => setFlipped(false) : undefined}
      className={cn(
        "group/flip relative w-full cursor-pointer text-left [perspective:1400px]",
        "focus-visible:outline-none",
        minHeight,
        className,
      )}
    >
      <span
        className={cn(
          "relative block h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d]",
          flipped && !reduced && "[transform:rotateY(180deg)]",
          reduced && "transition-none",
        )}
      >
        {/* Front */}
        <span
          aria-hidden={flipped}
          inert={flipped}
          className={cn(
            "flex h-full w-full flex-col [backface-visibility:hidden]",
            reduced && "transition-opacity duration-200",
            reduced && flipped && "pointer-events-none opacity-0",
            faceClassName,
          )}
        >
          {front}
        </span>

        {/* Back */}
        <span
          aria-hidden={!flipped}
          inert={!flipped}
          className={cn(
            "absolute inset-0 flex h-full w-full flex-col [backface-visibility:hidden]",
            reduced ? "transition-opacity duration-200" : "[transform:rotateY(180deg)]",
            reduced && !flipped && "pointer-events-none opacity-0",
            backClassName,
          )}
        >
          {back}
        </span>
      </span>
    </button>
  );
}

/**
 * The affordance. Without it a card looks like a static panel and nobody
 * discovers there is a back — the icon rotates with the card so it reads as
 * "there is more this way".
 */
export function FlipHint({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-[0.625rem] tracking-[0.14em] uppercase transition-colors duration-200",
        onDark
          ? "text-ink-inv-3 group-hover/flip:text-sky-400"
          : "text-ink-3 group-hover/flip:text-navy-600",
      )}
    >
      Details
      <Icon
        name="refresh"
        className="h-3 w-3 transition-transform duration-500 group-hover/flip:rotate-180"
        strokeWidth={2}
      />
    </span>
  );
}
