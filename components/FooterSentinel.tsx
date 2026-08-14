"use client";

import { useEffect, useRef } from "react";
import { useConversion } from "./ConversionProvider";

/**
 * Reports when the footer has come into view, and renders nothing.
 *
 * This is the lower bound for the docked CTA: the floating panel stands down
 * once the reader reaches the footer, so there is never a widget hovering over
 * the end of the page.
 *
 * The footer used to carry a connect strip that did this reporting as a side
 * effect of being observed. That strip has been removed, so the observation
 * needs a home of its own — otherwise the docked CTA has no idea the page has
 * ended and follows the reader all the way down.
 */
export function FooterSentinel() {
  const { setFooterVisible } = useConversion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      setFooterVisible(false);
    };
  }, [setFooterVisible]);

  // A one-pixel marker rather than a wrapper, so it cannot affect the footer's
  // own layout or spacing.
  return <div ref={ref} aria-hidden="true" className="h-px w-full" />;
}
