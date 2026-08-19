/**
 * The six core capabilities, and the strip that runs them.
 *
 * Lifted out of content/about.ts when the client asked for the same bar on the
 * Innovation Lab page. One list, imported by both — the alternative was two
 * copies of the same six lines drifting apart the first time one was reworded.
 *
 * The colour is NOT here. Each page sets its own ground, because the point of
 * the second one is that it does not look like the first.
 */
export const coreCapabilities = {
  lead: "Core Capabilities",
  items: [
    "Digital Currency",
    "Tokenization",
    "Digital Assets",
    "Cross-Border Modernization",
    "AI for Financial Services",
    "ISO 20022 Modernization",
  ],
} as const;
