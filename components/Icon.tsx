/**
 * A single stroked icon set at 24px on a 1.6 stroke — consistent weight across
 * the whole site, inherits currentColor, and ships no icon-library dependency.
 * Emoji are never used as icons.
 */
import { cn } from "@/lib/utils";

export type IconName = keyof typeof paths;

const paths = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m4.5 12 7.5 4 7.5-4M4.5 16.5 12 20.5l7.5-4" />
    </>
  ),
  nodes: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M10.4 6.7 6.6 15.9M13.6 6.7l3.8 9.2M7.2 18h9.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.6c0 4 2.9 7.7 7 9.4 4.1-1.7 7-5.4 7-9.4V6l-7-3Z" />
      <path d="m9.3 12.1 1.9 1.9 3.6-3.7" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v3.2M12 17.8V21M3 12h3.2M17.8 12H21M5.6 5.6l2.3 2.3M16.1 16.1l2.3 2.3M18.4 5.6l-2.3 2.3M7.9 16.1l-2.3 2.3" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  bank: (
    <>
      <path d="M3.5 9.5 12 4.5l8.5 5M5 9.5V18M9.7 9.5V18M14.3 9.5V18M19 9.5V18M3 20.5h18" />
    </>
  ),
  bolt: <path d="M13.2 3 5.5 13.4h5.2L10.2 21l7.7-10.4h-5.2L13.2 3Z" />,
  building: (
    <>
      <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5V21M14 10h4.5A1.5 1.5 0 0 1 20 11.5V21M3 21h18" />
      <path d="M7.2 8h3.6M7.2 12h3.6M7.2 16h3.6M17 14h0M17 17.5h0" />
    </>
  ),
  clipboard: (
    <>
      <path d="M9 4.5h6M9.8 3h4.4a1 1 0 0 1 1 1v1.5h-6.4V4a1 1 0 0 1 1-1Z" />
      <path d="M15.2 5.5H17A1.8 1.8 0 0 1 18.8 7.3v12A1.8 1.8 0 0 1 17 21H7a1.8 1.8 0 0 1-1.8-1.8v-12A1.8 1.8 0 0 1 7 5.5h1.8" />
      <path d="M8.8 11h6.4M8.8 15h4.2" />
    </>
  ),
  transfer: (
    <>
      <path d="M3.5 8.5h13.2M13.2 5l3.5 3.5-3.5 3.5M20.5 15.5H7.3M10.8 12l-3.5 3.5 3.5 3.5" />
    </>
  ),
  coin: (
    <>
      <ellipse cx="12" cy="6.8" rx="7.5" ry="3.3" />
      <path d="M4.5 6.8v10.4c0 1.8 3.4 3.3 7.5 3.3s7.5-1.5 7.5-3.3V6.8" />
      <path d="M4.5 12c0 1.8 3.4 3.3 7.5 3.3s7.5-1.5 7.5-3.3" />
    </>
  ),
  cloud: (
    <path d="M7 18.5A4 4 0 0 1 6.6 10.6a5.4 5.4 0 0 1 10.3-1.4A3.9 3.9 0 0 1 17.4 18.5H7Z" />
  ),
  code: <path d="m9 8-5 4 5 4M15 8l5 4-5 4M13.4 4.5l-2.8 15" />,
  check: <path d="m5 12.6 4.6 4.6L19 6.8" />,
  user: (
    <>
      <circle cx="12" cy="8.2" r="3.6" />
      <path d="M4.8 20.2a7.4 7.4 0 0 1 14.4 0" />
    </>
  ),
  store: (
    <>
      <path d="M4 9.5V19a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19V9.5" />
      <path d="M3 6.2 4.4 3.5h15.2L21 6.2a2.6 2.6 0 0 1-4.5 2.4 2.6 2.6 0 0 1-4.5 0 2.6 2.6 0 0 1-4.5 0A2.6 2.6 0 0 1 3 6.2Z" />
      <path d="M9.5 20.5v-5.2h5v5.2" />
    </>
  ),
  chip: (
    <>
      <rect x="7.5" y="7.5" width="9" height="9" rx="1.4" />
      <path d="M10.5 3.5V6M13.5 3.5V6M10.5 18v2.5M13.5 18v2.5M3.5 10.5H6M3.5 13.5H6M18 10.5h2.5M18 13.5h2.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2" />
    </>
  ),
  arrowRight: <path d="M4.5 12h15M13.5 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8.5 7H17v8.5" />,
  arrowLeft: <path d="M19.5 12h-15M10.5 6l-6 6 6 6" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
  chevronLeft: <path d="m14.5 6-6 6 6 6" />,
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </>
  ),
  phone: (
    <path d="M6.3 3.5h2.5l1.6 4-2 1.4a11.4 11.4 0 0 0 5.2 5.2l1.4-2 4 1.6v2.5a2.3 2.3 0 0 1-2.5 2.3C10.1 18 6 13.9 4 6.1A2.3 2.3 0 0 1 6.3 3.5Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.8" />
      <path d="m3.6 7 8.4 6 8.4-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c4-4.4 6-7.7 6-10a6 6 0 1 0-12 0c0 2.3 2 5.6 6 10Z" />
      <circle cx="12" cy="10.8" r="2.3" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M8 10.5V17M8 7.4v.1M12 17v-3.6a2 2 0 0 1 4 0V17" />
    </>
  ),
  x: <path d="M4 4h3.6l5 6.6L18 4h2l-6.5 7.8L20.5 20H17l-5.2-6.9L5.9 20H4l7-8.4L4 4Z" />,
  play: <path d="M8 5.5v13l11-6.5-11-6.5Z" />,
  filter: <path d="M4 6.5h16M7 12h10M10 17.5h4" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.2 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.8" />
      <path d="M3.5 9.8h17M8.5 3v3.6M15.5 3v3.6" />
    </>
  ),
  share: (
    <>
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="18" cy="18" r="2.4" />
      <path d="m8.2 10.9 7.6-3.8M8.2 13.1l7.6 3.8" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  quote: (
    <path d="M9.5 6.5C6.9 7.7 5.5 9.9 5.5 13v4.5h5.2V12H8c0-1.7.6-2.9 2-3.6l-.5-1.9Zm9 0c-2.6 1.2-4 3.4-4 6.5v4.5h5.2V12H17c0-1.7.6-2.9 2-3.6l-.5-1.9Z" />
  ),
  document: (
    <>
      <path d="M13.5 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5l-5-5Z" />
      <path d="M13.5 3.5v5h5M8.8 13h6.4M8.8 16.5h4.6" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="1.8" />
      <path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
    </>
  ),
  refresh: <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.7M20 5v3.7h-3.7M20 12a8 8 0 0 1-13.7 5.6L4 15.3M4 19v-3.7h3.7" />,
  /** The ascending bars from the OrbisMoneta mark. */
  bars: (
    <>
      <path d="M5.5 14.5v5M12 10v9.5M18.5 5.5v14" />
      <path d="M3 21h18" strokeOpacity="0.45" />
    </>
  ),
} as const;

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
  filled = false,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  filled?: boolean;
}) {
  const solid = name === "x" || name === "play" || name === "bolt" || name === "quote" || filled;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("h-6 w-6 shrink-0", className)}
      fill={solid ? "currentColor" : "none"}
      stroke={solid ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
