"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { carouselSlides, hero } from "@/content/home";
import { capabilityTicker } from "@/content/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icon";
import { Marquee } from "@/components/Marquee";

/**
 * Hero.
 *
 * The proposition is fixed and the artwork rotates behind it. Earlier this was
 * a content carousel — six slides, each with its own headline, body, bullet
 * list and link — and the brand statement was only ever on screen for the first
 * six seconds. A visitor who arrived a moment late never saw it.
 *
 * So the copy no longer moves. One eyebrow, one headline, one paragraph, one
 * pair of calls to action, held for as long as the reader is here. What plays
 * underneath is a set of six images, cross-faded, and nothing else changes with
 * them — no text swap, no relayout, no shift in where the buttons are.
 *
 * That makes the picture the only moving part, so the controls belong with the
 * picture: the counter, the progress pills and the arrows all sit to the right,
 * under the artwork, rather than being split across the width of the section as
 * if they were steering the words too.
 *
 * The five capability banners' own copy (Global Solution Platform, Intelligent
 * Platform, and so on) is still in `content/home.ts` — this component now reads
 * only the image, its description and its name, which is what the frames and
 * their controls need. Nothing was deleted, so those banners can be given a
 * section of their own further down the page whenever the client wants them.
 */

/**
 * One dwell time for every frame. The overview used to hold longer than the
 * rest because it carried the most reading; with the copy fixed there is no
 * frame that asks more of the reader than any other, so an even cadence is the
 * honest one — an uneven one would imply a difference that no longer exists.
 *
 * Matches the galleries' dwell. Nothing on a frame has to be read before it
 * turns — the headline and the ticker are fixed, and only the artwork changes —
 * so this paces the picture, not the copy.
 */
const SLIDE_MS = 4_000;

type Frame = {
  id: string;
  src: string;
  alt: string;
  /** Accessible name for this frame's progress pill. */
  label: string;
  /**
   * Full class string, written out rather than composed — Tailwind generates
   * only the class names it can find as literal text in the source.
   */
  imageClass: string;
  /** Passed straight to `next/image`, so it matches how each frame is framed. */
  sizes: string;
  /**
   * The globe is a photograph-like plate that bleeds across the whole section.
   * The five capability diagrams are drawn artwork with their own internal
   * labelling, so they sit in a fixed frame within the right-hand stage where
   * nothing crops them and they never pass under the copy.
   */
  bleed?: boolean;
};

const FRAMES: Frame[] = [
  {
    id: "global-network",
    src: "/images/hero-network-globe.webp",
    alt: "Digital globe with lit corridors arcing between financial centres",
    label: "Global network",
    imageClass: "object-cover object-[72%_center] lg:object-[62%_center]",
    sizes: "100vw",
    bleed: true,
  },
  ...carouselSlides.map((slide) => ({
    id: slide.id,
    src: slide.image,
    alt: slide.alt,
    label: `${slide.title} ${slide.titleAccent}`,
    imageClass: "object-cover object-center",
    // 1023, not 1024: the `lg:` styles that give the plate its own width start
    // *at* 1024, so a `max-width: 1024px` condition would still be asking for a
    // full-viewport asset on the first width that no longer needs one.
    sizes: "(max-width: 1023px) 100vw, 1120px",
  })),
];

const COUNT = FRAMES.length;

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
    const timer = setTimeout(() => go(active + 1), SLIDE_MS);
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
      aria-label="OrbisMoneta — engineering the future of finance"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false);
      }}
      /*
        47rem = 44rem of hero plus the 3rem capability ticker that now closes
        the section. The 44 itself replaced 48: the hero holds ~350px of copy,
        so at 768px tall it was mostly empty, and because the padding below was
        a quarter of the padding above, all of that emptiness collected between
        the header and the first line of type. Adding the ticker on top of the
        44 rather than inside it is what keeps the copy where it was — take it
        out of the same 44 and every gap above closes by another 24px.
        Below lg the viewport still sets the height.
      */
      className="on-dark relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-abyss lg:min-h-[47rem]"
    >
      {/*
        The rotating stage. It is a labelled group rather than a carousel of
        content: the words on top belong to the page, not to any one frame, so
        announcing a slide change would be announcing nothing. Screen reader
        users get the current frame's description and a set of controls to move
        between them, and no interruption when it advances on its own.
      */}
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Hero artwork"
        // Stops 3rem short of the bottom — the ticker owns that band, and the
        // artwork centres on the hero proper rather than on hero-plus-ticker.
        className="absolute inset-x-0 top-0 bottom-12 -z-10"
      >
        {FRAMES.map((frame, i) => {
          const isActive = i === active;
          return (
            <div
              key={frame.id}
              aria-hidden={!isActive}
              className={cn(
                "absolute inset-0 transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)]",
                isActive ? "opacity-100 duration-700" : "opacity-0 duration-500",
              )}
            >
              <div className="absolute inset-0">
                {/* Light behind the artwork, breathing slowly. */}
                {!frame.bleed && (
                  <div className="anim-breathe absolute inset-y-[8%] right-0 left-[38%] hidden rounded-full bg-[radial-gradient(closest-side,rgba(1,164,255,.20),rgba(1,172,50,.07)_55%,transparent_78%)] blur-2xl lg:block" />
                )}

                {/*
                  One plate, running off the top, the bottom and the right of
                  the section, with its left edge dissolved under the copy.

                  Two earlier attempts are worth recording, because both were
                  wrong in the same way. `object-contain` across the full stage
                  fitted each diagram to the section height, so it grew with
                  every wider screen and sat hard against the header and the
                  control bar. A fixed 5:4 frame fixed the scale but produced a
                  plate with four visible edges floating beside the copy — two
                  things on the page rather than one, which is exactly what a
                  hero image must not read as.

                  Bleeding it is what makes it one thing. At 126% of the section
                  height there is no top or bottom edge to see, the right edge is
                  the viewport's own, and the only boundary left is the left one
                  — which the mask takes to zero across nearly half the plate, so
                  the artwork is already gone by the time it reaches the words.
                  The copy sits over the tail of that fade rather than beside a
                  picture, and the plate is roughly 1100px wide at 1440 and up,
                  against the 630 it was.

                  The globe needs none of this: it is a full-bleed photographic
                  plate that already covers the section.
                */}
                <div
                  className={cn(
                    "absolute inset-0",
                    !frame.bleed &&
                      "lg:inset-auto lg:top-1/2 lg:right-0 lg:aspect-[5/4] lg:h-[118%] lg:w-auto lg:-translate-y-1/2 lg:[mask-image:linear-gradient(90deg,transparent_0%,#000_46%)] xl:h-[126%]",
                    isActive && "anim-art-in",
                  )}
                >
                  <div className="anim-float absolute inset-0">
                    <Image
                      src={frame.src}
                      alt={frame.alt}
                      fill
                      priority={i === 0}
                      sizes={frame.sizes}
                      quality={82}
                      className={frame.imageClass}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/*
          One veil for all six frames rather than one per frame. Because the
          copy is now fixed, its contrast has to hold against every image, and a
          single shared layer is the only way to guarantee that — a per-frame
          scrim would have to be re-tuned every time a frame is swapped, and any
          horizontal one would draw a second edge on the stage boundary the mask
          above exists to erase. This one spans the full width, so it has no
          edge of its own inside the section.

          Below lg the artwork sits behind the copy, so the veil runs top to
          bottom; from lg it runs across, dark under the words and clear over
          the artwork.
        */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,13,34,.95)_0%,rgba(3,13,34,.88)_46%,rgba(3,13,34,.6)_76%,rgba(3,13,34,.4)_100%)] lg:bg-[linear-gradient(100deg,#030d22_8%,rgba(3,13,34,.94)_34%,rgba(3,13,34,.55)_58%,rgba(3,13,34,.28)_100%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_top,#030d22_1%,transparent_30%)]" />
      </div>

      {/*
        The proposition. Rendered once and never re-keyed, so `stagger-rise`
        plays on arrival and then leaves it alone — the entrance is the only
        motion the words get, which is what "static" has to mean here.
      */}
      {/*
        The copy is centred in what is left after the padding, so the padding is
        what decides where it lands — and the top used to be four times the
        bottom (pt-40 against pb-10), which is what opened the gap under the
        header. Evening them out puts the same amount of air above the eyebrow
        as below the buttons, which is what "centred" was meant to mean.
        Mobile is untouched: there the hero is viewport-height and the two gaps
        already matched.
      */}
      <div className="shell relative flex flex-1 items-center pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="stagger-rise flex max-w-xl flex-col gap-5 self-center md:gap-6 lg:max-w-[40rem] xl:max-w-[44rem]">
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
        </div>
      </div>

      {/* Control bar */}
      <div className="relative border-t border-white/10 bg-abyss/45 backdrop-blur-sm">
        {/* Scroll cue — a real control, seated on the divider so it never
            collides with the copy or the artwork at any viewport size. */}
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

        {/*
          Everything that drives the artwork, kept together on the right, under
          the artwork itself. The counter and the pills used to sit at the far
          left and the arrows at the far right — a full section-width apart, on
          opposite sides of a control the reader thinks of as one thing. That
          split only made sense while the left half of the hero was also
          changing. It isn't any more.
        */}
        <div className="shell flex h-16 items-center justify-end">
          <div className="flex items-center gap-3 sm:gap-4">
            <p className="hidden font-mono text-[0.6875rem] tabular text-ink-inv-3 sm:block">
              <span className="text-white">{String(active + 1).padStart(2, "0")}</span>
              {" / "}
              {String(COUNT).padStart(2, "0")}
            </p>

            {/* One pill per frame. The active one stretches and fills as the
                frame plays, so the progress bar and the position indicator are
                the same object rather than two things to read. */}
            <ul className="flex items-center">
              {FRAMES.map((frame, i) => {
                const isActive = i === active;
                return (
                  <li key={frame.id}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Show image ${i + 1} of ${COUNT}: ${frame.label}`}
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
                            // Duration comes from the same constant that drives
                            // the advance, so the fill can never disagree with
                            // when the image actually changes.
                            style={{ animationDuration: `${SLIDE_MS / 1000}s` }}
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

            <span aria-hidden="true" className="h-5 w-px bg-white/15" />

            <div className="flex shrink-0 items-center gap-2">
              <RailButton label="Previous image" icon="chevronLeft" onClick={() => go(active - 1)} />
              <RailButton label="Next image" icon="chevronRight" onClick={() => go(active + 1)} />
              {/*
                Pause is shown at every width, not from sm up as it was. On a
                phone there is no hover, so the pointer cannot hold the rotation
                the way it does on a desktop — hiding the button left touch
                users with no way at all to stop something that moves by itself.
                It is the counter that gives way on small screens instead; that
                one is a readout, and the pills already say the same thing.
              */}
              {!reduced && (
                <RailButton
                  label={playing ? "Pause the artwork" : "Play the artwork"}
                  icon={playing ? "minus" : "play"}
                  onClick={() => setPlaying((p) => !p)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/*
        The capability ticker, closing the hero rather than sitting a section
        below it. It used to run under the industries band, two blocks down the
        page, where it read as a divider between other people's content. Inside
        the hero it does the job it was written for: the headline says what the
        firm builds, and the strip underneath names the ground it covers.

        `relative` lifts it over the artwork layer, and its own solid ground
        stops the plate showing through — the artwork stage already stops 3rem
        short, so the two never overlap.
      */}
      <div className="relative flex h-12 items-center border-t border-white/10 bg-abyss">
        <Marquee items={capabilityTicker} duration={62} onDark />
      </div>
    </section>
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
