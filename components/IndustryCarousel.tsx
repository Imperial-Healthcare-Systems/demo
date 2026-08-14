"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { industryContext } from "@/content/home";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/Icon";

/**
 * The gallery beside the Industry Context copy.
 *
 * It replaces a single fixed plate, and the reason it is a framed card rather
 * than the frameless, feathered artwork that plate used is the artwork itself.
 * The seven files do not share a ground: three are light (rgb(240,244,253) and
 * near neighbours), one is mid grey-blue, and three are dark — rgb(2,10,28),
 * rgb(1,5,21), rgb(37,37,70). Feathering works by taking a plate's edges to
 * zero so nothing is left to see, which only holds when the plate and the page
 * are close in tone. Feather a near-black scene onto a white section and you
 * get a soft-edged dark blob, not a blend. A card, clipped and rounded, is the
 * one treatment that carries all seven, and it is also what makes a rotating
 * set read as one component rather than as pictures appearing in a hole.
 *
 * The card's ground is the lightest plate's own colour, so the single image
 * that has to be contained rather than covered letterboxes invisibly.
 */

const SLIDE_MS = 5_000;
const SLIDES = industryContext.gallery;
const COUNT = SLIDES.length;

export function IndustryCarousel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  /**
   * Nothing advances until the gallery is actually on screen.
   *
   * Without this the timer started at page load, and this section sits a long
   * way down: a visitor reading the hero, the ticker and the industries band
   * arrives here around twenty seconds in, by which point the run had already
   * reached the fifth or sixth image. The globe — the one image that is meant
   * to lead — existed only for the first five seconds, while it was below the
   * fold and nobody could see it.
   *
   * Leaving the viewport pauses rather than resets. Scrolling past and coming
   * back should pick up where it was; restarting on every re-entry would make
   * the gallery look stuck on the first image to anyone scrolling around.
   */
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

  const go = useCallback((next: number) => setActive(((next % COUNT) + COUNT) % COUNT), []);

  const running = playing && !held && !reduced && inView;

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
      aria-label="Industry context imagery"
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
      /*
        9:8 holds the frame the single plate already had, so adding six more
        images does not move the section's height again. It is also the widest
        frame the globe survives: it has 14.4% of blank height to give and this
        crop takes 11.1%.
      */
      className="relative aspect-[9/8] w-full overflow-hidden rounded-[var(--radius-card)] bg-[#e7eefb] shadow-[0_26px_60px_-38px_rgba(10,21,51,.5)] ring-1 ring-line"
    >
      {SLIDES.map((slide, i) => {
        const isActive = i === active;
        return (
          <div
            key={slide.src}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0 transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)]",
              isActive ? "opacity-100 duration-700" : "opacity-0 duration-500",
            )}
          >
            <div className={cn("absolute inset-0", isActive && "anim-art-in")}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                /* A fixed width, not a vw fraction: the shell caps at 84rem, so
                   this frame tops out at 731px however wide the screen gets. */
                sizes="(max-width: 1023px) 100vw, 760px"
                quality={82}
                className={slide.fit}
              />
            </div>
          </div>
        );
      })}

      {/*
        Controls inside the card, not below it. Below would have added their own
        height to the tallest column and pushed the section back out by the
        50-odd pixels just taken off it. A translucent white pill reads on both
        the light plates and the near-black ones, which a bare row of dots on
        this mix of grounds would not.
      */}
      <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-white/75 px-2 py-1 shadow-[0_6px_18px_-10px_rgba(10,21,51,.5)] ring-1 ring-black/5 backdrop-blur-sm sm:right-4 sm:bottom-4">
        <ul className="flex items-center">
          {SLIDES.map((slide, i) => {
            const isActive = i === active;
            return (
              <li key={slide.src}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show image ${i + 1} of ${COUNT}: ${slide.label}`}
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
                        // Same constant that drives the advance, so the fill can
                        // never disagree with when the image actually changes.
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
    </div>
  );
}
