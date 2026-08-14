/**
 * Insights — content platform data layer.
 *
 * Deliberately separated from presentation so this can be swapped for a CMS
 * (Sanity, Contentful, Payload) without touching a single component: the page
 * components only ever consume `getAllInsights()`, `getInsight(slug)` and the
 * taxonomy exports below.
 *
 * CONTENT STATUS — the client's content document lists nine headlines and
 * records that body copy, lead images, authors and dates are still outstanding
 * ("PAGE 8 — Nine article headlines exist but no article pages, body copy or
 * images"). Rather than fabricate financial or regulatory claims, each entry
 * carries the approved headline, an editorial standfirst and the outline of
 * what the piece will cover. `body` accepts full rich content the moment it is
 * supplied, and the renderer already supports images and video.
 */

export type InsightBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "callout"; title: string; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | {
      type: "video";
      src: string;
      poster?: string;
      caption?: string;
      /** Set for third-party embeds (YouTube/Vimeo) instead of `src`. */
      embedUrl?: string;
      title: string;
    };

export type InsightCategory =
  | "CBDCs & Digital Money"
  | "Stablecoins"
  | "Enterprise Payments"
  | "Cross-Border"
  | "AI & Risk"
  | "Digital Assets"
  | "ISO 20022"
  | "Open Finance";

export type InsightType = "Analysis" | "Research" | "Field Note";

export type Insight = {
  slug: string;
  title: string;
  category: InsightCategory;
  topic: string;
  type: InsightType;
  /** Shown on cards and as the article standfirst. */
  excerpt: string;
  /** Section headings the finished piece will follow. */
  outline: string[];
  author: string;
  authorRole: string;
  publishedAt: string | null;
  status: "published" | "in-preparation";
  /** Ties the article back to the relevant OrbisMoneta capability. */
  relatedService?: { label: string; href: string };
  coverTone: "navy" | "sky" | "green" | "gold";
  /** Lead image once supplied by the client. */
  cover?: { src: string; alt: string };
  body?: InsightBlock[];
  /** Supporting photography and video for the detail page. */
  media?: InsightBlock[];
};

export const insightCategories: (InsightCategory | "All")[] = [
  "All",
  "CBDCs & Digital Money",
  "Stablecoins",
  "Enterprise Payments",
  "Cross-Border",
  "AI & Risk",
  "Digital Assets",
  "ISO 20022",
  "Open Finance",
];

export const insightTypes: InsightType[] = ["Analysis", "Research", "Field Note"];

const insights: Insight[] = [
  {
    slug: "designing-retail-cbdc-for-privacy",
    title:
      "Designing Retail CBDC for Privacy: The Architecture Central Banks Need to Get Right",
    category: "CBDCs & Digital Money",
    topic: "Digital Money",
    type: "Analysis",
    excerpt:
      "Privacy is an architectural decision, not a policy footnote. This piece examines the design choices that determine how much a retail CBDC reveals — and to whom.",
    outline: [
      "Why privacy design decides retail CBDC adoption",
      "The architectural options open to central banks",
      "Where privacy and supervisory obligations meet",
      "What commercial banks must build to support the model chosen",
    ],
    author: "OrbisMoneta",
    authorRole: "Financial Infrastructure Practice",
    publishedAt: null,
    status: "in-preparation",
    relatedService: { label: "Digital Money & CBDCs", href: "/advisory#digital-money-cbdcs" },
    coverTone: "navy",
  },
  {
    slug: "instant-payments-ai-native-risk",
    title:
      "Why Instant Payments Demand a New Approach to Fraud — The Case for AI-Native Risk",
    category: "Enterprise Payments",
    topic: "Fraud & Risk",
    type: "Analysis",
    excerpt:
      "When settlement is irrevocable and measured in seconds, retrospective controls stop working. A look at what an AI-native risk architecture has to do differently.",
    outline: [
      "What irrevocable settlement changes about fraud control",
      "Why rules engines alone no longer hold",
      "Designing real-time decisioning into the payment path",
      "Governance, explainability and the supervisory conversation",
    ],
    author: "OrbisMoneta",
    authorRole: "Risk & Intelligence Practice",
    publishedAt: null,
    status: "in-preparation",
    relatedService: { label: "AI for Financial Services", href: "/advisory#ai-for-financial-services" },
    coverTone: "sky",
  },
  {
    slug: "iso-20022-beyond-compliance",
    title:
      "Beyond Compliance: Extracting Real Commercial Value from ISO 20022 Data Richness",
    category: "ISO 20022",
    topic: "Enterprise Payments",
    type: "Analysis",
    excerpt:
      "Most institutions treated ISO 20022 as a migration deadline. The richer data model is a commercial asset — if the architecture behind it was built to use it.",
    outline: [
      "Migration completed is not value realised",
      "What the richer message model actually enables",
      "Downstream systems that need to change to benefit",
      "Building the data layer that turns messages into insight",
    ],
    author: "OrbisMoneta",
    authorRole: "Payments Modernization Practice",
    publishedAt: null,
    status: "in-preparation",
    relatedService: { label: "Payment Modernization", href: "/advisory#payment-modernization" },
    coverTone: "green",
  },
  {
    slug: "stablecoin-regulation-what-to-do-now",
    title:
      "Stablecoin Regulation: What Issuers, Banks and Payment Operators Must Do Now",
    category: "Stablecoins",
    topic: "Digital Assets",
    type: "Analysis",
    excerpt:
      "Regulatory frameworks for stablecoins are converging on a common set of operational expectations. This piece sets out the capabilities institutions need in place.",
    outline: [
      "The operational obligations emerging across jurisdictions",
      "Reserve, redemption and reporting architecture",
      "What banks servicing issuers need to build",
      "Preparing payment operators for stablecoin settlement",
    ],
    author: "OrbisMoneta",
    authorRole: "Digital Assets Practice",
    publishedAt: null,
    status: "in-preparation",
    relatedService: { label: "Digital Money & CBDCs", href: "/advisory#digital-money-cbdcs" },
    coverTone: "gold",
  },
  {
    slug: "end-of-correspondent-banking",
    title:
      "The End of Correspondent Banking As We Know It: What Replaces It and When",
    category: "Cross-Border",
    topic: "Cross-Border",
    type: "Research",
    excerpt:
      "Correspondent relationships are thinning while new corridor models mature. An assessment of what actually replaces the current model, and on what timeline.",
    outline: [
      "How the correspondent model is changing",
      "Interlinked instant payment systems as a corridor model",
      "The role of tokenized settlement and payment bridges",
      "A realistic transition timeline for institutions",
    ],
    author: "OrbisMoneta",
    authorRole: "Cross-Border Practice",
    publishedAt: null,
    status: "in-preparation",
    relatedService: { label: "Cross-Border Payments", href: "/advisory#cross-border-payments" },
    coverTone: "sky",
  },
  {
    slug: "explainable-ai-in-financial-services",
    title:
      "Explainable AI in Financial Services: Building Models That Regulators Will Accept",
    category: "AI & Risk",
    topic: "AI & Governance",
    type: "Analysis",
    excerpt:
      "Model performance is the easy part. This piece looks at the documentation, monitoring and governance architecture that determines whether a model can go live at all.",
    outline: [
      "Why explainability is an architecture problem",
      "Documentation and lineage requirements",
      "Monitoring, drift and ongoing evidence",
      "Designing the model governance operating model",
    ],
    author: "OrbisMoneta",
    authorRole: "Risk & Intelligence Practice",
    publishedAt: null,
    status: "in-preparation",
    relatedService: { label: "AI for Financial Services", href: "/advisory#ai-for-financial-services" },
    coverTone: "navy",
  },
  {
    slug: "open-finance-beyond-open-banking",
    title:
      "Open Finance Beyond Open Banking: Building the API Ecosystem for the Next Decade",
    category: "Open Finance",
    topic: "API Banking",
    type: "Field Note",
    excerpt:
      "Open banking delivered access. Open finance asks for something harder: a product surface institutions can build a business on. Notes from the build side.",
    outline: [
      "From mandated access to commercial API products",
      "What a durable API product surface looks like",
      "Consent, identity and data governance foundations",
      "Platform engineering choices that decide the ceiling",
    ],
    author: "OrbisMoneta",
    authorRole: "Platform Engineering Practice",
    publishedAt: null,
    status: "in-preparation",
    relatedService: {
      label: "Cloud-Native Platform Engineering",
      href: "/advisory#cloud-native-platform-engineering",
    },
    coverTone: "green",
  },
  {
    slug: "wholesale-cbdc-interbank-settlement",
    title: "Wholesale CBDC and the Quiet Revolution in Interbank Settlement",
    category: "CBDCs & Digital Money",
    topic: "Financial Market Infrastructure",
    type: "Research",
    excerpt:
      "Wholesale CBDC attracts less attention than its retail counterpart and may change more. An assessment of what programmable settlement does to market infrastructure.",
    outline: [
      "What wholesale CBDC changes about settlement finality",
      "Atomic settlement and delivery-versus-payment",
      "Implications for clearing houses and CSDs",
      "How FMI operators should be preparing now",
    ],
    author: "OrbisMoneta",
    authorRole: "Financial Market Infrastructure Practice",
    publishedAt: null,
    status: "in-preparation",
    relatedService: { label: "Payment Systems & FMI", href: "/advisory#payment-systems-fmi" },
    coverTone: "navy",
  },
  {
    slug: "tokenizing-real-world-assets",
    title:
      "Tokenizing Real-World Assets: The Institutional Roadmap for Banks and Asset Managers",
    category: "Digital Assets",
    topic: "Digital Assets",
    type: "Research",
    excerpt:
      "Tokenization pilots are plentiful; production platforms are not. A practical roadmap from proof of concept to an asset platform an institution can operate.",
    outline: [
      "Where tokenization creates genuine institutional advantage",
      "Custody, issuance and lifecycle architecture",
      "Connecting tokenized assets to existing settlement",
      "Sequencing the move from pilot to production",
    ],
    author: "OrbisMoneta",
    authorRole: "Digital Assets Practice",
    publishedAt: null,
    status: "in-preparation",
    relatedService: { label: "Digital Money & CBDCs", href: "/advisory#digital-money-cbdcs" },
    coverTone: "gold",
  },
];

export const insightsPage = {
  eyebrow: "Insights",
  headline: "Perspectives on the future of money.",
  headlineAccent: "the future of money",
  intro:
    "Research, analysis and field notes from practitioners engineering financial infrastructure — covering digital money, payments, AI, risk and the evolving regulatory landscape.",
};

export function getAllInsights(): Insight[] {
  return insights;
}

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function getRelatedInsights(slug: string, limit = 3): Insight[] {
  const current = getInsight(slug);
  if (!current) return insights.slice(0, limit);
  const sameCategory = insights.filter(
    (i) => i.slug !== slug && i.category === current.category,
  );
  const rest = insights.filter(
    (i) => i.slug !== slug && i.category !== current.category,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Featured slot on the listing page. */
export function getFeaturedInsight(): Insight {
  return insights[0];
}

export function estimateReadingTime(insight: Insight): number {
  const words = [
    insight.excerpt,
    ...insight.outline,
    ...(insight.body ?? []).map((b) =>
      "text" in b ? b.text : "items" in b ? b.items.join(" ") : "",
    ),
  ]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(3, Math.round(words / 200));
}
