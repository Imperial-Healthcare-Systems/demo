/**
 * Proprietary Platforms — the sub-page at /solutions/platforms.
 *
 * Lifted from the `#platforms` section of the client's own page,
 * `source-assets/Solution-page-contents.html`, unchanged.
 *
 * This is a different set from the two platforms this site carried before.
 * Those were Interoperability Fabric™ and Cross-Border Bridge™, taken from an
 * earlier prototype; the client's page names Digital Currency Hub™ and the
 * Lending Integration Hub instead, and gives both a development status the
 * earlier list did not have. The superseded pair is kept, commented out, at the
 * foot of `content/solutions.ts`.
 *
 * Note what the status badges mean, because they are the one thing here that
 * makes a claim: `mvp` and `dev` are the client's own labels for these two
 * platforms — "MVP / FIRST PLATFORM" and "IN DEVELOPMENT". Neither says a
 * platform is generally available, and the copy should not be edited into
 * saying so.
 */

export type PlatformStatus = "mvp" | "dev";

export type ProprietaryPlatform = {
  id: string;
  status: PlatformStatus;
  /** The badge text exactly as the client's page sets it. */
  statusLabel: string;
  title: string;
  subtitle: string;
  body: string;
  /** Capability chips under the description. */
  capabilities: string[];
  /** Deployment or value boxes. One or two; the layout follows the count. */
  boxes: { title: string; body: string }[];
  cta: { label: string; href: string };
  icon: string;
};

export const platformsPage = {
  eyebrow: "Proprietary Platforms",
  headline: "Modular Platforms for Financial Institutions",
  intro:
    "Purpose-built proprietary platforms engineered to simplify ecosystem integration and enable secure participation in emerging digital-money networks.",
};

export const proprietaryPlatforms: ProprietaryPlatform[] = [
  {
    id: "digital-currency-hub",
    status: "mvp",
    statusLabel: "MVP / First platform",
    title: "Digital Currency Hub™",
    subtitle: "Bank-Ready Digital Money Infrastructure",
    body: "A modular digital money infrastructure platform designed to enable commercial banks to participate in retail CBDC and emerging digital-money ecosystems through secure wallet management, token processing, and core banking interoperability.",
    capabilities: [
      "Digital Wallet",
      "Token Management",
      "Transaction Processing",
      "Programmable Money",
      "Security & HSM",
      "Core Banking APIs",
      "Operations & Monitoring",
    ],
    boxes: [
      {
        title: "License Edition",
        body: "Deploy within your own infrastructure or cloud with full operational control.",
      },
      {
        title: "Hosted Platform",
        body: "Fully managed cloud-hosted deployment to accelerate operational onboarding.",
      },
    ],
    /* The source file sends this to its contact anchor. This platform has a
       product page here, which is the more useful destination. */
    cta: { label: "Explore Digital Currency Hub™", href: "/products/digital-currency-hub" },
    icon: "coin",
  },
  {
    id: "lending-integration-hub",
    status: "dev",
    statusLabel: "In development",
    title: "Lending Integration Hub",
    subtitle: "Connecting the Lending Ecosystem",
    body: "A modular integration platform designed to connect lending origination, servicing, banking, credit and fintech ecosystems through standardized APIs and integration services without point-to-point friction.",
    capabilities: [
      "LOS & LMS Integration",
      "Core Banking Connectors",
      "Credit Bureau APIs",
      "KYC & Identity",
      "Event-Driven Architecture",
      "Partner Gateways",
      "Observability",
    ],
    boxes: [
      {
        title: "Integration Value",
        body: "Simplifies multi-party connectivity across banks, NBFCs, and fintechs through an enterprise orchestration and integration layer.",
      },
    ],
    cta: { label: "Discuss Lending Integration", href: "/contact" },
    icon: "nodes",
  },
];
