/**
 * Home page content.
 *
 * Where the client's landing-page brief and the content document differ, the
 * landing-page brief wins — it is the newer file and carries the shortened
 * hero the content document recommended.
 */

export const hero = {
  eyebrow: "Strategic Advisory · Platform Engineering · Financial Infrastructure",
  purposeLabel: "Our purpose",
  headline: ["Engineering the", "Future of Finance"],
  gradientFrom: 1,
  subheadline:
    "We help financial institutions design, build and modernize intelligent, resilient and interoperable financial infrastructure for a connected world.",
  primaryCta: { label: "Contact Us", href: "/contact" },
  secondaryCta: { label: "Explore Our Solutions", href: "/advisory" },
  audienceLabel: "Serving across the financial ecosystem",
  audiences: [
    "Banks",
    "Fintechs",
    "Corporates",
    "Governments",
    "Regulators",
    "Financial Market Infrastructure",
  ],
  /**
   * Corridor markers over the globe. Percentages are relative to the marker
   * layer (the right-hand region of the hero artwork), not the viewport.
   */
  nodes: [
    { city: "New York", country: "USA", x: 13, y: 37, delay: 0 },
    { city: "London", country: "UK", x: 39, y: 22, delay: 140 },
    { city: "Mumbai", country: "India", x: 62, y: 52, delay: 280 },
    { city: "Singapore", country: "Singapore", x: 75, y: 67, delay: 420 },
    { city: "Tokyo", country: "Japan", x: 87, y: 34, delay: 560 },
  ],
} as const;

/* ---------------------------------------------------------------------------
   Industries we serve — the marquee directly beneath the hero.

   The six audiences are the client's own list (the strip in their landing-page
   hero), and the heading is their Industries page headline verbatim.

   `items` are lifted from the client's Industries copy; where their Industries
   page combines Governments & Regulators into one entry, the terms are split
   across the two cards without adding any that do not appear in their material.
   The cards no longer render them — the redesign is icon, title and photograph
   — but they stay here as the client-approved focus areas for each audience,
   and the Industries page itself still shows them.
   --------------------------------------------------------------------------- */

export type AudienceTone = "navy" | "sky" | "green" | "gold" | "indigo" | "teal";

export type AudienceCard = {
  id: string;
  /** Line icon for the card's badge. */
  icon: string;
  title: string;
  tone: AudienceTone;
  items: { label: string; icon: string }[];
  image: string;
  alt: string;
  href: string;
};

export const audienceMarquee = {
  eyebrow: "Industries we serve",
  heading: "Built for every institution shaping the future of money.",
  cards: [
    {
      id: "banks",
      icon: "bank",
      title: "Banks & Financial Institutions",
      tone: "navy",
      items: [
        { label: "Enterprise Payments", icon: "transfer" },
        { label: "ISO 20022", icon: "document" },
        { label: "Digital Money", icon: "coin" },
        { label: "Fraud AI", icon: "shield" },
        { label: "API Banking", icon: "code" },
      ],
      image: "/images/audiences/banks.webp",
      alt: "Customers and staff crossing the lit atrium of a modern bank at night",
      href: "/industries#banks-financial-institutions",
    },
    {
      id: "fintechs",
      icon: "bolt",
      title: "Fintechs & Digital Banks",
      tone: "sky",
      items: [
        { label: "Product Strategy", icon: "target" },
        { label: "Cloud Native", icon: "cloud" },
        { label: "API Banking", icon: "code" },
        { label: "Risk & Compliance", icon: "shield" },
      ],
      image: "/images/audiences/fintechs.webp",
      alt: "Product team walking through a payment flow diagram on a meeting-room screen",
      href: "/industries#fintechs-digital-banks",
    },
    {
      id: "corporates",
      icon: "building",
      title: "Corporates & Treasuries",
      tone: "green",
      items: [
        { label: "Cross-Border", icon: "globe" },
        { label: "Treasury Payments", icon: "transfer" },
        { label: "Open Finance", icon: "nodes" },
        { label: "Tokenization", icon: "chip" },
      ],
      image: "/images/audiences/corporates.webp",
      alt: "Treasury team reviewing cash-flow and liquidity dashboards in a boardroom at dusk",
      href: "/industries#corporates-treasuries",
    },
    {
      id: "governments",
      icon: "clipboard",
      title: "Governments",
      tone: "gold",
      items: [
        { label: "National Payment Systems", icon: "nodes" },
        { label: "CBDC Policy", icon: "document" },
        { label: "Government Payment Programs", icon: "building" },
      ],
      image: "/images/audiences/governments.webp",
      alt: "Neoclassical government building overlaid with a network of connected public service icons",
      href: "/industries#governments-regulators",
    },
    {
      id: "regulators",
      icon: "shield",
      title: "Regulators",
      tone: "indigo",
      items: [
        { label: "Regulatory Oversight", icon: "clipboard" },
        { label: "Regulatory Sandbox", icon: "layers" },
        { label: "Policy Frameworks", icon: "document" },
      ],
      image: "/images/audiences/regulators.webp",
      alt: "Two analysts monitoring a wall of market surveillance dashboards",
      href: "/industries#governments-regulators",
    },
    {
      id: "financial-market-infrastructure",
      icon: "nodes",
      title: "Financial Market Infrastructure",
      tone: "teal",
      items: [
        { label: "Clearing & Settlement", icon: "refresh" },
        { label: "ISO 20022", icon: "document" },
        { label: "Digital Assets", icon: "coin" },
        { label: "Interoperability", icon: "nodes" },
      ],
      image: "/images/audiences/financial-market-infrastructure.webp",
      alt: "Settlement hub rendered as a globe linking banks, clearing houses and liquidity pools inside a data centre",
      href: "/industries#financial-market-infrastructure",
    },
  ] satisfies AudienceCard[],
};

export type CarouselSlide = {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle?: string;
  body: string;
  points: { label: string; accent: string; detail?: string }[];
  image: string;
  alt: string;
  href: string;
  cta: string;
  /**
   * Rail entry. These are the client's own five hero pillars — the strip in
   * their landing-page artwork maps one-to-one onto the five banners, so the
   * pillar rail doubles as the carousel's navigation.
   */
  tab: { label: string; body: string; icon: string };
};

/** The five slides the client supplied as "5 Carousal Image". */
export const carouselSlides: CarouselSlide[] = [
  {
    id: "global-solution-platform",
    eyebrow: "Platform",
    title: "Global Solution",
    titleAccent: "Platform",
    subtitle: "for Global Financial Institutions",
    body: "A future-ready platform connecting financial ecosystems worldwide with intelligence, security and scale.",
    points: [
      { label: "Connected", accent: "Ecosystems" },
      { label: "Built for", accent: "Scale" },
      { label: "Secure by", accent: "Design" },
    ],
    image: "/images/carousel/global-solution-platform.webp",
    alt: "Illuminated globe linking banking, cloud, card and mobile channels across a worldwide network",
    href: "/products/digital-currency-hub",
    cta: "Explore the platform",
    tab: {
      label: "Global Reach",
      body: "Connecting financial ecosystems across the world.",
      icon: "globe",
    },
  },
  {
    id: "intelligent-platform",
    eyebrow: "Intelligence",
    title: "Intelligent",
    titleAccent: "Platform",
    subtitle: "for Global Financial Institutions",
    body: "AI-powered insights, intelligent automation and real-time intelligence to drive smarter decisions and outcomes.",
    points: [
      { label: "AI-Powered", accent: "Insights" },
      { label: "Intelligent", accent: "Automation" },
      { label: "Real-Time", accent: "Intelligence" },
      { label: "Smarter", accent: "Decisions" },
      { label: "Adaptive &", accent: "Secure" },
    ],
    image: "/images/carousel/intelligent-platform.webp",
    alt: "AI processor rendered inside a neural network above a connected globe",
    href: "/advisory#ai-for-financial-services",
    cta: "See our AI services",
    tab: {
      label: "Intelligent Platforms",
      body: "Cloud-native, secure and scalable platforms for the future.",
      icon: "layers",
    },
  },
  {
    id: "seamless-interoperability",
    eyebrow: "Connectivity",
    title: "Seamless",
    titleAccent: "Interoperability",
    body: "Enabling connected systems and frictionless financial exchange across ecosystems.",
    points: [
      { label: "Unified", accent: "Connections" },
      { label: "Standardized", accent: "Integration" },
      { label: "Real-Time", accent: "Data Flow" },
      { label: "Secure", accent: "By Design" },
      { label: "Adaptable", accent: "By Architecture" },
    ],
    image: "/images/carousel/seamless-interoperability.webp",
    alt: "Data streams flowing between banking, cloud, card and mobile endpoints around a globe",
    href: "/advisory#cross-border-payments",
    cta: "Explore interoperability",
    tab: {
      label: "Seamless Interoperability",
      body: "Standards-driven connectivity across networks and systems.",
      icon: "nodes",
    },
  },
  {
    id: "trust-and-security",
    eyebrow: "Assurance",
    title: "Trust &",
    titleAccent: "Security",
    subtitle: "The Foundation of Every Transaction",
    body: "Enterprise-grade security, compliance and resilience to protect what matters most — every time, everywhere.",
    points: [
      { label: "Secure by", accent: "Design", detail: "Built with security at every layer" },
      { label: "Strong", accent: "Encryption", detail: "Advanced encryption for data in transit and at rest" },
      { label: "Zero Trust", accent: "Architecture", detail: "Verify continuously. Trust never." },
      { label: "Compliance", accent: "Assured", detail: "Aligned with global regulations and standards" },
      { label: "Resilient &", accent: "Reliable", detail: "High availability, fault tolerance and business continuity" },
      { label: "Governance &", accent: "Transparency", detail: "Audit-ready, monitorable and accountable" },
    ],
    image: "/images/carousel/trust-and-security.webp",
    alt: "Security shield with a padlock above a globe, ringed by data privacy, risk, threat detection and monitoring controls",
    href: "/advisory#ai-for-financial-services",
    cta: "How we build trust",
    tab: {
      label: "Trust & Security",
      body: "Built with enterprise-grade security, compliance and operational excellence.",
      icon: "shield",
    },
  },
  {
    id: "innovation-led",
    eyebrow: "Innovation",
    title: "Innovation",
    titleAccent: "Led",
    subtitle: "for Global Financial Institutions",
    body: "Pioneering the future of finance with next-generation technologies, open architecture and continuous innovation.",
    points: [
      { label: "Driving", accent: "What's Next" },
      { label: "Open &", accent: "Flexible" },
      { label: "Empowered by", accent: "Emerging Tech" },
      { label: "Built for", accent: "Evolution" },
      { label: "Innovate", accent: "With Confidence" },
    ],
    image: "/images/carousel/innovation-led.webp",
    alt: "Illuminated lightbulb formed from a network mesh above a globe, linked to emerging technology themes",
    href: "/lab",
    cta: "Inside the Lab",
    tab: {
      label: "Innovation Led",
      body: "Leveraging AI, data and emerging tech for real impact.",
      icon: "spark",
    },
  },
];

export const industryContext = {
  eyebrow: "Industry context",
  headline: "The Future of Money Is Being Engineered Today",
  /** The last two words carry the brand gradient. */
  headlineAccent: "Engineered Today",
  /**
   * The four shifts, taken straight from `opening` below — "Money is becoming
   * digital. Payments are becoming programmable. Assets are becoming tokenized.
   * Intelligence is becoming embedded." They are also the four cards labelled
   * in the globe artwork, set here as live text so the words are selectable and
   * reach assistive technology.
   */
  shifts: [
    { label: "Digital", icon: "coin" },
    { label: "Programmable", icon: "code" },
    { label: "Tokenized", icon: "chip" },
    { label: "Embedded", icon: "spark" },
  ],
  image: "/images/industry-globe.webp",
  alt: "Connected globe ringed by the four shifts reshaping financial infrastructure — digital currencies, real-time payments, tokenized assets and embedded intelligence",
  opening:
    "Money is becoming digital. Payments are becoming programmable. Assets are becoming tokenized. Intelligence is becoming embedded into financial infrastructure.",
  body: [
    "The financial system is entering a new era where digital currencies, programmable money, tokenized finance, real-time payment rails, AI and interoperable financial networks are converging.",
    "This is more than a technology transformation. It is changing how value is created, represented, moved, exchanged and settled across the global economy.",
  ],
  closing:
    "OrbisMoneta helps banks, payment providers, fintechs and enterprises navigate this transformation by designing and delivering the next generation of financial infrastructure.",
};

/** The "Future of Money" architecture, rebuilt as a live responsive diagram. */
export const futureOfMoney = {
  eyebrow: "The Future of Money",
  headline: "Building the financial infrastructure for tomorrow",
  centre: {
    name: "OrbisMoneta",
    line: "Pioneering the Future of Money",
  },
  pillars: [
    {
      title: "Digital Money",
      items: ["CBDCs", "Stablecoins", "Tokenized Deposits"],
    },
    {
      title: "Tokenized Assets",
      items: ["Real-World Assets", "Securities", "Funds & Investments"],
    },
    {
      title: "AI-Driven Finance",
      items: [
        "Intelligent Automation",
        "Fraud & Risk Management",
        "Personalized Experiences",
      ],
    },
  ],
  convergence: {
    title: "Interoperable Financial Infrastructure",
    attributes: ["Secure", "Scalable", "Interoperable", "Compliant", "Intelligent"],
  },
  platformBand: "OrbisMoneta — Powering the Future of Money",
  audiences: [
    "Banks & Financial Institutions",
    "Regulators & Policymakers",
    "Payment Networks & Service Providers",
    "Market Infrastructures & Clearing Houses",
    "FinTechs & Innovators",
    "Global Enterprises",
  ],
  principles: [
    {
      title: "Trusted & Secure",
      body: "Security by design and privacy by default.",
    },
    {
      title: "Connected & Borderless",
      body: "Enabling seamless value flow across ecosystems.",
    },
    {
      title: "Built for Scale",
      body: "Cloud-native, modular and future-ready architecture.",
    },
    {
      title: "Innovation Enabled",
      body: "APIs, integration and innovation at the core.",
    },
  ],
};

export const proposition = {
  eyebrow: "Our proposition",
  headline: "Engineering the infrastructure for the next financial era",
  body: "From digital money to tokenized finance, from intelligent payments to programmable value — OrbisMoneta engineers the infrastructure for the next financial era.",
  nodes: [
    "Digital Money",
    "Tokenized Finance",
    "Intelligent Payments",
    "Programmable Value",
  ],
  image: "/images/proposition-tokenized-value.webp",
  alt: "Tokenized value cube on a plinth in front of a connected globe over a city skyline",
};

export const whyOrbisMoneta = {
  eyebrow: "Why OrbisMoneta",
  headline: "Where product engineering meets financial expertise.",
  intro:
    "OrbisMoneta was built to bridge the gap that most institutions face — between the ambition to modernize and the specialist capability to execute. We combine deep financial domain knowledge, engineering discipline and product-building experience into a single, accountable engagement model.",
  reasons: [
    {
      title: "Product & Engineering, Not Just Advisory",
      icon: "code",
      body: "We build and ship — proprietary software, custom engineering solutions and hosted platforms — not just strategies and roadmaps.",
    },
    {
      title: "Full Spectrum of Financial Technology",
      icon: "layers",
      body: "Enterprise payments, digital money, AI, fraud risk, open finance and cloud-native platforms — deep expertise across the entire modern financial stack.",
    },
    {
      title: "From Boardroom to Production",
      icon: "target",
      body: "We carry engagements from strategy and architecture through to live deployment — with a single team accountable for the outcome.",
    },
    {
      title: "Regulator & Institution Grade",
      icon: "shield",
      body: "Everything we design and build meets the compliance, governance and explainability standards that banks, regulators and supervisory bodies require.",
    },
  ],
  image: "/images/why-orbismoneta-people.webp",
  alt: "OrbisMoneta team reviewing a global business dashboard together in a boardroom",
  highlights: [
    {
      label: "Delivery model",
      title: "Software + Engineering + Advisory",
      body: "Three capabilities, one integrated team — eliminating the gaps between strategy, build and operations that derail most modernization programmes.",
    },
    {
      label: "Coverage",
      title: "Payments · Digital Money · AI · Risk",
      body: "The four forces reshaping financial services infrastructure — available under one roof, delivered by practitioners who have built in each domain.",
    },
    {
      label: "Principle",
      title: "Independent. Accountable. Outcome-Led.",
      body: "No platform allegiances, no vendor quotas. Every recommendation and every line of code is measured against client outcomes, not commercial incentives.",
    },
  ],
};

export const closingCta = {
  eyebrow: "Let's talk",
  headline: "Ready to engineer the future of money with us?",
  body: "Whether you need to modernize a payment system, design a digital currency programme, build a platform or define your strategy for the future of finance — we want to understand your challenge.",
  routes: [
    { title: "Modernize Payment Systems", icon: "bank" },
    { title: "Design Digital Currency Programmes", icon: "chip" },
    { title: "Define Your Strategy for Future of Finance", icon: "target" },
  ],
  primaryCta: { label: "Let's Start the Conversation", href: "/contact" },
  secondaryCta: { label: "Explore Our Services", href: "/advisory" },
  image: "/images/cta-lets-talk.webp",
  alt: "OrbisMoneta team shaking hands with clients across a boardroom table",
};
