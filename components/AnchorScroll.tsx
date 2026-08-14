"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Keeps hash navigation landing where it should.
 *
 * Two things were going wrong. The browser resolves a hash as soon as the
 * document parses, which is before the hero imagery and the webfonts have
 * settled — so everything above the target then changes height and the reader
 * is left somewhere else entirely. Measured on a cold load of
 * `/solutions#payments-infrastructure`, the target sat at 1365px on
 * DOMContentLoaded and 190px once settled: a 1175px drift, which is why an
 * anchor link appeared to "start mid page".
 *
 * The second problem was the offset. A bare hash scrolls the target flush to
 * the top of the viewport, where the fixed header covers it. `ANCHOR_OFFSET`
 * matches the `scroll-margin-top` default in globals.css so a target always
 * arrives just below the header, heading first.
 *
 * The re-scroll gives up the moment the reader touches the page — nothing here
 * should ever yank a scroll position out from under someone.
 */
const ANCHOR_OFFSET = 88;

export function AnchorScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    let cancelled = false;

    /*
     * The page scrolls smoothly by default, which fights this: the browser's
     * own hash scroll is still animating when a correction reads
     * `getBoundingClientRect()`, so the measurement is mid-flight and the
     * correction lands short — consistently 18px short, in testing. Smooth
     * behaviour is suspended for the settling window and restored afterwards,
     * so in-page anchor clicks later on still glide.
     */
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const restore = () => {
      root.style.scrollBehavior = previousBehavior;
    };

    /**
     * Distance from the top of the document, by layout rather than by painted
     * position.
     *
     * `getBoundingClientRect()` is the obvious call and the wrong one here:
     * it includes transforms, and most anchor targets on this site are
     * `Reveal` elements that sit translated down until they animate in. Reading
     * their painted position lands the scroll on a spot they are about to
     * vacate, leaving the heading tucked under the header — reliably 18px off,
     * which is the reveal's own offset. `offsetTop` is layout-only, so it gives
     * the resting position whether or not the reveal has played.
     */
    const layoutTop = (el: HTMLElement) => {
      let top = 0;
      let node: HTMLElement | null = el;
      while (node) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return top;
    };

    const settle = () => {
      if (cancelled) return;
      const el = document.getElementById(decodeURIComponent(hash));
      if (!el) return;
      const top = layoutTop(el) - ANCHOR_OFFSET;
      // `auto` rather than the page's smooth default: a correction re-issued
      // as images load would otherwise read as the page lurching.
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    };

    // The reader wins. Any deliberate input stands the corrections down — this
    // must never yank a scroll position out from under someone who has started
    // reading.
    const stop = () => {
      cancelled = true;
      observer.disconnect();
      restore();
    };

    settle();

    /*
     * Then converge.
     *
     * Fixed timers were tried first and are the wrong tool — they fire either
     * side of the shift depending on how fast images decode. Watching document
     * height was better but still missed cases, because a reveal finishing
     * changes where a target paints without changing the page's height at all.
     *
     * So rather than predict when the layout stops moving, this simply keeps
     * checking: each frame, if the target is not sitting at the offset, close
     * the gap. It converges whatever the cause — late images, webfonts,
     * reveals — and stops as soon as it has been correct for a few frames, at
     * the deadline, or the moment the reader touches the page.
     */
    let frame = 0;
    let settledFrames = 0;
    const started = performance.now();

    const converge = () => {
      if (cancelled) return;
      const el = document.getElementById(decodeURIComponent(hash));
      if (el) {
        const delta = el.getBoundingClientRect().top - ANCHOR_OFFSET;
        if (Math.abs(delta) > 1) {
          window.scrollBy({ top: delta, behavior: "auto" });
          settledFrames = 0;
        } else {
          settledFrames++;
        }
      }
      // Six clean frames, but never before 1.2s — reveals fire on an
      // IntersectionObserver that can land well after the first frames look
      // settled, and exiting early let one of them nudge the target back out
      // of position with nothing left watching.
      const elapsed = performance.now() - started;
      if ((settledFrames < 6 || elapsed < 1200) && elapsed < 2600) {
        frame = requestAnimationFrame(converge);
      } else {
        restore();
      }
    };
    frame = requestAnimationFrame(converge);

    const observer = { disconnect: () => cancelAnimationFrame(frame) };
    const deadline = setTimeout(() => {
      cancelAnimationFrame(frame);
      restore();
    }, 3000);
    window.addEventListener("load", settle);
    window.addEventListener("wheel", stop, { passive: true, once: true });
    window.addEventListener("touchstart", stop, { passive: true, once: true });
    window.addEventListener("keydown", stop, { once: true });

    return () => {
      cancelled = true;
      observer.disconnect();
      restore();
      clearTimeout(deadline);
      window.removeEventListener("load", settle);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [pathname]);

  return null;
}
