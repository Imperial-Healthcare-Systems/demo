/**
 * Information architecture.
 *
 * Four content decisions applied here, all requested in the client brief:
 *  0. Solutions leads, Advisory follows, then the rest in their existing order.
 *     Platforms is not a page of its own but a section of /solutions, so every
 *     platform link here is an anchor — clicking one jumps straight to that
 *     row rather than loading a second page. /platforms redirects to it.
 *  1. Advisory's heading, route (/advisory) and page title all agree with the
 *     client's own page title, "Strategic Advisory & Engineering Services".
 *     /services is a permanent redirect.
 *  2. A single Contact entry — the duplicate header "Contact" was removed and
 *     Careers moved under About ("Contact Us should be just one…", "Career page
 *     to be added on the About").
 *  3. One master list of names per section. Where a menu and a page disagreed,
 *     the page wins — those are the entries carrying descriptions and focus
 *     areas. The footer mirrors the same lists rather than keeping its own.
 */

import type { IconName } from "@/components/Icon";

export type MenuLink = {
  label: string;
  href: string;
  description?: string;
  /**
   * Icon tile shown beside the link in the mega-menu. Presentation only — it
   * carries no information the label does not, so it is `aria-hidden` in the
   * markup. Where a link points at something that already has an icon on its
   * own page, this repeats that icon rather than picking a new one.
   */
  icon?: IconName;
};

export type NavItem = {
  label: string;
  href: string;
  /** Rendered as a mega-menu panel when present. */
  panel?: {
    eyebrow: string;
    heading: string;
    blurb: string;
    columns: { title: string; links: MenuLink[] }[];
    feature?: {
      eyebrow: string;
      title: string;
      body: string;
      href: string;
      cta: string;
    };
  };
};

export const primaryNav: NavItem[] = [
  {
    label: "Solutions",
    href: "/solutions",
    panel: {
      eyebrow: "Solutions & Platforms",
      heading: "Infrastructure for every dimension of modern finance.",
      blurb:
        "Six solution areas, delivered on purpose-built enterprise platforms.",
      columns: [
        {
          title: "Solution areas",
          links: [
            {
              label: "Payments Infrastructure",
              href: "/solutions#payments-infrastructure",
              icon: "transfer",
              description: "Real-time, high-value, enterprise & cross-border",
            },
            {
              label: "Digital Currency & CBDC",
              href: "/solutions#digital-currency-cbdc",
              icon: "coin",
              description: "Issue, distribute, manage and operate",
            },
            {
              label: "Digital Assets & Tokenization",
              href: "/solutions#digital-assets-tokenization",
              icon: "layers",
              description: "Programmable, interoperable instruments",
            },
            {
              label: "Cross-Border & Interoperability",
              href: "/solutions#cross-border-interoperability",
              icon: "nodes",
              description: "Connected domestic & international rails",
            },
            {
              label: "AI & Financial Intelligence",
              href: "/solutions#ai-financial-intelligence",
              icon: "spark",
              description: "Operational intelligence & automation",
            },
            {
              label: "Risk, Regulatory & Compliance",
              href: "/solutions#risk-regulatory-compliance",
              icon: "shield",
              description: "Security, governance & institutional control",
            },
          ],
        },
        {
          // The client's own prototype puts Platforms beside Solutions in the
          // menu and on its own page; here it is a group inside Solutions and a
          // section of that one page, so each link scrolls to its row.
          title: "Platforms",
          links: [
            {
              label: "Platform ecosystem",
              href: "/solutions#platforms",
              icon: "chip",
              description: "All platforms in one view",
            },
            {
              label: "Interoperability Fabric™",
              href: "/solutions#interoperability-fabric",
              icon: "code",
              description: "One integration layer across rails",
            },
            {
              label: "Cross-Border Bridge™",
              href: "/solutions#cross-border-bridge",
              icon: "globe",
              description: "Settlement across digital money networks",
            },
          ],
        },
      ],
      feature: {
        eyebrow: "Platform ecosystem",
        title: "Enterprise platforms for the future of finance.",
        body: "Purpose-built infrastructure for institutions operating across traditional and digital financial ecosystems.",
        href: "/solutions#platforms",
        cta: "View platform ecosystem",
      },
    },
  },
  {
    label: "Advisory",
    href: "/advisory",
    panel: {
      eyebrow: "Strategic Advisory & Engineering Services",
      heading: "Advise. Architect. Build.",
      blurb:
        "Six service lines covering the modern financial infrastructure stack.",
      columns: [
        {
          title: "Payments",
          links: [
            {
              label: "Payment Modernization",
              href: "/advisory#payment-modernization",
              icon: "transfer",
              description: "Real-time, interoperable, cloud-ready",
            },
            {
              label: "Payment Systems & FMI",
              href: "/advisory#payment-systems-fmi",
              icon: "bank",
              description: "National systems & high-value infrastructure",
            },
            {
              label: "Cross-Border Payments",
              href: "/advisory#cross-border-payments",
              icon: "globe",
              description: "Interoperable corridors & settlement",
            },
          ],
        },
        {
          title: "Digital money & intelligence",
          links: [
            {
              label: "Digital Money & CBDCs",
              href: "/advisory#digital-money-cbdcs",
              icon: "coin",
              description: "Design, pilot and operate",
            },
            {
              label: "AI for Financial Services",
              href: "/advisory#ai-for-financial-services",
              icon: "spark",
              description: "Strategy, models & governance",
            },
            {
              label: "Cloud-Native Platform Engineering",
              href: "/advisory#cloud-native-platform-engineering",
              icon: "cloud",
              description: "API-first financial platforms",
            },
          ],
        },
      ],
      feature: {
        eyebrow: "Our approach",
        title: "One accountable team, boardroom to production.",
        body: "Advise, architect and build — no handoff gaps between strategy and delivery.",
        href: "/advisory#approach",
        cta: "See how we work",
      },
    },
  },
  {
    label: "Products",
    href: "/products/digital-currency-hub",
    panel: {
      eyebrow: "Products & Platforms",
      heading: "Software we build, own and operate.",
      blurb:
        "Proprietary platforms for institutions entering the digital money era.",
      columns: [
        {
          title: "Platforms",
          links: [
            {
              label: "Digital Currency Hub™",
              href: "/products/digital-currency-hub",
              icon: "coin",
              description: "Retail CBDC platform for commercial banks",
            },
          ],
        },
        {
          title: "Platform capabilities",
          links: [
            { label: "Retail CBDC Banking", href: "/products/digital-currency-hub#capabilities", icon: "bank" },
            { label: "Customer & Merchant Wallets", href: "/products/digital-currency-hub#capabilities", icon: "store" },
            { label: "Government Payment Programs", href: "/products/digital-currency-hub#capabilities", icon: "building" },
            { label: "API-Driven Integration", href: "/products/digital-currency-hub#capabilities", icon: "code" },
          ],
        },
      ],
      feature: {
        eyebrow: "Deployment",
        title: "Licensed or hosted — your call.",
        body: "Run the Hub inside your own estate, or let us operate it as a managed cloud platform.",
        href: "/products/digital-currency-hub#deployment",
        cta: "Compare deployment models",
      },
    },
  },
  { label: "Industries", href: "/industries" },
  { label: "Lab", href: "/lab" },
  { label: "Partners", href: "/partners" },
  { label: "Insights", href: "/insights" },
  {
    label: "About",
    href: "/about",
    panel: {
      eyebrow: "About OrbisMoneta",
      heading: "Where product engineering meets financial expertise.",
      blurb:
        "A financial technology company built to close the gap between the ambition to modernize and the capability to execute.",
      columns: [
        {
          title: "Company",
          links: [
            { label: "About OrbisMoneta", href: "/about", icon: "building", description: "Story, vision and philosophy" },
            { label: "Leadership Team", href: "/about/leadership", icon: "user", description: "The people building OrbisMoneta" },
            { label: "Careers", href: "/about/careers", icon: "target", description: "Join the team" },
          ],
        },
        {
          title: "Proof",
          links: [
            { label: "Areas of Expertise", href: "/about#expertise", icon: "layers" },
            { label: "Ecosystem & Partners", href: "/partners", icon: "nodes" },
            { label: "Insights", href: "/insights", icon: "document" },
          ],
        },
      ],
    },
  },
];

/**
 * Footer columns, in the order the header reads left to right: Solutions,
 * Advisory, Platforms & Products, then the remaining sections, then the company
 * itself. Someone who has learned the nav finds the same shape down here.
 *
 * Three faults this fixes:
 *  · Lab had no footer link at all. It is a top-level nav item with a real
 *    page and there was no route to it from the footer.
 *  · Every column offered deep links but no way to reach the page they belong
 *    to — you could open a single service line but not the Advisory page.
 *    Each section now leads with its own overview link.
 *  · "Company" had become a bin: Industries, Partners and Insights are site
 *    sections, not company pages, and listing them under that heading is what
 *    made the footer look unordered. They have their own column now, which is
 *    why this is five columns rather than four.
 */
export const footerNav = [
  {
    title: "Solutions",
    links: [
      { label: "All solutions", href: "/solutions" },
      { label: "Payments Infrastructure", href: "/solutions#payments-infrastructure" },
      { label: "Digital Currency & CBDC", href: "/solutions#digital-currency-cbdc" },
      { label: "Digital Assets & Tokenization", href: "/solutions#digital-assets-tokenization" },
      { label: "Cross-Border & Interoperability", href: "/solutions#cross-border-interoperability" },
      { label: "AI & Financial Intelligence", href: "/solutions#ai-financial-intelligence" },
      { label: "Risk, Regulatory & Compliance", href: "/solutions#risk-regulatory-compliance" },
    ],
  },
  {
    title: "Advisory",
    links: [
      { label: "All services", href: "/advisory" },
      { label: "Payment Modernization", href: "/advisory#payment-modernization" },
      { label: "Payment Systems & FMI", href: "/advisory#payment-systems-fmi" },
      { label: "Cross-Border Payments", href: "/advisory#cross-border-payments" },
      { label: "Digital Money & CBDCs", href: "/advisory#digital-money-cbdcs" },
      { label: "AI for Financial Services", href: "/advisory#ai-for-financial-services" },
      {
        label: "Cloud-Native Platform Engineering",
        href: "/advisory#cloud-native-platform-engineering",
      },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "Platform ecosystem", href: "/solutions#platforms" },
      { label: "Interoperability Fabric™", href: "/solutions#interoperability-fabric" },
      { label: "Cross-Border Bridge™", href: "/solutions#cross-border-bridge" },
      { label: "Digital Currency Hub™", href: "/products/digital-currency-hub" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Industries", href: "/industries" },
      { label: "Lab", href: "/lab" },
      { label: "Partners", href: "/partners" },
      { label: "Insights", href: "/insights" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About OrbisMoneta", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Careers", href: "/about/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Use", href: "/legal/terms" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];
