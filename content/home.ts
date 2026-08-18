/**
 * Home page content.
 *
 * Where the client's landing-page brief and the content document differ, the
 * landing-page brief wins — it is the newer file and carries the shortened
 * hero the content document recommended.
 */

export const hero = {
  eyebrow:
    "Strategic Advisory · Platform Engineering · Financial Infrastructure",
  purposeLabel: "Our purpose",
  headline: ["Engineering the", "Future of Finance"],
  gradientFrom: 1,
  /*
    The client's own positioning line, at their length. It runs 383 characters
    against the 145 it replaced — long enough that the hero's copy column has to
    be given to it rather than the `max-w-xl` the shorter line sat in; see the
    note in components/HeroCarousel.tsx.
  */
  subheadline:
    "OrbisMoneta is a financial technology company that designs, engineers, and delivers secure, intelligent, and interoperable platforms for banks, financial institutions, payment networks, fintechs, market infrastructures, global enterprises, and governments—enabling the next generation of payments, digital assets, tokenized economies, and AI-powered financial services.",
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
  /*
    The corridor markers that used to be pinned over the globe — New York,
    London, Mumbai, Singapore, Tokyo — were removed at the client's request.
    Naming cities on a hero map reads as a statement about where the firm
    operates, and nothing in the client's material supports that reading, so
    the data is gone rather than commented out with coordinates waiting to be
    switched back on.
  */
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

export type AudienceTone =
  "navy" | "sky" | "green" | "gold" | "indigo" | "teal";

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
  /*
    "Banks & Financial Institutions" was the first card here and came off at the
    client's request. Home-page marquee only: the audience keeps its full
    section and its `#banks-financial-institutions` anchor on /industries, which
    nothing else linked to, so no route was broken by removing the card. The
    photograph, `audiences/banks.webp`, is left in place for the same reason.
    The marquee sizes itself from `cards.length`, so one card fewer needs no
    other change.
  */
  cards: [
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

/*
  The hero plates.

  Four now rather than five, and all four are the client's latest banners —
  full posters this time, cropped in scripts/prepare-assets.mjs to the diagram
  below each one's baked-in headline block. Seamless Interoperability came out
  of the rotation at the client's request; its slide is kept at the foot of this
  file rather than deleted, because its copy is the only record of what that
  banner said.

  The posters are shipped whole — no crop, no feather, nothing trimmed at any
  edge — at the client's request. They were cropped at the dark band under each
  one's baked-in headline at first, so the hero's own headline was the only one
  on screen; that came off. Each `alt` below therefore opens with the headline
  block the picture now carries, because a screen reader should get what a
  sighted reader gets.

  Every `image` here carries a `-banner` name it did not have before. That is
  deliberate: each plate's aspect ratio is baked into the box it paints into, so
  reusing a URL whose bytes have changed shape would leave CDN edges, returning
  browsers and Next's own image cache fitting the previous picture to the new
  box.

  The copy below is no longer rendered — HeroCarousel holds one fixed
  proposition and reads only `image`, `alt` and the title for each frame's
  label. It stays because the client's five capability banners may yet get a
  section of their own further down the page.
*/
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
    image: "/images/carousel/global-solution-platform-square.webp",
    alt: "Poster headed “Global Solution Platform for Global Financial Institutions — a future-ready platform connecting financial ecosystems worldwide with intelligence, security and scale”, over a lit globe crossed by network corridors with six linked nodes arcing above it: a globe, a bank, a server stack, an analytics screen, a mobile handset and a cloud",
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
    image: "/images/carousel/intelligent-platform-square.webp",
    alt: "Poster headed “Intelligent Platform for Global Financial Institutions — AI-powered insights, intelligent automation and real-time intelligence to drive smarter decisions and outcomes”, over an AI chip inside a neural-network brain above a lit globe, linked out to six nodes: banking, security, customer groups, growth, automation and cloud",
    href: "/advisory#ai-for-financial-services",
    cta: "See our AI services",
    tab: {
      label: "Intelligent Platforms",
      body: "Cloud-native, secure and scalable platforms for the future.",
      icon: "layers",
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
      {
        label: "Secure by",
        accent: "Design",
        detail: "Built with security at every layer",
      },
      {
        label: "Strong",
        accent: "Encryption",
        detail: "Advanced encryption for data in transit and at rest",
      },
      {
        label: "Zero Trust",
        accent: "Architecture",
        detail: "Verify continuously. Trust never.",
      },
      {
        label: "Compliance",
        accent: "Assured",
        detail: "Aligned with global regulations and standards",
      },
      {
        label: "Resilient &",
        accent: "Reliable",
        detail: "High availability, fault tolerance and business continuity",
      },
      {
        label: "Governance &",
        accent: "Transparency",
        detail: "Audit-ready, monitorable and accountable",
      },
    ],
    image: "/images/carousel/trust-and-security-square.webp",
    /* Twelve controls are drawn into this plate and appear nowhere else on the
       page — six ringing the shield and six along the foot — so the alt names
       every one of them. */
    alt: "Poster headed “Trust & Security, the foundation of every transaction — enterprise-grade security, compliance and resilience to protect what matters most, every time, everywhere”, over a shield and padlock above a lit globe, ringed by data privacy by design, risk and fraud protection, secure cloud infrastructure, global standards and compliance, threat detection and response, and continuous monitoring, above a row of six further controls: secure by design, strong encryption, zero trust architecture, compliance assured, resilient and reliable, and governance and transparency",
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
    image: "/images/carousel/innovation-led-square.webp",
    alt: "Poster headed “Innovation Led for Global Financial Institutions”, over a lightbulb formed from a network mesh above a lit globe, linked to emerging technologies, open architecture, cloud-native innovation, collaborate and co-create, future-ready solutions and sustainable impact",
    href: "/lab",
    cta: "Inside the Lab",
    tab: {
      label: "Innovation Led",
      body: "Leveraging AI, data and emerging tech for real impact.",
      icon: "spark",
    },
  },
];

/*
  Retired from the rotation at the client's request — the hero now runs the
  globe plus the four latest banners, and no banner was supplied for this one.

  Kept rather than deleted because this copy is the only record of what the
  Seamless Interoperability banner said; its plate
  (carousel/seamless-interoperability.webp) is gone from /public and its
  original stays in source-assets/carousel/.

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
    },
*/

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
  /**
   * The gallery beside the copy. The globe leads and the rest follow it.
   *
   * All seven are referenced straight from `public/images/` rather than built
   * by `scripts/prepare-assets.mjs` — they were supplied finished. next/image
   * still derives the WebP that actually gets served, so the two 2.1MB PNGs are
   * repo weight only, never delivered.
   *
   * Every image covers — none contain. down3 was contained at first, because
   * its drawing reaches all four edges and cropping it risked clipping a label.
   * That was the wrong trade: contain fits the image inside the frame, so a
   * square plate in a 9:8 frame left a 41px bar down each side, and the bar was
   * visible because no single card colour can match seven plates with grounds
   * from rgb(240,244,253) to rgb(1,5,21). A visible margin on the card is worse
   * than a few pixels off a drawing, so the frame is always filled.
   *
   * `object-position` is per image and not guesswork — each file was scanned for
   * the bounding box of its drawing, and a square plate loses 11.1% of its
   * height to this frame:
   *
   *   globe   6.9% blank above, 7.5% below — biased up, nothing drawn is lost
   *   down3   labels inset from every edge; centred, the 5.5% taken off each end
   *           is bare grid floor and every label survives
   *   down4   12.1% blank above, none below — crop taken off the top
   *   down6   14.4% above, 13.5% below — comfortably covers
   *   1, 2, 5 photographic scenes, edge to edge, nothing to protect
   *
   * Written out as literal class strings because Tailwind only generates class
   * names it can find as text in the source.
   */
  gallery: [
    {
      src: "/images/globe.png",
      label: "Connected globe",
      alt: "Connected globe on a lit platform, ringed by five cards — real-time payments, digital currencies, tokenized assets, decentralized infrastructure and AI-powered intelligence",
      fit: "object-cover object-[center_46%]",
    },
    {
      src: "/images/page1-carousal-down3.png",
      label: "Integration hub",
      alt: "Isometric integration hub routing banking systems, banking and payment APIs, financial applications, smart contracts and secure transaction pathways",
      fit: "object-cover object-center",
    },
    {
      src: "/images/page1-carousal-down4.png",
      label: "Digital money network",
      alt: "Isometric network linking banks, wallets, mobile apps, cloud infrastructure and secure ledgers around a central digital currency token",
      fit: "object-cover object-top",
    },
    {
      src: "/images/page1-carousal-down6.jpg",
      label: "Wallet network",
      alt: "Isometric wallet platform connected to cards, banking, retail, cloud, identity and digital currency nodes",
      fit: "object-cover object-center",
    },
    {
      src: "/images/page1-carousal-down5.jpg",
      label: "Tokenized assets",
      alt: "Real-world assets — property, vehicles, commodities and documents — linked to a blockchain and a secure mobile wallet",
      fit: "object-cover object-center",
    },
    {
      src: "/images/page1-carousal-down2.jpg",
      label: "Financial district",
      alt: "Isometric financial district with a central bank building, market charts and connected service blocks",
      fit: "object-cover object-center",
    },
    {
      src: "/images/page1-carousal-down1.jpg",
      label: "API infrastructure",
      alt: "API layer over a city skyline, linking mobile, database, cloud, analytics and security services",
      fit: "object-cover object-center",
    },
  ],
  opening:
    "Money is becoming digital. Payments are becoming programmable. Assets are becoming tokenized. Intelligence is becoming embedded into financial infrastructure.",
  body: [
    "The financial system is entering a new era where digital currencies, programmable money, tokenized finance, real-time payment rails, AI and interoperable financial networks are converging.",
    "This is more than a technology transformation. It is changing how value is created, represented, moved, exchanged and settled across the global economy.",
  ],
  /*
    `body[1]` is not rendered. It was briefly, as a closing band with the five
    stages of value it names — created, represented, moved, exchanged, settled —
    and the client asked for that band to come off again. The sentence stays
    here because it is the client's copy, not because anything reads it.

    Worth recording for whoever picks this up: the layout this section is built
    to has a row of figures in that same position — institutions served,
    countries reached, projects delivered, uptime percentage. None of those
    numbers appear anywhere in the client's material and none of them were
    written. If real, verified figures ever arrive, the band is the place.
  */
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
    attributes: [
      "Secure",
      "Scalable",
      "Interoperable",
      "Compliant",
      "Intelligent",
    ],
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

/**
 * The client's composed platform poster.
 *
 * NOT RENDERED — the band it fed came off the home page at the client's
 * request. Kept because `PlatformPoster` in components/Sections.tsx is kept,
 * and because the measurements below are what any future placement of this
 * artwork has to respect.
 *
 * Everything here except `image` and `alt` exists because the poster is a
 * picture of words. Its headline, its six labelled nodes and its five-item
 * footer strip are pixels, not text — so they are unselectable, untranslatable,
 * invisible to a screen reader and fixed in size while the page around them is
 * not. Measured at the file, its smallest type is a 14px glyph run across
 * 1254px, which holds above 11px only while the poster paints wider than about
 * 985px. That is the full shell on a desktop and nothing narrower, so below
 * `lg` the footer strip is decoration and `commitments` below is what a reader
 * actually reads.
 *
 * `title` is the poster's own headline, carried as text so the section has a
 * real heading in the document outline. On screen the poster sets it, so the
 * heading is `sr-only` — the words are on the page either way, and this is the
 * only way they reach anyone who cannot see the picture.
 */
export const platformPoster = {
  eyebrow: "Intelligent platform",
  title: "Intelligent Platform for Global Financial Institutions",
  /* The original JPEG, not a WebP derivative. It is already lossy, so a
     pre-encode would cost a second generation of loss on that 14px type to save
     8% at the quality the type needs — and next/image derives what actually
     ships regardless. */
  image: "/images/intelligent-platform-poster.jpeg",
  /* Describes the picture. The words baked into it are carried by `title` and
     `commitments`, so this does not repeat them. */
  alt: "An AI processor at the centre of a neural network, linked to financial infrastructure, data-driven insights, risk and fraud management, intelligent automation, customer-centric experiences and cloud-native flexibility, above a lit globe and a skyline of financial centres",
  /** The poster's own footer strip, as text. */
  commitments: [
    {
      title: "Secure by design",
      body: "Built for trust and resilience",
      icon: "shield",
    },
    {
      title: "Scalable & resilient",
      body: "Elastic by design. Always on.",
      icon: "cloud",
    },
    {
      title: "Interoperable & open",
      body: "Seamless connectivity across ecosystems",
      icon: "nodes",
    },
    {
      title: "Built for impact",
      body: "Empowering economies and communities",
      icon: "user",
    },
    {
      title: "Partnership focused",
      body: "Collaborate. Co-create. Drive change.",
      icon: "share",
    },
  ],
} as const;

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
  /**
   * Supplied finished, so referenced straight from `public/images/` rather than
   * built by `scripts/prepare-assets.mjs`. next/image derives the WebP that is
   * actually served; the 2MB PNG is repo weight only.
   *
   * It replaces `why-orbismoneta-people.webp`, which is still in the tree and
   * still generated by the asset script — nothing else pointed at it.
   *
   * `-v2` because the second supply is the same scene re-rendered without the
   * row of national flags along the table, and a changed picture under an
   * unchanged URL is the one thing a CDN, a returning browser and next/image's
   * own cache all get wrong together. The flagged file is deleted rather than
   * left beside it; git holds it if it is ever wanted back.
   *
   * 1380x1140, which is why the frame that paints it is `aspect-[23/19]` — see
   * the note in components/Sections.tsx. Keep the two in step.
   */
  image: "/images/group-image-v2.png",
  alt: "Team reviewing a global business overview dashboard together in a boardroom, with a city skyline beyond",
  /*
    Not rendered. This three-card row closed the "Why OrbisMoneta" section and
    came off at the client's request, replaced by the four-phase engagement
    model. The copy is the client's own, so it is parked here rather than
    deleted — the same convention as components/ParkedSections.tsx. Re-mounting
    it is one map() in the section it came from.
  */
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
