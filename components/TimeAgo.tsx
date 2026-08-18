"use client";

import { useEffect, useState } from "react";

/**
 * How long ago something was published, kept live.
 *
 * Two-stage on purpose. The server renders the absolute date — "6 August 2026"
 * — because that is the only thing it can render truthfully: these pages are
 * static, so a relative label baked at build time would say "2 days ago" for as
 * long as the build lasts, which on a marketing site is months. On mount the
 * client swaps in the relative label and keeps it current, so what a reader
 * sees is measured against their clock, not against the deploy.
 *
 * That also makes the first paint hydration-safe. The server and the client's
 * first render both produce the absolute date from the same ISO string, and the
 * relative label only ever appears in an effect.
 *
 * The absolute date stays on the element as `title` and in `dateTime`, so the
 * exact day is a hover away and machines read the real thing.
 */

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["week", 604_800],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

/** "6 August 2026". The one label both sides of hydration can agree on. */
function absolute(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function relative(iso: string) {
  const seconds = (Date.parse(iso) - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat("en-GB", { numeric: "auto" });
  const magnitude = Math.abs(seconds);
  for (const [unit, size] of UNITS) {
    if (magnitude >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  // Under a minute. `numeric: "auto"` turns this into "now" rather than
  // "in 0 seconds".
  return rtf.format(0, "second");
}

export function TimeAgo({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  const [label, setLabel] = useState(() => absolute(date));

  useEffect(() => {
    const tick = () => setLabel(relative(date));
    tick();
    // A minute is the shortest unit this ever prints, so anything faster would
    // re-render to the same string. One interval per mounted date, cleared on
    // unmount — a page of twenty cards costs twenty timers and no listeners.
    const timer = setInterval(tick, 60_000);
    return () => clearInterval(timer);
  }, [date]);

  return (
    <time dateTime={date} title={absolute(date)} className={className}>
      {label}
    </time>
  );
}
