import Link from "next/link";
import { footerNav, legalNav } from "@/content/navigation";
import { site } from "@/content/site";
import { BrandMark } from "@/components/BrandMark";
import { Icon } from "@/components/Icon";
import { FooterSentinel } from "@/components/FooterSentinel";

export function SiteFooter() {
  /*
    "OrbisMoneta is a brand of Monetanova Technologies Pvt. Ltd." with the mark
    standing in for the first two words. Split on the brand name so the sentence
    lives in one place; the fallback keeps the line intact if it is ever
    reworded such that the name no longer appears.
  */
  const brandTail =
    site.legal.brandLine.split(site.name)[1]?.trim() || site.legal.brandLine;

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
        {/*
          Three ends, not two: brand left, legal links centred, builder credit
          right, at the client's request.

          `grid-cols-[1fr_auto_1fr]` rather than three equal columns, because
          the centre has to be centred on the *bar* and the three blocks are
          nothing like the same width — the brand sentence runs to ~400px and
          the credit to ~130. Equal thirds would centre the links in a column
          that is itself off-centre once the side blocks disagree; sizing the
          middle to its content and splitting the remainder evenly puts them on
          the bar's true midline whatever the sides do.

          Stacked below lg. The three-across needs the links' ~330px plus two
          side columns wide enough to hold a 400px sentence without shredding
          it, which is not there at md.
        */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
          <div className="flex flex-col gap-1.5 text-[0.75rem] text-ink-inv-3">
            {/*
              The mark stands in for the brand name in this sentence, so the
              line is split on the name itself rather than on a second copy of
              it kept in the content file — one string stays the source of
              truth, and if it is ever reworded the split follows.

              `decorative` is deliberately off. The mark's alt text is the brand
              name, which is exactly the word it replaced, so the sentence still
              reads "OrbisMoneta is a brand of Monetanova Technologies Pvt. Ltd."
              to a screen reader and to anything that fails to load the image.

              `tone="dark"` is the ground it sits on, not the colour of the mark
              — this bar is navy, so it takes the inverse artwork.
            */}
            <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <BrandMark tone="dark" className="h-[1.15rem]" />
              <span>{brandTail}</span>
            </p>
            <p>{site.legal.copyright}</p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:justify-center">
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
          {/*
            The rule that used to sit between the links and this credit has gone
            with the regrouping. It read as a separator while the two were one
            block at the right end; with the credit alone at the far right it
            would hang in the middle of a wide gap, marking a join that is no
            longer there. The gap separates them now.
          */}
          <p className="text-[0.75rem] whitespace-nowrap text-ink-inv-3 lg:justify-self-end">
            {site.legal.builtBy.prefix}{" "}
            <a
              href={site.legal.builtBy.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink-inv-2 transition-colors hover:text-sky-400"
            >
              {site.legal.builtBy.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
