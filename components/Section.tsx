import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Small mono label that sits above every section heading. */
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.18em]",
        onDark ? "text-sky-400" : "text-navy-600",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-6",
          onDark ? "bg-sky-400/60" : "bg-navy-600/40",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onDark = false,
  className,
  action,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
  action?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between md:gap-10",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          align === "center" ? "max-w-3xl items-center" : "max-w-3xl",
        )}
      >
        {eyebrow && (
          <Reveal kind="fade">
            <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <Reveal delay={60}>
          <Tag
            className={cn(
              Tag === "h1"
                ? "h-display-1"
                : "h-display-2",
            )}
          >
            {title}
          </Tag>
        </Reveal>
        {intro && (
          <Reveal delay={120}>
            <div
              className={cn(
                "text-[1.0625rem] leading-relaxed md:text-lg",
                onDark ? "text-ink-inv-2" : "text-ink-2",
              )}
            >
              {intro}
            </div>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal delay={180} className="shrink-0">
          {action}
        </Reveal>
      )}
    </div>
  );
}

/** Full-bleed dark band used to break up the light editorial pages. */
export function DarkSection({
  children,
  className,
  grid = true,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  grid?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "on-dark surface-deep relative isolate overflow-hidden",
        grid && "grid-veil",
        className,
      )}
    >
      {children}
    </section>
  );
}
