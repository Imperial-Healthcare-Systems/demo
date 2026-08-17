export const aboutPage = {
  eyebrow: "About OrbisMoneta",
  headline: "Engineering the Future of Finance",
  intro:
    "OrbisMoneta is a financial technology company helping banks, financial institutions, fintechs and market infrastructures modernize payments, digital assets and AI-powered financial services. We combine deep industry expertise, enterprise-grade engineering and innovative products to accelerate the transition toward the future of money.",
  brandPanel: {
    name: "OrbisMoneta",
    positioning: "Financial Infrastructure • AI • Digital Money",
    statement:
      "Building secure, intelligent and interoperable financial platforms for the next generation of global finance.",
  },
  /**
   * The nine capability labels are the client's, unchanged to the character.
   * `icon` and `tone` are presentation only — they carry nothing the label does
   * not already say, which is why they live beside the copy rather than in it.
   *
   * Tones cycle navy · sky · green, the logo's own order, the same rotation the
   * home page's reason cards and the partner tiers use.
   */
  coreCapabilities: [
    { label: "Enterprise Payment Platforms", icon: "transfer", tone: 0 },
    { label: "Cross-Border Infrastructure", icon: "globe", tone: 1 },
    { label: "CBDC & Digital Currency", icon: "coin", tone: 2 },
    { label: "Tokenization", icon: "layers", tone: 0 },
    { label: "Digital Assets", icon: "chip", tone: 1 },
    { label: "AI for Financial Services", icon: "spark", tone: 2 },
    { label: "Payment Modernization", icon: "refresh", tone: 0 },
    { label: "Financial Crime & Risk", icon: "shield", tone: 1 },
    { label: "ISO 20022 Transformation", icon: "document", tone: 2 },
  ],
  leadershipSummary:
    "Founded and led by a payments and financial technology executive with nearly three decades of experience delivering mission-critical payment infrastructure, enterprise products and modernization programs across global financial institutions, technology companies and regulated banks.",
  story: [
    {
      title: "Why OrbisMoneta Exists",
      body: "The financial industry is entering the most significant transformation since the introduction of electronic payments. Digital currencies, tokenized assets, artificial intelligence, real-time payments, programmable finance and cloud-native infrastructure are fundamentally reshaping how value moves across the global economy. Yet many institutions remain constrained by legacy technology, fragmented architectures and increasingly complex regulatory obligations. OrbisMoneta was established to bridge this gap — combining strategic advisory, enterprise software and engineering expertise to help financial institutions modernize with confidence while preparing for the future of money.",
    },
    {
      title: "What We Do",
      body: "We advise, design, build and operate enterprise-grade financial technology platforms that enable institutions to modernize payment infrastructure, adopt digital assets, integrate AI into financial operations and accelerate innovation without compromising resilience, security or regulatory compliance. Our capabilities span strategy, architecture, software engineering, cloud platforms, systems integration, managed services and proprietary products — providing clients with a single trusted partner throughout their transformation journey.",
    },
    {
      title: "Why Institutions Choose OrbisMoneta",
      body: "Our approach is built upon practical experience rather than theoretical consulting. Unlike traditional advisory firms or pure software vendors, OrbisMoneta combines strategic thinking with product engineering and implementation expertise. Clients choose us because we understand how financial infrastructure operates inside banks, payment networks, fintechs and regulated institutions — and because we have successfully delivered mission-critical payment systems at enterprise scale.",
    },
    {
      title: "Our Vision",
      body: "To become one of the world's most trusted financial infrastructure companies, powering the next generation of payments, digital assets and intelligent financial ecosystems.",
    },
  ],
  philosophy: {
    label: "Innovation philosophy",
    quote:
      "True innovation is not about adopting the latest technology — it is about solving tomorrow's financial challenges before they become today's business problems. Every product we build begins with understanding how financial markets are evolving, where institutions are heading, and what capabilities they will need to succeed in the future.",
  },
  /** Rotating slideshow — "Leadership & Payment Experience". */
  experience: {
    eyebrow: "Leadership & payment experience",
    slides: [
      { label: "Experience", value: "30+", unit: "Years", detail: "In payments and financial technology" },
      { label: "Delivered", value: "75+", unit: "Banks", detail: "Financial institutions and national payment organizations" },
      {
        label: "Expertise",
        value: "Multiple Payment Schemes",
        detail: "CBDC, RTGS, EFT, ACH, RTP, UPI, SWIFT, Payment Hub",
      },
      { label: "Leadership", value: "Global Payment Infrastructure", detail: "Mission-critical systems at enterprise scale" },
    ],
  },
  /**
   * Shown as tiles inside the experience panel. `icon` is presentation only —
   * it carries nothing the label does not already say.
   */
  credentials: [
    { value: "Global", label: "Countries Served", icon: "globe" },
    { value: "Payments · AI · Digital Assets", label: "Enterprise Platforms", icon: "layers" },
    { value: "Advisory + Products + Engineering", label: "Delivery Model", icon: "nodes" },
  ],
  expertise: {
    eyebrow: "Area of expertise",
    areas: [
      "Enterprise Payment Hubs & Payment Modernization",
      "Financial Market Infrastructure (FMI)",
      "Cross-Border Payments",
      "CBDCs & Digital Currency Infrastructure",
      "Stablecoins & Programmable Money",
      "Asset Tokenization & Digital Asset Platforms",
      "ISO 20022 Transformation & Payment Interoperability",
      "AI for Financial Services & Intelligent Automation",
      "Enterprise Product Strategy & Innovation",
      "Cloud-Native Financial Platforms",
      "Financial Crime, Fraud & Risk Management",
      "API Banking & Open Finance",
    ],
  },
};

export const leadershipPage = {
  eyebrow: "Leadership team",
  headline: "The People Building OrbisMoneta",
  headlineAccent: "OrbisMoneta",
  intro:
    "A senior team of financial infrastructure practitioners, product leaders and engineers guiding OrbisMoneta's strategy, platforms and client engagements.",
  people: [
    {
      name: "Sanjay Bhoite",
      initials: "SB",
      role: "Chief Executive Officer & Chief Product Strategist",
      bio: "Sanjay Bhoite is a financial infrastructure strategist and product innovation leader with nearly 30 years of global experience in payments and financial technology. Having partnered with 75+ banks, financial institutions, central banks and national payment organizations, he specializes in payment modernization, digital currencies, tokenization, AI-driven financial services and enterprise financial platforms. At OrbisMoneta, he is shaping the next generation of financial infrastructure by transforming emerging industry trends into secure, scalable and future-ready products for financial institutions worldwide.",
      photo: null as string | null,
    },
  ],
  pendingProfiles: 2,
  pendingLabel: "Additional Leadership Profile",
  pendingNote: "Profile coming soon",
};

export const careersPage = {
  eyebrow: "Careers",
  headline: "Build financial infrastructure that matters.",
  headlineAccent: "that matters",
  intro:
    "OrbisMoneta brings strategy, product and engineering together in one accountable team. If you have built payment systems, digital money platforms or AI for regulated institutions, we would like to hear from you.",
  note: "Employer positioning, cultural principles and current open roles are being finalised with the client. Until they are published, applications are received directly by the team.",
  principles: [
    {
      title: "Practitioners, not theorists",
      body: "Our approach is built upon practical experience rather than theoretical consulting — the same standard applies to how we hire.",
    },
    {
      title: "Boardroom to production",
      body: "Engineers sit in strategy conversations and strategists stay through delivery. Nobody hands work over a wall.",
    },
    {
      title: "Regulator & institution grade",
      body: "Everything we design and build meets the compliance, governance and explainability standards supervisory bodies require.",
    },
  ],
  cta: {
    heading: "Introduce yourself.",
    body: "Send your profile and the kind of work you want to do next. The right person at OrbisMoneta will respond directly.",
    email: "info@orbismoneta.com",
  },
};

export const partnersPage = {
  eyebrow: "Ecosystem & Partners",
  headline: "Built with the best of the financial technology stack.",
  headlineAccent: "the best",
  intro:
    "No institution modernizes in isolation. We integrate, certify and co-engineer alongside the cloud providers, fintech platforms, core banking vendors and specialist technology partners our clients already depend on.",
  /**
   * The opening, as the client designed it: the ecosystem diagram beside the
   * headline, and a four-up strip beneath it.
   *
   * The four labels are the client's own, from the design supplied for this
   * page, and three of them are the intro's verbs read back as adjectives — we
   * *integrate*, *certify* and *co-engineer*. None is a figure, a named
   * certification, a client or a regulatory position; they describe the
   * approach, which is what the rest of this page already describes at length.
   */
  /**
   * The hero gallery.
   *
   * Every slide fills the frame. Containing the square diagram to spare the
   * other two any crop was tried and looked exactly like what it was — a small
   * picture in a large box.
   *
   * The frame ratio is what makes filling possible, and it was derived from the
   * files rather than chosen. Each was scanned for the bounding box of its
   * subject, against a per-row ground for the diagram (its own ground is a
   * gradient, so one global colour misreads it) and a luminance gate for the
   * scenes (their floor circuitry glints at the very edges and is not subject):
   *
   *   diagram        6.06% blank above, 1.20% below → tolerates 7.26% of height
   *   scene-network  9.56% left, 10.49% right
   *   scene-security 8.70% left, 7.92% right → the tightest, 15.84% of width
   *
   * A 1:1 slide in a frame of ratio R loses (R−1)/R of its height; a 5:4 slide
   * loses (1.25−R)/1.25 of its width. Those two budgets leave R between 1.052
   * and 1.078, and the frame sits in the middle of that window at 16/15.
   *
   * `object-position` on the diagram splits its crop in proportion to the blank
   * it actually has — 83% from the top, where the room is. `ground` is now only
   * a backstop while an image decodes, since nothing letterboxes.
   */
  hero: {
    gallery: [
      {
        src: "/images/partner-hero-image.png",
        label: "Partner ecosystem",
        alt: "OrbisMoneta at the centre of its partner ecosystem, linked to cloud providers, core banking vendors, fintech platforms, security and compliance, infrastructure partners and implementation partners",
        fit: "object-cover object-[center_83%]",
        ground: "bg-[#eef1f8]",
      },
      {
        src: "/images/partners-carousal/8f35f0b0-6c97-4b8b-9f95-ae7263f909d2.png",
        label: "Connected institutions",
        alt: "A lit network core linking a bank, an office tower, data terminals, laptops and a mobile device across an isometric grid",
        fit: "object-cover",
        ground: "bg-[#000811]",
      },
      {
        src: "/images/partners-carousal/d9b17b0f-f52b-49ff-bab5-29a0f1849f38.png",
        label: "Security and compliance",
        alt: "A shield on a lit platform surrounded by server racks, a padlock, certified documents, an identity card and a globe",
        fit: "object-cover",
        ground: "bg-[#04101f]",
      },
    ],
    proof: [
      { icon: "cloud", label: "Integrated", body: "End-to-end ecosystem" },
      { icon: "shield", label: "Certified", body: "Trusted & compliant" },
      { icon: "nodes", label: "Collaborative", body: "Co-engineer for impact" },
      { icon: "bars", label: "Scalable", body: "Future-ready technologies" },
    ],
  },
  /**
   * `image` and `icon` are presentation, not copy. The three renders carry
   * their own label chips — Security / APIs / Analytics, Consulting /
   * Expertise / Delivery / Integration, Compliance / Regulatory / Standards /
   * Frameworks — which is why they render `aria-hidden` with an empty alt: the
   * title and body beside them already say what the tier is, and a screen
   * reader should not have to sit through a second, looser list of the same
   * idea. Filenames are the client's, typos included, so the repo matches what
   * was handed over.
   *
   * `markInImage` records whether a render already carries the centre tile the
   * design puts at the foot of each card. Two do; the alliances render does
   * not, so that one is drawn in markup instead. It cannot be drawn on all
   * three: the baked tiles occupy 76–97% of their frame, overlapping the label
   * chips above them, so there is no band that can be cropped or faded to
   * remove them — an overlay would simply sit under a second, visible tile.
   * `icon` is the glyph to use when one has to be drawn.
   */
  tiers: [
    {
      tier: "Tier 01",
      title: "Technology Partners",
      body: "Cloud platforms, core banking vendors and infrastructure providers whose stacks we work with regularly — enabling faster integration, reduced technical risk and pre-validated reference architectures.",
      image: "/images/technology-partner.png",
      icon: "cloud",
      markInImage: true,
    },
    {
      tier: "Tier 02",
      title: "Implementation Partners",
      body: "Systems integrators, boutique consultancies and specialist engineering firms accredited to deploy and extend OrbisMoneta platforms — extending our delivery capacity across geographies and verticals.",
      image: "/images/implementation-partners.png",
      icon: "globe",
      markInImage: true,
    },
    {
      tier: "Tier 03",
      title: "Strategic Alliances",
      body: "Payment networks, standards bodies, regulatory sandboxes and industry consortia we co-innovate with — helping shape the interoperability standards and policy frameworks that next-generation financial infrastructure will require.",
      image: "/images/stratagic-allaiance.png",
      icon: "bank",
      markInImage: false,
    },
  ],
  cta: {
    headline: "Become an OrbisMoneta partner.",
    body: "Join a network co-building enterprise payments, digital money and AI infrastructure for financial institutions worldwide.",
    // "Explore Partnership" named a topic; this names the action, which is what
    // a button label is for. It also matches the heading directly above it.
    label: "Become a Partner",
    email: "partners@orbismoneta.com",
  },
};

/**
 * The Innovation Lab, from the client's page design.
 *
 * Every string below is theirs to the character — the masthead, the seven
 * exploration areas, the five steps and the four kinds of collaborator. `icon`
 * is the only field that is mine, and it is presentation only.
 *
 * This supersedes the page's previous "Coming soon" framing, which existed
 * because the Lab had nothing to describe: three invented themes and a panel
 * saying detail was on its way. The design describes the Lab as running — what
 * it explores, how it works, who it works with — in the client's own present
 * tense, so the caveat has nothing left to caveat. Nothing here claims a
 * finished prototype, a result or a named partner; it is all activity and
 * intent, which is what they have written. The superseded copy is kept at the
 * foot of this object rather than deleted.
 */
export const labPage = {
  eyebrow: "OrbisMoneta",
  headline: "Innovation Lab",
  /** The painted word. "Innovation" sets the category, "Lab" is the thing. */
  headlineAccent: "Lab",
  tagline: "Exploring. Experimenting. Engineering the Future.",
  intro:
    "The OrbisMoneta Innovation Lab explores emerging technologies and future financial infrastructure concepts that can shape the next generation of financial services. We experiment, prototype and collaborate to turn forward-looking ideas into real-world possibilities.",
  /** The four marks along the foot of the masthead. */
  pillars: [
    { title: "Future-Focused Research", icon: "target" },
    { title: "Prototype & Experiment", icon: "flask" },
    { title: "Collaborate & Co-Innovate", icon: "user" },
    { title: "Solve Real Problems", icon: "bars" },
  ],
  explore: {
    heading: "What we explore",
    /** The painted half of the heading. */
    headingAccent: "explore",
    intro:
      "Our Innovation Lab focuses on high-potential ideas and emerging technologies that can redefine how money moves, how value is created and how financial systems operate.",
    items: [
      {
        title: "Digital Money & CBDC",
        body: "Exploring digital currencies, tokenized deposits, CBDC use cases and programmable financial infrastructure.",
        icon: "coin",
      },
      {
        title: "Tokenized Finance",
        body: "Researching asset tokenization, digital securities, tokenized bonds, real-world assets and on-chain financial primitives.",
        icon: "layers",
      },
      {
        title: "Programmable Money",
        body: "Exploring rule-based, conditional and automated financial transactions for next-generation financial workflows.",
        icon: "code",
      },
      {
        title: "Open Finance",
        body: "Innovating in API ecosystems, consent, data sharing, account aggregation and embedded finance models.",
        icon: "nodes",
      },
      {
        title: "Cross-Border Innovation",
        body: "Researching future models for digital-value interoperability and next-generation cross-border settlement.",
        icon: "globe",
      },
      {
        title: "AI & Intelligent Finance",
        body: "Exploring AI, machine learning and agentic technologies for smarter financial systems and operations.",
        icon: "spark",
      },
      {
        title: "Emerging Infrastructure",
        body: "Studying distributed systems, privacy technologies, quantum resilience, digital identity and more.",
        icon: "chip",
      },
    ],
  },
  process: {
    heading: "How we innovate",
    headingAccent: "innovate",
    steps: [
      {
        title: "Discover",
        body: "Identify emerging trends, technologies and problems worth solving.",
        icon: "search",
      },
      {
        title: "Experiment",
        body: "Research, prototype and test ideas in a controlled innovation environment.",
        icon: "flask",
      },
      {
        title: "Collaborate",
        body: "Engage with banks, fintechs, partners, academia and industry experts.",
        icon: "user",
      },
      {
        title: "Validate",
        body: "Validate use cases, feasibility, security, compliance and business impact.",
        icon: "check",
      },
      {
        title: "Transform",
        body: "Turn validated concepts into platforms, solutions and real-world value.",
        icon: "play",
      },
    ],
  },
  coInnovation: {
    heading: "Co-innovation is at our core",
    body: "We believe the future of finance is built together. Our Innovation Lab collaborates with forward-thinking institutions, regulators, technology providers and academic partners to co-create what's next.",
    /**
     * Kinds of collaborator, not named ones. The design names no organisation
     * and neither does this — these are the categories it lists.
     */
    partners: [
      { title: "Banks & Financial Institutions", icon: "bank" },
      { title: "Fintechs & Startups", icon: "rocket" },
      { title: "Technology Partners", icon: "chip" },
      { title: "Universities & Research Labs", icon: "graduation" },
    ],
  },
  /**
   * The line the design closes on, above its footer bar.
   *
   * NOT RENDERED. The closing bar it fed and the masthead button that shared
   * its label were both removed at the client's request, so the Lab page now
   * carries no call to action of its own — the header's Contact Us is on every
   * page regardless. Kept rather than deleted: putting either back is one JSX
   * block, and this is the wording for it.
   */
  closing: {
    line: "Building ideas today. Creating impact tomorrow.",
    cta: "Collaborate with the Lab",
  },
  /**
   * SUPERSEDED by everything above — the page no longer renders any of it.
   * Kept because it is a record of what the page said while the Lab had nothing
   * to describe, and because `comingSoon` is the honest fallback if the client
   * ever wants the page back in that state.
   *
   * `themes` were three prototype areas written for the earlier page; the seven
   * in `explore` are the client's own and replace them.
   */
  comingSoon: {
    eyebrow: "Coming soon",
    headline: "Building today. Delivering tomorrow.",
    body: "Details coming soon.",
    status: "Innovation in progress",
  },
  note: "Detailed prototype themes and lab imagery are being prepared with the client team.",
  themes: [
    {
      title: "AI-Native Payment Rails",
      body: "Payment flows designed around inference and real-time decisioning rather than batch processing.",
    },
    {
      title: "Tokenized Settlement",
      body: "Settlement models where value and instruction move together as programmable objects.",
    },
    {
      title: "Programmable Money",
      body: "Conditional, policy-aware money for disbursements, supply chain and public sector programmes.",
    },
  ],
};
