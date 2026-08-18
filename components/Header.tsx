"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { primaryNav, type NavItem } from "@/content/navigation";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/BrandMark";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { useConversion } from "@/components/ConversionProvider";

/** Routes whose hero sits behind the header, so it starts transparent. */
const OVERLAY_ROUTES = ["/"];
/**
 * Below this the bar always shows. That band covers the hero, where the header
 * is transparent over the artwork and retracting it reads as a rendering fault
 * rather than a feature.
 */
const REVEAL_ABOVE = 120;

/**
 * Is the keyboard in the header?
 *
 * `contains(document.activeElement)` was the first answer and it was wrong: a
 * mouse click sets `activeElement` too, so clicking any nav link left focus
 * parked on it and the bar locked open for the rest of that page — which is
 * every visitor who navigates from the nav, i.e. the normal case. It looked
 * exactly like the feature not working.
 *
 * `:focus-visible` is the distinction that was actually wanted. The browser
 * matches it only when it decides a focus ring should be drawn, which is the
 * keyboard case and not the click case — so tabbing into the header still holds
 * the bar, and clicking through it no longer does.
 *
 * Guarded: this runs inside the scroll handler, and an unsupported selector
 * throwing there would take the whole listener down with it.
 */
function hasKeyboardFocus(root: HTMLElement | null) {
  if (!root) return false;
  try {
    return !!root.querySelector(":focus-visible");
  } catch {
    return false;
  }
}

export function SiteHeader() {
  const pathname = usePathname();
  const { openRfq } = useConversion();
  const [scrolled, setScrolled] = useState(false);
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const overlay =
    OVERLAY_ROUTES.includes(pathname) && !scrolled && !openPanel && !mobileOpen;

  /**
   * Retracted = slid up out of view. The bar leaves on the way down and comes
   * back on the way up, so reading long pages gets the full viewport but the
   * navigation is never more than a flick away.
   *
   * Three things hold it open regardless of direction, because a bar that
   * slides away mid-interaction is worse than one that simply stays:
   *   · an open mega-menu — the panel is a child of the header and would leave
   *     with it
   *   · the mobile drawer — a sibling pinned to `top-16`, which would be left
   *     hanging under nothing
   *   · focus inside the header — tabbing into a control that then slides off
   *     screen strands a keyboard user
   *
   * The locks are read through a ref rather than listed as effect deps: this
   * listener is bound once for the life of the component, and re-binding a
   * scroll handler on every menu open would be a lot of churn for a value the
   * handler only ever reads.
   */
  const [retracted, setRetracted] = useState(false);
  const lockRef = useRef(false);

  useEffect(() => {
    lockRef.current = Boolean(openPanel) || mobileOpen;
    // Anything that locks the bar also brings it back — opening a menu while
    // the bar is away should not open it off screen.
    if (lockRef.current) setRetracted(false);
  }, [openPanel, mobileOpen]);

  useEffect(() => {
    let frame = 0;
    let last = Math.max(0, window.scrollY);

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        // Clamped: iOS rubber-banding reports negative values at the top and
        // over-scrolled ones at the bottom, and both read as a direction change.
        const y = Math.max(0, window.scrollY);
        setScrolled(y > 24);

        const delta = y - last;
        // Ignore anything under 6px so a trackpad's idle jitter cannot flutter
        // the bar. `last` only advances when a move clears the threshold, so
        // slow scrolling accumulates rather than being discarded.
        if (Math.abs(delta) >= 6) {
          const locked = lockRef.current || hasKeyboardFocus(headerRef.current);
          // Near the top the bar always shows — that is where the overlay
          // treatment lives, and retracting over the hero looks like a glitch.
          setRetracted(!locked && y > REVEAL_ABOVE && delta > 0);
          last = y;
        }
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Route change closes everything. Adjusted during render rather than in an
  // effect, so the new page never paints with a stale menu open.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpenPanel(null);
    setMobileOpen(false);
    setMobileSection(null);
  }

  // Escape closes the open panel or the mobile drawer.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenPanel(null);
      setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Prevent the page scrolling behind the mobile drawer.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenPanel(null), 140);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const isActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/";
    // Checked first, and it has to be: one nav item's route can sit under
    // another's — Platforms is /solutions/platforms — and the `startsWith`
    // below would otherwise light both tabs on that page.
    if ((item.excludes ?? []).some((prefix) => pathname.startsWith(prefix))) {
      return false;
    }
    if (pathname.startsWith(item.href.split("#")[0])) return true;
    // A section can own pages that do not sit under its own href.
    return (item.matches ?? []).some((prefix) => pathname.startsWith(prefix));
  };

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={scheduleClose}
        /*
          Focus arriving from a keyboard brings the bar straight back, whatever
          the scroll direction was. Without this, tabbing from page content into
          the navigation would move the focus ring onto something off screen.
        */
        onFocusCapture={() => setRetracted(false)}
        className={cn(
          // `translate`, not `transform`: Tailwind v4 compiles `-translate-y-*`
          // to the standalone `translate` property, and a transition list
          // naming `transform` would leave this jumping rather than sliding.
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          retracted && "-translate-y-full",
          overlay
            ? "bg-transparent"
            : "border-b border-line bg-white/92 shadow-[0_1px_0_rgba(10,21,51,.04)] backdrop-blur-xl",
        )}
        data-overlay={overlay || undefined}
        data-retracted={retracted || undefined}
      >
        {/*
        No utility strip. The tagline, a mail link and a second Contact entry
        above the masthead added a third row of navigation for information the
        footer already carries, and pushed the mark and the primary nav down the
        page. The header is one bar: mark, navigation, one action.
      */}
        <div className="shell flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link
            href="/"
            className="relative z-10 flex shrink-0 items-center"
            aria-label={`${site.name} — home`}
          >
            <BrandMark
              tone={overlay ? "dark" : "light"}
              priority
              className="h-8 lg:h-9"
            />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const active = isActive(item);
                const expanded = openPanel === item.label;
                return (
                  <li
                    key={item.label}
                    /* `relative` because the dropdown is positioned against
                       this item rather than against the bar — it sits under the
                       word it belongs to. */
                    className="group/nav relative"
                    onMouseEnter={() => {
                      cancelClose();
                      setOpenPanel(item.menu ? item.label : null);
                    }}
                  >
                    {item.menu ? (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-haspopup="true"
                        onClick={() =>
                          setOpenPanel(expanded ? null : item.label)
                        }
                        className={cn(
                          "relative flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.875rem] font-medium whitespace-nowrap transition-colors",
                          overlay
                            ? "text-white/85 hover:text-white"
                            : "text-ink-2 hover:text-navy-600",
                          (active || expanded) &&
                            (overlay ? "text-white" : "text-navy-600"),
                        )}
                      >
                        {item.label}
                        <Icon
                          name="chevronDown"
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            expanded && "rotate-180",
                          )}
                          strokeWidth={2}
                        />
                        <NavUnderline
                          show={active || expanded}
                          overlay={overlay}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "relative flex items-center rounded-full px-3.5 py-2 text-[0.875rem] font-medium whitespace-nowrap transition-colors",
                          overlay
                            ? "text-white/85 hover:text-white"
                            : "text-ink-2 hover:text-navy-600",
                          active && (overlay ? "text-white" : "text-navy-600"),
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                        <NavUnderline show={active} overlay={overlay} />
                      </Link>
                    )}

                    {item.menu && (
                      <NavMenu
                        item={item}
                        open={expanded}
                        onEnter={cancelClose}
                        onLeave={scheduleClose}
                        onRequestClose={() => setOpenPanel(null)}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Wrapped rather than class-toggled: `hidden` and the button's own
              `inline-flex` are both display utilities and would collide. */}
            <div className="hidden md:block">
              <ButtonLink
                href="/contact"
                tone={overlay ? "onDark" : "primary"}
                size="sm"
                icon="arrowRight"
              >
                Contact Us
              </ButtonLink>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={cn(
                "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors lg:hidden",
                overlay
                  ? "text-white ring-1 ring-inset ring-white/25 hover:bg-white/10"
                  : "text-ink ring-1 ring-inset ring-line-strong hover:bg-surface",
              )}
            >
              <Icon name={mobileOpen ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* The mega-menu used to mount here, as a child of the header rather
            than of the item, because it spanned the full bar. The dropdown that
            replaced it is anchored to its own item and mounts up in the list. */}
      </header>

      {/*
        The drawer is a sibling of the header, not a child. The header carries a
        `backdrop-filter`, which makes it the containing block for any fixed
        descendant — nested here, the drawer would be clipped to the header's
        own 64px height and become unusable.
      */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden",
          mobileOpen ? "anim-fade block" : "hidden",
        )}
      >
        <nav aria-label="Mobile" className="shell flex flex-col py-6">
          <ul className="flex flex-col divide-y divide-line">
            {primaryNav.map((item) => (
              <li key={item.label} className="py-1">
                {item.menu ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSection((v) =>
                          v === item.label ? null : item.label,
                        )
                      }
                      aria-expanded={mobileSection === item.label}
                      className="flex w-full cursor-pointer items-center justify-between py-3.5 text-left text-[1.0625rem] font-medium text-ink"
                    >
                      {item.label}
                      <Icon
                        name={mobileSection === item.label ? "minus" : "plus"}
                        className="h-4.5 w-4.5 text-navy-600"
                      />
                    </button>
                    {/* Flat, with no column heading over it. The heading said
                        "Company" above a list that is two links long and sits
                        under a control that already says About. */}
                    {mobileSection === item.label && (
                      <div className="anim-rise flex flex-col gap-1 pb-5">
                        {item.menu.map((link) => (
                          <Link
                            key={link.label + link.href}
                            href={link.href}
                            className="flex flex-col rounded-lg px-3 py-2.5 -mx-3 text-[0.9375rem] text-ink-2 transition-colors hover:bg-surface hover:text-navy-600"
                          >
                            <span className="font-medium text-ink">
                              {link.label}
                            </span>
                            {link.description && (
                              <span className="text-[0.8125rem] text-ink-3">
                                {link.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-3.5 text-[1.0625rem] font-medium text-ink"
                  >
                    {item.label}
                    <Icon name="chevronRight" className="h-4 w-4 text-ink-3" />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <ButtonLink
              href="/contact"
              size="lg"
              icon="arrowRight"
              className="w-full"
            >
              Contact Us
            </ButtonLink>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openRfq("requirements");
              }}
              className="inline-flex h-14 w-full cursor-pointer items-center justify-center rounded-full text-[0.9375rem] font-medium text-navy-600 ring-1 ring-inset ring-line-strong transition-colors hover:bg-navy-50"
            >
              Submit Requirements
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

/**
 * The bar under a nav item. It marks the current section, and it also wipes in
 * on hover — including on the four items that have no panel to open, so every
 * item in the bar answers a pointer the same way rather than only the ones that
 * happen to carry a menu.
 */
function NavUnderline({ show, overlay }: { show: boolean; overlay: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left rounded-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        overlay ? "bg-sky-400" : "bg-navy-600",
        show ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100",
      )}
    />
  );
}

/**
 * The dropdown under a nav item that carries a `menu`.
 *
 * A card sized to its own contents, anchored to the item so it opens under the
 * word it belongs to. It replaced the mega-menu below for About, which is down
 * to two links — that panel draws a full-bar sheet with a standfirst column and
 * a nine-column grid, and two rows in it left most of a 1472px card empty.
 *
 * The link rows are the panel's own, unchanged: icon tile, label, description,
 * chevron. Nothing about the menu should look like a different site.
 *
 * `transition-[opacity,translate]`, not `transform` — Tailwind v4 compiles
 * `-translate-y-*` to the standalone `translate` property, so a transition list
 * naming `transform` animates nothing and the card jumps into place.
 *
 * `inert` when closed does the work three attributes used to: it takes the
 * links out of the tab order, out of the accessibility tree and out of
 * find-in-page, so a closed menu cannot be reached by anything.
 */
function NavMenu({
  item,
  open,
  onEnter,
  onLeave,
  onRequestClose,
}: {
  item: NavItem;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onRequestClose: () => void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        // `pt-7` is the gap, and it is padding rather than margin so the
        // pointer can cross it without the menu closing under the cursor. The
        // item is centred in the bar rather than flush to its foot, so most of
        // that 28px is spent clearing the bar itself: measured, the card lands
        // 11px below it.
        "absolute top-full left-1/2 z-40 hidden w-[19.5rem] -translate-x-1/2 pt-7 lg:block",
        "transition-[opacity,translate] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0",
      )}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="flex flex-col rounded-[1.25rem] bg-white p-2 shadow-[0_28px_64px_-28px_rgba(10,21,51,.34)] ring-1 ring-line">
        {(item.menu ?? []).map((link) => (
          <Link
            key={link.label + link.href}
            href={link.href}
            onClick={onRequestClose}
            className="group/item flex items-start gap-3.5 rounded-xl p-3 transition-colors duration-200 hover:bg-surface"
          >
            {link.icon && (
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600 transition-colors duration-200 group-hover/item:bg-navy-600 group-hover/item:text-white"
              >
                <Icon name={link.icon} className="h-5 w-5" strokeWidth={1.6} />
              </span>
            )}
            <span className="flex min-w-0 flex-col gap-1 pt-0.5">
              <span className="text-[0.875rem] leading-snug font-semibold text-ink transition-colors duration-200 group-hover/item:text-navy-600">
                {link.label}
              </span>
              {link.description && (
                <span className="text-[0.75rem] leading-snug text-ink-3">
                  {link.description}
                </span>
              )}
            </span>
            <Icon
              name="chevronRight"
              className="mt-2.5 ml-auto h-4 w-4 shrink-0 text-ink-3 transition-[transform,color] duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-navy-600"
              strokeWidth={2}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * PARKED. Nothing mounts this — no nav item carries a `panel` any more.
 *
 * It is the full-bar mega-menu: a standfirst with its own "View all", up to
 * three columns of described links, and an optional feature card. Solutions
 * had one, then Advisory, then About; all three came off at the client's
 * request, the last of them replaced by `NavMenu` above.
 *
 * Kept, not deleted, on the same terms as components/ParkedSections.tsx — it
 * is a complete and accessible implementation of a pattern this site may well
 * want back, and giving any item a `panel` again is all it takes. Exported so
 * that being unmounted does not read as an unused local.
 */
export function MegaPanel({
  item,
  open,
  onEnter,
  onLeave,
  onRequestClose,
}: {
  item: NavItem;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onRequestClose: () => void;
}) {
  const panel = item.panel!;
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        // A floating card rather than a flush band: it is inset from both edges
        // and sits below the header with a gap, so the page reads through
        // around it and the panel is clearly a layer above rather than part of
        // the bar. `px-6 pt-2.5` is that inset and that gap.
        "absolute inset-x-0 top-full hidden px-6 pt-2.5 lg:block",
        "transition-[opacity,transform] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] origin-top",
        open
          ? "pointer-events-auto opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 -translate-y-2",
      )}
      aria-hidden={!open}
      inert={!open}
    >
      {/*
        Height guard. On a short laptop (1280×720 is still common) the panel is
        taller than the space under the header, and the tail of it would simply
        be unreachable. Capping it and letting it scroll means the last link is
        always gettable, whatever the window.
      */}
      <div className="mx-auto max-h-[calc(100vh-6rem)] max-w-[92rem] overflow-y-auto overscroll-contain rounded-[1.5rem] bg-white ring-1 ring-line shadow-[0_40px_80px_-32px_rgba(10,21,51,.32)]">
        {/*
          The desktop nav starts at lg (1024px), where four regions plus icon
          tiles and descriptions do not fit — titles wrapped to three lines and
          the panel ran past the bottom of the viewport. Between lg and xl the
          row is compacted instead: descriptions are dropped and everything
          tightens. No link is removed, so nothing becomes unreachable.
        */}
        <div className="grid grid-cols-12 gap-6 p-6 xl:gap-8 xl:p-8">
          {/* Standfirst */}
          <div className="col-span-3 flex flex-col border-r border-line pr-6 xl:pr-8">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-navy-600">
              {panel.eyebrow}
            </p>
            <h2 className="mt-3 text-[1.1875rem] leading-[1.2] xl:text-[1.375rem]">
              {panel.heading}
            </h2>
            <span
              aria-hidden="true"
              className="mt-4 h-[3px] w-9 rounded-full bg-navy-600"
            />
            <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-2">
              {panel.blurb}
            </p>
            {/* `mt-auto` pins this to the bottom of the tallest column. */}
            <Link
              href={item.href}
              onClick={onRequestClose}
              className="group/all mt-auto flex items-center gap-3 pt-8 text-[0.8125rem] font-medium text-navy-600"
            >
              View all
              <span className="flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-line-strong transition-colors duration-200 group-hover/all:bg-navy-600 group-hover/all:text-white group-hover/all:ring-navy-600">
                <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
              </span>
            </Link>
          </div>

          {/* Link columns */}
          <div
            className={cn(
              "grid gap-x-6",
              // Written out, not interpolated — Tailwind only generates class
              // names it can find as literal text.
              panel.feature ? "col-span-6" : "col-span-9",
              panel.columns.length >= 3 ? "grid-cols-3" : "grid-cols-2",
            )}
          >
            {panel.columns.map((col) => (
              <div key={col.title} className="flex flex-col">
                <p className="mb-2 px-3 font-mono text-[0.625rem] tracking-[0.18em] text-ink-3 uppercase">
                  {col.title}
                </p>
                {col.links.map((link) => (
                  <Link
                    key={link.label + link.href}
                    href={link.href}
                    onClick={onRequestClose}
                    className="group/item flex items-start gap-3 rounded-xl p-2.5 transition-colors duration-200 hover:bg-surface xl:gap-3.5 xl:p-3"
                  >
                    {link.icon && (
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-600 transition-colors duration-200 group-hover/item:bg-navy-600 group-hover/item:text-white xl:h-10 xl:w-10"
                      >
                        <Icon
                          name={link.icon}
                          className="h-5 w-5"
                          strokeWidth={1.6}
                        />
                      </span>
                    )}
                    <span className="flex min-w-0 flex-col gap-1 pt-1 xl:pt-0.5">
                      <span className="text-[0.8125rem] leading-snug font-semibold text-ink transition-colors duration-200 group-hover/item:text-navy-600 xl:text-[0.875rem]">
                        {link.label}
                      </span>
                      {link.description && (
                        <span className="hidden text-[0.75rem] leading-snug text-ink-3 xl:block">
                          {link.description}
                        </span>
                      )}
                    </span>
                    <Icon
                      name="chevronRight"
                      className="mt-2 ml-auto h-4 w-4 shrink-0 text-ink-3 transition-[transform,color] duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-navy-600 xl:mt-2.5"
                      strokeWidth={2}
                    />
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {panel.feature && (
            <Link
              href={panel.feature.href}
              onClick={onRequestClose}
              className="surface-deep group/feature on-dark relative col-span-3 flex flex-col justify-between gap-6 overflow-hidden rounded-[1.25rem] p-6 transition-transform duration-300 hover:-translate-y-0.5 xl:p-7"
            >
              {/* Brand light rising off the base, so the card is not a flat
                  block of navy. Decorative — no artwork is implied. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(75%_100%_at_50%_100%,rgba(1,164,255,.30),transparent_72%)]"
              />
              <div className="relative flex flex-col gap-2.5">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-sky-400">
                  {panel.feature.eyebrow}
                </p>
                <h3 className="text-[1.0625rem] leading-snug text-white">
                  {panel.feature.title}
                </h3>
                <p className="text-[0.8125rem] leading-relaxed text-ink-inv-2">
                  {panel.feature.body}
                </p>
              </div>
              <span className="relative flex items-center justify-between gap-3 text-[0.8125rem] font-medium text-white">
                {panel.feature.cta}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ring-white/30 transition-colors duration-200 group-hover/feature:bg-white group-hover/feature:text-navy-900 group-hover/feature:ring-white">
                  <Icon name="arrowRight" className="h-4 w-4" strokeWidth={2} />
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
