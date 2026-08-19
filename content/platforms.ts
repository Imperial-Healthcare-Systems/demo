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
 * Note what the status badge means, because it is the one thing here that
 * makes a claim: "LAUNCHING SOON" is the client's own label for the Lending
 * Integration Hub, replacing their earlier "IN DEVELOPMENT" at their request.
 * It does not say the platform is generally available and the copy should not
 * be edited into saying so.
 *
 * Digital Currency Hub has no badge at all now — "MVP / FIRST PLATFORM" came
 * off at the client's request. `status` stays because it keys the card's
 * colour, which is the green one either way.
 */

export type PlatformStatus = "mvp" | "dev";

export type ProprietaryPlatform = {
  id: string;
  /** Keys the card's colour and its button. Independent of the badge. */
  status: PlatformStatus;
  /** The badge text. Omit it and no badge is drawn — the icon tile stands
      alone at the head of the card. */
  statusLabel?: string;
  title: string;
  subtitle: string;
  body: string;
  /** Capability chips under the description. Empty draws nothing. */
  capabilities: string[];
  /**
   * Deployment or value boxes. One or two; the layout follows the count, and
   * an empty list draws nothing.
   */
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
    title: "Digital Currency Hub™",
    subtitle: "Bank-Ready Digital Money Infrastructure",
    body: "A modular digital money infrastructure platform designed to enable commercial banks to participate in retail CBDC and emerging digital-money ecosystems through secure wallet management, token processing, and core banking interoperability.",
    /*
      Empty at the client's request. What came off: the seven capability chips
      — Digital Wallet, Token Management, Transaction Processing, Programmable
      Money, Security & HSM, Core Banking APIs, Operations & Monitoring — and
      the two deployment boxes, License Edition and Hosted Platform.

      All of it is still on the product page this card links to, which is where
      it is set out at length rather than as a row of chips.
    */
    capabilities: [],
    boxes: [],
    /* The source file sends this to its contact anchor. This platform has a
       product page here, which is the more useful destination. */
    cta: { label: "Explore Digital Currency Hub™", href: "/products/digital-currency-hub" },
    icon: "coin",
  },
  {
    id: "lending-integration-hub",
    status: "dev",
    statusLabel: "Launching soon",
    title: "Lending Integration Hub",
    subtitle: "Connecting the Lending Ecosystem",
    body: "A modular integration platform designed to connect lending origination, servicing, banking, credit and fintech ecosystems through standardized APIs and integration services without point-to-point friction.",
    /* Off at the client's request, as on the card beside it: LOS & LMS
       Integration, Core Banking Connectors, Credit Bureau APIs, KYC &
       Identity, Event-Driven Architecture, Partner Gateways, Observability.
       The Integration Value box below stays. */
    capabilities: [],
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
