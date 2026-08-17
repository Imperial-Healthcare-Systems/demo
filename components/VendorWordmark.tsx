import { cn } from "@/lib/utils";

/**
 * The cloud providers named under Public Cloud on the product one-pager.
 *
 * These render as set wordmarks, not as the vendors' logos. The logos are not
 * in this project — there is no AWS, Microsoft or Google artwork anywhere in
 * `public/` — and the three are registered trademarks with published brand
 * rules about form, clear space and colour. Drawing approximations of them by
 * hand would put three wrong marks on a page that names them as supported
 * platforms, which is worse than naming them plainly.
 *
 * To use the real marks, drop the official SVGs into
 * `public/images/vendors/{aws,azure,google-cloud}.svg` and give each entry an
 * `logo` path in `digitalCurrencyHub.deployment.modelDetail.items[].environments`
 * — this component renders one when it is present and falls back to the
 * wordmark when it is not. The one-pager's own logo strip can be cropped for
 * this if the artwork file is added to `source-assets/`.
 */
export function VendorWordmark({
  name,
  logo,
  className,
}: {
  name: string;
  /** Path under `public/`. Renders the mark instead of the wordmark. */
  logo?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 ring-1 ring-line",
        "shadow-[0_1px_2px_rgba(10,21,51,.04)] transition-shadow duration-300 hover:shadow-[var(--shadow-card)]",
        className,
      )}
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={name} className="h-5 w-auto select-none" />
      ) : (
        <span className="text-[0.875rem] leading-none font-semibold tracking-[-0.01em] text-ink">
          {name}
        </span>
      )}
    </span>
  );
}
