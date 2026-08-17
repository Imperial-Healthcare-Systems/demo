export const digitalCurrencyHub = {
  eyebrow: "Products & Platforms",
  name: "Digital Currency Hub™",
  descriptor: "Retail CBDC Platform for Commercial Banks",
  /**
   * From the product one-pager. `tagline` is the line that sits under the name
   * there; `summary` is its opening paragraph. Both are the client's wording to
   * the character.
   */
  tagline: "Bank-Ready Digital Money Infrastructure",
  summary:
    "A secure, scalable and interoperable platform for issuing, managing and operating digital currency, tokenized deposits and programmable money within regulated financial ecosystems.",
  /**
   * The masthead artwork from the page design — the bank on its lit platform,
   * ringed by Digital Currency, Tokenized Deposits, Programmable Money and
   * Regulated & Compliant. Those four labels are drawn into the render, which
   * is why the alt text names them: they are the only place on the page that
   * says them.
   */
  heroArt: {
    src: "/images/product-page.png",
    alt: "A bank on a lit platform, linked to digital currency, tokenized deposits, programmable money, and regulated and compliant operation",
  },
  /** The four marks under the headline, each with its own line. */
  pillars: [
    {
      title: "Security by Design",
      body: "Built with privacy, compliance and resilience.",
      icon: "shield",
    },
    { title: "Interoperable", body: "Works across networks, rails and systems.", icon: "nodes" },
    {
      title: "Scalable",
      body: "Enterprise-grade infrastructure for unlimited scale.",
      icon: "bars",
    },
    {
      title: "Enterprise Ready",
      body: "High availability, SLA-backed and production proven.",
      icon: "cloud",
    },
  ],
  intro: [
    "The OrbisMoneta Digital Currency Hub enables commercial banks to rapidly launch and manage Retail CBDC services through seamless integration with a Central Bank's CBDC infrastructure.",
    "Designed for the evolving digital economy, the platform provides the foundation for delivering secure, compliant and scalable digital currency services to retail customers, businesses, merchants and government agencies.",
  ],
  why: {
    heading: "Why Digital Currency Hub?",
    body: [
      "As Central Banks introduce Retail CBDCs, commercial banks need more than connectivity — they need an enterprise platform to manage customer onboarding, wallets, payments, compliance and digital currency operations.",
      "The Digital Currency Hub helps banks accelerate CBDC adoption while leveraging their existing banking and payment infrastructure.",
    ],
  },
  architecture: {
    eyebrow: "Platform architecture",
    headline: "One Platform. Endless Possibilities.",
    subline:
      "Enabling commercial banks to deliver Retail CBDC services to every participant in the digital economy.",
    top: {
      title: "Central Bank",
      body: "Retail CBDC Infrastructure",
      note: "Secure Integration",
    },
    centre: {
      brand: "OrbisMoneta",
      title: "Digital Currency Hub™",
      body: "Retail CBDC Platform for Commercial Banks",
    },
    bank: {
      title: "Commercial Banks",
      body: "Operate, distribute and manage Retail CBDC services through a single, integrated platform.",
    },
    participants: [
      {
        title: "Retail Customers",
        body: "Digital currency wallets for everyday payments, transfers and financial services.",
        icon: "user",
      },
      {
        title: "Government",
        body: "Enable efficient disbursements, subsidies, tax refunds and public sector payments.",
        icon: "bank",
      },
      {
        title: "Merchants",
        body: "Accept digital currency payments seamlessly with real-time settlement.",
        icon: "store",
      },
      {
        title: "Corporates",
        body: "Streamline collections, supply chain payments and corporate transactions.",
        icon: "building",
      },
    ],
    attributes: [
      { title: "Secure", body: "Enterprise-grade security and data protection.", icon: "shield" },
      { title: "Compliant", body: "Built for regulatory compliance and auditability.", icon: "check" },
      { title: "Scalable", body: "Cloud-native platform built to scale with growing demand.", icon: "layers" },
      { title: "Interoperable", body: "Seamless integration with existing systems and ecosystems.", icon: "nodes" },
      { title: "Intelligent", body: "Real-time monitoring, analytics and operational insights.", icon: "spark" },
      { title: "Open & Flexible", body: "API-first architecture for innovation and ecosystem enablement.", icon: "code" },
    ],
    footer: {
      title: "Secure. Interoperable. Future-Ready.",
      body: "Powering the Next Generation of Digital Money.",
    },
  },
  /**
   * The one-pager's CORE CAPABILITIES block — eight, each with its own line.
   *
   * This supersedes an earlier list of eight bare strings ("Retail CBDC
   * Banking", "Customer & Merchant Wallets", "Government Payment Programs",
   * "Merchant & Corporate Collections", "Digital Currency Payments &
   * Transfers", "API-Driven Integration", "Compliance & Operational Controls",
   * "Enterprise Security & Scalability"). Most of those named audiences and
   * programmes rather than capabilities, and the architecture section above
   * already walks through the same four participants; these describe what the
   * platform actually does. `icon` is presentation only.
   */
  /** The line under the Core capabilities heading, from the page design. */
  capabilitiesIntro:
    "A unified suite of capabilities to build, run and scale modern financial infrastructure.",
  coreCapabilities: [
    {
      title: "Digital Wallet",
      body: "Bank-grade wallets for individuals and institutions.",
      icon: "store",
    },
    {
      title: "Token Management",
      body: "Issue, distribute and manage digital tokens with fine grained controls.",
      icon: "layers",
    },
    {
      title: "Transaction Processing",
      body: "High performance real-time transaction processing.",
      icon: "transfer",
    },
    {
      title: "Programmable Money",
      body: "Define conditions and automate financial workflows.",
      icon: "code",
    },
    {
      title: "Security & Compliance",
      body: "Enterprise-grade security with cryptography and auditability.",
      icon: "shield",
    },
    {
      title: "Interoperability",
      body: "Cross-rail interoperability with legacy systems and modern payment networks.",
      icon: "nodes",
    },
    {
      title: "Operations",
      body: "Monitoring, alerts, reconciliation and operational controls.",
      icon: "bars",
    },
    {
      title: "APIs & Integration",
      body: "RESTful APIs and SDKs for seamless bank and fintech integrations.",
      icon: "chip",
    },
  ],
  /** The one-pager's TECHNOLOGY STACK column. */
  technology: {
    eyebrow: "Technology stack",
    lead: "Built for scale, modularity and operational excellence.",
    intro:
      "Built on the latest technology stack to deliver high scalability, modularity, security and operational excellence.",
    items: [
      {
        title: "Cloud-Native Microservices",
        body: "Modular, resilient and scalable architecture.",
        icon: "cloud",
      },
      {
        title: "API-First Architecture",
        body: "Secure, well-documented, easy to integrate.",
        icon: "code",
      },
      {
        title: "Event-Driven Platform",
        body: "High throughput and real-time processing.",
        icon: "bolt",
      },
      {
        title: "High Scalability",
        body: "Auto scaling, distributed & fault-tolerant.",
        icon: "bars",
      },
      {
        title: "Built for Security",
        body: "Zero trust, encryption, RBAC ready and audit enabled.",
        icon: "lock",
      },
      {
        title: "Interoperability",
        body: "Cross-rail, cross-border, multi-currency connectivity.",
        icon: "nodes",
      },
      {
        title: "Enterprise Ready",
        body: "Observability, audit trails and comprehensive monitoring.",
        icon: "clipboard",
      },
    ],
    note: "Designed for mission-critical, vault-like reliability and deployed with regulated financial environments.",
  },
  designedFor: ["Commercial Banks", "Digital Banks", "Licensed Payment Institutions"],
  benefits: [
    "Accelerate Retail CBDC readiness",
    "Reduce implementation complexity",
    "Integrate with existing banking systems",
    "Deliver seamless digital currency experiences",
    "Support future digital money initiatives",
  ],
  deployment: {
    eyebrow: "Deployment options",
    lead: "Flexible Deployment to Match Your Strategy",
    body: "The Digital Currency Hub\u2122 is built for flexibility. Easily deploy in environments that meet your compliance, residency and operational needs.",
    editions: [
      {
        name: "License Edition",
        body: "Deploy in your own data center or private cloud environment, with full control, customization and data ownership.",
        traits: ["Your infrastructure", "Full operational control", "Enterprise integration"],
      },
      {
        name: "Hosted Platform",
        aside: "Platform as a Service",
        body: "Accelerate go-to-market with a fully managed, cloud hosted platform. We handle infrastructure, scalability, uptime and operations.",
        traits: ["Fully managed", "Faster implementation", "Reduced operational load"],
      },
    ],
    models: [
      "Enterprise Software License",
      "Managed Hosted Platform",
      "Private Cloud Deployment",
      "Hybrid Deployment",
    ],
    /**
     * The one-pager's DEPLOYMENT MODELS column — where the platform runs, as
     * opposed to `editions`, which is how it is bought.
     *
     * `environments` names the three hyperscalers the client's own material
     * lists under Public Cloud. Each may carry a `logo` path under `public/`;
     * with none set they render as wordmarks. See `VendorWordmark` — the marks
     * themselves are not in this project and are trademarks with published
     * brand rules, so they have to be supplied rather than approximated.
     */
    modelDetail: {
      eyebrow: "Deployment models",
      lead: "Run it where your obligations require.",
      intro:
        "Flexible deployment options to meet your security, regulatory and operational needs.",
      items: [
        {
          title: "Private Cloud",
          body: "Deploy within a bank-controlled private cloud environment with greater control over data, security and infrastructure.",
          bestFor: ["Single Tenant", "Regulated & Financial Institutions", "High security environment"],
          icon: "lock",
        },
        {
          title: "Public Cloud",
          body: "Deploy using secure cloud-native architecture on hyperscale platforms.",
          environments: [
            { name: "AWS", logo: null as string | null },
            { name: "Microsoft Azure", logo: null as string | null },
            { name: "Google Cloud", logo: null as string | null },
          ],
          bestFor: ["Cost Effective", "Elastic", "Rapid Implementation", "Full suite of services"],
          icon: "cloud",
        },
        {
          title: "On-Premise / Bank Data Centre",
          body: "Deploy within the institution's own data centre where regulatory, data residency or infrastructure policies require local deployment.",
          bestFor: [
            "Regulated Institutions",
            "Sovereign environments",
            "Institutions with strict data residency requirements",
          ],
          icon: "building",
        },
      ],
    },
  },
  /**
   * The bar the page design closes on. This is the only call to action the
   * design carries, and the only one on the page since it was cut back to the
   * client's own material.
   */
  closingBar: {
    line: "Built for the future of money — Secure. Interoperable. Scalable.",
    cta: "Request a Demo",
    icon: "shield",
  },
  /** The closing strip. Six words, six lines. */
  attributes: [
    { title: "Secure", body: "Enterprise-grade security across all layers.", icon: "shield" },
    { title: "Scalable", body: "Built to handle millions of users and transactions.", icon: "bars" },
    { title: "Modular", body: "Loose coupling for flexibility and faster evolution.", icon: "nodes" },
    { title: "Cloud-Native", body: "Designed for cloud agility and modern operations.", icon: "cloud" },
    { title: "Compliant", body: "Built for regulated financial ecosystems.", icon: "clipboard" },
    {
      title: "Future-Ready",
      body: "Built for the future of digital money and finance.",
      icon: "globe",
    },
  ],
  whyBanks: {
    heading: "Why banks choose OrbisMoneta",
    reasons: [
      "Built on nearly three decades of enterprise payments expertise",
      "Designed specifically for commercial bank Retail CBDC adoption",
      "Faster time-to-market with reduced implementation risk",
      "Flexible deployment — Licensed or Hosted Platform",
      "Enterprise-grade security and scalable architecture",
      "Future-ready platform for evolving digital money ecosystems",
    ],
  },
  closing: {
    heading: "Built for the Future of Banking",
    body: "The OrbisMoneta Digital Currency Hub empowers commercial banks to participate confidently in the next generation of digital payments by providing a secure, interoperable and future-ready platform for Retail CBDC services.",
    tagline:
      "From Central Bank integration to customer adoption — everything banks need to participate in the digital currency ecosystem.",
  },
  cta: {
    headline: "See the Digital Currency Hub in action.",
    body: "Request a guided walkthrough tailored to your institution's Retail CBDC roadmap.",
    label: "Request a Demo",
  },
};
