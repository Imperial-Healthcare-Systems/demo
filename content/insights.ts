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
 * images"). Rather than fabricate financial or regulatory claims, those nine
 * entries carry the approved headline, an editorial standfirst and the outline
 * of what the piece will cover.
 *
 * The tenth, first in the array, is different: it is a finished article, the
 * client's own, with a body, a cover, a byline and a date. It is the shape the
 * other nine take the moment their copy arrives — nothing in the renderer had
 * to change to carry it.
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

export const insightTypes: InsightType[] = [
  "Analysis",
  "Research",
  "Field Note",
];

const insights: Insight[] = [
  /*
    The first finished article on the site, and the only one carrying a body.

    It is Sanjay Bhoite's own piece, published on LinkedIn on 6 August 2026 as
    "ISO 20022 Migration Is Complete. Now Comes the Hard Part: Harmonisation",
    and it is reproduced here to the word. Nothing was written for it: every
    paragraph, heading, list and the pull-quote are his, in his order, and the
    closing source note is the one his article carries. The only liberties are
    typographic — his unspaced em dashes are set spaced, the way the rest of
    this site sets them.

    His spelling is left alone too, which is why "Harmonisation" and
    "modernisation" appear here while the navigation two inches away says
    "Payment Infrastructure Modernization". That is a real inconsistency and it
    is the deliberate one: the site's own labels are American, an author's
    byline is his.

    It sits first in the array, which is what `getFeaturedInsight()` reads. A
    published piece with a cover and a byline is what the featured slot is for;
    the nine outlines behind it have neither.
  */
  {
    slug: "iso-20022-harmonisation-the-hard-part",
    title:
      "ISO 20022 Migration Is Complete. Now Comes the Hard Part: Harmonisation",
    category: "ISO 20022",
    topic: "Financial Market Infrastructure",
    type: "Analysis",
    excerpt:
      "Migration was the easy part. Harmonisation is where the real value begins — why consistent use of ISO 20022, rather than adoption of it, is the next phase of payment modernisation.",
    outline: [
      "The challenge isn't XML — it's consistency",
      "Why this matters for RTGS modernisation",
      "The next phase of payment modernisation",
      "The Road Ahead",
    ],
    author: "Sanjay Bhoite",
    authorRole: "Chief Executive Officer & Chief Product Strategist",
    publishedAt: "2026-08-06",
    status: "published",
    relatedService: {
      label: "Payment Systems & FMI",
      href: "/advisory#payment-systems-fmi",
    },
    coverTone: "sky",
    cover: {
      src: "/images/insights/iso-20022-harmonisation.webp",
      alt: "ISO 20022 Harmonisation — the next milestone for RTGS modernisation and cross-border payments: a lit globe crossed by payment routes, five marks reading faster, lower cost, more transparent, more interoperable and more accessible, over the line one standard, one language, one global ecosystem",
    },
    body: [
      {
        type: "paragraph",
        text: "Over the last few years, central banks and financial institutions around the world have invested heavily in migrating to ISO 20022. For many, the successful completion of the SWIFT MT migration marked the finish line.",
      },
      { type: "paragraph", text: "I see it differently." },
      {
        type: "paragraph",
        text: "Migration was the easy part. Harmonisation is where the real value begins.",
      },
      {
        type: "paragraph",
        text: "A recent report from the BIS Committee on Payments and Market Infrastructures (CPMI) reinforces this point. It reminds us that while ISO 20022 gives the industry a common messaging standard, the benefits are only realised if we use it consistently across jurisdictions and payment systems.",
      },
      {
        type: "quote",
        text: "Migration alone does not guarantee interoperability. Harmonisation is now the industry's next major challenge.",
      },
      { type: "heading", text: "The challenge isn't XML — it's consistency." },
      {
        type: "paragraph",
        text: "I've seen a common misconception: once a system supports ISO 20022 messages, the job is done.",
      },
      { type: "paragraph", text: "In reality, that's only the beginning." },
      {
        type: "paragraph",
        text: "Today, different payment systems often use:",
      },
      {
        type: "list",
        items: [
          "Different implementation guidelines",
          "Different optional fields",
          "Different approaches to party identification",
          "Different address formats",
          "Different local code sets",
        ],
      },
      {
        type: "paragraph",
        text: "Technically, they all support ISO 20022. Operationally, they don't always speak the same language. That's exactly the challenge the BIS is trying to address.",
      },
      { type: "heading", text: "Why this matters for RTGS modernisation" },
      {
        type: "paragraph",
        text: "Every central bank modernising its RTGS platform has a unique opportunity. Instead of simply replacing legacy message formats, modern RTGS infrastructures can become the foundation for seamless domestic and cross-border interoperability.",
      },
      {
        type: "paragraph",
        text: "The BIS recommends greater consistency in areas such as:",
      },
      {
        type: "list",
        items: [
          "Standard use of ISO 20022 messages",
          "Structured party and address information",
          "Globally recognised identifiers like BIC, with LEI encouraged where appropriate",
          "Universal End-to-End Transaction Reference (UETR)",
          "Transparent representation of payment amounts, charges and FX information",
          "Preservation of remittance information across the complete payment chain",
        ],
      },
      {
        type: "paragraph",
        text: "These are not simply technical improvements — they directly improve straight-through processing (STP), reduce payment repairs, strengthen sanctions and AML screening, and enhance the customer experience.",
      },
      { type: "heading", text: "The next phase of payment modernisation" },
      {
        type: "paragraph",
        text: "The payments industry has spent years discussing ISO 20022 migration.",
      },
      {
        type: "paragraph",
        text: "I believe the conversation is now shifting.",
      },
      {
        type: "paragraph",
        text: "The next wave of innovation won't be driven by adopting a new messaging standard. It will come from using the same standard in a truly harmonised way.",
      },
      {
        type: "paragraph",
        text: "One of the most valuable messages in the BIS report is that harmonisation is not a regulatory exercise. Instead, it is an industry-wide effort to create a common implementation approach that enables interoperability across:",
      },
      {
        type: "list",
        items: [
          "RTGS systems",
          "High-value payment systems",
          "Instant payment systems",
          "Correspondent banking",
          "Cross-border payment networks",
          "Future digital money infrastructures",
        ],
      },
      {
        type: "paragraph",
        text: "As tokenised deposits, CBDCs, and programmable payments continue to evolve, consistent, high-quality data will become even more important than the messaging format itself.",
      },
      { type: "heading", text: "The Road Ahead" },
      {
        type: "paragraph",
        text: "The BIS recommends industry-wide alignment with its harmonised ISO 20022 data requirements by the end of 2027. While these are not regulatory mandates, they provide a practical roadmap for improving interoperability and reducing friction across the global payments ecosystem.",
      },
      {
        type: "paragraph",
        text: "For those leading RTGS modernisation programmes, this is an opportunity to think beyond technology upgrades.",
      },
      {
        type: "paragraph",
        text: "The goal should not simply be to build an ISO 20022-compliant RTGS.",
      },
      {
        type: "paragraph",
        text: "The goal should be to build an RTGS platform that can seamlessly connect with the evolving global payments ecosystem.",
      },
      {
        type: "paragraph",
        text: "Because in the next decade, interoperability will be measured not by whether systems use ISO 20022 — but by how consistently they use it.",
      },
      {
        type: "callout",
        title: "Source",
        text: "Bank for International Settlements (BIS), Committee on Payments and Market Infrastructures (CPMI), Harmonised ISO 20022 Data Requirements for Enhancing Cross-border Payments, February 2026.",
      },
    ],
  },
  /*
    Seven more of Sanjay Bhoite's own articles, transcribed from LinkedIn to the
    word and ordered newest first, which is also the order the index reads. Same
    rules as the ISO 20022 piece above: nothing was written for them, his
    spelling and his structure stand, and the source note each one carries is
    his.

    Three deliberate departures, all presentational:
      · LinkedIn emoji (the pointing hands, ticks and crosses that punctuate the
        originals) are dropped. This site sets no emoji anywhere and the words
        beside them carry the same sense.
      · Nested bullets are flattened, because `InsightBlock` has one list level.
        Where a parent bullet had children — "Traditional rails" over "slow" and
        "expensive" — they are set as one line.
      · "Haward Business School" is set as "Harvard Business School" in the
        GenAI piece. That is a typo in a real institution's name rather than a
        matter of style, and it would have been the site's typo once published.

    None of them has a cover image. `InsightCover` draws its tonal ground for an
    entry with no `cover`, which is what these use; add one to any entry and it
    takes over with no other change.
  */
  {
    slug: "the-genai-wall-effect",
    title: "The GenAI Wall Effect",
    category: "AI & Risk",
    topic: "AI & Governance",
    type: "Analysis",
    excerpt:
      "GenAI can narrow expertise gaps — but it cannot eliminate them. At a certain point it hits a wall, and where that wall stands decides how far anyone can work outside their own domain.",
    outline: [
      "Beyond the hype: what the research shows",
      "Understanding the GenAI Wall",
      "A new lens: vertical vs horizontal impact",
      "Implications for banking, fintech and digital payments",
      "Strategic takeaway",
    ],
    author: "Sanjay Bhoite",
    authorRole: "Chief Executive Officer & Chief Product Strategist",
    publishedAt: "2026-04-24",
    status: "published",
    relatedService: {
      label: "AI for Financial Services",
      href: "/advisory#ai-for-financial-services",
    },
    coverTone: "navy",
    body: [
      {
        type: "paragraph",
        text: "Why Artificial Intelligence Won't Replace Expertise — But Will Redefine It",
      },
      {
        type: "paragraph",
        text: "In boardrooms across banking, fintech, and technology firms, a familiar narrative is taking hold: Generative AI will democratize expertise. The assumption is simple — if AI can generate high-quality outputs, then the barriers between specialists and non-specialists will dissolve.",
      },
      {
        type: "paragraph",
        text: "A recent working paper from Harvard Business School, “The GenAI Wall Effect: Examining the Limits to Horizontal Expertise Transfer Between Occupational Insiders and Outsiders,” challenges that assumption with compelling evidence.",
      },
      {
        type: "paragraph",
        text: "The research reveals a more nuanced reality: GenAI can narrow expertise gaps — but it cannot eliminate them.",
      },
      { type: "paragraph", text: "At a certain point, it hits a wall." },
      { type: "heading", text: "Beyond the Hype: What the Research Shows" },
      {
        type: "paragraph",
        text: "The study, conducted in collaboration with a large global fintech firm, examined whether employees from different professional backgrounds could perform specialized tasks using GenAI.",
      },
      {
        type: "paragraph",
        text: "Participants were divided into three groups:",
      },
      {
        type: "list",
        items: [
          "Insiders: domain experts already performing the task",
          "Adjacent outsiders: professionals with related skillsets",
          "Distant outsiders: professionals from unrelated domains",
        ],
      },
      {
        type: "paragraph",
        text: "All were asked to perform two types of tasks:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Conceptualization (ideation, structuring content)",
          "Execution (developing full, polished outputs)",
        ],
      },
      { type: "paragraph", text: "The findings were striking." },
      { type: "paragraph", text: "GenAI as an Equalizer (Conceptual Tasks)" },
      {
        type: "list",
        items: [
          "Non-experts were able to match expert performance",
          "Output quality improved significantly across all groups",
          "Even lower performers caught up with top performers",
        ],
      },
      { type: "paragraph", text: "GenAI as a Limiter (Execution Tasks)" },
      {
        type: "list",
        items: [
          "Only adjacent professionals (e.g. marketing specialists) matched experts",
          "Distant professionals (e.g. technologists) failed to close the gap",
        ],
      },
      {
        type: "paragraph",
        text: "This phenomenon is what the authors define as the “GenAI Wall.”",
      },
      { type: "heading", text: "Understanding the GenAI Wall" },
      {
        type: "paragraph",
        text: "The GenAI Wall represents the limit of AI's ability to compensate for lack of domain expertise.",
      },
      { type: "paragraph", text: "It emerges due to two key factors." },
      { type: "paragraph", text: "1. Knowledge Distance" },
      {
        type: "paragraph",
        text: "The greater the gap between a person's existing skills and the target task, the harder it becomes to leverage AI effectively.",
      },
      {
        type: "list",
        items: [
          "Close domains: AI bridges the gap",
          "Distant domains: AI struggles to compensate",
        ],
      },
      { type: "paragraph", text: "2. Task Nature" },
      { type: "paragraph", text: "Not all work is created equal:" },
      {
        type: "list",
        items: [
          "Conceptualization: abstract, pattern-based, AI excels",
          "Execution: contextual, judgment-driven, AI struggles",
        ],
      },
      {
        type: "paragraph",
        text: "As the study highlights, execution is not merely an extension of ideation — it is an act of embodiment, requiring tacit knowledge, contextual awareness, and decision-making finesse.",
      },
      { type: "heading", text: "A New Lens: Vertical vs Horizontal Impact" },
      {
        type: "paragraph",
        text: "Most discussions around AI focus on vertical impact — how AI affects performance within a role (e.g. helping junior employees catch up).",
      },
      {
        type: "paragraph",
        text: "This research introduces a more disruptive dimension: horizontal impact. Can AI enable people to perform jobs outside their domain?",
      },
      { type: "paragraph", text: "The answer is: partially." },
      {
        type: "list",
        items: [
          "AI can enable adjacent role mobility",
          "But it cannot fully enable cross-domain transformation",
        ],
      },
      {
        type: "paragraph",
        text: "This distinction is critical for organizations redesigning their workforce strategies.",
      },
      {
        type: "heading",
        text: "Implications for Banking, Fintech, and Digital Payments",
      },
      {
        type: "paragraph",
        text: "For industries like banking and payments — where domain knowledge is deeply embedded — this insight has profound implications.",
      },
      { type: "paragraph", text: "1. Rise of Cross-Functional Capability" },
      {
        type: "paragraph",
        text: "GenAI will enable professionals to operate across adjacent domains:",
      },
      {
        type: "list",
        items: [
          "Payments to digital assets",
          "Product to AI-led design",
          "Operations to automation strategy",
        ],
      },
      {
        type: "paragraph",
        text: "However, core domains like risk, compliance, and settlement logic will remain expertise-driven.",
      },
      { type: "paragraph", text: "2. Redefining Expertise" },
      {
        type: "paragraph",
        text: "The value of expertise is shifting from procedural knowledge (how to do tasks) to:",
      },
      {
        type: "list",
        items: [
          "Foundational understanding (why things work)",
          "Contextual judgment (what to do in ambiguity)",
          "AI orchestration (how to guide machines effectively)",
        ],
      },
      { type: "paragraph", text: "3. The Future Operating Model" },
      { type: "paragraph", text: "Organizations will likely evolve toward:" },
      {
        type: "list",
        items: [
          "AI-assisted execution layers",
          "Fluid, task-based teams",
          "Reduced dependency on rigid job roles",
        ],
      },
      {
        type: "paragraph",
        text: "Yet, they will still rely on domain anchors — individuals who deeply understand systems, regulations, and business logic.",
      },
      { type: "heading", text: "Strategic Takeaway" },
      {
        type: "paragraph",
        text: "The most important takeaway from the GenAI Wall Effect is this:",
      },
      {
        type: "quote",
        text: "GenAI democratizes ideation — but execution remains the domain of understanding.",
      },
      { type: "paragraph", text: "For leaders, this means:" },
      {
        type: "list",
        items: [
          "Investing in AI adoption alone is not enough",
          "Organizations must also invest in building foundational expertise",
          "Workforce transformation must balance breadth (AI-enabled) and depth (domain-driven)",
        ],
      },
      { type: "heading", text: "Looking Ahead" },
      {
        type: "paragraph",
        text: "GenAI will undoubtedly reshape how work is done. It will lower entry barriers, accelerate productivity, and unlock new forms of collaboration.",
      },
      {
        type: "paragraph",
        text: "But it will not flatten expertise entirely.",
      },
      { type: "paragraph", text: "Instead, it will redefine it." },
      {
        type: "paragraph",
        text: "In the emerging AI-driven enterprise, the winners will not be those who rely solely on AI — but those who understand where AI works, where it fails, and how to operate at that boundary.",
      },
      {
        type: "paragraph",
        text: "That boundary has a name now. The GenAI Wall.",
      },
      {
        type: "callout",
        title: "Reference",
        text: "Harvard Business School working paper, “The GenAI Wall Effect: Examining the Limits to Horizontal Expertise Transfer Between Occupational Insiders and Outsiders.”",
      },
    ],
  },
  {
    slug: "stablecoins-are-rewriting-the-rules-of-payments",
    title:
      "Stablecoins Are Rewriting the Rules of Payments — And Markets Already Know It",
    category: "Stablecoins",
    topic: "Cross-Border",
    type: "Analysis",
    excerpt:
      "The debate is over. Stablecoins are no longer a fringe experiment in crypto — and it is not just technologists or regulators saying so. Financial markets have already priced it in.",
    outline: [
      "A $300 billion signal the industry can't ignore",
      "The real disruption: not retail, but cross-border",
      "A new competitive reality for banks and payment firms",
      "The strategic divide: who wins vs who loses",
      "Regulation is the real catalyst",
    ],
    author: "Sanjay Bhoite",
    authorRole: "Chief Executive Officer & Chief Product Strategist",
    publishedAt: "2026-03-30",
    status: "published",
    relatedService: {
      label: "Digital Money & CBDCs",
      href: "/advisory#digital-money-cbdcs",
    },
    coverTone: "green",
    body: [
      { type: "paragraph", text: "The debate is over." },
      {
        type: "paragraph",
        text: "Stablecoins are no longer a fringe experiment in crypto — they are rapidly emerging as core infrastructure for global payments.",
      },
      {
        type: "paragraph",
        text: "What's most interesting? It's not just technologists or regulators saying this. Financial markets have already priced it in.",
      },
      {
        type: "heading",
        text: "A $300 Billion Signal the Industry Can't Ignore",
      },
      {
        type: "paragraph",
        text: "A recent IMF working paper reveals something profound:",
      },
      {
        type: "list",
        items: [
          "Stablecoin-friendly regulation triggered a ~18% decline in payment companies' valuation",
          "Equivalent to ~$300 billion wiped out from incumbents",
        ],
      },
      {
        type: "paragraph",
        text: "This is not volatility. This is a structural repricing of the future of payments.",
      },
      { type: "paragraph", text: "Markets are effectively saying:" },
      {
        type: "quote",
        text: "Stablecoins will fundamentally reshape how money moves.",
      },
      {
        type: "heading",
        text: "The Real Disruption: Not Retail — But Cross-Border",
      },
      {
        type: "paragraph",
        text: "Let's be clear. Stablecoins are not just competing with cards or wallets. They are attacking the most inefficient layer of finance: cross-border payments.",
      },
      { type: "paragraph", text: "Why?" },
      {
        type: "list",
        items: [
          "Traditional rails: slow (T+1 to T+3), expensive (multiple intermediaries)",
          "Stablecoins: instant settlement, near-zero cost, 24/7 programmable liquidity",
        ],
      },
      {
        type: "paragraph",
        text: "This is why research consistently shows maximum disruption in cross-border players. And frankly — it makes sense.",
      },
      { type: "quote", text: "When friction disappears, margins collapse." },
      {
        type: "heading",
        text: "A New Competitive Reality for Banks & Payment Firms",
      },
      { type: "paragraph", text: "Stablecoins introduce a new model." },
      { type: "paragraph", text: "Open, Borderless Infrastructure" },
      {
        type: "list",
        items: [
          "No correspondent banking chains",
          "No proprietary network dependency",
          "Global access from day one",
        ],
      },
      { type: "paragraph", text: "Programmable Money" },
      {
        type: "list",
        items: [
          "Smart contracts enable automation",
          "Real-time settlement plus embedded logic",
        ],
      },
      { type: "paragraph", text: "Lower Cost of Movement" },
      {
        type: "list",
        items: [
          "Settlement at pennies (or less)",
          "Eliminates reconciliation layers",
        ],
      },
      {
        type: "paragraph",
        text: "As the IMF notes, stablecoins can increase competition and reduce rents in payments.",
      },
      { type: "heading", text: "The Strategic Divide: Who Wins vs Who Loses" },
      { type: "paragraph", text: "Markets are already differentiating." },
      { type: "paragraph", text: "Most Exposed" },
      {
        type: "list",
        items: [
          "Cross-border payment providers",
          "FX-heavy intermediaries",
          "Legacy correspondent banking models",
        ],
      },
      { type: "paragraph", text: "More Resilient" },
      {
        type: "list",
        items: [
          "Network-driven players (strong ecosystems)",
          "Firms with deep merchant/customer lock-in",
        ],
      },
      { type: "paragraph", text: "Future Winners" },
      {
        type: "list",
        items: [
          "Players already integrating crypto/stablecoins",
          "Hybrid infrastructure providers (fiat plus digital rails)",
        ],
      },
      { type: "paragraph", text: "The message is clear:" },
      {
        type: "quote",
        text: "This is not about disruption vs survival. It's about adaptation vs irrelevance.",
      },
      { type: "heading", text: "Regulation Is the Real Catalyst" },
      {
        type: "paragraph",
        text: "The turning point isn't technology — it's regulation.",
      },
      { type: "paragraph", text: "Stablecoins are scaling because:" },
      {
        type: "list",
        items: [
          "Legal clarity is emerging globally",
          "Reserve backing builds trust",
          "Institutional participation is increasing",
        ],
      },
      {
        type: "paragraph",
        text: "As seen globally, regulation is becoming the unlock for enterprise-grade adoption.",
      },
      { type: "heading", text: "Bigger Than Payments: A Monetary Shift" },
      {
        type: "paragraph",
        text: "This goes beyond payments. Stablecoins are evolving into:",
      },
      {
        type: "list",
        items: [
          "Digital cash layers for the internet",
          "A new distribution channel for currencies (especially USD)",
          "A bridge between traditional finance and blockchain ecosystems",
        ],
      },
      {
        type: "paragraph",
        text: "Some estimates suggest trillions in transaction volumes annually.",
      },
      { type: "heading", text: "But Not Without Risks" },
      { type: "paragraph", text: "Of course, challenges remain:" },
      {
        type: "list",
        items: [
          "Financial stability concerns",
          "Potential bank deposit disintermediation",
          "Regulatory fragmentation across jurisdictions",
        ],
      },
      {
        type: "paragraph",
        text: "Global regulators — from IMF to ECB — are actively assessing these risks. But importantly: markets believe the benefits will outweigh the risks.",
      },
      { type: "heading", text: "What This Means for the Future of Payments" },
      { type: "paragraph", text: "We are entering a multi-rail world:" },
      {
        type: "list",
        items: [
          "Traditional rails (RTGS, cards, ACH)",
          "CBDCs (public digital money)",
          "Stablecoins (private programmable money)",
        ],
      },
      {
        type: "paragraph",
        text: "The winners will be those who can orchestrate across all three.",
      },
      { type: "heading", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Stablecoins are not just another payment innovation. They represent:",
      },
      {
        type: "quote",
        text: "A shift from institution-led payments to protocol-led value transfer.",
      },
      {
        type: "paragraph",
        text: "And for the first time, markets, regulators, and institutions are aligning around this reality.",
      },
      {
        type: "paragraph",
        text: "Key takeaway: stablecoins are not competing with payments — they are redefining the infrastructure of money itself.",
      },
      {
        type: "callout",
        title: "Reference",
        text: "International Monetary Fund (2026), Stablecoins and the Future of Payments: Evidence from Financial Markets, WP/26/52.",
      },
    ],
  },
  {
    slug: "the-economics-of-money-from-paper-currency-to-programmable-value",
    title: "The Economics of Money: From Paper Currency to Programmable Value",
    category: "CBDCs & Digital Money",
    topic: "Digital Money",
    type: "Analysis",
    excerpt:
      "In the coming decade, money is set to undergo its most profound transformation since the invention of paper currency — from a physical object to programmable economic infrastructure.",
    outline: [
      "What is money, really?",
      "Why payments infrastructure shapes the economy",
      "The shift from monetary policy to monetary engineering",
      "The question of dollar dominance",
      "Winners, losers, and the new monetary order",
    ],
    author: "Sanjay Bhoite",
    authorRole: "Chief Executive Officer & Chief Product Strategist",
    publishedAt: "2026-01-04",
    status: "published",
    relatedService: {
      label: "Digital Money & CBDCs",
      href: "/advisory#digital-money-cbdcs",
    },
    coverTone: "sky",
    body: [
      {
        type: "paragraph",
        text: "For centuries, money has been seen as a simple instrument — notes in a wallet, balances in a bank account, digits on a mobile screen. But beneath this everyday familiarity lies one of the most powerful economic systems ever created. In the coming decade, money is set to undergo its most profound transformation since the invention of paper currency.",
      },
      {
        type: "paragraph",
        text: "We are moving from money as a physical object to money as programmable economic infrastructure.",
      },
      { type: "heading", text: "What Is Money, Really?" },
      {
        type: "paragraph",
        text: "In economic theory, money performs three fundamental functions: it acts as a medium of exchange, a unit of account, and a store of value. Traditionally, this role has been fulfilled by physical cash and bank deposits. Today, however, these forms are merely interfaces. The true engine of money is digital, invisible, and deeply embedded in payment rails, clearing systems, liquidity platforms, and monetary policy frameworks.",
      },
      {
        type: "paragraph",
        text: "Contrary to popular belief, most money is not printed by central banks. It is created when commercial banks issue loans, expanding their balance sheets and injecting new deposits into the economy. This credit-based creation accounts for nearly 90 per cent of money in circulation.",
      },
      {
        type: "heading",
        text: "Why Payments Infrastructure Shapes the Economy",
      },
      {
        type: "paragraph",
        text: "Economic growth depends not only on how much money exists, but on how quickly it moves — a concept known as the velocity of money. When money circulates rapidly, trade accelerates, businesses grow faster, and capital becomes more productive.",
      },
      {
        type: "paragraph",
        text: "This is why real-time payment systems such as UPI in India or RTP networks globally are not merely technology upgrades. They are macro-economic enablers. They compress settlement cycles from days to seconds, freeing liquidity trapped in the system and lowering the cost of capital for the entire economy.",
      },
      {
        type: "heading",
        text: "The Shift from Monetary Policy to Monetary Engineering",
      },
      {
        type: "paragraph",
        text: "For decades, central banks influenced economies using blunt tools: interest rates, reserve requirements, and liquidity injections. These instruments affected behaviour indirectly.",
      },
      { type: "paragraph", text: "That is now changing." },
      {
        type: "paragraph",
        text: "With the advent of Central Bank Digital Currencies (CBDCs) and tokenised deposits, money itself can carry rules. Future currencies may expire, restrict usage to specific sectors, enforce compliance in real time, or disburse welfare benefits with zero leakage.",
      },
      {
        type: "paragraph",
        text: "This is not science fiction. It is already being piloted across multiple jurisdictions.",
      },
      {
        type: "paragraph",
        text: "Money is no longer only a policy instrument — it is becoming a policy platform.",
      },
      { type: "heading", text: "The Question of Dollar Dominance" },
      {
        type: "paragraph",
        text: "The US dollar dominates global trade not because it is trusted, but because the global financial plumbing is wired around it. Trade invoicing, correspondent banking, clearing systems, and global collateral markets all reinforce dollar dependence.",
      },
      {
        type: "paragraph",
        text: "However, new multi-CBDC platforms and tokenised settlement networks threaten to bypass this infrastructure. If countries can settle trade directly in sovereign digital currencies, the world could move towards a multi-polar monetary order where liquidity, not geopolitics, determines dominance.",
      },
      { type: "heading", text: "The New Economics of Cross-Border Payments" },
      {
        type: "paragraph",
        text: "Today's cross-border transactions remain expensive, slow, and opaque. They rely on pre-funded Nostro accounts, multiple intermediaries, and manual reconciliation.",
      },
      {
        type: "paragraph",
        text: "Tokenised money changes this equation completely. Atomic settlement, on-chain foreign exchange, and smart compliance rules promise near-instant transfers at a fraction of today's cost. This shift alone could release billions of dollars currently trapped in idle capital.",
      },
      { type: "heading", text: "Winners, Losers, and the New Monetary Order" },
      {
        type: "paragraph",
        text: "As money becomes programmable, winners will be those who master liquidity orchestration, multi-rail interoperability, and digital trust architecture. Losers will be institutions anchored to legacy correspondent models and batch-based operations.",
      },
      {
        type: "paragraph",
        text: "In the future, banks will not compete primarily on interest rates. They will compete on how frictionless, intelligent, and context-aware their money becomes.",
      },
      { type: "heading", text: "The Road Ahead" },
      {
        type: "paragraph",
        text: "Money is being transformed from a passive medium into an active system — one that can embed policy, accelerate trade, and reshape economic behaviour.",
      },
      {
        type: "paragraph",
        text: "This is not merely a financial evolution. It is the redesign of how value flows through society.",
      },
      {
        type: "paragraph",
        text: "The economics of money is no longer about currency. It is about architecture.",
      },
    ],
  },
  {
    slug: "cbdcs-and-stablecoins-a-comparative-examination",
    title:
      "Central Bank Digital Currencies and Stablecoins: A Comparative Examination of Emerging Digital Money Models",
    category: "CBDCs & Digital Money",
    topic: "Digital Money",
    type: "Research",
    excerpt:
      "CBDCs represent public-sector innovation, stablecoins private-sector monetary engineering. Understanding their differences is essential for anyone balancing innovation, systemic safety and sovereignty.",
    outline: [
      "Defining central bank digital currencies",
      "Defining stablecoins",
      "Comparative analysis: CBDCs vs stablecoins",
      "Regulatory responses and policy implications",
      "Implications for the future of money",
    ],
    author: "Sanjay Bhoite",
    authorRole: "Chief Executive Officer & Chief Product Strategist",
    publishedAt: "2025-11-19",
    status: "published",
    relatedService: {
      label: "Digital Money & CBDCs",
      href: "/advisory#digital-money-cbdcs",
    },
    coverTone: "navy",
    body: [
      {
        type: "paragraph",
        text: "The rapid decline of physical cash, the rise of mobile-first financial ecosystems, and the acceleration of cryptocurrency markets have collectively created both an opportunity and an imperative for digital money innovation. While cryptocurrency experiments demonstrated programmability and decentralized value transfer, their volatility made them unsuitable for mainstream financial use.",
      },
      {
        type: "paragraph",
        text: "In this context, CBDCs and stablecoins emerged as two competing yet complementary responses to the demand for stable, digital-native forms of money. CBDCs represent public-sector innovation, while stablecoins illustrate private-sector monetary engineering. Understanding their differences is essential for regulators, financial institutions, and policymakers seeking to balance innovation, systemic safety, and sovereignty.",
      },
      { type: "heading", text: "1. Defining Central Bank Digital Currencies" },
      {
        type: "paragraph",
        text: "A Central Bank Digital Currency (CBDC) is a sovereign digital instrument issued and fully backed by a nation's central bank. It functions as a digital form of fiat currency, with the same legal tender status as physical cash.",
      },
      { type: "paragraph", text: "1.1 CBDC Characteristics" },
      {
        type: "paragraph",
        text: "CBDCs typically possess the following characteristics:",
      },
      {
        type: "list",
        items: [
          "Direct liability of the central bank, ensuring risk-free settlement.",
          "Digital form factor, accessible via mobile or hardware wallets.",
          "Potential for programmability through secure ledger technologies.",
          "Full convertibility with existing fiat systems.",
        ],
      },
      { type: "paragraph", text: "1.2 Global Progress" },
      {
        type: "paragraph",
        text: "According to the Atlantic Council CBDC Tracker, 137 countries are exploring CBDCs, with 72 in advanced development. Examples include:",
      },
      {
        type: "list",
        items: [
          "China's e-CNY, undergoing expansive pilot deployments and accounting for trillions in transaction volume.",
          "The Bahamas' Sand Dollar, the first fully launched national CBDC.",
          "Nigeria's eNaira and Jamaica's JAM-DEX, designed to strengthen domestic payment ecosystems.",
        ],
      },
      {
        type: "paragraph",
        text: "The European Central Bank is preparing pilot phases for the digital euro, while the U.S. remains in research mode, emphasizing Congressional approval for any rollout.",
      },
      { type: "heading", text: "2. Defining Stablecoins" },
      {
        type: "paragraph",
        text: "Stablecoins are privately issued digital tokens designed to maintain a stable value by pegging to a reference asset such as fiat currency, commodities, or algorithmic mechanisms.",
      },
      { type: "paragraph", text: "2.1 Types of Stablecoins" },
      {
        type: "paragraph",
        text: "Stablecoins fall into three major categories:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Fiat-collateralized (e.g. USDT, USDC), backed by cash and liquid assets.",
          "Crypto-collateralized (e.g. DAI), backed by digital assets with over-collateralization.",
          "Algorithmic (e.g. the failed TerraUSD), relying on supply–demand algorithms rather than hard collateral.",
        ],
      },
      { type: "paragraph", text: "2.2 Use Cases" },
      {
        type: "paragraph",
        text: "Stablecoins have become foundational to digital finance by enabling:",
      },
      {
        type: "list",
        items: [
          "Price-stable value storage in volatile crypto markets",
          "Instant, borderless transfers",
          "Participation in decentralized finance (DeFi)",
          "Digital commerce across blockchain ecosystems",
        ],
      },
      {
        type: "paragraph",
        text: "In markets experiencing inflation or capital restrictions, dollar-pegged stablecoins often serve as de-facto digital savings instruments.",
      },
      { type: "paragraph", text: "2.3 Risks and Failures" },
      {
        type: "paragraph",
        text: "Stablecoins rely heavily on the quality, transparency, and oversight of their issuers. Failures in reserve management or flawed algorithmic design can destabilize the peg. The collapse of TerraUSD in 2022, which erased approximately $60 billion in market value, remains a stark example of systemic risk within poorly governed stablecoin systems.",
      },
      {
        type: "heading",
        text: "3. Comparative Analysis: CBDCs vs. Stablecoins",
      },
      { type: "paragraph", text: "3.1 Issuer and Governance" },
      {
        type: "list",
        items: [
          "CBDCs: issued by central banks, governed by public institutions, and aligned with national monetary policy.",
          "Stablecoins: issued by private companies or decentralized protocols, governed by reserve policies or algorithmic rules.",
        ],
      },
      {
        type: "paragraph",
        text: "This difference fundamentally shapes their trust models: CBDCs inherit sovereign credibility; stablecoins depend on issuer reliability.",
      },
      { type: "paragraph", text: "3.2 Backing and Value Stability" },
      {
        type: "paragraph",
        text: "CBDCs carry sovereign backing, making their value identical to legal tender. Stablecoins rely on asset reserves (subject to auditing), collateral management, or algorithmic stability models. While major fiat-backed stablecoins maintain strong market acceptance, their stability is not absolute.",
      },
      { type: "paragraph", text: "3.3 Legal Status" },
      {
        type: "paragraph",
        text: "CBDCs are expected to qualify as legal tender, enforceable for all public and private transactions. Stablecoins are not legal tender; their acceptance is voluntary and depends on market confidence.",
      },
      { type: "paragraph", text: "3.4 Technological Design" },
      {
        type: "paragraph",
        text: "Both CBDCs and stablecoins can utilize blockchain or centralized ledger infrastructures. However:",
      },
      {
        type: "list",
        items: [
          "CBDCs emphasize compliance, accessibility, and controlled programmability.",
          "Stablecoins emphasize interoperability, decentralization (in some cases), and integration with crypto-native systems.",
        ],
      },
      { type: "paragraph", text: "3.5 Impact on Financial Systems" },
      {
        type: "paragraph",
        text: "CBDCs could transform national payments, enhance financial inclusion, and reduce reliance on private payment intermediaries. Conversely, stablecoins may increase global dollarization, facilitate capital mobility, and expand private digital payment ecosystems — but also pose regulatory and systemic risks if unregulated.",
      },
      {
        type: "heading",
        text: "4. Regulatory Responses and Policy Implications",
      },
      { type: "paragraph", text: "4.1 CBDC Policy Considerations" },
      {
        type: "paragraph",
        text: "Central banks face critical design decisions:",
      },
      {
        type: "list",
        items: [
          "Privacy vs. traceability",
          "Retail vs. wholesale CBDC models",
          "Interoperability with existing banking systems",
          "Impact on bank deposits and credit creation",
        ],
      },
      {
        type: "paragraph",
        text: "These considerations determine whether CBDCs complement or disrupt existing financial institutions.",
      },
      { type: "paragraph", text: "4.2 Stablecoin Regulation" },
      { type: "paragraph", text: "Stablecoin regulation is accelerating:" },
      {
        type: "list",
        items: [
          "The U.S. is considering requiring stablecoin issuers to operate as regulated financial institutions.",
          "The EU's MiCA framework mandates 100% liquid reserves and prohibits algorithmic stablecoins.",
          "Global institutions (IMF, BIS, IOSCO) warn that unchecked stablecoin adoption could erode monetary sovereignty and financial stability.",
        ],
      },
      {
        type: "paragraph",
        text: "Regulated stablecoins may become important settlement instruments, but unregulated versions are increasingly viewed as systemic risks.",
      },
      { type: "heading", text: "5. Implications for the Future of Money" },
      {
        type: "paragraph",
        text: "The coexistence of CBDCs and stablecoins may redefine global monetary infrastructure in several ways.",
      },
      { type: "paragraph", text: "5.1 Programmable Finance" },
      {
        type: "paragraph",
        text: "Smart contract–based programmability will enable automated compliance, embedded taxation, conditional transfers, and innovative settlement models.",
      },
      { type: "paragraph", text: "5.2 Cross-Border Transformation" },
      {
        type: "paragraph",
        text: "Both CBDCs and stablecoins have the potential to dramatically reduce cross-border remittance costs and settlement delays. CBDC–CBDC interoperability frameworks (such as mBridge) are emerging, while stablecoins already show strong cross-border traction.",
      },
      { type: "paragraph", text: "5.3 Monetary Sovereignty Concerns" },
      {
        type: "paragraph",
        text: "Widespread use of foreign stablecoins could weaken local currencies and shift control of money creation from governments to private entities. CBDCs are viewed as a strategic counterbalance.",
      },
      { type: "paragraph", text: "5.4 Financial Inclusion and Access" },
      {
        type: "paragraph",
        text: "CBDCs may provide safe digital money to unbanked populations, while stablecoins democratize access to dollar-based value in markets with economic instability.",
      },
      { type: "heading", text: "6. Conclusion" },
      {
        type: "paragraph",
        text: "CBDCs and stablecoins represent two divergent yet influential models of digital money. CBDCs aim to preserve trust in sovereign currency systems by offering a secure, modernized form of public money. Stablecoins, driven by private-sector innovation, provide global, fast, programmable value transfer but carry risks linked to governance and reserve management.",
      },
      {
        type: "paragraph",
        text: "As nations chart their paths toward digital monetary ecosystems, the interplay between these instruments will shape payment innovation, regulatory frameworks, and the balance of monetary power. Ultimately, the emergence of CBDCs and stablecoins signals not just a technological evolution, but a structural shift in how societies conceptualize and interact with money.",
      },
    ],
  },
  {
    slug: "glocal-payments-seamless-interoperability",
    title: "Glocal Payments: Seamless Interoperability for a Connected World",
    category: "Cross-Border",
    topic: "Cross-Border",
    type: "Analysis",
    excerpt:
      "Bridging global interoperability with local compliance and user needs — why the next frontier of financial connectivity is as much about governance and trust as it is about technology.",
    outline: [
      "The case for Glocal Payments",
      "Infrastructure and interoperability gaps",
      "The role of regulators",
      "Innovations driving changes",
      "Case studies of Glocal Payments in action",
    ],
    author: "Sanjay Bhoite",
    authorRole: "Chief Executive Officer & Chief Product Strategist",
    publishedAt: "2025-09-05",
    status: "published",
    relatedService: {
      label: "Cross-Border Payments",
      href: "/advisory#cross-border-payments",
    },
    coverTone: "sky",
    body: [
      {
        type: "paragraph",
        text: "In today's hyper-connected economy, the ability to move money seamlessly across borders is no longer a luxury — it's an expectation. From migrant workers sending remittances to families, to small businesses expanding into new markets, to global enterprises managing multi-currency operations, cross-border payments are at the heart of the digital economy.",
      },
      {
        type: "paragraph",
        text: "Yet despite advances in domestic real-time payment (RTP) systems such as UPI in India, PIX in Brazil, and PayNow in Singapore, the global payments landscape remains fragmented. Different regulatory regimes, settlement infrastructures, and compliance standards often slow down the movement of funds, increase costs, and leave gaps in user experience.",
      },
      {
        type: "paragraph",
        text: "This is where the concept of “Glocal Payments” comes in — bridging global interoperability with local compliance and user needs.",
      },
      { type: "heading", text: "1. The Case for Glocal Payments" },
      { type: "paragraph", text: "1.1 Market Drivers" },
      {
        type: "list",
        items: [
          "Global Trade — international trade exceeded $32 trillion in 2023 (WTO), demanding efficient settlement mechanisms.",
          "E-Commerce Growth — cross-border e-commerce projected to hit $8.1 trillion by 2027 (eMarketer).",
          "Remittances — migrant workers sent $860 billion in remittances in 2023, with fees averaging 6% (World Bank).",
          "Financial Inclusion — over 1.4 billion adults remain unbanked, many relying on cash or informal systems (World Bank, 2021).",
          "Consumer Expectations — digital-native consumers demand payments as frictionless as messaging apps.",
        ],
      },
      { type: "paragraph", text: "1.2 Why “Glocal” Matters" },
      {
        type: "paragraph",
        text: "The term Glocal blends “Global” and “Local.” It emphasizes building payment ecosystems that are globally interoperable but locally compliant and inclusive.",
      },
      {
        type: "list",
        items: [
          "Global: enabling instant, secure, and cost-effective cross-border payments.",
          "Local: ensuring adherence to domestic regulations, data sovereignty, and consumer protection.",
        ],
      },
      {
        type: "paragraph",
        text: "In other words, a Glocal payment system ensures that money moves freely across borders but is governed responsibly within them.",
      },
      { type: "heading", text: "2. Infrastructure & Interoperability Gaps" },
      {
        type: "paragraph",
        text: "For Glocal Payments to scale, banks and payment providers must address some critical infrastructure challenges:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Messaging Standards — widespread adoption of ISO 20022 is still inconsistent across markets, leading to friction.",
          "Cross-Border Compliance — varying KYC/AML rules and data-sharing protocols often delay instant payments.",
          "Liquidity Management — without integrated liquidity optimization frameworks, costs for FX and settlement remain high.",
          "Bilateral Corridors — today's models (like UPI–PayNow) work but are limited. A hub-and-spoke model like BIS's Project Nexus is needed for true scale.",
          "Cybersecurity & Resilience — cross-border systems need stronger protections to withstand fraud, cyberattacks, and operational failures.",
        ],
      },
      { type: "heading", text: "3. The Role of Regulators" },
      {
        type: "paragraph",
        text: "Having worked closely with various regulators like central banks and clearing operators, I've seen how regulatory innovation can unlock scalable solutions. Future-ready frameworks must include:",
      },
      {
        type: "list",
        items: [
          "Regulatory Passporting — mutual recognition of licenses to ease cross-border operations.",
          "Shared Sandboxes — cross-border testing environments to accelerate innovation.",
          "Digital Identity Standards — enabling secure and portable KYC for seamless onboarding.",
          "Data-Sharing Protocols — clear guidelines for cross-border data flows while respecting sovereignty.",
          "CBDC Interoperability — Central Bank Digital Currencies could become the backbone of settlement if designed with interoperability in mind.",
        ],
      },
      { type: "heading", text: "4. Innovations Driving Changes" },
      {
        type: "paragraph",
        text: "The world is already seeing how domestic innovations and emerging technologies are shaping Glocal Payments:",
      },
      {
        type: "list",
        items: [
          "UPI — India's UPI has shown how open APIs and public infrastructure can drive mass adoption, inclusion, and innovation.",
          "Stablecoin Networks — cross-border stablecoin pilots (under regulatory oversight) are proving instant settlement models.",
          "Project Nexus — the BIS-led initiative to connect multiple real-time payment systems through a single global hub could be a game-changer.",
          "AI & Blockchain — smarter compliance, real-time fraud monitoring, and programmable settlement are becoming realities.",
        ],
      },
      { type: "heading", text: "5. Case Studies of Glocal Payments in Action" },
      {
        type: "paragraph",
        text: "UPI–Singapore PayNow Linkage (2023): direct person-to-person transfers between India and Singapore. Reduced cost and processing time from days to seconds.",
      },
      {
        type: "paragraph",
        text: "BIS Project mBridge: involves Hong Kong, Thailand, China, and UAE central banks. Demonstrates cross-border settlement using wholesale CBDCs.",
      },
      {
        type: "paragraph",
        text: "SWIFT gpi: adoption by 4000+ banks globally. Provides transparency, tracking, and faster settlement for international transfers.",
      },
      {
        type: "paragraph",
        text: "SEPA (Single Euro Payments Area): regional harmonization across 36 European countries. Demonstrates the benefits of standardized rules, messaging, and governance.",
      },
      { type: "heading", text: "6. The Road Ahead" },
      {
        type: "paragraph",
        text: "The journey toward seamless Glocal Payments is not just a technology challenge — it's about collaboration, governance, and trust.",
      },
      {
        type: "paragraph",
        text: "To build a future-ready ecosystem, we must:",
      },
      {
        type: "list",
        items: [
          "Invest in interoperable infrastructure.",
          "Align regulatory frameworks across borders.",
          "Leverage innovations like CBDCs, stablecoins, AI, and blockchain.",
          "Keep the focus on end-user experience — fast, cheap, and inclusive payments.",
        ],
      },
      { type: "heading", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Glocal Payments represent the next frontier of financial connectivity — where money moves as seamlessly as information across the internet. Achieving this vision requires partnership between banks, fintechs, regulators, and technology providers.",
      },
      {
        type: "paragraph",
        text: "As we step into this future, the opportunity is clear: a borderless yet compliant payment ecosystem that empowers individuals, businesses, and economies alike.",
      },
      {
        type: "quote",
        text: "Payments are no longer just about transactions — they are the infrastructure of a connected world. By aligning global interoperability with local compliance, the industry can unlock a truly seamless future.",
      },
    ],
  },
  {
    slug: "cash-2-0-the-next-generation-sovereign-currency",
    title: "Cash 2.0: The Next-Generation Sovereign Currency",
    category: "CBDCs & Digital Money",
    topic: "Digital Money",
    type: "Analysis",
    excerpt:
      "In a rapidly digitalizing world, physical cash is being reinvented — not replaced. Cash 2.0 blends the trust and sovereignty of central bank money with the innovation and convenience of digital finance.",
    outline: [
      "What — and who — defines Cash 2.0?",
      "What is Cash 2.0? (CBDC = “Cash 2.0”)",
      "Why does Cash 2.0 matter?",
      "Real-world examples of Cash 2.0 in action",
      "The balance: innovation vs. privacy",
    ],
    author: "Sanjay Bhoite",
    authorRole: "Chief Executive Officer & Chief Product Strategist",
    publishedAt: "2025-08-15",
    status: "published",
    relatedService: {
      label: "Digital Money & CBDCs",
      href: "/advisory#digital-money-cbdcs",
    },
    coverTone: "green",
    body: [
      {
        type: "paragraph",
        text: "In a rapidly digitalizing world, physical cash is being reinvented — not replaced. Cash 2.0, often synonymous with Central Bank Digital Currency (CBDC), is emerging as the modern evolution of cash — blending the trust and sovereignty of money issued by central banks with the innovation and convenience of digital finance.",
      },
      { type: "heading", text: "What — and Who — Defines Cash 2.0?" },
      {
        type: "paragraph",
        text: "Cash 2.0 is essentially a CBDC — a digital liability of the central bank, widely accessible to the public, and carrying the same legal tender status as physical banknotes and coins.",
      },
      {
        type: "paragraph",
        text: "Globally, momentum for CBDC development is strong. As of early 2024:",
      },
      {
        type: "list",
        items: [
          "134 countries accounting for 98% of global GDP are exploring or piloting digital currencies.",
          "The Federal Reserve defines CBDC as a form of “central bank money” but emphasizes it wouldn't replace physical currency — rather, complement it to improve safety and access.",
        ],
      },
      { type: "heading", text: "What is Cash 2.0? (CBDC = “Cash 2.0”)" },
      {
        type: "list",
        ordered: true,
        items: [
          "Central bank liability in digital form. A CBDC is the digital equivalent of fiat money — issued and backed by the central bank as a new form of legal tender.",
          "Legal tender and universal access. CBDCs receive legal tender status like physical cash, ensuring universal acceptance.",
          "Offline payments enable resilience. Key CBDC designs emphasize offline capabilities — enabling peer-to-peer transactions without internet, making it function like cash even in network outages.",
          "Programmability and smart features. CBDCs can be programmable — embedded with conditions (e.g. usage limits, time-sensitive validity, fields of use). This supports automated subsidies, smart disbursements, and novel business logic.",
          "Financial inclusion and lower cost. CBDCs aim to replicate cash's inclusivity (no bank account, low barriers) while reducing fees and improving access through diverse devices and infrastructure.",
          "Real-time settlement and interoperability. A well-designed CBDC can settle instantly, reduce intermediaries, and support cross-platform and even cross-border interoperability.",
        ],
      },
      { type: "heading", text: "Why Does Cash 2.0 Matter?" },
      { type: "paragraph", text: "1. Cash-like Safety & Convenience" },
      {
        type: "paragraph",
        text: "CBDCs aim to replicate the privacy and reliability of cash while enabling peer-to-peer digital transactions that settle instantly, without intermediaries.",
      },
      { type: "paragraph", text: "2. Financial Inclusion & Accessibility" },
      {
        type: "paragraph",
        text: "CBDCs can widen access to formal financial systems, even for users without bank accounts or strong identification — supporting low-fee, low-friction financial entry points.",
      },
      { type: "paragraph", text: "3. Programmability & Practicality" },
      {
        type: "paragraph",
        text: "Newer designs — like India's digital rupee — include features for offline payments, usage limits, expiry dates, and regional restrictions — making Cash 2.0 not just digital money, but programmable digital value.",
      },
      { type: "paragraph", text: "4. Preserving Sovereignty & Resilience" },
      {
        type: "paragraph",
        text: "As cash usage wanes worldwide, CBDCs allow central banks to maintain monetary sovereignty in the digital era. They offer a publicly backed means of value transfer, contrasting with private intermediaries or global stablecoins.",
      },
      { type: "heading", text: "Real-World Examples of Cash 2.0 in Action" },
      {
        type: "list",
        items: [
          "India — the digital rupee (e₹) supports offline transactions and programmable payments, even on feature phones.",
          "Japan — having already hit a 42.8% cashless payment rate in 2024, the Bank of Japan is piloting a digital yen to modernize infrastructure and enhance inclusivity.",
          "United Kingdom — the Bank of England's digital pound (“Britcoin”) is envisioned as a digital banknote backed by the state, to sit alongside — not replace — cash.",
          "Bahamas — Sand Dollar for island-wide access. Total in circulation volume stood at $1.9 million.",
        ],
      },
      { type: "heading", text: "The Balance: Innovation vs. Privacy" },
      {
        type: "paragraph",
        text: "CBDCs must navigate a delicate equilibrium between beneficial innovation and civil liberties. While they can enhance monitoring and efficiency, concerns about privacy and data misuse remain potent.",
      },
      {
        type: "heading",
        text: "Conclusion: Cash 2.0 is the Future of Trust in Money",
      },
      {
        type: "paragraph",
        text: "Cash 2.0 isn't designed to eliminate physical money — but to digitally extend its strengths: legal validity, reliability, inclusivity — while adding layers of programmability, resilience, and economic sovereignty. In doing so, it's helping central banks guide the evolution of monetary systems in an increasingly interconnected, digital world.",
      },
    ],
  },
  {
    slug: "p27-nordic-payment-multi-country-multi-currency",
    title:
      "P27 Nordic Payment: The World's First Multi-Country, Multi-Currency Real-Time Payment Infrastructure",
    category: "Enterprise Payments",
    topic: "Financial Market Infrastructure",
    type: "Field Note",
    excerpt:
      "An ambitious Pan-Nordic initiative to build the world's first real-time cross-border payment system in multiple currencies — one clearing platform in place of nine.",
    outline: [
      "What P27 set out to build",
      "The initiative's key aims",
      "Why a fragmented Nordic infrastructure was costly",
      "Frictionless trade across the region",
      "Timeline and governance",
    ],
    author: "Sanjay Bhoite",
    authorRole: "Chief Executive Officer & Chief Product Strategist",
    publishedAt: "2020-10-18",
    status: "published",
    relatedService: {
      label: "Payment Systems & FMI",
      href: "/advisory#payment-systems-fmi",
    },
    coverTone: "gold",
    body: [
      {
        type: "paragraph",
        text: "P27 is an ambitious Pan Nordic initiative for building the world's first real-time cross-border payment system in multiple currencies. It will support the clearing of domestic and cross-border payments in the Nordic currencies and the Euro.",
      },
      {
        type: "paragraph",
        text: "P27 is a joint initiative by Danske Bank, Handelsbanken, Nordea, OP Financial Group, SEB, and Swedbank.",
      },
      {
        type: "paragraph",
        text: "The P27 name derives from its aim to improve payments for the Nordics' 27 million inhabitants.",
      },
      { type: "paragraph", text: "The P27 initiative key aims are:" },
      {
        type: "list",
        ordered: true,
        items: [
          "Create one common state of the art payment platform for the Nordic countries.",
          "Move from nine different clearing solutions to one clearing platform.",
          "Harmonized payment services across the Nordic region.",
          "Enable instant payments, both domestic and cross-border, within the Nordic region.",
          "Reach new scale and efficiency with an updated platform.",
        ],
      },
      {
        type: "paragraph",
        text: "P27 will enable real-time, batch, domestic, and cross-border payments to be carried out quickly and at low cost on a secure and versatile platform. The platform will initially allow payments to flow instantly between people and businesses within Denmark, Finland, and Sweden. Then it will be extended to allow for payments across the rest of the Nordic.",
      },
      {
        type: "paragraph",
        text: "Currently, Nordic has fragmented clearing and settlement infrastructure across Nordic countries; this requires banks operating in the region to maintain separate infrastructure and adhering to separate rule books in each country where they operate, which is obviously costly. Adopting P27 centralized infrastructure in the region will help banks simplify their technology stack and associated overheads.",
      },
      {
        type: "paragraph",
        text: "Frictionless trade is vital for Nordic societies, and both businesses and consumers are interested in increased trade. P27 aims to reduce these barriers to trade by making cross-border payments easier and cheaper for businesses and consumers alike.",
      },
      {
        type: "paragraph",
        text: "The P27 initiative started in 2017 as a joint Nordic bank project. In May 2019, an interim company was established. In June 2019, an agreement was signed with Mastercard to operate the payments platform. The plan is to go live with the first transactions in 2021, subject to obtaining the necessary clearing license and merger filing approvals.",
      },
      {
        type: "paragraph",
        text: "An open-access, common infrastructure will deliver a state-of-the-art payment experience to customers across the Nordics and provide the foundation for future developments.",
      },
    ],
  },
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
    relatedService: {
      label: "Digital Money & CBDCs",
      href: "/advisory#digital-money-cbdcs",
    },
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
    relatedService: {
      label: "AI for Financial Services",
      href: "/advisory#ai-for-financial-services",
    },
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
    relatedService: {
      label: "Payment Modernization",
      href: "/advisory#payment-modernization",
    },
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
    relatedService: {
      label: "Digital Money & CBDCs",
      href: "/advisory#digital-money-cbdcs",
    },
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
    relatedService: {
      label: "Cross-Border Payments",
      href: "/advisory#cross-border-payments",
    },
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
    relatedService: {
      label: "AI for Financial Services",
      href: "/advisory#ai-for-financial-services",
    },
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
    relatedService: {
      label: "Payment Systems & FMI",
      href: "/advisory#payment-systems-fmi",
    },
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
    relatedService: {
      label: "Digital Money & CBDCs",
      href: "/advisory#digital-money-cbdcs",
    },
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
