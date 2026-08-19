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
 *  2. A single Contact entry — the duplicate header "Contact" was removed
 *     ("Contact Us should be just one…"). Careers moved under About on the same
 *     brief ("Career page to be added on the About") and has since come off the
 *     site altogether; the page is parked at app/about/_careers.
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
  /**
   * Paths that must NOT mark this item current, checked before `matches`.
   *
   * Needed as soon as one nav item's route sits under another's: Platforms is
   * /solutions/platforms, so the plain `startsWith` below lights Solutions on
   * that page too and two tabs come up underlined at once.
   */
  excludes?: string[];
  /**
   * A dropdown under the item. Two links or so — this is a menu, not a panel.
   */
  menu?: MenuLink[];
  /**
   * PARKED. Nothing sets this any more.
   *
   * The mega-menu went the way of the three panels that fed it: Solutions'
   * came off, then Advisory's, and About's is now the two-link `menu` above.
   * The shape is kept, with `MegaPanel` in components/Header.tsx, because it
   * is a working implementation of a pattern a growing site tends to want
   * back, and re-mounting it is a matter of giving an item a `panel` again.
   */
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
    /*
      A plain link, not a mega-menu.

      It carried a panel listing the page's three sections, and before that the
      five functional domains — both removed at the client's request: clicking
      Solutions should land on /solutions and nothing else. The sections it
      pointed at are all still on the page and still anchored
      (`#solution-areas`, `#delivery-lifecycle`), so nothing became unreachable;
      there is simply no second way to reach them from the bar.

      `excludes` stays and is load-bearing. Platforms sits at
      /solutions/platforms — under this href — so without it the `startsWith`
      in Header's `isActive` lights both tabs on that page.
    */
    label: "Solutions",
    href: "/solutions",
    excludes: ["/solutions/platforms"],
  },
  {
    /*
      A tab of its own, next to Solutions, at the client's request.

      It was a column inside the Solutions panel and before that a section of
      that page. As a top-level entry it lands straight on /solutions/platforms,
      and the product pages are reached from the cards there rather than from a
      second menu — which is why the Products column came out of the Solutions
      panel at the same time.

      `matches` carries /products so a reader on the Digital Currency Hub page
      sees the tab they arrived through still marked current.
    */
    label: "Platforms",
    href: "/solutions/platforms",
    matches: ["/products"],
  },
  {
    /*
      A plain link, like Solutions and Platforms.

      It carried a mega-menu of the six service lines with an approach panel
      beside them. Removed at the client's request: clicking Advisory lands on
      /advisory and the reader explores the six from the page itself, which is
      where they are set out in full rather than as a list of names.

      Nothing became unreachable. Every service line is still anchored on that
      page — #payment-modernization, #payment-systems-fmi and the rest — and
      the footer's Advisory column still deep links to all six.
    */
    label: "Advisory",
    href: "/advisory",
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
  { label: "Innovation Lab", href: "/lab" },
  { label: "Partners", href: "/partners" },
  /*
    Insights is a menu now, not a bare tab.

    Events sits beside the articles because both are "what OrbisMoneta is
    publishing and doing" — the client asked for it under Insights in the bar.
    Its URL is /events rather than /insights/events on purpose: an article
    slugged "events" would be shadowed by a static segment of the same name,
    and a route that can be made unreachable by typing a headline is a trap
    nobody would think to look for.
  */
  {
    label: "Insights",
    href: "/insights",
    menu: [
      {
        label: "All insights",
        href: "/insights",
        icon: "document",
        description: "Research, analysis and field notes from the team.",
      },
      {
        label: "Events",
        href: "/events",
        icon: "calendar",
        description: "Where to meet us, and what we have spoken at.",
      },
    ],
  },
  {
    /*
      Two links, and they are the two pages that are actually about the
      company: the company, and the people running it.

      It was a mega-menu of five in two columns — Company (About, Leadership,
      Careers) and Proof (Areas of Expertise, Ecosystem & Partners, Insights) —
      with a standfirst and a "View all". The client has cut it to these two.

      Nothing became unreachable. Areas of Expertise is a section of /about,
      which is the first link here; Partners and Insights are top-level tabs of
      their own, two inches to the left. Careers is the exception and it is
      deliberate — it has come off the site entirely since, page and all.
    */
    label: "About",
    href: "/about",
    menu: [
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
    ],
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
        label: "Digital Banking Modernization",
        href: "/solutions#digital-banking-modernization",
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
      { label: "Innovation Lab", href: "/lab" },
      { label: "Partners", href: "/partners" },
      { label: "Insights", href: "/insights" },
      { label: "Events", href: "/events" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About OrbisMoneta", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      /* Careers came off the site at the client's request. The page is parked,
         unrouted, at app/about/_careers — so this is not a link waiting to be
         uncommented, it is a link that would 404 until that folder is renamed. */
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalNav = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Use", href: "/legal/terms" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
];
