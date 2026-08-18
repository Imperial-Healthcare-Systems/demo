import { aboutPage } from "@/content/about";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

/**
 * PARKED. Nothing mounts this.
 *
 * It was the right half of the dark positioning band on /about, and that whole
 * band came off at the client's request. Held here, built and working, on the
 * same terms as components/ParkedSections.tsx — do not delete without asking.
 *
 * The nine core capabilities, as illustrated cards.
 *
 * This replaces the experience slider that stood here — the rotating 30+ Years
 * / 75+ Banks panel. `ExperienceSlider` is still in the tree, unchanged, and
 * `aboutPage.experience` still holds its figures; only the mount point moved.
 *
 * On the artwork: the ask was for generated imagery — currencies, coins, that
 * kind of thing. There are no such plates in this project and producing them is
 * not something I can do, so each card carries a drawn scene instead: a gradient
 * core holding the capability's own icon, a turning dashed orbit, three beads
 * riding it and a soft light behind. Vector, which on this site has repeatedly
 * proved the better answer anyway — a raster plate brings its own ground, and a
 * ground that does not match the panel behind it shows as a rectangle, which is
 * the exact problem every image on these pages has had to be masked around.
 * These have no ground at all, stay sharp at any size, weigh nothing and move.
 *
 * If real artwork arrives later, only `CapabilityGlyph` changes.
 */

/**
 * navy · sky · green, the logo's order. Literal strings — Tailwind only
 * generates class names it can find as text.
 *
 * `edge` and `lift` are plain `hover:` and not `group-hover/cap:`. They apply
 * to the card, and the card is the element that *declares* `group/cap` — a
 * group-hover utility answers a hovered ancestor, never the element carrying
 * the group itself, so as `group-hover` they silently did nothing. The glyph's
 * classes below are on children and are correctly group-scoped.
 */
const TONES = [
  {
    core: "bg-[linear-gradient(140deg,var(--color-navy-500),var(--color-navy-700))]",
    ring: "border-navy-400/30",
    bead: "bg-navy-300",
    halo: "bg-[radial-gradient(circle,rgba(0,46,166,.55),transparent_70%)]",
    edge: "hover:ring-navy-400/50",
    lift: "hover:shadow-[0_20px_40px_-22px_rgba(0,46,166,.85)]",
  },
  {
    core: "bg-[linear-gradient(140deg,var(--color-sky-400),var(--color-sky-600))]",
    ring: "border-sky-400/30",
    bead: "bg-sky-300",
    halo: "bg-[radial-gradient(circle,rgba(1,164,255,.5),transparent_70%)]",
    edge: "hover:ring-sky-400/50",
    lift: "hover:shadow-[0_20px_40px_-22px_rgba(1,164,255,.8)]",
  },
  {
    core: "bg-[linear-gradient(140deg,var(--color-green-400),var(--color-green-600))]",
    ring: "border-green-400/30",
    bead: "bg-green-300",
    halo: "bg-[radial-gradient(circle,rgba(1,172,50,.5),transparent_70%)]",
    edge: "hover:ring-green-400/50",
    lift: "hover:shadow-[0_20px_40px_-22px_rgba(1,172,50,.75)]",
  },
];

const BEADS = ["top-0 left-1/2 -translate-x-1/2", "top-1/2 right-0 -translate-y-1/2", "bottom-[6%] left-[10%]"];

function CapabilityGlyph({ icon, tone }: { icon: IconName; tone: (typeof TONES)[number] }) {
  return (
    <span aria-hidden="true" className="relative block h-16 w-16 shrink-0">
      {/* Light behind, opening out as the card is hovered. */}
      <span
        className={cn(
          "absolute inset-[-18%] rounded-full blur-lg transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cap:scale-125 motion-reduce:transition-none",
          tone.halo,
        )}
      />
      {/* Orbit, turning slowly, faster-looking on hover because it widens. */}
      <span
        className={cn(
          "absolute inset-0 animate-[om-orbit_26s_linear_infinite] rounded-full border border-dashed transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cap:scale-110 group-hover/cap:[transform:perspective(520px)_rotateY(-12deg)] motion-reduce:animate-none",
          tone.ring,
        )}
      >
        {BEADS.map((pos) => (
          <span key={pos} className={cn("absolute h-1 w-1 rounded-full", pos, tone.bead)} />
        ))}
      </span>
      {/* Core */}
      <span
        className={cn(
          "absolute inset-[22%] flex items-center justify-center rounded-[0.9rem] text-white shadow-[0_10px_22px_-10px_rgba(3,13,34,.9)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/cap:scale-110 group-hover/cap:[transform:perspective(520px)_rotateY(-12deg)] motion-reduce:transition-none",
          tone.core,
        )}
      >
        <Icon name={icon} className="h-5 w-5" strokeWidth={1.7} />
      </span>
    </span>
  );
}

export function CapabilityDeck() {
  return (
    <div className="flex flex-col gap-5">
      <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-sky-400">
        Core capabilities
      </p>

      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {aboutPage.coreCapabilities.map((capability, i) => {
          const tone = TONES[capability.tone % TONES.length];
          return (
            <Reveal
              as="li"
              key={capability.label}
              delay={i * 55}
              className={cn(
                "group/cap relative flex flex-col items-start gap-3.5 overflow-hidden rounded-2xl bg-white/[0.045] p-5 ring-1 ring-white/12 backdrop-blur-sm",
                "transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "hover:-translate-y-2 hover:bg-white/[0.08] motion-reduce:hover:translate-y-0",
                tone.edge,
                tone.lift,
              )}
            >
              {/* Light raking across as the pointer arrives — the same gesture
                  the partner tiers use, so the two read as one system. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent)] opacity-0 group-hover/cap:animate-[om-sheen_1.1s_ease-out] group-hover/cap:opacity-100 motion-reduce:hidden"
              />

              <CapabilityGlyph icon={capability.icon as IconName} tone={tone} />

              <span className="relative text-[0.875rem] leading-snug font-medium text-white">
                {capability.label}
              </span>
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
