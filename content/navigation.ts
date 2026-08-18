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
  /**
   * Extra path prefixes that should mark this item as the current section.
   * Needed where a page lives outside the item's own href — Products folded
   * into Solutions, so /products/* has to light Solutions rather than nothing.
   */
  matches?: string[];
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
    matches: ["/products"],
    panel: {
      eyebrow: "Solutions & Services",
      heading: "Solutions for modern financial institutions.",
      blurb:
        "Advisory, architecture and engineering across five functional domains.",
      columns: [
        {
          /*
            The page's own sections, not its cards.

            This column listed the five functional domains, which put the same
            five names in the menu, in the footer and on the page, and told a
            reader scanning the menu nothing about what else /solutions holds.
            These three are what the page is actually made of, in the order they
            appear, so the menu reads as a table of contents.

            Both anchors exist: `#solution-areas` and `#delivery-lifecycle` are
            set on the page. The five domain anchors are untouched and the
            footer still lists every one of them, so nothing became unreachable.
          */
          title: "Solutions & Services",
          links: [
            {
              label: "Solutions for Modern Financial Institutions",
              href: "/solutions",
              icon: "layers",
              description: "Advisory, architecture and engineering, end to end",
            },
            {
              label: "Functional Solution Domains",
              href: "/solutions#solution-areas",
              icon: "nodes",
              description: "The five domains we build in",
            },
            {
              label: "Delivery Lifecycle",
              href: "/solutions#delivery-lifecycle",
              icon: "target",
              description: "From Strategy to Enterprise Production",
            },
          ],
        },
        {
          /*
            Platforms is a page again. It was a section of /solutions, reached by
            anchor; the client's own page gives it a section of its own with two
            named platforms and their status, which is more than a row on
            another page can carry. `/platforms` still redirects to
            `/solutions#platforms`, and that anchor no longer exists — see the
            note on the redirect in next.config.ts.
          */
          title: "Platforms",
          links: [
            {
              label: "Proprietary Platforms",
              href: "/solutions/platforms",
              icon: "chip",
              description: "Both platforms in one view",
            },
            {
              label: "Digital Currency Hub™",
              href: "/solutions/platforms#digital-currency-hub",
              icon: "coin",
              description: "Bank-ready digital money infrastructure",
            },
            {
              label: "Lending Integration Hub",
              href: "/solutions/platforms#lending-integration-hub",
              icon: "nodes",
              description: "Connecting the lending ecosystem",
            },
          ],
        },
        {
          /*
            Products was a top-level nav item of its own, then a column of four
            links, and is now a column holding the one thing it describes — a
            single product, at the client's request.

            The three that went were all deep links into the same page
            (#capabilities twice, #deployment once). Listing one page four times
            padded the column rather than filling it, and it read as four
            products to anyone scanning the menu. Both anchors still exist on
            the page and both are still reachable from it;
            /products/digital-currency-hub still lights this item as active.
          */
          title: "Products",
          links: [
            {
              label: "Digital Currency Hub™",
              href: "/products/digital-currency-hub",
              icon: "coin",
              description: "Retail CBDC platform for commercial banks",
            },
          ],
        },
      ],
      /*
        No feature card. It pointed at /solutions#platforms with the label
        "View platform ecosystem", which is the same destination as the first
        link in the Platforms column — the panel offered one thing twice. Its
        space goes to the third column instead.
      */
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
  /*
    Products used to sit here as the third top-level item, with a panel of its
    own. It is now the third column of the Solutions panel above. The page it
    pointed at is untouched and still routable.
  */
  /*
    Industries is off the primary navigation at the client's request. The page
    is untouched and still routable — it keeps its footer link under Explore,
    and every card in the home page's "Industries we serve" marquee still deep
    links into its sections. Nothing here claims `/industries` as a `matches`
    prefix, because with no item to light there is nothing to mark current.
  */
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
            {
              label: "About OrbisMoneta",
              href: "/about",
              icon: "building",
              description: "Story, vision and philosophy",
            },
            {
              label: "Leadership Team",
              href: "/about/leadership",
              icon: "user",
              description: "The people building OrbisMoneta",
            },
            {
              label: "Careers",
              href: "/about/careers",
              icon: "target",
              description: "Join the team",
            },
          ],
        },
        {
          title: "Proof",
          links: [
            {
              label: "Areas of Expertise",
              href: "/about#expertise",
              icon: "layers",
            },
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
      {
        label: "Payment Infrastructure Modernization",
        href: "/solutions#payment-infrastructure-modernization",
      },
      {
        label: "Digital Banking & Channels",
        href: "/solutions#digital-banking-channels",
      },
      { label: "Digital Money & CBDC", href: "/solutions#digital-money-cbdc" },
      {
        label: "Open Banking & Open Finance",
        href: "/solutions#open-banking-open-finance",
      },
      {
        label: "Digital Value Interoperability",
        href: "/solutions#digital-value-interoperability",
      },
    ],
  },
  {
    title: "Advisory",
    links: [
      { label: "All services", href: "/advisory" },
      {
        label: "Payment Modernization",
        href: "/advisory#payment-modernization",
      },
      { label: "Payment Systems & FMI", href: "/advisory#payment-systems-fmi" },
      {
        label: "Cross-Border Payments",
        href: "/advisory#cross-border-payments",
      },
      { label: "Digital Money & CBDCs", href: "/advisory#digital-money-cbdcs" },
      {
        label: "AI for Financial Services",
        href: "/advisory#ai-for-financial-services",
      },
      {
        label: "Cloud-Native Platform Engineering",
        href: "/advisory#cloud-native-platform-engineering",
      },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "Proprietary Platforms", href: "/solutions/platforms" },
      {
        label: "Lending Integration Hub",
        href: "/solutions/platforms#lending-integration-hub",
      },
      {
        label: "Digital Currency Hub™",
        href: "/products/digital-currency-hub",
      },
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
