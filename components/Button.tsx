import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/**
 * CTA hierarchy is deliberate and limited to four levels. Never put two
 * `primary` buttons in the same field of view — the user must always be able
 * to tell which action we want them to take.
 */
export type ButtonTone =
  | "primary"
  | "secondary"
  | "ghost"
  | "onDark"
  | "onDarkGhost"
  | "brand";
export type ButtonSize = "sm" | "md" | "lg";
/**
 * `pill` is the site default. `soft` is a large-but-not-capsule radius, for
 * places where a full capsule reads as consumer-app rather than institutional —
 * the About opening uses it.
 */
export type ButtonShape = "pill" | "soft";

const shapes: Record<ButtonShape, string> = {
  pill: "rounded-full",
  soft: "rounded-xl",
};

const tones: Record<ButtonTone, string> = {
  primary:
    "bg-navy-600 text-white shadow-[0_1px_2px_rgba(0,46,166,.24)] hover:-translate-y-0.5 hover:bg-navy-700 hover:shadow-[0_12px_26px_-12px_rgba(0,46,166,.5)] active:translate-y-0 active:bg-navy-800 motion-reduce:hover:translate-y-0",
  secondary:
    "bg-white text-navy-600 ring-1 ring-inset ring-line-strong hover:-translate-y-0.5 hover:bg-navy-50/70 hover:ring-navy-600/60 motion-reduce:hover:translate-y-0",
  ghost: "text-navy-600 hover:bg-navy-50",
  onDark:
    "bg-white text-navy-900 hover:bg-sky-500 hover:text-white shadow-[0_8px_28px_-12px_rgba(1,164,255,.7)]",
  onDarkGhost:
    "text-white ring-1 ring-inset ring-white/35 hover:ring-white/80 hover:bg-white/10 backdrop-blur-sm",
  /*
    A real tone rather than a gradient passed in through `className`. `cn` here
    is plain concatenation, not tailwind-merge, so a `bg-*` handed in from a
    caller does not replace the tone's own `bg-*` — both land on the element and
    the winner is whichever Tailwind happens to emit later. Tones are the only
    place that decides a button's background.
  */
  brand:
    "bg-[linear-gradient(95deg,var(--color-navy-500),var(--color-sky-500))] text-white shadow-[0_10px_28px_-10px_rgba(1,164,255,.65)] hover:bg-[linear-gradient(95deg,var(--color-navy-600),var(--color-sky-600))] hover:shadow-[0_14px_34px_-10px_rgba(1,164,255,.8)]",
};

const sizes: Record<ButtonSize, string> = {
  // 44px on phones, the designed 40 from md: up. `sm` is the size the
  // in-page CTAs use ("Explore Digital Currency Hub", "Explore the service"),
  // so this
  // one line is most of the tap-target fix on the marketing pages.
  sm: "h-11 md:h-10 px-4 text-[0.8125rem] gap-1.5",
  md: "h-12 px-6 text-sm gap-2",
  lg: "h-14 px-8 text-[0.9375rem] gap-2.5",
};

/*
  `relative overflow-hidden` so the sheen below has something to be clipped by.

  `translate` and `transform` are separate properties in Tailwind v4, which is
  what lets a tone's `hover:-translate-y-0.5` and this `active:scale` coexist
  without either cancelling the other — they are not two writes to one
  `transform`. Both are named in the transition list.
*/
const base =
  "group/btn relative isolate inline-flex cursor-pointer items-center justify-center overflow-hidden font-medium tracking-[-0.01em] " +
  "transition-[background-color,color,box-shadow,transform,translate,scale] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "active:scale-[0.98] active:translate-y-px motion-reduce:active:scale-100 " +
  "disabled:pointer-events-none disabled:opacity-55 whitespace-nowrap";

/*
  A band of light crossing the face on hover. Same gesture as the partner tiers
  and the service cards, at button scale — white on solid tones, and a paler
  navy on the light ones so it reads on white without turning grey.
*/
const SHEEN =
  "pointer-events-none absolute inset-y-0 -left-1/3 -z-10 w-1/3 opacity-0 " +
  "group-hover/btn:animate-[om-sheen_0.9s_ease-out] group-hover/btn:opacity-100 motion-reduce:hidden";

type CommonProps = {
  tone?: ButtonTone;
  size?: ButtonSize;
  icon?: IconName;
  className?: string;
  shape?: ButtonShape;
  children: React.ReactNode;
};

function Inner({ icon, children }: { icon?: IconName; children: React.ReactNode }) {
  return (
    <>
      {children}
      {icon && (
        <Icon
          name={icon}
          className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-0.5"
          strokeWidth={2}
        />
      )}
    </>
  );
}

export function ButtonLink({
  href,
  tone = "primary",
  size = "md",
  shape = "pill",
  icon,
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const classes = cn(base, shapes[shape], tones[tone], sizes[size], className);

  if (external) {
    return (
      <a href={href} className={classes} {...(rest as React.ComponentPropsWithoutRef<"a">)}>
        <Sheen tone={tone} />
        <Inner icon={icon}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      <Sheen tone={tone} />
      <Inner icon={icon}>{children}</Inner>
    </Link>
  );
}

export function Button({
  tone = "primary",
  size = "md",
  shape = "pill",
  icon,
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, shapes[shape], tones[tone], sizes[size], className)} {...rest}>
      <Sheen tone={tone} />
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}

/** Low-emphasis inline CTA used at the end of cards and sections. */
export function TextLink({
  href,
  children,
  className,
  onDark = false,
  scroll,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
  /**
   * Passed through to `next/link`. `false` leaves the scroll offset alone on
   * navigation, which is what a link back to a listing that restores its own
   * position wants — Next would otherwise jump to the top and the restore
   * would land a frame later as a visible correction.
   */
  scroll?: boolean;
}) {
  return (
    <Link
      href={href}
      scroll={scroll}
      className={cn(
        "group/link inline-flex min-h-11 items-center gap-1.5 text-sm font-medium tracking-[-0.01em] transition-colors md:min-h-0",
        onDark ? "text-sky-400 hover:text-white" : "text-navy-600 hover:text-navy-800",
        className,
      )}
    >
      {children}
      <Icon
        name="arrowRight"
        className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-1"
        strokeWidth={2}
      />
    </Link>
  );
}

/** Light crossing a button face. Decorative, and dark-on-light tones get a
 *  navy tint rather than white, which would be invisible on them. */
function Sheen({ tone }: { tone: ButtonTone }) {
  const solid = tone === "primary" || tone === "onDark" || tone === "brand";
  return (
    <span
      aria-hidden="true"
      className={cn(
        SHEEN,
        solid
          ? "bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.42),transparent)]"
          : "bg-[linear-gradient(90deg,transparent,rgba(0,46,166,.10),transparent)]",
      )}
    />
  );
}
