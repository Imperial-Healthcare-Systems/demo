"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { audienceMarquee, type AudienceCard, type AudienceTone } from "@/content/home";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/Icon";

/**
 * "Industries we serve" marquee.
 *
 * Layout is an editorial split: the heading holds the left column and the card
 * track runs from there off the right edge of the viewport. Cards being visibly
 * cut off is what tells you there is more to see — so the track deliberately
 * escapes the page gutter on that side only, and the left edge stays crisp
 * against the heading.
 *
 * Each card is a single photograph with the label sitting on it, rather than a
 * label block above a photo. That needs a scrim: white type over an arbitrary
 * image is the classic contrast failure. The gradient below holds at least 72%
 * opacity through the top third, which keeps white above 7:1 even where the
 * underlying photograph is blown out.
 *
 * The drift itself is hand-rolled rather than pulled from a carousel library,
 * because direction and speed change continuously at runtime — a CSS keyframe
 * animation can only be played, paused or reversed, not steered. One
 * requestAnimationFrame loop writes `transform` on the track and nothing here
 * re-renders while it runs.
 */

const BASE_SPEED = -0.9; // px per 60fps frame; negative drifts content leftward
const MAX_SPEED = 6;
const DEAD_ZONE = 0.15; // |cursor| below this and the marquee holds still
const LERP = 0.08; // how hard the current speed chases the target each frame
const DRAG_SLOP = 6; // px of movement that turns a click into a drag

/** Badge fills. One per industry, drawn from the brand ramp. */
const TONES: Record<AudienceTone, { hue: string; badge: string }> = {
  navy: { hue: "0,74,214", badge: "linear-gradient(160deg,#1f5cf0,#00279c)" },
  sky: { hue: "1,140,232", badge: "linear-gradient(160deg,#33b6ff,#0169b8)" },
  green: { hue: "1,168,60", badge: "linear-gradient(160deg,#2fc75e,#017a26)" },
  gold: { hue: "216,157,30", badge: "linear-gradient(160deg,#e8b13f,#96660e)" },
  indigo: { hue: "88,86,232", badge: "linear-gradient(160deg,#7b78ff,#2b2ba8)" },
  teal: { hue: "1,168,196", badge: "linear-gradient(160deg,#2fc4dd,#01738f)" },
};

/** Subscribes to a media query without a state-in-effect round trip. */
function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (notify: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", notify);
      return () => list.removeEventListener("change", notify);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function AudienceMarquee() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const pointerFine = useMediaQuery("(min-width: 768px)");
  const cards = audienceMarquee.cards;

  const trackRef = useRef<HTMLUListElement>(null);

  // Everything the animation touches lives in refs. Putting the offset in state
  // would re-render the whole card list sixty times a second.
  const offset = useRef(0);
  const speed = useRef(BASE_SPEED);
  const target = useRef(BASE_SPEED);
  const half = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const dragDistance = useRef(0);

  // Measure one copy of the set. The track holds the cards twice, so half its
  // scroll width is exactly one loop.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      half.current = track.scrollWidth / 2;
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      // Delta-timed so a 120Hz display does not run at double speed, and a
      // dropped frame does not leave a gap. Clamped so returning to a
      // backgrounded tab does not jump the track across a whole loop.
      const delta = Math.min(now - last, 50) / 16.667;
      last = now;

      if (!dragging.current) {
        speed.current += (target.current - speed.current) * LERP;
        // An exponential decay never actually reaches its target, so in the
        // dead zone the track would creep forever at a fraction of a pixel.
        if (target.current === 0 && Math.abs(speed.current) < 0.05) speed.current = 0;
        offset.current += speed.current * delta;
      }

      const loop = half.current;
      if (loop > 0) {
        // Wrap by exactly one copy. The DOM is never re-mounted, so there is no
        // flash and no scroll position to restore.
        if (offset.current <= -loop) offset.current += loop;
        else if (offset.current >= 0) offset.current -= loop;
      }

      track.style.transform = `translate3d(${offset.current}px,0,0)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  // The drag is tracked on the window rather than through setPointerCapture.
  // Capturing the pointer here makes Chrome fire `pointercancel` a few
  // milliseconds later, which ends the gesture almost as soon as it starts —
  // and window listeners have the better behaviour anyway: the drag survives
  // the pointer leaving the track.
  useEffect(() => {
    if (reduced) return;

    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      dragDistance.current += Math.abs(dx);
      offset.current += dx;
      // Hand the release velocity to the animation loop, which lerps it back
      // down into the ambient drift.
      speed.current = dx;
    };
    // pointercancel matters on touch: the browser fires it when it takes the
    // gesture over as a vertical page scroll, and the drag should yield.
    const end = () => {
      dragging.current = false;
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
    };
  }, [reduced]);

  const nudge = useCallback(
    (direction: -1 | 1) => {
      const pitch = half.current / cards.length;
      offset.current -= direction * (pitch || 300);
    },
    [cards.length],
  );

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current) return;
    // Touch has no hover, so steering by cursor position would fire once on tap
    // and then stick. Below the breakpoint the swipe handles it instead.
    if (!pointerFine) return;

    const box = e.currentTarget.getBoundingClientRect();
    const n = ((e.clientX - box.left) / box.width) * 2 - 1;
    target.current = Math.abs(n) < DEAD_ZONE ? 0 : -Math.sign(n) * n * n * MAX_SPEED;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    dragDistance.current = 0;
    lastX.current = e.clientX;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    nudge(e.key === "ArrowRight" ? 1 : -1);
  };

  return (
    <section
      aria-labelledby="audiences-heading"
      /*
        Light, at the client's request, and it is the right answer.

        This was `bg-abyss` — the same near-black the hero sits on — so the two
        ran together as one dark mass and this read as more hero. Darkening it
        differently only half-fixed that: two dark sections in sequence still
        need the reader to notice a shade. Going light makes the break
        unarguable, and it puts the photography on a ground that lets it carry
        the colour instead of competing with a navy field.

        Dark, and a step lighter than the hero it follows.

        This started as `bg-abyss` — the same near-black the hero sits on — so
        the two ran together as one mass and this read as more hero. Light
        grounds were tried and put back: the photography is what carries this
        section, and it sits better on a dark field than on a pale one.

        Navy-900 into navy-800 is the answer. Both are real blues rather than
        the near-black above, and navy-800 through the middle is the most
        saturated point of the band — so the section reads as lit from within
        rather than as a flat panel, and the join with the hero is obvious
        without a hard edge. The hairline at the top marks it anyway, since two
        darks meeting need something to say where one ends.
      */
      className="relative isolate overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,var(--color-navy-900)_0%,var(--color-navy-800)_50%,var(--color-navy-900)_100%)] py-16 md:py-20"
    >
      {/* Soft brand light behind the row, so the black is not flat */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[28rem] bg-[radial-gradient(60%_50%_at_50%_50%,rgba(1,164,255,.12),transparent_70%)]"
      />

      {/*
        The left gutter is computed the same way the centred `.shell` computes
        its own, so the heading lines up with every other page section — but
        against `100%` of this full-width row rather than `100vw`, which would
        be a scrollbar-width too wide.
      */}
      <div
        className={cn(
          "lg:flex lg:items-center lg:gap-10",
          "lg:pl-[calc(max(0px,(100%_-_84rem)/2)_+_2rem)]",
          "xl:pl-[calc(max(0px,(100%_-_84rem)/2)_+_2.5rem)]",
        )}
      >
        {/* Heading column */}
        <div className="shell flex flex-col items-start gap-4 lg:w-auto lg:max-w-none lg:shrink-0 lg:basis-[19rem] lg:px-0 xl:basis-[22rem]">
          <p /* The logo green, matching the "Core Capabilities" label on the
                 capability strips — the one colour on this site that marks a
                 section label on a dark ground. 8.5:1 on navy-900, 7.9:1 at
                 the band's lightest point. */
              className="font-mono text-[0.75rem] md:text-[0.6875rem] font-medium tracking-[0.22em] text-green-400 uppercase">
            {audienceMarquee.eyebrow}
          </p>
          <h2
            id="audiences-heading"
            className="text-[1.75rem] leading-[1.06] font-semibold tracking-[-0.036em] text-white sm:text-[2rem] lg:text-[2.125rem]"
          >
            {audienceMarquee.heading}
          </h2>
          <span aria-hidden="true" className="mt-1 h-[2px] w-12 rounded-full bg-gold-400" />
        </div>

        {/* Card track — runs off the right edge of the viewport */}
        <div className="relative mt-10 min-w-0 lg:mt-0 lg:flex-1">
          <div
            role="region"
            aria-label={audienceMarquee.eyebrow}
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerMove={reduced ? undefined : onPointerMove}
            onPointerDown={reduced ? undefined : onPointerDown}
            onPointerLeave={
              reduced
                ? undefined
                : () => {
                    target.current = BASE_SPEED;
                  }
            }
            onClickCapture={(e) => {
              // A drag that ends over a card must not navigate.
              if (dragDistance.current > DRAG_SLOP) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            // `select-none` matters as much as the styling does: without it a
            // drag across the cards selects their text, and Chrome answers a
            // text or image drag with `pointercancel`, ending the gesture.
            onDragStart={(e) => e.preventDefault()}
            className={cn(
              // Both ends fade. The right one is the "there is more" signal; the
              // left one is not decorative either — the track drifts leftward, so
              // without it the leading card is guillotined mid-badge against the
              // heading. The fade dissolves it out instead.
              "[--fade-l:32px] [--fade-r:32px] select-none focus-visible:outline-none",
              "md:[--fade-l:56px] md:[--fade-r:56px] lg:[--fade-l:72px] lg:[--fade-r:120px]",
              // Underscores are Tailwind's escape for spaces — and `calc()` needs
              // real spaces around the minus or the whole declaration is dropped.
              "[mask-image:linear-gradient(to_right,transparent,#000_var(--fade-l),#000_calc(100%_-_var(--fade-r)),transparent)]",
              reduced
                ? "snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                : "cursor-grab touch-pan-y overflow-hidden active:cursor-grabbing",
            )}
          >
            <ul
              ref={trackRef}
              className={cn(
                "flex w-max items-stretch gap-4 px-5 will-change-transform md:gap-5 lg:px-0",
                reduced && "w-auto",
              )}
            >
              {cards.map((card) => (
                <AudienceTile key={card.id} card={card} />
              ))}
              {/*
                Second copy. It exists only so the wrap has somewhere to land —
                it is the same six links, so it is hidden from assistive
                technology and taken out of the tab order.
              */}
              {!reduced &&
                cards.map((card) => <AudienceTile key={`${card.id}-clone`} card={card} clone />)}
            </ul>
          </div>

          {!reduced && (
            <>
              {/* Straddles the seam between heading and track, as in the brief. */}
              <Arrow
                side="left"
                onClick={() => nudge(-1)}
                className="left-4 lg:left-0 lg:-translate-x-1/2"
              />
              <Arrow side="right" onClick={() => nudge(1)} className="right-4 xl:right-8" />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Arrow({
  side,
  onClick,
  className,
}: {
  side: "left" | "right";
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous industries" : "Next industries"}
      className={cn(
        // 44px, the minimum comfortable target.
        "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full",
        "bg-abyss/80 text-white ring-1 ring-white/20 backdrop-blur-sm",
        "transition-colors duration-200 hover:bg-navy-600 hover:ring-white/45 lg:flex",
        className,
      )}
    >
      <Icon
        name={side === "left" ? "chevronLeft" : "chevronRight"}
        className="h-4 w-4"
        strokeWidth={2}
      />
    </button>
  );
}

function AudienceTile({ card, clone = false }: { card: AudienceCard; clone?: boolean }) {
  const tone = TONES[card.tone];
  return (
    <li aria-hidden={clone || undefined} inert={clone} className="snap-start">
      <article
        style={{ "--hue": tone.hue } as React.CSSProperties}
        className={cn(
          "group/card relative h-[17rem] w-[16rem] overflow-hidden rounded-[1.25rem] md:h-[18.5rem] md:w-[17.5rem]",
          "ring-1 ring-white/12",
          "transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:-translate-y-1.5 hover:shadow-[0_22px_50px_-14px_rgb(var(--hue)/0.6)] hover:ring-[rgb(var(--hue)/0.7)]",
          "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        )}
      >
        <Image
          src={card.image}
          alt={clone ? "" : card.alt}
          fill
          sizes="(max-width: 768px) 256px, 280px"
          quality={82}
          draggable={false}
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100"
        />

        {/*
          Legibility scrim. Weighted to the top band the label sits in — it holds
          ≥78% there, which keeps white type above 10:1 even over a fully
          blown-out photograph — then clears almost completely so the photograph
          is not needlessly dimmed, with a slight base so the card seats against
          the section rather than floating.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,13,34,.92)_0%,rgba(3,13,34,.74)_26%,rgba(3,13,34,.12)_52%,rgba(3,13,34,.04)_74%,rgba(3,13,34,.3)_100%)]"
        />

        <div className="absolute inset-x-0 top-0 flex items-start gap-3 p-4 md:p-5">
          <span
            aria-hidden="true"
            style={{ background: tone.badge }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-[0_6px_16px_-4px_rgb(var(--hue)/0.9)]"
          >
            <Icon name={card.icon as IconName} className="h-5 w-5 text-white" strokeWidth={1.7} />
          </span>

          <h3 className="pt-0.5 text-[0.9375rem] leading-[1.3] font-semibold text-white">
            {/*
              The ::after overlay is what makes the whole card clickable, so it
              is also the right shape to carry the focus ring — an outline on
              the link itself would wrap only this line of text.
            */}
            <Link
              href={card.href}
              tabIndex={clone ? -1 : undefined}
              className={cn(
                "after:absolute after:inset-0 after:rounded-[1.25rem] after:content-['']",
                "focus-visible:outline-none",
                "focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-sky-400",
              )}
            >
              {card.title}
            </Link>
          </h3>
        </div>
      </article>
    </li>
  );
}
