/**
 * Solutions and Platforms.
 *
 * Both lists come from the client's own prototype (`source-assets/
 * orbismoneta-main.zip`, `src/App.tsx`) — titles, descriptions and tags are
 * carried across unchanged. Two notes on what was reconciled:
 *
 *  1. That file names the sixth solution twice and differently: the nav menu
 *     says "Risk, Fraud & Compliance", the card says "Risk, Regulatory &
 *     Compliance". The card wins, on the same rule already applied to the
 *     service lines — the entry carrying the description is the master.
 *  2. The prototype lists five platforms. Three were dropped on the client's
 *     instruction — Currency Hub™ (the same platform the content document
 *     calls Digital Currency Hub™, which has its own product page under
 *     Products), SWIFT Ledger Platform™ and Institutional DeFi Platform™.
 *     Interoperability Fabric™ and Cross-Border Bridge™ are what ships.
 */

export type Solution = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  icon: string;
};

export const solutionsPage = {
  eyebrow: "Solutions",
  headline: "Infrastructure for every dimension of modern finance.",
  headlineAccent: "modern finance",
  intro:
    "Strategic expertise, enterprise platforms and advanced engineering for connected financial ecosystems.",
  image: "/images/page-solutions.webp",
  alt: "A bank at the centre of a connected network of institutions, data stores and payment nodes",
};

export const solutions: Solution[] = [
  {
    id: "payments-infrastructure",
    title: "Payments Infrastructure",
    body: "Modernize payment ecosystems for real-time, high-value, enterprise and cross-border transactions.",
    tags: ["Payment Hubs", "RTGS", "RTP", "ISO 20022"],
    icon: "transfer",
  },
  {
    id: "digital-currency-cbdc",
    title: "Digital Currency & CBDC",
    body: "Build the infrastructure required to issue, distribute, manage and operate regulated digital money.",
    tags: ["Retail CBDC", "Digital Money", "Tokenized Deposits", "Operations"],
    icon: "coin",
  },
  {
    id: "digital-assets-tokenization",
    title: "Digital Assets & Tokenization",
    body: "Transform traditional financial assets into programmable, interoperable digital instruments.",
    tags: ["Tokenization", "Custody", "Settlement", "Securities"],
    icon: "layers",
  },
  {
    id: "cross-border-interoperability",
    title: "Cross-Border & Interoperability",
    body: "Connect domestic and international payment ecosystems through interoperable infrastructure.",
    tags: ["SWIFT", "Multi-currency", "FX & Liquidity", "Routing"],
    icon: "globe",
  },
  {
    id: "ai-financial-intelligence",
    title: "AI & Financial Intelligence",
    body: "Turn financial data into operational intelligence, automation and better decisions.",
    tags: ["Fraud Intelligence", "AI Copilots", "Risk Analytics", "Routing"],
    icon: "spark",
  },
  {
    id: "risk-regulatory-compliance",
    title: "Risk, Regulatory & Compliance",
    body: "Build innovation into a framework of security, governance, compliance and institutional control.",
    tags: ["AML", "KYC", "Sanctions", "Auditability"],
    icon: "shield",
  },
];

export type Platform = Solution;

/** The Platforms section of /solutions — no longer a page of its own. */
export const platformsPage = {
  eyebrow: "Platform ecosystem",
  headline: "Enterprise platforms for the future of finance.",
  blurb:
    "Purpose-built infrastructure for institutions operating across traditional and digital financial ecosystems.",
  architecture: {
    image: "/images/platform-architecture.webp",
    alt: "Isometric view of a central platform layer connecting banks, data infrastructure and tokenized asset nodes",
  },
};

export const platforms: Platform[] = [
  {
    id: "interoperability-fabric",
    title: "Interoperability Fabric™",
    body: "One integration layer connecting payment rails, digital currencies, tokenized assets, banking systems and financial networks.",
    tags: ["API orchestration", "ISO 20022", "Intelligent routing", "Legacy integration"],
    icon: "nodes",
  },
  {
    id: "cross-border-bridge",
    title: "Cross-Border Bridge™",
    body: "A cross-border settlement platform connecting the world's digital money networks.",
    tags: ["Multi-rail settlement", "FX", "Multi-currency", "Connectivity"],
    icon: "globe",
  },
];
