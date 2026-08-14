import Link from "next/link";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/BrandMark";
import { Icon } from "@/components/Icon";
import { Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, onDark = false }: { items: Crumb[]; onDark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem]">
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className={cn(
              "transition-colors",
              onDark ? "text-ink-inv-3 hover:text-white" : "text-ink-3 hover:text-navy-600",
            )}
          >
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <Icon
              name="chevronRight"
              className={cn("h-3 w-3", onDark ? "text-ink-inv-3/60" : "text-ink-3/60")}
              strokeWidth={2}
            />
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors",
                  onDark ? "text-ink-inv-3 hover:text-white" : "text-ink-3 hover:text-navy-600",
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current="page"
                className={cn(onDark ? "text-ink-inv-2" : "text-ink-2")}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Standard inner-page opening. Deliberately restrained — one eyebrow, one
 * headline, one paragraph, optional supporting rail. The hero carousel belongs
 * to the home page alone.
 */
/**
 * Renders one phrase of the headline in the brand gradient.
 *
 * The phrase has to already be in the title — this only changes how existing
 * words are painted, it never adds any. If it is not found the title renders
 * untouched rather than silently dropping text.
 */
function AccentedTitle({ title, accent }: { title: string; accent: string }) {
  const at = title.indexOf(accent);
  if (at === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <span className="text-brand-gradient">{accent}</span>
      {title.slice(at + accent.length)}
    </>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  crumbs,
  aside,
  actions,
  footer,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  /** A phrase inside `title` to paint in the brand gradient. String titles only. */
  accent?: string;
  intro?: React.ReactNode;
  crumbs: Crumb[];
  aside?: React.ReactNode;
  actions?: React.ReactNode;
  /** Full-width row below the columns — proof points, stats, a capability strip. */
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        /*
          Curved foot. Every sub-page used to open with a full-bleed rectangle
          butted flat against the section under it — the single hardest edge on
          any of these pages, and the one that made them read as stacked boxes.
          Rounding the bottom two corners and pulling the next section up under
          them turns that seam into a shoulder. The border only runs along the
          bottom, so it follows the curve rather than crossing it.
        */
        "relative isolate overflow-hidden rounded-b-[2rem] border-b border-line bg-surface pt-28 pb-14 md:rounded-b-[3rem] md:pt-36 md:pb-20",
        className,
      )}
    >
      {/*
        Three stacked grounds rather than one flat tint. The grid gives the
        block structure, the aurora gives it depth and a direction to read in,
        and the contour arcs echo the orbit diagram so a hero with an `aside`
        and one without still feel like the same page. All three are masked so
        they fade out well before the text, and none of them ever sits behind a
        glyph at a strength that could cost contrast.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(0,46,166,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,46,166,.05)_1px,transparent_1px)] [background-size:76px_76px] [mask-image:radial-gradient(70%_60%_at_60%_10%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_78%_18%,rgba(1,164,255,.14),transparent_62%),radial-gradient(45%_55%_at_12%_92%,rgba(1,172,50,.09),transparent_66%)]"
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-40 -z-10 hidden h-[46rem] w-[46rem] text-navy-600/[0.06] lg:block"
        viewBox="0 0 600 600"
        fill="none"
      >
        {[150, 210, 270].map((r) => (
          <circle key={r} cx="300" cy="300" r={r} stroke="currentColor" strokeWidth="1" />
        ))}
        <circle
          cx="300"
          cy="300"
          r="330"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6 10"
        />
      </svg>
      {/*
        Every inner page opens on this block, so the mark watermarked into it is
        what carries the brand down the site once the header has scrolled away.
        Hidden below lg, where the headline needs the full width.
      */}
      <BrandMark
        variant="symbol"
        decorative
        className="pointer-events-none absolute -top-10 -right-16 -z-10 hidden h-[26rem] opacity-[0.045] select-none lg:block"
      />
      <div className="shell">
        <Reveal kind="fade">
          <Breadcrumbs items={crumbs} />
        </Reveal>
        <div
          className={cn(
            "mt-8 grid gap-10",
            aside ? "lg:grid-cols-12 lg:items-end lg:gap-16" : "",
          )}
        >
          <div className={cn("flex flex-col gap-5", aside && "lg:col-span-7")}>
            <Reveal kind="fade">
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="max-w-4xl h-display-2">
                {accent && typeof title === "string" ? <AccentedTitle title={title} accent={accent} /> : title}
              </h1>
            </Reveal>
            {intro && (
              <Reveal delay={120}>
                <div className="max-w-2xl text-[1.0625rem] leading-relaxed text-ink-2 md:text-lg">
                  {intro}
                </div>
              </Reveal>
            )}
            {actions && (
              <Reveal delay={180} className="mt-2 flex flex-wrap items-center gap-3">
                {actions}
              </Reveal>
            )}
          </div>
          {aside && (
            <Reveal delay={200} kind="right" className="lg:col-span-5">
              {aside}
            </Reveal>
          )}
        </div>

        {footer && (
          <Reveal delay={240} className="mt-12 border-t border-line pt-8 md:mt-14">
            {footer}
          </Reveal>
        )}
      </div>
    </section>
  );
}
