"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { useConversion } from "./ConversionProvider";

/**
 * Footer connect strip — PARKED, not currently mounted.
 *
 * Removed from the footer at the client's request: with the docked CTA on
 * screen throughout, this was a second ask sitting at the end of every page.
 * Kept because this repo is not under version control; re-mount it in
 * `site-footer.tsx` in place of `<FooterSentinel />` to bring it back, and note
 * that it also does the footer-visibility reporting the sentinel now handles.
 *
 * Deliberately one line and one button. This used to be a full conversion band
 * — headline, paragraph, two large buttons and an email — which meant the same
 * ask appeared twice in a single scroll on any page that already closed with
 * one. The ask itself has not moved: the button opens the same enquiry form
 * every other call to action on the site opens.
 *
 * It also carries the hand-off for the floating widget. The moment this strip
 * enters the viewport it reports up through context and the floating popup
 * stands down, so there is never more than one ask on screen at a time. That is
 * why the observer lives here rather than on the footer element itself — this
 * is the point at which the page's own ask takes over.
 */
export function FooterCta() {
  const { openRfq, setFooterVisible } = useConversion();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  // The Contact page is the form, so it says so rather than repeating the ask.
  const onContact = pathname === "/contact";

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.2 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      setFooterVisible(false);
    };
  }, [setFooterVisible]);

  return (
    <div
      ref={ref}
      data-footer-cta
      className="flex flex-col gap-5 border-b border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between md:py-10"
    >
      <p className="max-w-xl text-[1.0625rem] leading-snug text-white md:text-[1.25rem]">
        {onContact
          ? "Prefer to talk it through? Ask us to call you."
          : "Have a modernization programme in mind?"}
      </p>

      <button
        type="button"
        onClick={() => openRfq(onContact ? "call" : "requirements")}
        className="group/cta inline-flex h-13 w-full shrink-0 cursor-pointer items-center justify-center gap-3 rounded-full bg-white px-7 text-[0.9375rem] font-medium text-navy-900 transition-colors hover:bg-sky-500 hover:text-white sm:w-auto"
      >
        {onContact ? "Request a call" : "Connect"}
        <Icon
          name="arrowRight"
          className="h-4 w-4 transition-transform group-hover/cta:translate-x-1"
          strokeWidth={2}
        />
      </button>
    </div>
  );
}
