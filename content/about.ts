import { coreCapabilities } from "@/content/capabilities";

export const aboutPage = {
  eyebrow: "About OrbisMoneta",
  headline: "Engineering the Future of Finance",
  intro:
    "OrbisMoneta is a financial technology company helping banks, financial institutions, fintechs and market infrastructures modernize payments, digital assets and AI-powered financial services. We combine deep industry expertise, enterprise-grade engineering and innovative products to accelerate the transition toward the future of money.",
  /**
   * NOT RENDERED. The dark positioning band this fed came off /about at the
   * client's request — the wordmark, this tagline and this statement with it.
   * Kept because it is the company's own positioning line, written by them,
   * and it is the sort of copy a footer or an about-us card asks for next.
   */
  brandPanel: {
    name: "OrbisMoneta",
    positioning: "Financial Infrastructure • AI • Digital Money",
    statement:
      "Building secure, intelligent and interoperable financial platforms for the next generation of global finance.",
  },
  /**
   * NOT RENDERED either, and for the same reason: `CapabilityDeck` was the
   * right half of that band and went with it. The component is untouched in
   * components/, so this is a one-line re-mount wherever it belongs next.
   *
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
  ],
  /**
   * The vision, lifted out of `story`.
   *
   * It was the fourth of four equal blocks in a two-by-two grid — the same
   * type, the same weight and the same 15px body as "What We Do" beside it.
   * A vision statement that looks exactly like the paragraph next to it is not
   * a vision statement, it is a paragraph. It has its own section now.
   *
   * `accent` is the phrase painted in the brand gradient, and it has to appear
   * in `statement` verbatim — the renderer splits the sentence on it rather
   * than storing the line twice, so a reworded statement carries its own
   * highlight along with it.
   *
   * The wording is the client's, unchanged.
   */
  vision: {
    label: "Our vision",
    statement:
      "To become one of the world's most trusted financial infrastructure companies, powering the next generation of payments, digital assets and intelligent financial ecosystems.",
    accent: "most trusted financial infrastructure companies",
  },
  /**
   * AWAITING CLIENT COPY — deliberately null, not written.
   *
   * The client asked for the vision and the mission to be given a premium
   * treatment. The vision above is theirs, from the content document. There is
   * no mission statement anywhere in the material they supplied: every use of
   * the word in their documents is "mission-critical systems", which is a
   * different thing entirely.
   *
   * Writing one would mean inventing a statement of corporate purpose and
   * publishing it under their name, so this stays null and the section renders
   * the vision alone. Fill it in and the layout becomes a two-up on its own —
   * no other change needed:
   *
   *   mission: {
   *     label: "Our mission",
   *     statement: "…the client's words…",
   *     accent: "…a phrase inside that sentence…",
   *   },
   */
  mission: null as { label: string; statement: string; accent: string } | null,
  philosophy: {
    label: "Innovation philosophy",
    quote:
      "True innovation is not about adopting the latest technology — it is about solving tomorrow's financial challenges before they become today's business problems. Every product we build begins with understanding how financial markets are evolving, where institutions are heading, and what capabilities they will need to succeed in the future.",
  },
  /**
   * NOT RENDERED. Nothing mounts these figures now.
   *
   * `ExperienceSlider` — the rotating panel they were written for — was
   * unmounted when the capability deck took its place on /about, and the three
   * stat tiles that printed the first three slides under every leadership
   * profile came off at the client's request. Both consumers are gone; the
   * component and this copy are intact.
   *
   * Rotating slideshow — "Leadership & Payment Experience".
   */
  experience: {
    eyebrow: "Leadership & payment experience",
    slides: [
      {
        label: "Experience",
        value: "30+",
        unit: "Years",
        detail: "In payments and financial technology",
      },
      {
        label: "Delivered",
        value: "75+",
        unit: "Banks",
        detail: "Financial institutions and national payment organizations",
      },
      {
        label: "Expertise",
        value: "Multiple Payment Schemes",
        detail: "CBDC, RTGS, EFT, ACH, RTP, UPI, SWIFT, Payment Hub",
      },
      {
        label: "Leadership",
        value: "Global Payment Infrastructure",
        detail: "Mission-critical systems at enterprise scale",
      },
    ],
  },
  /**
   * Shown as tiles inside the experience panel. `icon` is presentation only —
   * it carries nothing the label does not already say.
   */
  credentials: [
    { value: "Global", label: "Countries Served", icon: "globe" },
    {
      value: "Payments · AI · Digital Assets",
      label: "Enterprise Platforms",
      icon: "layers",
    },
    {
      value: "Advisory + Products + Engineering",
      label: "Delivery Model",
      icon: "nodes",
    },
  ],
  /**
   * The ticker that closes /about.
   *
   * Six labels, the client's own and to the word — including "Cross-Border
   * Modernization" and "ISO 20022 Modernization", which are their phrasing
   * rather than the "Infrastructure" and "Transformation" the nine-card deck
   * used for the same two things.
   *
   * `lead` names the six. It is pinned to the left of the band rather than
   * scrolling with them — the eyebrow that used to say what this strip was
   * showing came off with the "Explore our services" link beside it, and six
   * unattributed phrases going past need something standing still that says
   * what they are.
   */
  /*
    The list moved to content/capabilities.ts when the Innovation Lab page
    started running the same strip. Referenced here rather than copied, so the
    two bars can never disagree about what the six capabilities are.
  */
  capabilities: coreCapabilities,
  /**
   * NOT RENDERED. The twelve areas of expertise this ticker used to run, and
   * the eyebrow over them. Replaced by the six above at the client's request.
   *
   * Kept because it is their own list, and a longer one — it is the natural
   * source for an expertise page or a services index, neither of which exists
   * yet.
   */
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
  /**
   * The two profiles the client has supplied, photographs and all. The
   * placeholder cards that stood beside them — "Additional Leadership Profile
   * / Profile coming soon", driven by `pendingProfiles` — came off with them:
   * a page that names two people and then draws two empty slots is a page
   * announcing what it has not got.
   *
   * `bio` is an array because these are several paragraphs each, and running
   * them together makes a wall. Prasanna's arrived as one block; the break
   * here is at his own sentence boundary, between the career and what he does
   * at OrbisMoneta, and no wording changed with it.
   *
   * `photo` carries its own dimensions because the card renders each portrait
   * at the shape it was taken at rather than cropping both into one frame —
   * see scripts/prepare-assets.mjs for why. Both are 639x720 as it stands,
   * since the client replaced Prasanna's landscape photograph with a
   * portrait-orientation one; the per-photo dimensions stay because that is a
   * fact about the current files, not a rule the layout depends on.
   *
   * Two corrections to the supplied copy, both plainly slips: "As OrbisMonata"
   * is set as "At OrbisMoneta", and his LinkedIn address arrived as
   * "inkedin.com/in/prasannalohar".
   */
  people: [
    {
      name: "Sanjay Bhoite",
      initials: "SB",
      role: "Chief Executive Officer & Chief Product Strategist",
      bio: [
        "Sanjay Bhoite is a financial infrastructure strategist and product innovation leader with nearly 30 years of global experience across payments and financial technology. He has worked with 75+ banks and financial institutions, as well as central banks and national payment and clearing organizations, across India, the UK, USA, the Middle East, and Africa.",
        "His expertise spans CBDC, RTGS, UPI, ACH/Nacha, NACH, US RTP, payment hubs, instant payments, cross-border payments, ISO 20022, liquidity management, digital currencies, and next-generation financial platforms. He has also driven global product strategy, market entry, and commercialization for payment solutions through his earlier venture, including the creation of an award-winning 0-to-1 NACH platform.",
        "At OrbisMoneta, Sanjay leads product strategy, innovation, technology, and market strategy, transforming emerging trends in digital money, tokenization, AI, and financial interoperability into enterprise products and platforms for the Future of Finance.",
      ],
      photo: { src: "/images/leadership/sanjay-bhoite-portrait.webp", width: 639, height: 720 },
      linkedin: "https://www.linkedin.com/in/sanjay-bhoite-5803761",
    },
    {
      name: "Prasanna Lohar",
      initials: "PL",
      role: "Chief Growth & Market Strategy Officer",
      bio: [
        "Prasanna Lohar is an award-winning CXO, banking and financial-services transformation leader with 25+ years of experience across banking, payments, microfinance, technology and fintech. His career spans DCB Bank, Union Bank of India, Worldline, Mastek, Samsung Research, EY and leading fintech organizations, with deep expertise across digital banking, core banking, payments, cards, lending, mobile banking, API banking, enterprise architecture and digital transformation. As former Chief Innovation Officer, Chief Digital Officer and Enterprise Architect at DCB Bank and Innovation & Transformation Advisor to Union Bank of India, he has led technology-driven innovation across the financial-services ecosystem.",
        "At OrbisMoneta, his work combines banking and financial-services expertise with AI, Blockchain, Web3, CBDC, tokenization, Open Banking and Digital Public Infrastructure, helping banks, fintechs and institutions build the next generation of financial ecosystem.",
      ],
      photo: { src: "/images/leadership/prasanna-lohar-portrait.webp", width: 639, height: 720 },
      linkedin: "https://www.linkedin.com/in/prasannalohar",
    },
  ],
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
        /*
          The only other slide. The two renders that used to sit here — a lit
          network core and a security shield — came off at the client's
          request; their files stay in public/images/partners-carousal/.

          1536x1024 against a 16/15 frame, so `object-cover` keeps the middle
          71% of the width. Centred, that holds the handshake and the three
          faces around it whole, and trims the outermost figure at each edge.
          It is a candid scene rather than a diagram, so a crop costs it
          nothing the way one would cost the ecosystem chart beside it.

          `ground` is the median colour of the plate's own border, sampled, so
          the frame does not flash a wrong tone while the image decodes.
        */
        src: "/images/partner-handshake.webp",
        label: "Partnership in practice",
        alt: "Five colleagues around a boardroom table, two of them shaking hands over printed charts and a laptop, a city skyline beyond the glass",
        fit: "object-cover object-center",
        ground: "bg-[#313131]",
      },
    ],
    /*
      A four-up proof strip — Integrated / Certified / Collaborative / Scalable
      — sat here under the copy. Removed at the client's request. The hero is
      now headline, standfirst, one button and the gallery; `PageHero` takes no
      `footer` on this page.
    */
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
  /*
    `body` on each tier is NOT RENDERED. The descriptions under the headings
    came off at the client's request — the cards now carry the render, the tier
    label, the name and the "Become a partner" link. Kept because the copy is
    the client's own and restoring it is one <p> in app/partners/page.tsx.
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
      tier: "Tier 03",
      title: "Strategic Alliances",
      body: "Payment networks, standards bodies, regulatory sandboxes and industry consortia we co-innovate with — helping shape the interoperability standards and policy frameworks that next-generation financial infrastructure will require.",
      image: "/images/stratagic-allaiance.png",
      icon: "bank",
      markInImage: false,
    },
  ],
  /**
   * PARKED — the Implementation Partners tier, taken off the page at the
   * client's request and kept whole.
   *
   * It sat between Technology Partners and Strategic Alliances. Restoring it
   * is this object moved back into `tiers` in that position; the artwork is
   * still at /images/implementation-partners.png and nothing else has to
   * change, because the page numbers the tiers from their position rather than
   * from the label stored here.
   *
   * That is also why the label below reads "Tier 02" and would be right again
   * the moment it goes back: the number on the card is derived, so the two can
   * never disagree.
   */
  parkedTier: {
    tier: "Tier 02",
    title: "Implementation Partners",
    body: "Systems integrators, boutique consultancies and specialist engineering firms accredited to deploy and extend OrbisMoneta platforms — extending our delivery capacity across geographies and verticals.",
    image: "/images/implementation-partners.png",
    icon: "globe",
    markInImage: true,
  },
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
  /* Not rendered. It set "ORBISMONETA" above the headline, which the header
     lockup and the breadcrumb already say — kept in case the masthead ever
     wants a label there that is not the brand name again. */
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
    /* `heading` and `headingAccent` are NOT RENDERED — the panel title above
       the five steps came off at the client's request. Kept because the steps
       themselves still read from this object. */
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
        body: "Engage with financial institutions, fintechs, partners and industry experts.",
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
    /* It heads the section now rather than a panel inside it, so it takes an
       accent phrase like every other section heading on the page. */
    headingAccent: "Co-innovation",
    body: "We believe the future of finance is built together. Our Innovation Lab collaborates with forward-thinking institutions, regulators, technology providers and academic partners to co-create what's next.",
    /**
     * NOT RENDERED. The strip of four that closed the co-innovation block came
     * off at the client's request. Kept because these are the design's own
     * categories and the section may want them back; re-mounting is one map()
     * in app/lab/page.tsx.
     *
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
   * Enterprise Impact — the client's own "Customer Value" section, lifted from
   * `source-assets/Solution-page-contents.html` to the character.
   *
   * It closes the Lab page because it is the answer to the question the three
   * sections above it raise: the Lab researches, prototypes and co-innovates,
   * and this is what an institution gets out of that. Six verbs, numbered, in
   * the client's order.
   */
  impact: {
    eyebrow: "Enterprise Impact",
    heading: "Technology That Creates Business Value",
    /** The painted phrase. */
    headingAccent: "Business Value",
    intro:
      "Engineered to solve latency, fragmentation, and regulatory friction across mission-critical financial systems.",
    /*
      Each card carries a plate on its front, behind the numeral and the name;
      the sentence is on the back and the card turns to show it. They are the
      client's own six, `enterprise-impact/impact-0N.webp`, built from
      source-assets by scripts/prepare-assets.mjs at 900px — twice the ~408px a
      card is ever painted at, which is what a 2x screen needs and no more.

      `alt` describes each plate rather than repeating the card, because the
      title and body beside it already say what the card is about. They are not
      decorative: a reader who cannot see them would otherwise get six cards
      that are visually distinct and textually identical in framing.
    */
    items: [
      {
        num: "01",
        title: "Modernize",
        body: "Modernize legacy payment and RTGS infrastructure with high-throughput, ISO 20022-native event-driven microservices.",
        icon: "refresh",
        image: "/images/enterprise-impact/impact-01.webp",
        alt: "A classical bank building wired into a lattice of data nodes and a cloud, lit blue and green",
      },
      {
        num: "02",
        title: "Connect",
        body: "Connect existing core banking and ledger systems to emerging digital-money networks and instant clearing switches.",
        icon: "nodes",
        image: "/images/enterprise-impact/impact-02.webp",
        alt: "Two people at a trading desk of monitors, a network map on the wall screen behind them",
      },
      {
        num: "03",
        title: "Integrate",
        body: "Simplify enterprise and partner integration across lending, core banking, credit, and digital channels.",
        icon: "layers",
        image: "/images/enterprise-impact/impact-03.webp",
        alt: "A team at a glass wall of system diagrams, one person tracing a connection between them",
      },
      {
        num: "04",
        title: "Innovate",
        body: "Develop and deploy new digital financial capabilities, including retail CBDC and programmable money workflows.",
        icon: "spark",
        image: "/images/enterprise-impact/impact-04.webp",
        alt: "A phone, a card terminal and a smartwatch ringed around a lit disc, all linked into one network",
      },
      {
        num: "05",
        title: "Scale",
        body: "Build scalable and modular technology platforms engineered for high throughput and sub-second deterministic finality.",
        icon: "bars",
        image: "/images/enterprise-impact/impact-05.webp",
        alt: "A tiered operations floor of workstations under a wall of dashboards",
      },
      {
        num: "06",
        title: "Evolve",
        body: "Prepare financial technology for emerging market needs, regulatory frameworks, and tokenized financial ecosystems.",
        icon: "rocket",
        image: "/images/enterprise-impact/impact-06.webp",
        alt: "Institutions, a globe and a city linked around a central bank on a lit platform",
      },
    ],
  },
  /**
   * The bar the page now closes on.
   *
   * The Lab had no call to action of its own — every other page ends on one,
   * and a reader who has just read six reasons to work with the Lab had
   * nowhere to go but the header. `closing` below is the wording that used to
   * fill this slot and was cut; this is deliberately plainer, and it points at
   * the contact page rather than an anchor that does not exist.
   */
  /**
   * The band the page closes on, and it is the client's own — the `final-cta`
   * block from `source-assets/Solution-page-contents.html`, to the character.
   *
   * It replaced a shorter bar that read "Connect with OrbisMoneta / Tell us
   * what you are building." That copy was ours; this is theirs, and it is the
   * same ask made at more length, so there was no reason to keep both.
   *
   * One action, not the design's two. The second was "Explore Platforms",
   * which on this page would send a reader who has reached the end of the Lab
   * sideways into the product pages rather than into a conversation.
   */
  connect: {
    eyebrow: "Start a Conversation",
    heading: "Let's Build the Future of Finance",
    subhead: "Partnering With Financial Institutions Through Change",
    body: "Whether modernizing an existing financial platform, integrating new ecosystems or developing a new digital financial capability, OrbisMoneta brings together strategy, domain expertise and technology execution.",
    cta: "Contact OrbisMoneta",
    href: "/contact",
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
