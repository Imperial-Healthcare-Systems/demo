"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/track";

/**
 * Counts a page view on first load and on every client-side navigation.
 *
 * It has to be a component watching `usePathname` rather than a script in the
 * document: this is a single-page app once it has loaded, so moving from
 * /insights to an article never asks the server for a document and a plain
 * script would count the session once and never again.
 *
 * Mounted in app/(site)/layout.tsx, which is why /admin is not counted — the
 * client looking at their own dashboard should not be inflating it.
 */
export function PageViews() {
  const pathname = usePathname();

  /*
    The last path counted.

    Two things would otherwise double-count. React's strict mode runs effects
    twice in development, and any re-render that happens to change the effect's
    identity would fire it again. Comparing against what was last sent is
    simpler than trying to make the effect run exactly once.
  */
  const counted = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || counted.current === pathname) return;

    // The referrer is only interesting on the first page of a visit — after
    // that it is just the previous page of this same site, which the path
    // sequence already says.
    const first = counted.current === null;
    counted.current = pathname;
    track("pageview", {
      path: pathname,
      referrer: first ? document.referrer || undefined : undefined,
    });
  }, [pathname]);

  return null;
}
