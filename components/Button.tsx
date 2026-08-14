import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/**
 * CTA hierarchy is deliberate and limited to four levels. Never put two
 * `primary` buttons in the same field of view — the user must always be able
 * to tell which action we want them to take.
 */
export type ButtonTone = "primary" | "secondary" | "ghost" | "onDark" | "onDarkGhost";
export type ButtonSize = "sm" | "md" | "lg";

const tones: Record<ButtonTone, string> = {
  primary:
    "bg-navy-600 text-white shadow-[0_1px_2px_rgba(0,46,166,.24)] hover:bg-navy-700 hover:shadow-[0_10px_24px_-8px_rgba(0,46,166,.55)] active:bg-navy-800",
  secondary:
    "bg-white text-navy-600 ring-1 ring-inset ring-line-strong hover:ring-navy-600 hover:bg-navy-50/60",
  ghost: "text-navy-600 hover:bg-navy-50",
  onDark:
    "bg-white text-navy-900 hover:bg-sky-500 hover:text-white shadow-[0_8px_28px_-12px_rgba(1,164,255,.7)]",
  onDarkGhost:
    "text-white ring-1 ring-inset ring-white/35 hover:ring-white/80 hover:bg-white/10 backdrop-blur-sm",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[0.8125rem] gap-1.5",
  md: "h-12 px-6 text-sm gap-2",
  lg: "h-14 px-8 text-[0.9375rem] gap-2.5",
};

const base =
  "group/btn inline-flex cursor-pointer items-center justify-center rounded-full font-medium tracking-[-0.01em] " +
  "transition-[background-color,color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-55 whitespace-nowrap";

type CommonProps = {
  tone?: ButtonTone;
  size?: ButtonSize;
  icon?: IconName;
  className?: string;
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
  icon,
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const classes = cn(base, tones[tone], sizes[size], className);

  if (external) {
    return (
      <a href={href} className={classes} {...(rest as React.ComponentPropsWithoutRef<"a">)}>
        <Inner icon={icon}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </Link>
  );
}

export function Button({
  tone = "primary",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, tones[tone], sizes[size], className)} {...rest}>
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
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1.5 text-sm font-medium tracking-[-0.01em] transition-colors",
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
