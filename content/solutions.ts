/**
 * Solutions & Services.
 *
 * Every string below is lifted from the client's own page —
 * `source-assets/Solution-page-contents.html`, the `#solutions` section — and
 * carried across unchanged except where the client asked for an amendment.
 * Three were asked for, and each is marked at the line it affects:
 *
 *  1. "Financial Advisory" is set here as "Payment Modernization Advisory".
 *  2. The "Lending Integration" domain card is dropped, taking the grid from
 *     six cards to five. Technology Engineering's list carried the lending work
 *     after that as "Lending System Integrations (LOS / LMS)"; the client has
 *     since replaced that line with "Banking System Integration", so lending is
 *     named nowhere on this page. It keeps its own card on /solutions/platforms
 *     as the Lending Integration Hub, which is now the only place it appears.
 *  3. The page runs to the delivery lifecycle and stops. The sections that
 *     follow it in the source file — Innovation Lab, Enterprise Impact and the
 *     final CTA — are not carried here: the Lab has its own page at /lab, and
 *     the page already closes on an ask.
 *
 * The platforms are no longer part of this file. They were a section of this
 * page and are now a page of their own at /solutions/platforms, so they live in
 * `content/platforms.ts`.
 *
 * The previous content is kept at the foot of this file, commented out rather
 * than deleted.
 */

export type Discipline = {
  id: string;
  /** Mono label above the title — "Strategy & Vision" and the like. */
  tag: string;
  title: string;
  body: string;
  points: string[];
  icon: string;
};

export type SolutionDomain = {
  id: string;
  tag: string;
  title: string;
  body: string;
  tags: string[];
  icon: string;
  cta: { label: string; href: string };
  /** Isometric plate on the card front. Decorative — the title carries the
   *  meaning, so it renders `aria-hidden` with an empty alt. */
  image?: string;
};

export const solutionsPage = {
  eyebrow: "Solutions & Services",
  headline: "Solutions for Modern Financial Institutions",
  /** Gets the brand gradient. */
  headlineAccent: "Modern Financial Institutions",
  intro:
    "We combine financial-domain advisory, enterprise architecture, and specialized engineering to deliver resilient, scalable financial infrastructure solutions.",
  /* The bank on its lit disc, which is the opening's ground now rather than a
     band under it. It replaced page-solutions.webp; that file is still built by
     the asset script and nothing else points at it. */
  image: "/images/solution-landing.webp",
  alt: "A bank at the centre of a connected network of institutions, data stores and payment nodes",
};

/** Advisory, architecture and engineering — the three that run end to end. */
export const disciplines: Discipline[] = [
  {
    id: "payment-modernization-advisory",
    tag: "Strategy & Vision",
    // Amendment 1: the source file calls this "Financial Advisory".
    title: "Payment Modernization Advisory",
    body: "Domain-led strategic guidance navigating regulatory frameworks, clearing infrastructure, and digital money operating models.",
    points: [
      "Payment & RTGS Modernization Strategy",
      "Two-Tier Retail CBDC Operating Models",
      "Open Finance & API Strategy (UAE, India, EU)",
      "Institutional Tokenization & Digital Assets",
    ],
    icon: "target",
  },
  {
    id: "enterprise-architecture",
    tag: "System Blueprints",
    title: "Enterprise Architecture",
    body: "Architecting decoupled, high-availability financial plumbing with zero single points of failure and sub-second deterministic settlement.",
    points: [
      "Cloud-Native Microservices Design",
      "Event-Driven Message Queuing & Bus",
      "ISO 20022 Schema Transformation Engines",
      "HSM & Key Management Infrastructure",
    ],
    icon: "layers",
  },
  {
    id: "technology-engineering",
    tag: "Production Execution",
    title: "Technology Engineering",
    body: "Specialized software engineering delivering robust core banking decoupling, API gateways, and channel modernization.",
    points: [
      "Corporate & Retail Banking Channels",
      "Banking System Integration",
      "Financial Systems Integration & Adapters",
      "Continuous Compliance & DevSecOps",
    ],
    icon: "code",
  },
];

/**
 * The functional domains. Five, not the source file's six — see amendment 2.
 *
 * The order is the client's, and it is not the source file's: digital money
 * leads, then the two ecosystem domains, then payments and channels. Array
 * order is render order, so this is the only place it is set.
 *
 * "Payment & Rail Infrastructure" is set here as "Payment Infrastructure
 * Modernization" at the client's request. Its anchor changed with it —
 * `#payment-infrastructure-modernization` — and the header menu and footer both
 * point at the new one.
 *
 * The plates are the ones the previous cards used, matched to what each card is
 * about rather than left in their old order: the dashboard render goes to
 * Channels, the coin to Digital Money, the tokenization cube to Digital Value.
 * They are decorative either way.
 */
export const solutionDomains: SolutionDomain[] = [
  {
    id: "digital-money-cbdc",
    tag: "Digital Money",
    title: "Digital Money & CBDC",
    body: "Enable commercial banks to participate in retail CBDC and digital-money ecosystems with institutional wallets and token tracking.",
    tags: ["CBDC Engine", "Wallets", "Token Lifecycle", "HSM Key Management"],
    icon: "coin",
    image: "/images/solution-playcard/solution-playcard-2.png",
    /* The source file points this at its own `#platforms` anchor. The platform
       it means is the Digital Currency Hub, which has a product page here. */
    cta: { label: "Explore CBDC Hub", href: "/products/digital-currency-hub" },
  },
  {
    id: "open-banking-open-finance",
    tag: "Open Ecosystems",
    title: "Open Banking & Open Finance",
    body: "Participate in API-driven ecosystems through consent management, account aggregation, and secure data sharing.",
    tags: ["Open APIs", "Consent Layer", "Account Aggregator", "PIS / AIS"],
    icon: "nodes",
    image: "/images/solution-playcard/solution-playcard-4.png",
    cta: { label: "Explore Open Finance", href: "/contact" },
  },
  {
    id: "digital-value-interoperability",
    tag: "Digital Value",
    title: "Digital Value Interoperability",
    body: "Orchestrate and coordinate transactions across traditional clearing networks and emerging digital ledger environments.",
    tags: [
      "Rail Adapters",
      "Settlement Flow",
      "Policy Compliance",
      "Reconciliation",
    ],
    icon: "globe",
    image: "/images/solution-playcard/solution-playcard-3.png",
    cta: { label: "Discuss Interoperability", href: "/contact" },
  },
  {
    id: "payment-infrastructure-modernization",
    tag: "Payments",
    title: "Payment Infrastructure Modernization",
    body: "Modernize payment infrastructure with high-throughput ISO 20022 transformation and RTGS hub modernization.",
    tags: ["RTGS", "Payment Hubs", "ISO 20022", "Instant Rails"],
    icon: "transfer",
    image: "/images/solution-playcard/solution-playcard-1.png",
    cta: { label: "Discuss Payments", href: "/contact" },
  },
  {
    id: "digital-banking-channels",
    tag: "Channels",
    title: "Digital Banking & Channels",
    body: "Transform customer and corporate digital touchpoints through domain-led mobile, web, and API banking engineering.",
    tags: ["Corporate Cash", "Mobile Banking", "Onboarding", "API Banking"],
    icon: "phone",
    image: "/images/solution-playcard/solution-playcard-5.png",
    cta: { label: "Discuss Channels", href: "/contact" },
  },
];

/** Where the page stops, per amendment 3. */
export const deliveryLifecycle = {
  eyebrow: "Delivery Lifecycle",
  headline: "From Strategy to Enterprise Production",
  steps: [
    {
      num: "01",
      phase: "Advisory",
      title: "Domain Assessment",
      body: "Evaluate regulatory parameters, operational gaps, and institutional objectives.",
    },
    {
      num: "02",
      phase: "Architecture",
      title: "System Blueprints",
      body: "Design modular, event-driven, cloud-native microservices blueprints.",
    },
    {
      num: "03",
      phase: "Engineering",
      title: "Integration & Build",
      body: "Integrate core banking, HSM security, and enterprise payment rails.",
    },
    {
      num: "04",
      phase: "Production",
      title: "Scale & Operate",
      body: "Deploy high-availability platforms with end-to-end observability.",
    },
  ],
};

/* ==========================================================================
   SUPERSEDED — the previous Solutions & Platforms content.
   ==========================================================================

   Kept rather than deleted, at the client's instruction, so the six solution
   areas and the two platform entries can be restored without re-typing them.
   Both lists came from the client's earlier prototype (`source-assets/
   orbismoneta-main.zip`, `src/App.tsx`).

   Two notes that were recorded against it and still apply if it comes back:

    1. That file names the sixth solution twice and differently: the nav menu
       says "Risk, Fraud & Compliance", the card says "Risk, Regulatory &
       Compliance". The card wins, on the same rule already applied to the
       service lines — the entry carrying the description is the master.
    2. The prototype lists five platforms. Three were dropped on the client's
       instruction — Currency Hub™ (the same platform the content document
       calls Digital Currency Hub™, which has its own product page under
       Products), SWIFT Ledger Platform™ and Institutional DeFi Platform™.
       Interoperability Fabric™ and Cross-Border Bridge™ are what shipped.

   Note that `solutionsPage` above reuses this name with new copy, so restoring
   the block below means resolving that collision first.

export type Solution = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  icon: string;
  image?: string;
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
    image: "/images/solution-playcard/solution-playcard-1.png",
    title: "Payments Infrastructure",
    body: "Modernize payment ecosystems for real-time, high-value, enterprise and cross-border transactions.",
    tags: ["Payment Hubs", "RTGS", "RTP", "ISO 20022"],
    icon: "transfer",
  },
  {
    id: "digital-currency-cbdc",
    image: "/images/solution-playcard/solution-playcard-2.png",
    title: "Digital Currency & CBDC",
    body: "Build the infrastructure required to issue, distribute, manage and operate regulated digital money.",
    tags: ["Retail CBDC", "Digital Money", "Tokenized Deposits", "Operations"],
    icon: "coin",
  },
  {
    id: "digital-assets-tokenization",
    image: "/images/solution-playcard/solution-playcard-3.png",
    title: "Digital Assets & Tokenization",
    body: "Transform traditional financial assets into programmable, interoperable digital instruments.",
    tags: ["Tokenization", "Custody", "Settlement", "Securities"],
    icon: "layers",
  },
  {
    id: "cross-border-interoperability",
    image: "/images/solution-playcard/solution-playcard-4.png",
    title: "Cross-Border & Interoperability",
    body: "Connect domestic and international payment ecosystems through interoperable infrastructure.",
    tags: ["SWIFT", "Multi-currency", "FX & Liquidity", "Routing"],
    icon: "globe",
  },
  {
    id: "ai-financial-intelligence",
    image: "/images/solution-playcard/solution-playcard-5.png",
    title: "AI & Financial Intelligence",
    body: "Turn financial data into operational intelligence, automation and better decisions.",
    tags: ["Fraud Intelligence", "AI Copilots", "Risk Analytics", "Routing"],
    icon: "spark",
  },
  {
    id: "risk-regulatory-compliance",
    image: "/images/solution-playcard/solution-playcarrd-6.png",
    title: "Risk, Regulatory & Compliance",
    body: "Build innovation into a framework of security, governance, compliance and institutional control.",
    tags: ["AML", "KYC", "Sanctions", "Auditability"],
    icon: "shield",
  },
];

export type Platform = Solution;

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

   ========================================================================== */
