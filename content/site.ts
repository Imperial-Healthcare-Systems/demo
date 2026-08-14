/**
 * Site-wide constants. Every string here comes from the client's approved
 * content document — nothing is invented.
 */

export const site = {
  name: "OrbisMoneta",
  legalEntity: "Monetanova Technologies Pvt. Ltd.",
  tagline: "Engineering the Future of Money",
  url: "https://www.orbismoneta.com",
  title: "OrbisMoneta — Building the Future of Money",
  description:
    "OrbisMoneta is a financial technology product and engineering company helping banks, fintechs and governments modernize payments and digital money through enterprise software, strategic advisory and custom engineering.",
  shareDescription:
    "Financial technology product and engineering company focused on the Future of Money.",
  keywords: [
    "Enterprise Payments",
    "CBDC",
    "Digital Money",
    "Stablecoins",
    "Tokenization",
    "Payment Hub",
    "ISO 20022",
    "AI for Financial Services",
    "Fraud Risk",
    "API Banking",
    "Open Finance",
    "Cross-Border Payments",
    "OrbisMoneta",
  ],
  statement:
    "Financial technology product and engineering company focused on the Future of Money — enterprise software, advisory and custom engineering for financial institutions worldwide.",
  address: {
    lines: [
      "Skyline Icon, 7th Floor",
      "Andheri – Kurla Rd, Mittal Industrial Estate",
      "Marol, Andheri East",
      "Mumbai, Maharashtra 400059",
    ],
    single:
      "Skyline Icon, 7th Floor, Andheri – Kurla Rd, Mittal Industrial Estate, Marol, Andheri East, Mumbai, Maharashtra 400059",
    locality: "Mumbai",
    region: "Maharashtra",
    postalCode: "400059",
    country: "IN",
  },
  // No public telephone number is published. OrbisMoneta serves institutions
  // across multiple time zones, so every route is a written enquiry that gets
  // directed to the right desk — see contactRoutes.
  email: "hello@orbismoneta.com",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/orbismoneta" },
    { label: "X / Twitter", href: "https://x.com/orbismoneta" },
  ],
  legal: {
    brandLine: "OrbisMoneta is a brand of Monetanova Technologies Pvt. Ltd.",
    copyright: "© 2026 Monetanova Technologies Pvt. Ltd. All rights reserved.",
  },
} as const;

/** The twelve capability areas that run in the site-wide ticker. */
export const capabilityTicker = [
  "Enterprise Payments",
  "Cross-Border Payments",
  "CBDCs & Digital Money",
  "Stablecoins & Tokenization",
  "Digital Assets",
  "Payment Hubs & FMI",
  "ISO 20022 Modernization",
  "AI for Financial Services",
  "Fraud Risk & Financial Crime",
  "API Banking & Open Finance",
  "Cloud Native Platforms",
  "Product Strategy & Innovation",
] as const;
