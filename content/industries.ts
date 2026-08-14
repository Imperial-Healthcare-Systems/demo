export const industriesPage = {
  eyebrow: "Industries",
  headline: "Built for every institution shaping the future of money.",
  headlineAccent: "the future of money",
  intro:
    "We work across the full spectrum of the financial ecosystem — from global banks to digital-native fintechs and financial market infrastructure operators.",
};

export type Industry = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  icon: string;
};

/** Icons replace the emoji placeholders flagged in the content document. */
export const industries: Industry[] = [
  {
    id: "banks-financial-institutions",
    title: "Banks & Financial Institutions",
    body: "Retail, commercial, corporate and investment banks modernizing payment infrastructure, launching digital money capabilities and deploying AI-powered risk management.",
    tags: ["Enterprise Payments", "ISO 20022", "Digital Money", "Fraud AI", "API Banking"],
    icon: "bank",
  },
  {
    id: "fintechs-digital-banks",
    title: "Fintechs & Digital Banks",
    body: "Agile financial services companies needing specialist infrastructure — payments access, regulated digital asset capabilities, scalable risk architecture and cloud-native platform engineering.",
    tags: ["Product Strategy", "Cloud Native", "API Banking", "Risk & Compliance"],
    icon: "bolt",
  },
  {
    id: "corporates-treasuries",
    title: "Corporates & Treasuries",
    body: "Multi-national corporates and treasury teams seeking to optimize cross-border payments, integrate with open finance ecosystems and leverage programmable money for supply chain and trade finance.",
    tags: ["Cross-Border", "Treasury Payments", "Open Finance", "Tokenization"],
    icon: "building",
  },
  {
    id: "governments-regulators",
    title: "Governments & Regulators",
    body: "Government agencies and supervisory authorities building national payment systems, CBDC policy frameworks and regulatory oversight capabilities for the digital financial system.",
    tags: ["CBDC Policy", "National Payment Systems", "Regulatory Sandbox", "FMI"],
    icon: "clipboard",
  },
  {
    id: "financial-market-infrastructure",
    title: "Financial Market Infrastructure",
    body: "Payment system operators, clearing houses, CSDs and exchanges modernizing clearing and settlement infrastructure, adopting ISO 20022 and connecting to digital asset and CBDC ecosystems.",
    tags: ["Clearing & Settlement", "ISO 20022", "Digital Assets", "Interoperability"],
    icon: "nodes",
  },
];

export const engagementModel = {
  eyebrow: "Engagement model",
  headline: "How we work with you.",
  intro:
    "A structured four-phase engagement model — bringing strategy, architecture, engineering and operational expertise to bear as a single, accountable team.",
  phases: [
    {
      step: "01",
      title: "Discover & Define",
      body: "We assess your current state, technology estate, regulatory context and strategic objectives — and define a clear, honest picture of what modernization will deliver and require.",
    },
    {
      step: "02",
      title: "Design & Architect",
      body: "We produce a target architecture, product specification and transformation roadmap — grounded in what works at financial infrastructure scale and shaped for your specific regulatory environment.",
    },
    {
      step: "03",
      title: "Build & Deliver",
      body: "Engineering and product pods move from approved design to production — shipping software, integrating systems and embedding the controls and governance your institution demands.",
    },
    {
      step: "04",
      title: "Operate & Evolve",
      body: "Ongoing platform operation, performance optimization and strategic support — because financial infrastructure is never truly complete, and neither is our commitment to your outcomes.",
    },
  ],
};
