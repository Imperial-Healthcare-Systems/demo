import { cn } from "@/lib/utils";

/**
 * "Coming soon", as a status chip.
 *
 * It travels with the thing it applies to rather than being announced once at
 * the top of a section, because a reader who lands mid-page on an anchor never
 * sees the top of the section. Every place this appears, the surrounding copy is
 * written in the present tense, and this is what keeps that from reading as a
 * claim that the thing already ships.
 *
 * The label is real text, not decoration — a screen reader gets "Interoperability
 * Fabric, Coming soon" and not just the name. Only the dot is `aria-hidden`.
 *
 * The live dot is the pulse, and only the pulse is dropped under reduced
 * motion. The dot stays: it is what makes the chip read as a status rather than
 * a label.
 */
export function ComingSoonChip({
  label = "Coming soon",
  onDark = false,
  className,
}: {
  label?: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.625rem] font-medium tracking-[0.14em] uppercase ring-1",
        onDark
          ? "bg-white/8 text-sky-300 ring-white/20"
          : "bg-navy-600/8 text-navy-600 ring-navy-600/15",
        className,
      )}
    >
      <span aria-hidden="true" className="relative flex h-1.5 w-1.5">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 [animation-duration:2.6s] motion-reduce:hidden",
            onDark ? "bg-sky-400" : "bg-sky-500",
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-1.5 w-1.5 rounded-full",
            onDark ? "bg-sky-400" : "bg-sky-500",
          )}
        />
      </span>
      {label}
    </span>
  );
}
