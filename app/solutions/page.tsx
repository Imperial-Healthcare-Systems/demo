import type { Metadata } from "next";
import Image from "next/image";
import { platforms, platformsPage, solutions, solutionsPage } from "@/content/solutions";
import { PageHero } from "@/components/PageHero";
import { ButtonLink } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { DarkSection, Eyebrow, SectionHeading } from "@/components/Section";
import { FlipCard, FlipHint } from "@/components/FlipCard";
import { cn } from "@/lib/utils";

/** Both faces share a shell, so the card keeps its shape through the turn. */
/*
  No `relative` here, deliberately. `FACE` is handed to `backClassName` too, and
  the back is positioned by `FlipCard` — a `relative` in this string used to
  outrank that and drop the back into flow below the front. `FlipCard` puts
  `relative` on the front face itself, which is all the plate below needs.

  `isolate` gives the face its own stacking context so the plate can sit on
  `-z-10` — behind the copy, still in front of the card's own background.
  `overflow-hidden` is what clips the plate to the rounded edge.
*/
const FACE =
  "isolate overflow-hidden rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-line shadow-[0_1px_2px_rgba(10,21,51,.04)] " +
  "transition-shadow duration-300 group-hover/flip:shadow-[var(--shadow-card)]";

/*
  Badge and rule alternate navy / green down the grid, which is what the
  reference does and what the logo supports. Literal strings — Tailwind only
  generates class names it can find as text.
*/
const CARD_TONES = [
  {
    badge:
      "bg-navy-600 text-white shadow-[0_8px_18px_-8px_rgba(0,46,166,.7)] group-hover/flip:shadow-[0_12px_24px_-8px_rgba(0,46,166,.85)]",
    rule: "bg-[linear-gradient(90deg,var(--color-navy-600),var(--color-sky-500))]",
  },
  {
    badge:
      "bg-green-500 text-white shadow-[0_8px_18px_-8px_rgba(1,172,50,.7)] group-hover/flip:shadow-[0_12px_24px_-8px_rgba(1,172,50,.85)]",
    rule: "bg-[linear-gradient(90deg,var(--color-green-600),var(--color-green-400))]",
  },
];

export const metadata: Metadata = {
  title: "Solutions & Platforms",
  description:
    "Six solution areas covering payments infrastructure, digital currency and CBDC, tokenization, cross-border interoperability, AI and financial intelligence, and risk and compliance — delivered on the Interoperability Fabric and Cross-Border Bridge platforms.",
  alternates: { canonical: "/solutions" },
};

/**
 * Solutions and Platforms are one page, not two. The platforms are what the
 * solutions are delivered on, so splitting them made the reader navigate to
 * find the other half. Every platform link in the header, the footer and the
 * mega-menu is an anchor into the Platforms section below, so a click jumps
 * straight to the row rather than loading a separate page.
 *
 * `/platforms` is a permanent redirect to `#platforms` here.
 */
export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow={solutionsPage.eyebrow}
        title={solutionsPage.headline}
        accent={solutionsPage.headlineAccent}
        intro={solutionsPage.intro}
        crumbs={[{ label: "Solutions" }]}
        actions={
          <>
            <ButtonLink href="/contact" icon="arrowRight">
              Contact Us
            </ButtonLink>
            <ButtonLink href="#platforms" tone="secondary">
              View platform ecosystem
            </ButtonLink>
          </>
        }
      />

      {/* Page band */}
      <section className="border-b border-line bg-surface">
        <div className="relative aspect-[16/5] w-full overflow-hidden md:aspect-[21/6]">
          <Image
            src={solutionsPage.image}
            alt={solutionsPage.alt}
            fill
            sizes="100vw"
            quality={82}
            className="object-cover"
          />
        </div>
      </section>

      {/* Solution areas */}
      <section id="solution-areas" className="section ground-soft bg-canvas">
        <div className="shell">
          <SectionHeading
            eyebrow="Six solution areas"
            title="Where we build"
            intro="Each area pairs domain practitioners with engineers, so the recommendation and the implementation come from the same team."
            className="mb-14"
          />

          {/*
            Each card turns over: the front states the area, the back carries
            what it covers. The tags used to sit under the body, which made
            every card a tall block of two unrelated registers — and six of
            those in a row is what made the page read as a grid of boxes.
          */}
          <ul className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, i) => {
              const tone = CARD_TONES[i % CARD_TONES.length];
              return (
              <Reveal as="li" key={solution.id} id={solution.id} delay={i * 70} className="h-full">
                <FlipCard
                  label={solution.title}
                  /* The card is sized by its copy, not by the plate — the
                     reference cards are wide and shallow, roughly 3:2. This
                     floor only keeps the shortest card from collapsing below
                     the others; `auto-rows-fr` equalises the rest. */
                  minHeight="min-h-[14.5rem]"
                  className="h-full"
                  faceClassName={FACE}
                  backClassName={cn(FACE, "bg-[linear-gradient(160deg,#0a1533,#002583)] ring-navy-800")}
                  front={
                    <>
                      {/*
                        The plate, and the wedge it stands on.

                        The plate's ground is a pale grey-blue, not the card's
                        white, so pasting it flat would read as a rectangle
                        dropped on the card. The reference solves this by
                        cutting the right-hand side of the card on a diagonal
                        and letting the plate live inside that band — so the
                        ground stops being an accident and becomes part of the
                        design. The wedge is that band; the plate then only
                        needs a soft corner mask to lose its own straight edges.

                        Decorative: `alt=""` and `aria-hidden`, because the
                        heading beside it already names the thing.

                        `sizes` is the width it actually paints at — about
                        190px — not a viewport fraction. The source files are
                        1.6MB PNGs; this is what keeps the delivered asset in
                        the tens of kilobytes.
                      */}
                      {solution.image && (
                        <>
                          <span
                            aria-hidden="true"
                            /* Full-bleed on purpose. Boxing this to the right
                               64% put a straight vertical element edge down the
                               card — the gradient had already ramped in by the
                               time it reached the box's own left boundary, so
                               the boundary showed. Spanning the whole face
                               leaves the gradient as the only edge there is. */
                            className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(152deg,transparent_48%,rgba(226,236,249,.6)_92%)]"
                          />
                          <Image
                            src={solution.image}
                            alt=""
                            aria-hidden="true"
                            width={420}
                            height={420}
                            sizes="200px"
                            quality={72}
                            /*
                              Two edges of this square sit inside the card — the
                              top and the left — and both are plain ground, so
                              both read as a ruled line. The other two are the
                              card's own right and bottom, where `overflow-hidden`
                              turns the same ground into a bleed.

                              So: fade exactly those two, each over the ~22% of
                              ground that sits outside the artwork, and composite
                              the pair with `intersect` so a pixel survives only
                              where both say so. A corner-anchored radial cannot
                              do this — the plate's top edge is nearer that corner
                              than the artwork's own top corner is, so any radial
                              soft enough to kill the edge washes out the subject.

                              Tinting the card to match the ground was the other
                              option, and it fails on the evidence: plate 1's
                              ground is rgb(216,226,253) and the rest are around
                              rgb(240,244,249), so one tint cannot serve six.
                            */
                            className="pointer-events-none absolute right-0 -bottom-1 -z-10 w-[48%] max-w-[11.5rem] select-none [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_24%),linear-gradient(to_right,transparent_0%,#000_22%)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:scale-[1.07] motion-reduce:transition-none"
                          />
                        </>
                      )}

                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:scale-110 group-hover/flip:[transform:perspective(520px)_rotateY(-14deg)]",
                          tone.badge,
                        )}
                      >
                        <Icon name={solution.icon as never} className="h-5 w-5" strokeWidth={1.6} />
                      </span>

                      <h2 className="mt-4 max-w-[56%] text-[1.0625rem] leading-snug">
                        {solution.title}
                      </h2>

                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-2.5 block h-[3px] w-7 rounded-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/flip:w-12",
                          tone.rule,
                        )}
                      />

                      <p className="mt-2.5 max-w-[56%] text-[0.8125rem] leading-relaxed text-ink-2">
                        {solution.body}
                      </p>

                      <FlipHint />
                    </>
                  }
                  back={
                    <>
                      <p className="font-mono text-[0.625rem] tracking-[0.18em] text-sky-400 uppercase">
                        {solution.title}
                      </p>
                      <ul className="mt-3.5 flex flex-wrap gap-1.5">
                        {solution.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.1em] text-ink-inv-2 uppercase ring-1 ring-white/20"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      {/* Follows the tags rather than being pushed to the floor
                          with `mt-auto`. On the taller card that read as a
                          footer; on this one it just left a hole. */}
                      <p className="mt-4 text-[0.8125rem] leading-relaxed text-ink-inv-2">
                        {solution.body}
                      </p>
                    </>
                  }
                />
              </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Platform ecosystem — the destination for every /solutions#platforms link */}
      <DarkSection>
        <div id="platforms" className="shell section">
          <div className="flex max-w-3xl flex-col gap-5">
            <Eyebrow onDark>{platformsPage.eyebrow}</Eyebrow>
            <h2 className="h-display-2 text-white">{platformsPage.headline}</h2>
            <p className="text-[1.0625rem] leading-relaxed text-ink-inv-2">
              {platformsPage.blurb}
            </p>
          </div>

          {/*
            Two cards, so a two-up grid rather than the three-up used for the
            solution areas — a third empty cell reads as something missing.
          */}
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {platforms.map((platform, i) => (
              <Reveal
                as="li"
                key={platform.id}
                id={platform.id}
                delay={i * 90}
                className="group/plat flex h-full flex-col gap-5 rounded-[var(--radius-card)] bg-white/[0.04] p-8 ring-1 ring-white/10 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white/[0.07] md:p-10"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 text-sky-400 transition-colors group-hover/plat:bg-sky-500 group-hover/plat:text-white">
                  <Icon name={platform.icon as never} className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <h3 className="text-[1.375rem] leading-snug text-white">{platform.title}</h3>
                <p className="text-[0.9375rem] leading-relaxed text-ink-inv-2">{platform.body}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {platform.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full px-2.5 py-1 text-[0.6875rem] text-ink-inv-2 ring-1 ring-white/15"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>

          {/*
            Digital Currency Hub is a product with its own page, not one of the
            platforms — but anyone reading this section is looking for exactly
            that kind of thing, so it gets a pointer rather than being invisible.
          */}
          <Reveal className="mt-6 rounded-[var(--radius-card)] bg-white/[0.04] p-7 ring-1 ring-white/10 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-sky-400">
                  Also from OrbisMoneta
                </p>
                <p className="text-[0.9375rem] leading-relaxed text-ink-inv-2">
                  <strong className="font-semibold text-white">Digital Currency Hub™</strong> — our
                  retail CBDC platform for commercial banks.
                </p>
              </div>
              <ButtonLink
                href="/products/digital-currency-hub"
                tone="onDarkGhost"
                icon="arrowRight"
                className="shrink-0"
              >
                See the product
              </ButtonLink>
            </div>
          </Reveal>

          {/* Architecture */}
          <div
            id="architecture"
            className="mt-16 grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
          >
            <div className="flex flex-col gap-5 lg:col-span-5">
              <Eyebrow onDark>Architecture</Eyebrow>
              <h3 className="h-display-3 text-white">One infrastructure layer.</h3>
              <p className="max-w-md text-[1.0625rem] leading-relaxed text-ink-inv-2">
                The platforms are designed to operate together — a single integration layer across
                payment rails, digital currencies, tokenized assets, banking systems and financial
                networks.
              </p>
              <ButtonLink
                href="/advisory"
                tone="onDarkGhost"
                icon="arrowRight"
                className="mt-2 self-start"
              >
                How we deliver them
              </ButtonLink>
            </div>

            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] ring-1 ring-white/10">
                <Image
                  src={platformsPage.architecture.image}
                  alt={platformsPage.architecture.alt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  quality={82}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </DarkSection>

      {/* Closing */}
      <section className="section ground-soft bg-surface">
        <div className="shell flex flex-col items-start gap-6 md:items-center md:text-center">
          <Eyebrow>Next step</Eyebrow>
          <h2 className="max-w-3xl h-display-2">
            Want to see our product{" "}
            <span className="text-brand-gradient">in action</span>?
          </h2>
          <ButtonLink href="/contact" size="lg" icon="arrowRight" className="mt-2">
            Contact Us
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
