"use client";

import { useEffect, useState } from "react";
import { aboutPage } from "@/content/about";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/Icon";

const slides = aboutPage.experience.slides;
const tiles = aboutPage.credentials;
const INTERVAL = 5600;

/**
 * "Leadership & Payment Experience" — the rotating panel from the brief.
 *
 * The rotating figure sits above a fixed strip of credential tiles. They used
 * to live in their own block further down the page, next to the leadership
 * summary, where they read as unrelated; here they are the standing proof
 * underneath the changing one, which is what the layout is for.
 */
export function ExperienceSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(q.matches);
    apply();
    q.addEventListener("change", apply);
    return () => q.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % slides.length), INTERVAL);
    return () => clearTimeout(t);
  }, [active, paused, reduced]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
      }}
      className="flex flex-col gap-6 rounded-[var(--radius-card)] bg-white/[0.045] p-8 ring-1 ring-white/12 backdrop-blur-sm"
      aria-roledescription="carousel"
      aria-label="Leadership and payment experience"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-sky-400">
          {aboutPage.experience.eyebrow}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => setActive((a) => (a - 1 + slides.length) % slides.length)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white ring-1 ring-white/20 transition-colors hover:bg-white/10"
          >
            <Icon name="chevronLeft" className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => setActive((a) => (a + 1) % slides.length)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white ring-1 ring-white/20 transition-colors hover:bg-white/10"
          >
            <Icon name="chevronRight" className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="grid" aria-live="polite">
        {slides.map((slide, i) => {
          const isActive = i === active;
          return (
            <div
              key={slide.label}
              aria-hidden={!isActive}
              className={cn(
                "col-start-1 row-start-1 flex min-h-[9rem] flex-col justify-center gap-2 transition-opacity duration-400",
                isActive ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-inv-3">
                {slide.label}
              </p>
              {/*
                Figure and unit are separate elements on a shared baseline, not
                one tracked block with a span inside it. That is what keeps
                "Years" legible: it gets `stat-unit` tracking and a real gap,
                rather than inheriting the -0.04em drawn for a 52px numeral.
              */}
              <p
                className={cn(
                  "flex flex-wrap items-baseline gap-x-3 gap-y-1",
                  isActive && "anim-rise",
                )}
              >
                <span
                  className={cn(
                    "stat-value font-display font-bold text-white",
                    // A multi-word value is a phrase, not a figure, and relaxes
                    // its tracking accordingly.
                    slide.value.length > 12
                      ? "stat-phrase text-[1.5rem] leading-tight md:text-[1.75rem]"
                      : "stat-figure text-[2.75rem] leading-none md:text-[3.25rem]",
                  )}
                >
                  {slide.value}
                </span>
                {"unit" in slide && slide.unit && (
                  <span className="stat-unit text-[1.125rem] font-semibold text-sky-400">
                    {slide.unit}
                  </span>
                )}
              </p>
              <p className="text-[0.875rem] leading-relaxed text-ink-inv-2">{slide.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Standing credentials, beneath the rotating figure */}
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-3">
        {tiles.map((tile) => (
          <li
            key={tile.label}
            className="group/tile flex flex-col items-center gap-2.5 bg-abyss/60 px-3 py-5 text-center transition-colors duration-200 hover:bg-abyss/30"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-sky-400 transition-colors duration-200 group-hover/tile:bg-sky-500 group-hover/tile:text-white">
              <Icon name={tile.icon as IconName} className="h-4 w-4" strokeWidth={1.7} />
            </span>
            <span className="stat-phrase text-[0.75rem] leading-snug font-semibold text-white">
              {tile.value}
            </span>
            {/*
              `mt-auto` pins the labels to a common baseline. Without it a
              one-line value and a two-line value put their labels at different
              heights and the row reads as misaligned rather than as a set.
            */}
            <span className="mt-auto font-mono text-[0.5625rem] leading-snug tracking-[0.14em] text-ink-inv-3 uppercase">
              {tile.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${slide.label}`}
            aria-current={i === active ? "true" : undefined}
            className="group/dot h-6 flex-1 cursor-pointer"
          >
            {/*
              The active rail fills across exactly one interval, so the panel
              visibly advances on its own instead of looking like a manual
              control. `key` restarts the fill on each slide; hovering pauses
              both the timer and the fill, so the two never disagree.
            */}
            <span
              className={cn(
                "block h-0.5 overflow-hidden rounded-full",
                i === active ? "bg-white/20" : "bg-white/15 group-hover/dot:bg-white/35",
              )}
            >
              {i === active && !reduced && (
                <span
                  key={active}
                  aria-hidden="true"
                  className="block h-full origin-left rounded-full bg-sky-400 animate-[om-progress_5600ms_linear_forwards]"
                  style={{ animationPlayState: paused ? "paused" : "running" }}
                />
              )}
              {i === active && reduced && (
                <span aria-hidden="true" className="block h-full rounded-full bg-sky-400" />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
