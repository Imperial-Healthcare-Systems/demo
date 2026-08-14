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
  tiers: [
    {
      tier: "Tier 01",
      title: "Technology Partners",
      body: "Cloud platforms, core banking vendors and infrastructure providers whose stacks we work with regularly — enabling faster integration, reduced technical risk and pre-validated reference architectures.",
    },
    {
      tier: "Tier 02",
      title: "Implementation Partners",
      body: "Systems integrators, boutique consultancies and specialist engineering firms accredited to deploy and extend OrbisMoneta platforms — extending our delivery capacity across geographies and verticals.",
    },
    {
      tier: "Tier 03",
      title: "Strategic Alliances",
      body: "Payment networks, standards bodies, regulatory sandboxes and industry consortia we co-innovate with — helping shape the interoperability standards and policy frameworks that next-generation financial infrastructure will require.",
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

export const labPage = {
  eyebrow: "OrbisMoneta Lab",
  headline: "Where we prototype the next generation of financial infrastructure.",
  headlineAccent: "the next generation",
  intro:
    "Our innovation lab explores emerging technology — from AI-native payment rails to tokenized settlement — before it reaches production.",
  /**
   * The closing panel.
   *
   * `body` is the client's own last line from their Lab section, verbatim —
   * their HTML reads "…before it reaches production. Details coming soon." The
   * first sentence is `intro` above; this is the second.
   *
   * `headline` and `status` are the two lines from the design the client
   * supplied for this page. They are slogans, not claims — no date, no figure,
   * nothing anyone could be held to. The rest of that design's copy ("building
   * in stealth", "updates on our breakthroughs") is deliberately not here: it
   * asserts activity and results that appear nowhere in the client's material,
   * and "Details coming soon" says the same thing without asserting either.
   */
  comingSoon: {
    eyebrow: "Coming soon",
    headline: "Building today. Delivering tomorrow.",
    body: "Details coming soon.",
    status: "Innovation in progress",
  },
  /* Was rendered in a dashed "In preparation" block, now replaced by the panel
     above. Kept rather than deleted — it is still the accurate description of
     where the Lab's detail stands. */
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
