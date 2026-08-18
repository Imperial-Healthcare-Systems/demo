import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { ButtonLink } from "@/components/Button";
import { Eyebrow } from "@/components/Section";

const suggestions = [
  { label: "Solutions", href: "/solutions" },
  { label: "Platforms", href: "/solutions/platforms" },
  { label: "Advisory", href: "/advisory" },
  { label: "Digital Currency Hub™", href: "/products/digital-currency-hub" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

export default function NotFound() {
  return (
    <section className="on-dark surface-deep grid-veil relative isolate flex min-h-[80svh] items-center overflow-hidden">
      {/* A 404 is the one page with no content of its own to hold the brand. */}
      <BrandMark
        variant="symbol"
        tone="dark"
        decorative
        className="pointer-events-none absolute -right-20 -bottom-16 -z-10 h-[24rem] opacity-[0.06] select-none md:right-[6%] md:bottom-auto md:h-[32rem]"
      />

      <div className="shell relative flex flex-col items-start gap-6 py-32">
        <Eyebrow onDark>Error 404</Eyebrow>
        <h1 className="max-w-2xl h-display-2 text-white">
          That page isn&apos;t part of our infrastructure.
        </h1>
        <p className="max-w-xl text-[1.0625rem] leading-relaxed text-ink-inv-2">
          The address may have changed, or the page may never have existed. Here
          is where most people are heading.
        </p>

        <ul className="flex flex-wrap gap-2 pt-1">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex rounded-full px-4 py-2 text-[0.8125rem] font-medium text-ink-inv-2 ring-1 ring-white/20 transition-colors hover:bg-white/10 hover:text-white hover:ring-white/45"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-3">
          <ButtonLink href="/" tone="onDark" size="lg" icon="arrowRight">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" tone="onDarkGhost" size="lg">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
