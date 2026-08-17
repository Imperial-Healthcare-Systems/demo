"use client";

import { useEffect, useRef } from "react";

/**
 * A grid whose children know where the cursor is.
 *
 * Each direct child gets `--spot-x` / `--spot-y` in its own coordinates, so a
 * card can paint a highlight that tracks the pointer across it. The variables
 * are per child rather than per grid on purpose: a background gradient resolves
 * its position against the element it is painted on, so one pair of coordinates
 * set on the container would put every card's highlight in the wrong place —
 * correct only for the card whose top-left happens to be the container's.
 *
 * What it does not do is as important as what it does.
 *
 * It binds nothing at all where a cursor is not a real thing. On a touchscreen
 * `pointermove` fires once per tap, which would light a card at the moment of
 * the tap and leave it lit — so the whole effect is gated on a fine pointer that
 * can hover. It is also gated on `prefers-reduced-motion`, because a highlight
 * chasing the cursor is exactly the kind of continuous movement that setting
 * exists to stop.
 *
 * Reads are batched into one animation frame and the children's rectangles are
 * measured on entry rather than per move — seven `getBoundingClientRect` calls
 * per pointer event would be seven forced layouts per event. They are
 * re-measured on resize and on scroll, since both change where the cards are.
 *
 * Purely decorative: no ARIA, no focus behaviour, nothing here is the only way
 * to reach anything. The cards inside carry their own keyboard and touch
 * affordances.
 */
export function PointerSpotlight({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rects: { el: HTMLElement; box: DOMRect }[] = [];
    let frame = 0;
    let px = 0;
    let py = 0;

    const measure = () => {
      rects = [...grid.children].map((el) => ({
        el: el as HTMLElement,
        box: el.getBoundingClientRect(),
      }));
    };

    const paint = () => {
      frame = 0;
      for (const { el, box } of rects) {
        el.style.setProperty("--spot-x", `${px - box.left}px`);
        el.style.setProperty("--spot-y", `${py - box.top}px`);
      }
    };

    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    grid.addEventListener("pointerenter", measure);
    grid.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      grid.removeEventListener("pointerenter", measure);
      grid.removeEventListener("pointermove", move);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
    };
  }, []);

  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
}
