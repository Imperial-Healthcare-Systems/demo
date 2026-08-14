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

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
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

  const isActive = (item: NavItem) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("#")[0]);

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={scheduleClose}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          overlay
            ? "bg-transparent"
            : "border-b border-line bg-white/92 shadow-[0_1px_0_rgba(10,21,51,.04)] backdrop-blur-xl",
        )}
        data-overlay={overlay || undefined}
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
                  className="group/nav"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenPanel(item.panel ? item.label : null);
                  }}
                >
                  {item.panel ? (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-haspopup="true"
                      onClick={() => setOpenPanel(expanded ? null : item.label)}
                      className={cn(
                        "relative flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.875rem] font-medium transition-colors",
                        overlay
                          ? "text-white/85 hover:text-white"
                          : "text-ink-2 hover:text-navy-600",
                        (active || expanded) && (overlay ? "text-white" : "text-navy-600"),
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
                      <NavUnderline show={active || expanded} overlay={overlay} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "relative flex items-center rounded-full px-3.5 py-2 text-[0.875rem] font-medium transition-colors",
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

        {/* Mega menu */}
        {primaryNav.map((item) =>
          item.panel ? (
            <MegaPanel
              key={item.label}
              item={item}
              open={openPanel === item.label}
              onEnter={cancelClose}
              onLeave={scheduleClose}
              onRequestClose={() => setOpenPanel(null)}
            />
          ) : null,
        )}
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
                {item.panel ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileSection((v) => (v === item.label ? null : item.label))
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
                    {mobileSection === item.label && (
                      <div className="anim-rise flex flex-col gap-5 pb-5">
                        {item.panel.columns.map((col) => (
                          <div key={col.title} className="flex flex-col gap-1">
                            <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-3">
                              {col.title}
                            </p>
                            {col.links.map((link) => (
                              <Link
                                key={link.label + link.href}
                                href={link.href}
                                className="flex flex-col rounded-lg px-3 py-2.5 -mx-3 text-[0.9375rem] text-ink-2 transition-colors hover:bg-surface hover:text-navy-600"
                              >
                                <span className="font-medium text-ink">{link.label}</span>
                                {link.description && (
                                  <span className="text-[0.8125rem] text-ink-3">
                                    {link.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
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
            <ButtonLink href="/contact" size="lg" icon="arrowRight" className="w-full">
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

function MegaPanel({
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
            <span aria-hidden="true" className="mt-4 h-[3px] w-9 rounded-full bg-navy-600" />
            <p className="mt-4 text-[0.875rem] leading-relaxed text-ink-2">{panel.blurb}</p>
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
              panel.feature ? "col-span-6 grid-cols-2" : "col-span-9 grid-cols-2",
            )}
          >
            {panel.columns.map((col) => (
              <div key={col.title} className="flex flex-col">
                <p className="mb-2 px-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-3">
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
                        <Icon name={link.icon} className="h-5 w-5" strokeWidth={1.6} />
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
                <h3 className="text-[1.0625rem] leading-snug text-white">{panel.feature.title}</h3>
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
