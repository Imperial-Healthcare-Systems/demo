"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { carouselSlides, hero } from "@/content/home";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icon";

/**
 * Hero carousel.
 *
 * Opens on the brand statement, holds a beat longer than the rest, then plays
 * through the five capability banners the client supplied.
 *
 * The six-column pillar rail that used to sit under the hero and double as its
 * navigation was removed at the client's request — the audiences it competed
 * with now have their own section immediately below. What replaced it is a slim
 * control bar: a progress pill per slide plus previous, next and pause.
 *
 * Slides share a single grid cell, so the frame never changes height as it
 * advances, and each slide's artwork cross-fades behind the copy.
 */

const OVERVIEW_MS = 6_000;
const SLIDE_MS = 4_800;

/** Accessible names for the progress pills — slide 0 is the brand statement. */
const LABELS = [
  "Overview",
  ...carouselSlides.map((s) => `${s.title} ${s.titleAccent}`),
];

const COUNT = LABELS.length;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [reduced, setReduced] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (!playing || held || reduced) return;
    const timer = setTimeout(() => go(active + 1), active === 0 ? OVERVIEW_MS : SLIDE_MS);
    return () => clearTimeout(timer);
  }, [active, playing, held, reduced, go]);

  const scrollPastHero = () => {
    const section = sectionRef.current;
    if (!section) return;
    window.scrollTo({
      top: section.offsetTop + section.offsetHeight - 72,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="OrbisMoneta — engineering the future of finance"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false);
      }}
      className="on-dark relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-abyss lg:min-h-[48rem]"
    >
      {/* Artwork — one layer per slide, cross-faded */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* Overview: full-bleed network globe */}
        <Backdrop active={active === 0}>
          <Image
            src="/images/hero-network-globe.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={82}
            className="object-cover object-[72%_center] lg:object-[62%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,#030d22_8%,rgba(3,13,34,.94)_34%,rgba(3,13,34,.55)_58%,rgba(3,13,34,.28)_100%)]" />
        </Backdrop>

        {/*
          Capability banners. On desktop the artwork sits in its own stage to
          the right of the copy — it never passes beneath the text, so nothing
          has to be drowned in a scrim and the diagram's own labelling stays
          readable. It is centred and contained rather than cropped, because
          clipping the outer icon ring would lose content. On mobile it becomes
          a full-bleed texture behind the copy instead.
        */}
        {carouselSlides.map((slide, i) => {
          const isActive = active === i + 1;
          return (
            <Backdrop key={slide.id} active={isActive}>
              {/*
                The artwork box begins at 45% of the hero. Its left edge was
                visible as a hard vertical seam the full height of the section —
                most obvious during a slide change, where the incoming image
                looked like it was emerging from a box. A gradient overlay used
                to try to blend it, but the overlay's own left edge sat on the
                same boundary, so it could only ever soften the seam, never
                remove it.
                Masking the box instead takes the artwork's alpha to zero *at*
                the boundary, so there is no edge left to see — and because the
                mask travels with the layer, it holds through the scale and the
                crossfade rather than only at rest.
              */}
              <div className="absolute inset-y-0 right-0 w-full lg:left-[42%] lg:w-auto lg:[mask-image:linear-gradient(90deg,transparent_0%,#000_26%)]">
                {/* Light behind the artwork, breathing slowly */}
                <div className="anim-breathe absolute inset-[10%] hidden rounded-full bg-[radial-gradient(closest-side,rgba(1,164,255,.20),rgba(1,172,50,.07)_55%,transparent_78%)] blur-2xl lg:block" />

                <div className={cn("absolute inset-0", isActive && "anim-art-in")}>
                  <div className="anim-float absolute inset-0">
                    <Image
                      src={slide.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 56vw"
                      quality={80}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="object-cover object-center lg:object-contain"
                    />
                  </div>
                </div>

                {/*
                  Below lg the artwork sits behind the copy and still needs
                  veiling. From lg the mask on the parent does the edge work, so
                  the horizontal gradient that used to live here is gone — it was
                  the thing drawing a second edge on the same boundary.
                */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,13,34,.95)_0%,rgba(3,13,34,.88)_46%,rgba(3,13,34,.6)_76%,rgba(3,13,34,.4)_100%)] lg:bg-none" />
              </div>
            </Backdrop>
          );
        })}

        <div className="absolute inset-0 bg-[linear-gradient(to_top,#030d22_1%,transparent_30%)]" />
      </div>

      {/* Corridor markers — over the globe, and only while it is showing */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-[2%] left-[40%] hidden transition-opacity duration-500 lg:block",
          active === 0 ? "opacity-100" : "opacity-0",
        )}
      >
        {active === 0 &&
          hero.nodes.map((node) => (
            <span
              key={node.city}
              className="anim-marker-in absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-md bg-abyss/70 px-2.5 py-1.5 ring-1 ring-sky-500/25 backdrop-blur-sm"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                animationDelay: `${600 + node.delay}ms`,
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400/70 [animation-duration:3s] motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-400" />
              </span>
              <span className="font-mono text-[0.625rem] leading-none tracking-[0.14em] text-white uppercase">
                {node.city}
              </span>
              <span className="font-mono text-[0.5625rem] leading-none tracking-[0.12em] text-ink-inv-3 uppercase">
                {node.country}
              </span>
            </span>
          ))}
      </div>

      {/* Slides */}
      <div className="shell relative flex flex-1 items-center pt-24 pb-8 md:pt-36 md:pb-10 lg:pt-40">
        <div aria-live="polite" aria-atomic="false" className="grid w-full">
          {/* Slide 0 — brand statement */}
          <SlideShell
            active={active === 0}
            label={`1 of ${COUNT}: Overview`}
            className="lg:max-w-[54rem]"
          >
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-gold-400 sm:text-[0.6875rem] sm:tracking-[0.2em]">
              {hero.eyebrow.split(" · ").map((part, i, all) => (
                <span key={part} className="flex items-center gap-2 whitespace-nowrap">
                  {part}
                  {i < all.length - 1 && (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold-400/50" />
                  )}
                </span>
              ))}
            </p>

            <h1 className="h-display-1 leading-[1.04] text-white">
              {hero.headline[0]}
              <br />
              <span className="text-brand-gradient-inv">{hero.headline[1]}</span>
            </h1>

            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-ink-inv-2 md:text-[1.1875rem]">
              {hero.subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href={hero.primaryCta.href} tone="onDark" size="lg" icon="arrowRight">
                {hero.primaryCta.label}
              </ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} tone="onDarkGhost" size="lg">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>

            {/*
              The audience chips that used to close this slide now open the
              "Who We Serve" marquee directly below, with the client's artwork
              behind each one. Repeating them here would have said the same
              thing twice within one scroll.
            */}
          </SlideShell>

          {/* Slides 1–5 — capability banners */}
          {carouselSlides.map((slide, i) => {
            const isActive = active === i + 1;
            return (
              <SlideShell
                key={slide.id}
                active={isActive}
                label={`${i + 2} of ${COUNT}: ${slide.title} ${slide.titleAccent}`}
                className="lg:max-w-[36rem]"
              >
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-gold-400">
                  {slide.eyebrow}
                </p>

                <h2 className="h-display-2 leading-[1.06] text-white uppercase">
                  {slide.title} <span className="text-brand-gradient-inv">{slide.titleAccent}</span>
                </h2>

                {slide.subtitle && (
                  <p className="-mt-1 text-lg text-ink-inv-2 md:text-xl">{slide.subtitle}</p>
                )}

                <div aria-hidden="true" className="rule-brand" />

                <p className="max-w-xl text-[1.0625rem] leading-relaxed text-ink-inv-2">
                  {slide.body}
                </p>

                <ul className="grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
                  {slide.points.map((point) => (
                    <li
                      key={point.label + point.accent}
                      className="flex flex-col gap-0.5 border-l border-white/12 pl-3"
                    >
                      <span className="font-mono text-[0.6875rem] leading-tight uppercase tracking-[0.1em] text-white">
                        {point.label} <span className="text-sky-400">{point.accent}</span>
                      </span>
                      {point.detail && (
                        <span className="text-[0.75rem] leading-snug text-ink-inv-3">
                          {point.detail}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                <Link
                  href={slide.href}
                  tabIndex={isActive ? 0 : -1}
                  className="group/slide inline-flex w-fit items-center gap-2 text-sm font-medium text-white"
                >
                  {slide.cta}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-white/25 transition-all duration-200 group-hover/slide:bg-sky-500 group-hover/slide:ring-sky-500">
                    <Icon name="arrowRight" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                </Link>
              </SlideShell>
            );
          })}
        </div>

      </div>

      {/* Control bar */}
      <div className="relative border-t border-white/10 bg-abyss/45 backdrop-blur-sm">
        {/* Scroll cue — a real control, seated on the divider so it never
            collides with slide copy or artwork at any viewport size. */}
        <button
          type="button"
          onClick={scrollPastHero}
          aria-label="Scroll past the hero"
          className="group/scroll absolute -top-5 left-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-abyss text-ink-inv-2 ring-1 ring-white/15 transition-colors hover:bg-navy-600 hover:text-white hover:ring-white/40 md:flex"
        >
          <Icon
            name="chevronDown"
            className="h-4 w-4 animate-[om-scroll-hint_2.6s_var(--ease-in-out-soft)_infinite] motion-reduce:animate-none"
            strokeWidth={2}
          />
        </button>

        <div className="shell flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="hidden font-mono text-[0.6875rem] tabular text-ink-inv-3 sm:block">
              <span className="text-white">{String(active + 1).padStart(2, "0")}</span>
              {" / "}
              {String(COUNT).padStart(2, "0")}
            </p>

            {/* One pill per slide. The active one stretches and fills as the
                slide plays, so the progress bar and the position indicator are
                the same object rather than two things to read. */}
            <ul className="flex items-center">
              {LABELS.map((label, i) => {
                const isActive = i === active;
                return (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Show slide ${i + 1} of ${COUNT}: ${label}`}
                      aria-current={isActive ? "true" : undefined}
                      className="group/dot flex h-10 cursor-pointer items-center px-1.5"
                    >
                      <span
                        className={cn(
                          "relative block h-1.5 overflow-hidden rounded-full bg-white/25 transition-[width,background-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isActive ? "w-10" : "w-1.5 group-hover/dot:bg-white/50",
                        )}
                      >
                        {isActive && (
                          <span
                            key={`${i}-${playing}-${held}`}
                            // Duration comes from the same constants that drive
                            // the advance, so the fill can never disagree with
                            // when the slide actually changes.
                            style={{
                              animationDuration: `${(active === 0 ? OVERVIEW_MS : SLIDE_MS) / 1000}s`,
                            }}
                            className={cn(
                              "absolute inset-0 block origin-left rounded-full bg-sky-400",
                              playing && !held && !reduced
                                ? "animate-[om-progress_linear_forwards]"
                                : "scale-x-100",
                            )}
                          />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <RailButton label="Previous slide" icon="chevronLeft" onClick={() => go(active - 1)} />
            <RailButton label="Next slide" icon="chevronRight" onClick={() => go(active + 1)} />
            {!reduced && (
              <div className="hidden sm:block">
                <RailButton
                  label={playing ? "Pause carousel" : "Play carousel"}
                  icon={playing ? "minus" : "play"}
                  onClick={() => setPlaying((p) => !p)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Backdrop({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)]",
        active ? "opacity-100 duration-700" : "opacity-0 duration-500",
      )}
    >
      {children}
    </div>
  );
}

function SlideShell({
  active,
  label,
  className,
  children,
}: {
  active: boolean;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={label}
      aria-hidden={!active}
      inert={!active}
      className={cn(
        "col-start-1 row-start-1 flex flex-col gap-5 self-center ease-[cubic-bezier(0.22,1,0.36,1)] md:gap-6",
        active
          ? "pointer-events-auto opacity-100 transition-opacity duration-500 delay-150"
          : "pointer-events-none opacity-0 transition-opacity duration-200",
        active && "stagger-rise",
        className,
      )}
    >
      {children}
    </div>
  );
}

function RailButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: IconName;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white ring-1 ring-white/20 transition-colors hover:bg-white/10 hover:ring-white/45"
    >
      <Icon name={icon} className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}
