"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/BrandMark";
import { Icon } from "@/components/Icon";
import { useConversion } from "./ConversionProvider";

const AUTO_COLLAPSE_AFTER_MS = 9_000;

/**
 * How far down the page the widget waits before showing itself. Roughly the
 * hero — while that is still on screen the page's own primary calls to action
 * are right there, and a floating panel over them is noise.
 */
const SHOW_AFTER_PX = 520;

/**
 * Docked engagement CTA.
 *
 * A vertical tab on the right edge; clicking it slides a panel out
 * horizontally from behind it. Collapsed, the tab leans out of the edge every
 * few seconds so it reads as something you can open rather than a label.
 *
 * Behaviour, per the brief:
 *  · never opens itself. It advertises what it is by leaning out of the edge
 *    every five seconds and settling back — the hint, not the act. Opening is
 *    always the reader's decision.
 *  · holds at that leaned-out position while hovered or focused, and stops
 *    nudging: once someone is pointing at it, repeating the hint is noise.
 *  · appears only once the reader has moved past the hero
 *  · stays open for as long as the pointer is over it or focus is inside it
 *  · closing collapses it back to the tab rather than removing it, so the route
 *    is always one click away
 *  · stands down entirely once the footer's connect strip is on screen, which
 *    is the point at which the page's own ask takes over
 *
 * The whole cluster translates as one unit inside a clipping frame, so the
 * panel is genuinely off-screen when closed and can never widen the document.
 *
 * Every route out of it opens the same enquiry form the rest of the site uses.
 * There is no WhatsApp entry point and no telephone number anywhere in it.
 */
export function EngagementSlider() {
  const { openRfq, footerVisible, rfqOpen } = useConversion();

  const [expanded, setExpanded] = useState(false);
  const [held, setHeld] = useState(false);
  const [pastHeader, setPastHeader] = useState(false);
  const collapseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The widget lives strictly between the header and the footer. This is the
  // upper bound; the lower bound is `footerVisible`, reported by the footer.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setPastHeader(window.scrollY > SHOW_AFTER_PX);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Auto-collapse, paused for as long as the user is engaging with it.
  useEffect(() => {
    if (!expanded) return;
    if (held || rfqOpen) {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
      return;
    }
    collapseTimer.current = setTimeout(() => setExpanded(false), AUTO_COLLAPSE_AFTER_MS);
    return () => {
      if (collapseTimer.current) clearTimeout(collapseTimer.current);
    };
  }, [expanded, held, rfqOpen]);

  const hidden = footerVisible || rfqOpen || !pastHeader;

  return (
    <div
      // The frame is the width of panel + tab and clips whatever leaves it, so
      // the closed panel is really gone rather than parked past the viewport
      // edge where it would stretch the document. `pointer-events-none` keeps
      // the empty half from swallowing clicks on the page beneath.
      className={cn(
        "pointer-events-none fixed right-0 bottom-4 z-40 overflow-hidden print:hidden md:bottom-6",
        "[--gap:0.75rem] [--panel:min(19rem,calc(100vw-5.5rem))] [--tab:3.25rem]",
        // Wide enough for panel + gap + tab, or the tab's outer edge gets
        // clipped by the frame that is supposed to be hiding only the panel.
        // The vertical padding is headroom for the tab's shadow and its nudge.
        "w-[calc(var(--panel)+var(--gap)+var(--tab))] py-4",
        "transition-opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
        hidden ? "opacity-0" : "opacity-100",
      )}
      inert={hidden}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false);
      }}
    >
      {/* Bottom-aligned, so the panel grows upward off the tab rather than
          straddling it. */}
      <div className="flex items-end">
        {/*
          Only the panel moves. Translating the whole row would carry the tab
          off-screen with it. It travels its own width plus the gap and the tab,
          which is exactly far enough to clear the frame's right edge — any less
          and a sliver stays visible alongside the tab.
        */}
        <section
          aria-label="Speak to OrbisMoneta"
          inert={!expanded}
          className={cn(
            "pointer-events-auto relative w-[var(--panel)] shrink-0 overflow-hidden rounded-2xl",
            "bg-[linear-gradient(155deg,#0b1c3d_0%,#061127_46%,#04140f_100%)]",
            "shadow-[0_30px_70px_-20px_rgba(3,13,34,.75)] ring-1 ring-white/12",
            "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            expanded
              ? "translate-x-0"
              : "translate-x-[calc(100%+var(--gap)+var(--tab))]",
          )}
        >
          {/* Brand light in the corner, echoing the mark's green */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(1,172,50,.30),transparent)]"
          />

          <div className="relative flex flex-col gap-3.5 p-5">
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Collapse"
              className="absolute top-3 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink-inv-2 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Icon name="close" className="h-4 w-4" strokeWidth={2} />
            </button>

            <p className="pr-9 font-mono text-[0.5625rem] font-medium tracking-[0.2em] text-green-400 uppercase">
              Talk to us
            </p>

            <h2 className="pr-6 text-[1.0625rem] leading-snug font-semibold text-white">
              Have a modernization programme in mind?
            </h2>

            <p className="text-[0.8125rem] leading-relaxed text-ink-inv-2">
              Tell us what you are working on. A senior practitioner responds within one
              business day.
            </p>

            {/*
              A brand plate rather than a mocked-up report cover. The reference
              shows a publication on its front; inventing one would put an asset
              on the page that does not exist.
            */}
            <div aria-hidden="true" className="relative my-1 h-[8.5rem]">
              <div className="absolute inset-x-7 inset-y-0 -rotate-[7deg] rounded-lg bg-[linear-gradient(155deg,#0d2149,#050f26)] shadow-[0_18px_36px_-14px_rgba(0,0,0,.8)] ring-1 ring-white/12">
                <svg
                  viewBox="0 0 100 60"
                  className="absolute inset-x-0 top-[26%] mx-auto h-[42%] w-[58%]"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="om-cta-chevron" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor="#01a4ff" />
                      <stop offset="100%" stopColor="#3ecb6a" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M6 52 L50 10 L94 52"
                    stroke="url(#om-cta-chevron)"
                    strokeWidth="13"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <BrandMark
                  variant="lockup"
                  tone="dark"
                  decorative
                  className="absolute inset-x-0 bottom-3 mx-auto h-4 opacity-85"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => openRfq("requirements")}
              className="group/cta inline-flex h-11 cursor-pointer items-center justify-between rounded-full bg-white px-5 text-[0.8125rem] font-medium text-navy-900 transition-colors hover:bg-green-500 hover:text-white"
            >
              Connect with us
              <Icon
                name="arrowRight"
                className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5"
                strokeWidth={2}
              />
            </button>
          </div>
        </section>

        {/* Docked tab */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? "Close contact panel" : "Open contact panel"}
          className={cn(
            "pointer-events-auto group/tab ml-[var(--gap)] flex w-[var(--tab)] shrink-0 cursor-pointer flex-col items-center gap-3 rounded-l-2xl bg-white py-5",
            "shadow-[0_18px_44px_-16px_rgba(3,13,34,.55)] ring-1 ring-line",
            // How far the tab leans out. Read by the `om-tab-nudge` keyframes
            // as well as the hover state below, so the two cannot disagree.
            "[--om-peek:9px] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            // The nudge only runs while there is something to open, and stops
            // the moment the panel is out. The 5s must be written out here —
            // Tailwind scans for literal class strings, so an interpolated
            // duration would simply never be generated.
            !expanded && "animate-[om-tab-nudge_5s_var(--ease-out-quint)_infinite]",
            // Pointing at it answers the question the nudge was asking, so the
            // loop stops and the tab simply holds at the position the nudge was
            // reaching for — the invitation stays on screen instead of ticking.
            // Keyboard focus gets the same treatment, or the affordance would
            // exist only for mouse users.
            !expanded &&
              "hover:animate-none hover:translate-x-[calc(var(--om-peek)*-1)] focus-visible:animate-none focus-visible:translate-x-[calc(var(--om-peek)*-1)]",
            "motion-reduce:animate-none",
          )}
        >
          <span className="text-[0.8125rem] font-semibold tracking-[-0.01em] text-ink [writing-mode:vertical-rl] rotate-180">
            OrbisMoneta
          </span>

          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(150deg,#3ecb6a,#017a26)] text-white">
            {!expanded && (
              <span
                aria-hidden="true"
                // Same 5s beat as the nudge, so the two attention cues pulse
                // together as one signal rather than drifting against each
                // other — and both stand down once the pointer arrives.
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/45 [animation-duration:5s] group-hover/tab:hidden motion-reduce:hidden"
              />
            )}
            <Icon
              name={expanded ? "chevronRight" : "chevronLeft"}
              className="relative h-4 w-4"
              strokeWidth={2.4}
            />
          </span>
        </button>
      </div>
    </div>
  );
}
