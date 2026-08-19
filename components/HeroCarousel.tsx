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
  /**
   * The plate's own width/height, straight off the encoded file. The box is
   * given this ratio, so it has to stay measured — a number that drifts from
   * the file is the one way a plate could still lose an edge.
   */
  ratio?: number;
};

/**
 * How tall a plate may get.
 *
 * The stage is the hero's 47rem less the 3rem the capability ticker owns, so
 * 44rem, and a plate is centred in it. Three of the four posters are square, and
 * a square plate in a box sized only by width overflows that: at 1920 the box
 * takes its 49rem cap, 784px, and a 784px-tall plate in a 704px stage loses 40px
 * off the top and the bottom to `overflow-hidden`. Which is a cut, and cuts are
 * exactly what this round is not to have.
 *
 * So the box carries a second cap, in width, derived from this: `ratio × 34rem`.
 *
 * 34 and not 42, and the header is why. It is 72px and fixed, and the stage
 * starts under it at the very top of the section — so a plate centred in 704px
 * of stage puts its own top edge at (704 − height) / 2. At 42rem that is 21px,
 * which ran "TRUST & SECURITY" straight through the nav: two headlines, one on
 * top of the other. At 34rem it is 80px, clear of the header with 8px spare,
 * and each poster's own margin holds another 18px before its type starts.
 *
 * It also lands the square plates at 544px, within twenty pixels of the height
 * the plates had before the posters were shown whole — so this is the size the
 * rest of the hero was tuned around, not a new one.
 *
 * Written as a CSS variable rather than an inline `max-width` because it must
 * apply from lg only: below that the plate is the full-bleed backdrop behind
 * the copy, and a max-width there would pull it off centre.
 */
const PLATE_MAX_HEIGHT_REM = 35;

/**
 * The plate's feather, re-measured for the square set.
 *
 * Each file was scanned for its first sustained run of lit subject — six or
 * more bright pixels holding across four rows or columns — from each edge:
 *
 *              top      bottom   left     right
 *   global     21.37%    16.99%   8.53%    5.74%
 *   intellig.   6.70%     1.20%   9.09%    9.49%
 *   trust       3.51%     0.96%   5.98%    5.90%
 *   innovation  6.30%     5.18%   4.63%    6.06%
 *
 * The holds sit inside the tightest of each column: 3% top, under trust's
 * 3.51%, so no headline is touched; 4% at the sides, inside innovation's 4.63%
 * and the widest the set allows; and 2.5% at the foot. That last one is the
 * only edge where the fade meets drawing — trust and intelligent both run their
 * globe off the bottom of the frame — and it is meant to: the alternative there
 * is a hard horizontal line cut through a lit sphere.
 */
const PLATE_MASK =
  "lg:[mask-composite:intersect] lg:[mask-image:linear-gradient(180deg,transparent_0%,#000_3%,#000_97.5%,transparent_100%),linear-gradient(90deg,transparent_0%,#000_4%,#000_96%,transparent_100%)]";

/**
 * One ratio for the set. The client re-cut all four posters to 1254x1254, so
 * the box that carries the picture's shape is square for every slide — where
 * before this map held 1.500 for the global one and 1.000 for the other three.
 *
 * Kept as a map rather than folded into a constant because it is keyed off the
 * slide id, and the next poster to arrive may well not be square.
 */
const PLATE_RATIO: Record<string, number> = {
  "global-solution-platform": 1254 / 1254,
  "intelligent-platform": 1254 / 1254,
  "trust-and-security": 1254 / 1254,
  "innovation-led": 1254 / 1254,
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
    ratio: PLATE_RATIO[slide.id],
    /*
      Contains, at every width.

      The box already carries the plate's own ratio, so `cover` would fit it
      exactly too — but only while the two agree to the pixel. `contain` is the
      one that cannot cut: if a ratio ever drifts from its file, the plate
      letterboxes inside its box instead of losing an edge, and a hairline of
      ground is a far cheaper failure than a trimmed poster.
    */
    imageClass: "object-contain object-center",
    // 1023, not 1024: the `lg:` styles that give the plate its own width start
    // *at* 1024, so a `max-width: 1024px` condition would still be asking for a
    // full-viewport asset on the first width that no longer needs one. Above
    // that the plate is capped at 42rem tall, so 860 covers its widest.
    sizes: "(max-width: 1023px) 100vw, 860px",
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

  const go = useCallback(
    (next: number) => setActive(((next % COUNT) + COUNT) % COUNT),
    [],
  );

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
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
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
      /*
        No mouse hold. It used to stop the moment the pointer crossed it, which
        meant the carousel froze for anyone reading the copy — the pointer rests
        over the hero constantly and the reader never asked for it to stop.
        Pausing is now only what the pause button does, at the client's request.

        Focus still holds it, and that is a different case worth keeping: a
        keyboard user tabbing along the dots is working inside the control, and
        having the slide change underneath them mid-tab moves the thing they are
        aiming at. WCAG 2.2.2 is satisfied either way by the pause button.
      */
      onFocusCapture={(e) => {
        /*
          Keyboard focus only — `:focus-visible`, not plain focus.

          Plain focus broke Play. Clicking the button focuses it, focus set the
          hold, and the hold outranked `playing` — so pressing Play resumed
          nothing and the only way out was to move the pointer off the hero,
          which is not a thing anyone would guess. Measured: paused, pressed
          Play, waited two slide intervals, still on the same image.

          `:focus-visible` is exactly the distinction wanted here. It is true
          when focus arrived by keyboard and false when it arrived by a click,
          so tabbing along the dots still freezes the slide being aimed at,
          while clicking a control does not.
        */
        if ((e.target as HTMLElement).matches(":focus-visible")) setHeld(true);
      }}
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
                isActive
                  ? "opacity-100 duration-700"
                  : "opacity-0 duration-500",
              )}
            >
              <div className="absolute inset-0">
                {/*
                  The light behind the plate — and only the light now.

                  A dark pool used to sit under this, spanning from 34% to past
                  the right edge, taking the hero down to the plates' own
                  near-black before the two met. It existed to kill a seam: the
                  posters are drawn on ~#000412 and the hero reaches #0a1f45 in
                  this corner, and unequal grounds meeting on a straight line is
                  what makes a raster read as pasted on.

                  The blend on the plate removes that seam at the cause, so the
                  pool has nothing left to do — and worse, it would undo the
                  blend: `lighten` keeps whichever of plate and backdrop is
                  brighter, so darkening the backdrop to the plate's own ground
                  is precisely how you get the plate's ground back.

                  This layer is the opposite and it stays. Sky into green, low
                  and wide, breathing — under the blend it comes up *through*
                  the poster's dark field, so the artwork sits in the hero's own
                  light rather than on top of it.
                */}
                {!frame.bleed && (
                  <div className="anim-breathe absolute inset-y-[8%] right-0 left-[38%] hidden rounded-full bg-[radial-gradient(closest-side,rgba(1,164,255,.20),rgba(1,172,50,.07)_55%,transparent_78%)] blur-2xl lg:block" />
                )}

                {/*
                  The five capability plates, whole.

                  They used to bleed: 126% of the section height, anchored
                  right, with a mask taking the left 46% to nothing. That made a
                  hero image out of them — one surface rather than a picture
                  beside some words — but it did so by hiding most of each
                  plate, and these are not backdrops. They are information
                  graphics with their own labelling, and on
                  `trust-and-security` the mask fell exactly across "DATA
                  PRIVACY BY DESIGN", "RISK & FRAUD PROTECTION" and "SECURE
                  CLOUD INFRASTRUCTURE" while the 126% clipped a further 26% off
                  the top and bottom. A reader could see about half of what the
                  artwork was saying.

                  So the plate is contained now, in a box to the right of the
                  copy, and nothing is cropped or masked. The copy block is
                  586px wide at every breakpoint — it shrinks to the headline
                  rather than to its `max-w` — which is what leaves room for
                  this: 766px clear at 1440 and 1006px at 1920. The width steps
                  at xl because below 1280 there is not enough clear space to
                  take without running under the words.

                  What the bleed used to buy is bought instead by the pool
                  below. These plates are drawn on near-black, around #000212,
                  against a hero that reaches #0a1f45 in this corner — close, but
                  not close enough, and unequal grounds meeting on a straight
                  line is what makes a raster read as pasted on. A soft dark
                  radial under the plate takes the hero to the plate's own ground
                  before the plate arrives, so there is no edge left to see.

                  The globe needs none of this: it is a full-bleed photographic
                  plate that already covers the section.
                */}
                {/*
                  The plate's box, and both of its limits are data.

                  `aspectRatio` is the poster's own — three different ratios
                  across the four files — so the box is the shape of the
                  picture and the picture fills it without losing an edge.

                  `--plate-max` caps the height at 35rem, and that number is
                  the clear space rather than the stage: measured, a 560px plate
                  lands its top exactly on the header's foot and leaves 20px
                  above the carousel controls. Any taller and the controls bar
                  crosses the bottom of the poster — which is a trim, whatever
                  the mask says. It is a variable rather than an inline
                  `max-width` because it must apply from lg only: below that the
                  plate is the backdrop and a cap would pull it off centre.

                  The wider 46% starts at 2xl rather than xl, and that is
                  measured too. At 1280 the 46% plate puts its leftmost artwork
                  24px inside where the live paragraph ends — the poster's own
                  labels running under the copy. At 38% the same width leaves
                  46px of clear air, and every step above 1366 has 50px or
                  more.

                  The right offset is `max(2%, (100vw - 84rem)/2 - 3rem)`, which
                  is the shell's own gutter minus a 3rem bleed. Below 1440 the
                  bracket is negative or small and the 2% wins, so every width
                  this was measured at is untouched. Above it the plate follows
                  the content column in rather than staying pinned near the
                  viewport edge — at 1920 the 2% left it 250px outside the
                  column, which is what read as "pushed too far right"; it now
                  ends 48px past it.
                */}
                {/*
                  `mix-blend-mode: lighten`, and it is what makes the poster
                  part of the banner rather than a picture sitting on it.

                  The blend keeps, channel by channel, whichever of the plate
                  and the hero behind it is brighter. These posters are
                  glow-on-black: the headline, the nodes, the labels and the
                  globe are all far brighter than the hero, and everything
                  around them is far darker. So the field drops out and the
                  drawing stays, sitting directly on the hero's own ground with
                  no edge anywhere — which is the whole of the "no trims, but it
                  should look like one banner" problem, solved at the cause
                  rather than feathered around.

                  Nothing is cropped to achieve it. The box carries the poster's
                  own 1:1 and the picture fills it whole.

                  It is on this wrapper rather than on the image because
                  `anim-float` and `anim-art-in` run inside it: an animation
                  creates a stacking context while it runs, which isolates any
                  blend applied underneath it, and the plate would flicker
                  between blended and not as each slide came in.
                */}
                <div
                  style={
                    frame.bleed
                      ? undefined
                      : ({
                          aspectRatio: frame.ratio,
                          "--plate-max": `${(frame.ratio ?? 1) * PLATE_MAX_HEIGHT_REM}rem`,
                        } as React.CSSProperties)
                  }
                  className={cn(
                    "absolute inset-0",
                    !frame.bleed &&
                      "lg:inset-auto lg:top-1/2 lg:right-[max(2%,calc((100vw-84rem)/2-3rem))] lg:left-auto lg:h-auto lg:w-[38%] lg:max-w-[var(--plate-max)] lg:-translate-y-1/2 lg:[mix-blend-mode:lighten] 2xl:w-[46%]",
                    isActive && "anim-art-in",
                  )}
                >
                  {/*
                    The halo, and it is inside the blend rather than behind it.

                    Measured, each poster's field sits 5 to 12 levels above the
                    hero once the blend has keyed out its darkest parts — the
                    artwork's own atmosphere, not a seam, but it stops dead on
                    the frame's edge and 11px of feather is not enough to hide a
                    straight 550px line. This spreads the same step across about
                    a hundred: a soft radial in the field's own tone, reaching
                    12% past the plate on each side, blended as part of the same
                    source so it lifts the hero outside the picture to meet the
                    picture's own ground.

                    It is the mirror of the dark pool this hero used to carry.
                    That one took the section down to the plate; this takes it
                    up. Which direction is needed is a property of the artwork,
                    and this set is the brighter of the two.
                  */}
                  {!frame.bleed && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-x-[12%] -inset-y-[9%] hidden rounded-[50%] bg-[radial-gradient(closest-side,rgba(4,26,50,.92),rgba(4,26,50,.42)_58%,transparent_100%)] blur-3xl lg:block"
                    />
                  )}
                  <div
                    className={cn(
                      "absolute inset-0",
                      !frame.bleed && PLATE_MASK,
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

          It has to reach clear sooner than it used to. While the plates were
          masked away under the copy there was nothing on the right worth
          reading, so the veil could still be at 28% at the far edge; now the
          labels live there, and 28% of #030d22 over 12px type is the difference
          between reading it and squinting at it. The copy ends at 47% of the
          viewport and the plate starts around 52%, so the fall happens between
          them and the words keep the cover they had.
        */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,13,34,.95)_0%,rgba(3,13,34,.88)_46%,rgba(3,13,34,.6)_76%,rgba(3,13,34,.4)_100%)] lg:bg-[linear-gradient(100deg,#030d22_10%,rgba(3,13,34,.93)_30%,rgba(3,13,34,.45)_47%,rgba(3,13,34,.04)_64%)]" />

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
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1.5 font-mono text-[0.75rem] uppercase tracking-[0.18em] text-gold-400 sm:text-[0.6875rem] sm:tracking-[0.2em]">
            {hero.eyebrow.split(" · ").map((part, i, all) => (
              <span
                key={part}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                {part}
                {i < all.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-gold-400/50"
                  />
                )}
              </span>
            ))}
          </p>

          <h1 className="h-display-1 leading-[1.04] text-white">
            {hero.headline[0]}
            <br />
            <span className="text-brand-gradient-inv">{hero.headline[1]}</span>
          </h1>

          {/*
            No `max-w-xl` here any more, and a step down in size from `md`.

            This paragraph is the client's positioning line and runs 369
            characters where the one before it ran 145. Held at the 36rem the
            short line sat in, it set to eight lines of 19px directly under a
            display headline — a wall of text where the hero wants a sentence.
            Letting it take the copy column it already sits in (40rem at lg,
            44rem at xl) and easing the size to 17px takes it to four.

            It keeps `text-pretty` so the last line never comes down as a single
            orphaned word, which at this length it otherwise does.
          */}
          <p className="text-[1rem] leading-relaxed text-pretty text-ink-inv-2 md:text-[1.0625rem]">
            {hero.subheadline}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink
              href={hero.primaryCta.href}
              tone="onDark"
              size="lg"
              icon="arrowRight"
            >
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              tone="onDarkGhost"
              size="lg"
            >
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
              <span className="text-white">
                {String(active + 1).padStart(2, "0")}
              </span>
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
                      className="group/dot flex h-11 cursor-pointer items-center px-2.5 md:h-10 md:px-1.5"
                    >
                      <span
                        className={cn(
                          "relative block h-1.5 overflow-hidden rounded-full bg-white/25 transition-[width,background-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isActive
                            ? "w-10"
                            : "w-1.5 group-hover/dot:bg-white/50",
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
              <RailButton
                label="Previous image"
                icon="chevronLeft"
                onClick={() => go(active - 1)}
              />
              <RailButton
                label="Next image"
                icon="chevronRight"
                onClick={() => go(active + 1)}
              />
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
      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white ring-1 ring-white/20 md:h-10 md:w-10 transition-colors hover:bg-white/10 hover:ring-white/45"
    >
      <Icon name={icon} className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}
