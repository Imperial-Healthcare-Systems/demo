import type { Metadata } from "next";
import { labPage } from "@/content/about";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Icon, type IconName } from "@/components/Icon";
import { LabOrbit } from "@/components/LabOrbit";
import { Reveal } from "@/components/Reveal";
import { Eyebrow } from "@/components/Section";

export const metadata: Metadata = {
  title: "OrbisMoneta Lab",
  description:
    "Our innovation lab explores emerging technology — from AI-native payment rails to tokenized settlement — before it reaches production.",
  alternates: { canonical: "/lab" },
};

/**
 * One tone per theme, cycling the logo's own order — navy, sky, green. Same
 * system as the reason cards on the home page, so a reader moving between the
 * two pages meets one idea rather than two.
 */
const THEME_TONES = [
  {
    icon: "spark" as IconName,
    tile: "bg-navy-600/10 text-navy-600 ring-navy-600/15 group-hover/theme:bg-navy-600 group-hover/theme:text-white group-hover/theme:ring-navy-600",
    numeral: "text-navy-600/30 group-hover/theme:text-navy-600",
    bar: "bg-[linear-gradient(90deg,var(--color-navy-600),var(--color-navy-400))]",
    glow: "bg-[radial-gradient(circle,rgba(0,46,166,.16),transparent_68%)]",
    chip: "bg-navy-600/8 text-navy-600 ring-navy-600/15",
    dot: "bg-navy-600",
    lift: "hover:ring-navy-600/25 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_22px_44px_-20px_rgba(10,21,51,.28),0_40px_66px_-40px_rgba(0,46,166,.5)]",
  },
  {
    icon: "layers" as IconName,
    tile: "bg-sky-500/12 text-sky-600 ring-sky-500/20 group-hover/theme:bg-sky-500 group-hover/theme:text-white group-hover/theme:ring-sky-500",
    numeral: "text-sky-500/40 group-hover/theme:text-sky-600",
    bar: "bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-sky-400))]",
    glow: "bg-[radial-gradient(circle,rgba(1,164,255,.18),transparent_68%)]",
    chip: "bg-sky-500/10 text-sky-600 ring-sky-500/20",
    dot: "bg-sky-500",
    lift: "hover:ring-sky-500/30 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_22px_44px_-20px_rgba(10,21,51,.28),0_40px_66px_-40px_rgba(1,164,255,.5)]",
  },
  {
    icon: "coin" as IconName,
    tile: "bg-green-500/12 text-green-600 ring-green-500/20 group-hover/theme:bg-green-500 group-hover/theme:text-white group-hover/theme:ring-green-500",
    numeral: "text-green-500/40 group-hover/theme:text-green-600",
    bar: "bg-[linear-gradient(90deg,var(--color-green-500),var(--color-green-400))]",
    glow: "bg-[radial-gradient(circle,rgba(1,172,50,.16),transparent_68%)]",
    chip: "bg-green-500/10 text-green-600 ring-green-500/20",
    dot: "bg-green-500",
    lift: "hover:ring-green-500/30 hover:shadow-[0_2px_6px_rgba(10,21,51,.06),0_22px_44px_-20px_rgba(10,21,51,.28),0_40px_66px_-40px_rgba(1,172,50,.5)]",
  },
];

/**
 * "Coming soon", as a chip.
 *
 * The Lab has nothing published yet, and the page says so in one panel at the
 * bottom — which meant a reader could get most of the way down it, past three
 * themes written in the present tense, before finding that out. The chip
 * repeats it wherever a theme is named, so the status travels with the thing it
 * applies to rather than waiting at the end.
 *
 * The live dot is the pulse, and only the pulse is dropped under reduced
 * motion — the dot stays, because it is what makes the chip read as a status
 * rather than a label.
 */
function ComingSoonChip({
  label,
  className,
  dotClassName,
}: {
  label: string;
  className: string;
  dotClassName: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.625rem] font-medium uppercase tracking-[0.14em] ring-1 ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 [animation-duration:2.6s] motion-reduce:hidden ${dotClassName}`}
        />
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${dotClassName}`} />
      </span>
      {label}
    </span>
  );
}

export default function LabPage() {
  return (
    <>
      <PageHero
        eyebrow={labPage.eyebrow}
        title={labPage.headline}
        accent={labPage.headlineAccent}
        intro={labPage.intro}
        crumbs={[{ label: "Lab" }]}
        actions={
          <ButtonLink href="/contact" icon="arrowRight">
            Collaborate with the Lab
          </ButtonLink>
        }
        /* The watermark from the client's design, as the hero's aside. Faint
           enough to be texture rather than a second subject. */
        aside={<LabOrbit tone="light" className="mx-auto max-w-[24rem] lg:max-w-none" />}
        footer={
          <ComingSoonChip
            label={labPage.comingSoon.eyebrow}
            className="bg-white/70 text-navy-600 ring-line-strong"
            dotClassName="bg-sky-500"
          />
        }
      />

      <section className="section ground-soft bg-canvas">
        <div className="shell">
          <ul className="grid gap-5 md:grid-cols-3">
            {labPage.themes.map((theme, i) => {
              const tone = THEME_TONES[i % THEME_TONES.length];
              return (
                <Reveal
                  as="li"
                  key={theme.title}
                  delay={i * 80}
                  className={`group/theme relative flex h-full flex-col gap-4 overflow-hidden rounded-[1.75rem] bg-white p-7 ring-1 ring-line shadow-[0_1px_2px_rgba(10,21,51,.04),0_12px_28px_-20px_rgba(10,21,51,.26)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 motion-reduce:hover:translate-y-0 ${tone.lift}`}
                >
                  {/* Brand rule across the top, drawn in on hover. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/theme:scale-x-100 ${tone.bar}`}
                  />
                  {/* Corner light that opens out as the card lifts. */}
                  <span
                    aria-hidden="true"
                    className={`absolute -top-16 -right-16 h-40 w-40 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/theme:scale-125 ${tone.glow}`}
                  />

                  <div className="relative flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/theme:scale-110 group-hover/theme:[transform:perspective(520px)_rotateY(-12deg)] ${tone.tile}`}
                    >
                      <Icon name={tone.icon} className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span
                      aria-hidden="true"
                      className={`font-display text-[1.375rem] leading-none font-bold tabular transition-colors duration-300 ${tone.numeral}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h2 className="text-[1.125rem] leading-snug">{theme.title}</h2>
                    <ComingSoonChip
                      label={labPage.comingSoon.eyebrow}
                      className={tone.chip}
                      dotClassName={tone.dot}
                    />
                  </div>
                  <p className="relative text-[0.9375rem] leading-relaxed text-ink-2">
                    {theme.body}
                  </p>
                </Reveal>
              );
            })}
          </ul>

          {/*
            The closing panel from the client's design. It replaces a dashed
            "In preparation" box that said the same thing in a duller way — the
            page has nothing to show yet, and this is a better way to say so
            than an empty state that looks like a mistake.
          */}
          <Reveal
            className="group/soon relative mt-10 overflow-hidden rounded-[2rem] bg-abyss ring-1 ring-white/10 md:mt-12 md:rounded-[2.5rem]"
            kind="scale"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_78%_40%,rgba(1,164,255,.20),transparent_66%),radial-gradient(50%_60%_at_10%_100%,rgba(1,172,50,.12),transparent_70%)]"
            />

            <div className="on-dark relative grid items-center gap-10 p-8 md:p-12 lg:grid-cols-12 lg:gap-8">
              <div className="flex flex-col gap-5 lg:col-span-7">
                <Eyebrow onDark>{labPage.comingSoon.eyebrow}</Eyebrow>

                <h2 className="text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.032em] text-white md:text-[2.25rem]">
                  {labPage.comingSoon.headline}
                </h2>

                <p className="max-w-md text-[0.9375rem] leading-relaxed text-ink-inv-2 md:text-[1rem]">
                  {labPage.comingSoon.body}
                </p>

                {/*
                  An indeterminate bar, not a filled one. A percentage would be
                  a claim about how far along something is, and nothing in the
                  client's material supports a number — so this runs rather
                  than fills, which is what "in progress" actually means.
                */}
                <div className="mt-1 flex flex-col gap-2.5">
                  <span
                    aria-hidden="true"
                    className="relative block h-1 w-full max-w-xs overflow-hidden rounded-full bg-white/12"
                  >
                    <span className="absolute inset-y-0 left-0 w-2/5 rounded-full bg-[linear-gradient(90deg,var(--color-sky-500),var(--color-green-400))] animate-[om-lab-scan_2.8s_var(--ease-in-out-soft)_infinite] motion-reduce:animate-none motion-reduce:w-full" />
                  </span>
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-green-400">
                    {labPage.comingSoon.status}
                  </span>
                </div>
              </div>

              {/* Scales up a touch when the panel is hovered, so the whole
                  block responds as one object rather than the copy and the
                  artwork behaving as two. */}
              <div className="lg:col-span-5">
                <LabOrbit
                  className="mx-auto max-w-[19rem] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/soon:scale-[1.06] motion-reduce:transition-none"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-6 flex justify-center">
            <ButtonLink href="/insights" tone="secondary" icon="arrowRight">
              Read our insights
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
