"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/Icon";

/**
 * A rotating set of artwork in a framed card.
 *
 * Extracted from the industry gallery when the partners hero needed the same
 * thing — and needed it for the same reason. Supplied artwork on this project
 * does not share a ground: the partners set runs from rgb(240,242,248) to
 * rgb(0,4,17), and the industry set from rgb(240,244,253) to rgb(1,5,21).
 * Feathering an image into the page works by taking its edges to zero, which
 * only holds when the image and the section are close in tone; feather a
 * near-black scene onto a near-white section and the result is a soft-edged
 * dark blob, not a blend. A clipped, rounded card is the one treatment that
 * carries a mixed set, and it is also what makes a rotating group read as one
 * component rather than as pictures appearing in a hole.
 *
 * Autoplay is gated four ways — a pause control, pointer/focus hold,
 * `prefers-reduced-motion`, and whether the card is actually on screen. The
 * last matters more than it sounds: without it the timer starts at page load,
 * so a gallery below the fold has already run through half its images by the
 * time anyone scrolls to it, and whichever image was meant to lead was on
 * screen only while nobody could see it.
 */

export type ArtSlide = {
  src: string;
  /** Short name, for the dot's accessible label. */
  label: string;
  alt: string;
  /** `object-cover` / `object-contain`, plus any `object-position`. */
  fit: string;
  /**
   * Background behind this slide. Only needed where a slide is contained
   * rather than covered — set it to the image's own ground and the letterbox
   * bars stop being visible. One colour on the frame cannot serve a set whose
   * grounds run from near-white to near-black.
   */
  ground?: string;
};

/* One constant drives both the advance and the dot's progress fill, so the bar
   can never disagree with when the image actually changes. */
const SLIDE_MS = 4_000;

export function ArtCarousel({
  slides,
  label,
  aspect = "aspect-[9/8]",
  ground = "bg-[#e7eefb]",
  sizes,
  quality = 82,
  priority = false,
  className,
}: {
  slides: readonly ArtSlide[];
  /** Names the set, for the carousel's accessible label. */
  label: string;
  aspect?: string;
  /** Frame background, behind every slide that does not set its own. */
  ground?: string;
  sizes: string;
  quality?: number;
  /** Set on above-the-fold instances so the first slide is not lazy-loaded. */
  priority?: boolean;
  className?: string;
}) {
  const count = slides.length;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  /* Leaving the viewport pauses rather than resets. Scrolling past and coming
     back should pick up where it was; restarting on every re-entry would make
     the card look stuck on the first image to anyone scrolling around. */
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      // A third of the card, so it counts as visible once it is being looked
      // at rather than the instant its top edge clips the viewport.
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(query.matches);
      if (query.matches) setPlaying(false);
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const go = useCallback(
    (next: number) => setActive(((next % count) + count) % count),
    [count],
  );

  const running = playing && !held && !reduced && inView && count > 1;

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => go(active + 1), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [active, running, go]);

  return (
    <div
      ref={rootRef}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(active + 1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(active - 1);
        }
      }}
      className={cn(
        "relative w-full overflow-hidden rounded-[var(--radius-card)] shadow-[0_26px_60px_-38px_rgba(10,21,51,.5)] ring-1 ring-line",
        aspect,
        ground,
        className,
      )}
    >
      {slides.map((slide, i) => {
        const isActive = i === active;
        return (
          <div
            key={slide.src}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0 transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)]",
              slide.ground,
              isActive ? "opacity-100 duration-700" : "opacity-0 duration-500",
            )}
          >
            <div className={cn("absolute inset-0", isActive && "anim-art-in")}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes={sizes}
                quality={quality}
                priority={priority && i === 0}
                className={slide.fit}
              />
            </div>
          </div>
        );
      })}

      {/*
        Controls inside the card, not below it. Below would add their own height
        to whichever column is tallest and push the section back out. A
        translucent white pill reads on both the light plates and the near-black
        ones, which a bare row of dots on this mix of grounds would not.
      */}
      {count > 1 && (
        <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-white/75 px-2 py-1 shadow-[0_6px_18px_-10px_rgba(10,21,51,.5)] ring-1 ring-black/5 backdrop-blur-sm sm:right-4 sm:bottom-4">
          <ul className="flex items-center">
            {slides.map((slide, i) => {
              const isActive = i === active;
              return (
                <li key={slide.src}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show image ${i + 1} of ${count}: ${slide.label}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group/dot flex h-7 cursor-pointer items-center px-1"
                  >
                    <span
                      className={cn(
                        "relative block h-1.5 overflow-hidden rounded-full bg-navy-600/25 transition-[width,background-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive ? "w-6" : "w-1.5 group-hover/dot:bg-navy-600/50",
                      )}
                    >
                      {isActive && (
                        <span
                          key={`${i}-${running}`}
                          // Same constant that drives the advance, so the fill
                          // can never disagree with when the image changes.
                          style={{ animationDuration: `${SLIDE_MS / 1000}s` }}
                          className={cn(
                            "absolute inset-0 block origin-left rounded-full bg-navy-600",
                            running ? "animate-[om-progress_linear_forwards]" : "scale-x-100",
                          )}
                        />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {!reduced && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause the gallery" : "Play the gallery"}
              className="ml-0.5 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-navy-600 transition-colors hover:bg-navy-600 hover:text-white"
            >
              <Icon name={playing ? "minus" : "play"} className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
