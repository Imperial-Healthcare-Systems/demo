export const advisoryPage = {
  eyebrow: "Strategic Advisory & Engineering Services",
  headline: "Modernizing Financial Infrastructure for the Future of Money",
  /** Painted in the brand gradient. Words already in `headline` — nothing new. */
  headlineAccent: "Future of Money",
  intro:
    "OrbisMoneta helps banks, financial institutions, payment providers and fintechs design, modernize and build next-generation financial infrastructure. We combine strategic advisory, solution architecture and engineering expertise to accelerate transformation from concept to implementation.",
  orbitLabels: ["Banks", "CBDCs", "APIs", "Cloud", "AI"],
  approach: {
    eyebrow: "Our approach",
    heading: "Advise. Architect. Build.",
    body: "Every engagement is designed to deliver practical, implementation-ready outcomes — from strategic assessment and solution design to enterprise platform development.",
    steps: [
      {
        step: "Advise",
        body: "Strategic assessment that establishes where you are, what the regulation demands and what modernization will actually deliver.",
      },
      {
        step: "Architect",
        body: "Target architecture and solution design, grounded in what works at financial infrastructure scale.",
      },
      {
        step: "Build",
        body: "Enterprise platform development through to production, with the controls your institution requires.",
      },
    ],
  },
  closing: {
    eyebrow: "Next step",
    headline: "Let's Shape the Future of Financial Infrastructure.",
    emphasis: "Future of Financial Infrastructure",
    body: "Whether you're modernizing payment systems, exploring digital money or building next-generation financial platforms, OrbisMoneta is ready to help.",
    cta: { label: "Talk to Our Experts", href: "/contact" },
  },
};

export type Service = {
  id: string;
  index: string;
  title: string;
  promise: string;
  focusAreas: string[];
  icon: string;
};

export const services: Service[] = [
  {
    id: "payment-modernization",
    index: "01",
    title: "Payment Modernization",
    promise:
      "Helping financial institutions modernize payment infrastructure for real-time, interoperable and cloud-ready operations.",
    focusAreas: [
      "Enterprise Payment Platforms",
      "ISO 20022 Modernization",
      "Instant & Digital Payments",
      "Payment Architecture",
    ],
    icon: "transfer",
  },
  {
    id: "payment-systems-fmi",
    index: "02",
    title: "Payment Systems & Financial Market Infrastructure",
    promise:
      "Supporting the evolution of national payment systems and high-value payment infrastructure.",
    focusAreas: [
      "RTGS Modernization",
      "Financial Market Infrastructure",
      "Settlement Architecture",
      "Payment System Transformation",
    ],
    icon: "bank",
  },
  {
    id: "cross-border-payments",
    index: "03",
    title: "Cross-Border Payments",
    promise:
      "Enabling modern cross-border payment ecosystems through interoperable and future-ready architectures.",
    focusAreas: [
      "Cross-Border Modernization",
      "Digital Settlement",
      "Payment Bridges",
      "Multi-Currency Infrastructure",
    ],
    icon: "globe",
  },
  {
    id: "digital-money-cbdcs",
    index: "04",
    title: "Digital Money & CBDCs",
    promise:
      "Helping organizations prepare for the next generation of digital money and programmable finance.",
    focusAreas: [
      "CBDCs",
      "Stablecoins",
      "Digital Money Platforms",
      "Tokenized Finance",
    ],
    icon: "coin",
  },
  {
    id: "ai-for-financial-services",
    index: "05",
    title: "AI for Financial Services",
    promise:
      "Applying AI to improve operational efficiency, customer experience and product innovation across financial services.",
    focusAreas: [
      "AI Strategy",
      "Intelligent Operations",
      "Financial AI Solutions",
      "Product Innovation",
    ],
    icon: "spark",
  },
  {
    id: "cloud-native-platform-engineering",
    index: "06",
    title: "Cloud-Native Platform Engineering",
    promise:
      "Designing scalable, secure and API-first financial platforms for modern enterprises.",
    focusAreas: [
      "Cloud-Native Architecture",
      "Platform Engineering",
      "API Banking",
      "Enterprise Integration",
    ],
    icon: "cloud",
  },
];
