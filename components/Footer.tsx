import Link from "next/link";
import { footerNav, legalNav } from "@/content/navigation";
import { site } from "@/content/site";
import { BrandMark } from "@/components/BrandMark";
import { Icon } from "@/components/Icon";
import { FooterSentinel } from "@/components/FooterSentinel";

export function SiteFooter() {
  return (
    <footer className="on-dark surface-deep relative isolate overflow-hidden">
      {/*
        Oversized mark bled off the bottom-right corner. Sits at 5% so it reads
        as a texture in the navy rather than a second logo competing with the
        lockup in the first column.
      */}
      <BrandMark
        variant="symbol"
        tone="dark"
        decorative
        className="pointer-events-none absolute -right-16 -bottom-24 -z-10 h-[26rem] opacity-[0.05] select-none md:-right-24 md:h-[34rem]"
      />

      <div className="shell relative">
        {/* Renders nothing. Tells the docked CTA the page has ended. */}
        <FooterSentinel />

        <div className="grid gap-12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-16">
          {/* Brand + contact */}
          {/* Gives up a column's width so the links can run to five. */}
          <div className="flex flex-col gap-6 lg:col-span-3">
            <Link href="/" aria-label={`${site.name} — home`} className="w-fit">
              <BrandMark tone="dark" className="h-9" />
            </Link>
            <p className="max-w-sm text-[0.875rem] leading-relaxed text-ink-inv-2">
              {site.statement}
            </p>

            <address className="flex flex-col gap-3 text-[0.8125rem] not-italic text-ink-inv-2">
              <div className="flex items-start gap-3">
                <Icon name="pin" className="mt-px h-4 w-4 shrink-0 text-sky-400" />
                <span>
                  {site.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Icon name="mail" className="h-4 w-4 shrink-0 text-sky-400" />
                {site.email}
              </a>
            </address>

            <div className="flex items-center gap-2.5">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ink-inv-2 ring-1 ring-white/15 transition-colors hover:bg-white/10 hover:text-white hover:ring-white/40"
                >
                  <Icon name={s.label === "LinkedIn" ? "linkedin" : "x"} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:col-span-9 lg:grid-cols-5 lg:gap-7">
            {footerNav.map((column) => (
              <nav key={column.title} aria-labelledby={`footer-${column.title}`}>
                <h2
                  id={`footer-${column.title}`}
                  className="mb-4 font-mono text-[0.625rem] font-medium uppercase tracking-[0.18em] text-sky-400"
                >
                  {column.title}
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label + link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.8125rem] leading-snug text-ink-inv-2 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1 text-[0.75rem] text-ink-inv-3">
            <p>{site.legal.brandLine}</p>
            <p>{site.legal.copyright}</p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.75rem] text-ink-inv-3 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
