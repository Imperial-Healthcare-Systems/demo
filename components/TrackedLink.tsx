"use client";

import Link from "next/link";
import { track } from "@/lib/track";

/**
 * A link that reports being clicked.
 *
 * Use it for the handful of controls whose click is a business fact rather
 * than navigation — "Explore Digital Currency Hub" being the one the client
 * named. Ordinary links stay ordinary: page views already say where people
 * went, and instrumenting everything would bury the two numbers that matter
 * under a hundred that do not.
 *
 * `label` is what shows in the dashboard, so it should read as the thing that
 * was clicked, not as a code. Passing the button's own text is usually right —
 * then the dashboard and the page say the same words.
 */
export function TrackedLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      /*
        No preventDefault, no awaiting. The navigation starts immediately and
        `track` posts with `keepalive`, so the browser finishes sending after
        this document is gone. Holding the click to confirm the write would put
        a database round trip between the reader and the page they asked for,
        to improve a statistic.
      */
      onClick={() => track("cta_click", { label })}
    >
      {children}
    </Link>
  );
}
