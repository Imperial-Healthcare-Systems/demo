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
 *
 * On the back face's inline `position`: `cn` concatenates, it does not merge, so
 * a `faceClassName` carrying its own `relative` lands in the same class list as
 * this component's `absolute` — and the cascade resolves that by stylesheet
 * order, where Tailwind emits `.relative` after `.absolute`. The back then falls
 * into normal flow and renders *below* the front instead of behind it, which
 * also doubles the card's height. That is not a hypothetical; it shipped. An
 * inline style outranks any class a caller can pass, so the geometry that makes
 * a flip a flip is no longer something a consumer can accidentally override.
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
  clickOnly = false,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  /** Names the thing being turned over, for the button's accessible name. */
  label: string;
  className?: string;
  faceClassName?: string;
  backClassName?: string;
  minHeight?: string;
  /**
   * Turn on click alone — no hover, no focus.
   *
   * The default is that a card opens as the pointer crosses it and shuts as it
   * leaves, which suits a grid a reader sweeps across. It does not suit a card
   * a reader means to open and keep open: with hover bound, the card closes the
   * moment the pointer moves off it, so the back can never be read at leisure
   * and a wide grid flickers as the cursor travels.
   *
   * The button, its `aria-expanded` and Enter/Space are unaffected — a click is
   * what a keyboard activation fires, so the keyboard path is the same one.
   */
  clickOnly?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  /*
   * Hover handlers are bound only where hovering is a real thing. On a
   * touchscreen a tap synthesises `mouseenter` and then `click`, so the two
   * together flipped the card open and immediately shut again — the card
   * looked completely dead to touch. Gating on the media query lets pointer
   * users hover and touch users tap, without the two cancelling out.
   *
   * `clickOnly` unbinds them everywhere, which is the same protection by a
   * different route: a card that only ever turns on click cannot be caught by
   * that pair either.
   */
  const pointer = useMedia("(hover: hover) and (pointer: fine)");
  const canHover = pointer && !clickOnly;

  return (
    <button
      type="button"
      aria-expanded={flipped}
      aria-label={
        flipped ? `${label} — hide details` : `${label} — show details`
      }
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
          /*
           1000ms, and an even curve rather than the site's usual
           ease-out.

           cubic-bezier(0.22,1,0.36,1) is the standard easing here and it
           is the right one for a thing that arrives — it front-loads
           hard. Measured on this card it turned 62 degrees in the first
           80ms and 156 of 180 by 300ms, so lengthening the duration
           bought almost nothing: the flip still snapped and then crawled
           the last two degrees for most of a second.

           A flip is not an arrival, it is a rotation the eye follows all
           the way round, so it takes a symmetric ease-in-out and spends
           the whole second doing it.
        */
          "relative block h-full w-full transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] [transform-style:preserve-3d]",
          flipped && !reduced && "[transform:rotateY(180deg)]",
          reduced && "transition-none",
        )}
      >
        {/* Front */}
        <span
          aria-hidden={flipped}
          inert={flipped}
          className={cn(
            "relative flex h-full w-full flex-col [backface-visibility:hidden]",
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
          style={{ position: "absolute", inset: 0 }}
          className={cn(
            "flex h-full w-full flex-col [backface-visibility:hidden]",
            reduced
              ? "transition-opacity duration-200"
              : "[transform:rotateY(180deg)]",
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
        "mt-auto inline-flex items-center gap-1.5 pt-4 font-mono text-[0.75rem] md:text-[0.625rem] tracking-[0.14em] uppercase transition-colors duration-200",
        onDark
          ? "text-ink-inv-3 group-hover/flip:text-sky-400"
          : "text-navy-600 group-hover/flip:text-sky-600",
      )}
    >
      Details
      <Icon
        name="refresh"
        className="h-3 w-3 transition-transform duration-1000 group-hover/flip:rotate-180"
        strokeWidth={2}
      />
    </span>
  );
}
