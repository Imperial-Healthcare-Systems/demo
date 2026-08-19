import type { Metadata } from "next";
import { leadershipPage } from "@/content/about";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Leadership Team",
  description:
    "A senior team of financial infrastructure practitioners, product leaders and engineers guiding OrbisMoneta's strategy, platforms and client engagements.",
  alternates: { canonical: "/about/leadership" },
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow={leadershipPage.eyebrow}
        title={leadershipPage.headline}
        accent={leadershipPage.headlineAccent}
        intro={leadershipPage.intro}
      />

      <section className="section ground-soft bg-canvas">
        <div className="shell flex flex-col gap-6">
          {leadershipPage.people.map((person) => (
            <Reveal
              key={person.name}
              className="grid gap-8 rounded-[var(--radius-card)] bg-white p-8 ring-1 ring-line md:p-10 lg:grid-cols-12 lg:gap-12"
            >
              <div className="flex flex-col gap-5 lg:col-span-4">
                {/*
                  The portrait at its own ratio — no fixed frame, so nothing is
                  cropped and nothing is padded. `width`/`height` come from the
                  encoded file, which is what lets `h-auto` hold the shape
                  without a layout shift while it loads.

                  Both currently encode to 639x720, so the pair happens to line
                  up. That is the photographs agreeing, not the layout forcing
                  them to: the earlier landscape shot of Prasanna sat lower than
                  Sanjay's here, which is the honest result and is why this is
                  not a fixed frame. Filling one would have meant cutting 18%
                  off each side of that photograph, through the crossed arms, or
                  padding it with a visible seam.

                  The initials tile keeps the old 4:5 box, since there is no
                  picture there to have a ratio of its own.
                */}
                {person.photo ? (
                  <Image
                    src={person.photo.src}
                    alt={`${person.name}, ${person.role}`}
                    width={person.photo.width}
                    height={person.photo.height}
                    sizes="(max-width: 1024px) 16rem, 18vw"
                    quality={86}
                    className="h-auto w-full max-w-[16rem] rounded-[var(--radius-card)] ring-1 ring-navy-900/10"
                  />
                ) : (
                  <div className="surface-deep flex aspect-[4/5] w-full max-w-[16rem] items-center justify-center overflow-hidden rounded-[var(--radius-card)] ring-1 ring-navy-900/10">
                    <span className="font-display text-[3rem] font-bold tracking-[-0.042em] text-white/85">
                      {person.initials}
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <h2 className="text-[1.375rem]">{person.name}</h2>
                  <p className="text-[0.9375rem] text-navy-600">
                    {person.role}
                  </p>
                </div>

                {/*
                  The profile link, and it is a real 44px target rather than a
                  line of underlined text — this is the one thing on the card a
                  reader is meant to act on. `rel="noreferrer"` with the new
                  tab, and the accessible name says whose profile it opens,
                  because "LinkedIn" repeated twice down a page tells a screen
                  reader nothing about which one it landed on.
                */}
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${person.name} on LinkedIn — opens in a new tab`}
                  className="group/li inline-flex h-12 w-fit items-center gap-3 rounded-full pr-5 pl-1.5 text-[0.875rem] font-medium text-ink transition-colors hover:text-navy-600 ring-1 ring-line hover:ring-navy-600"
                >
                  {/* Filled and white-on-navy rather than a pale tint with a
                      navy glyph — the mark is the thing that says what this
                      link opens, and at 16px on navy-50 it was reading as a
                      grey smudge. 40px disc, 20px glyph, 8.6:1. */}
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-600 text-white transition-colors group-hover/li:bg-navy-800"
                  >
                    <Icon name="linkedin" className="h-5 w-5" />
                  </span>
                  View full profile
                </a>
              </div>

              {/*
                Top-aligned, which puts the brand rule level with the top of the
                portrait — the relationship the eye actually reads across a
                two-column card.

                It was centred for a while, and that was right when the bio was
                a single paragraph ending 220px short of the photograph and the
                white pooled under it. These bios run to two and three
                paragraphs, so the columns are within about 45px of each other
                and centring only breaks the alignment it used to rescue.
              */}
              <div className="flex flex-col gap-5 lg:col-span-8">
                <div className="rule-brand" aria-hidden="true" />
                {person.bio.map((para) => (
                  <p
                    key={para.slice(0, 32)}
                    className="text-[1.0625rem] leading-relaxed text-ink-2"
                  >
                    {para}
                  </p>
                ))}
                {/*
                  The three figures that stood here — Experience 30+, Delivered
                  75+, Expertise Multiple Payment Schemes — came off at the
                  client's request.

                  They were the first three slides of `aboutPage.experience`,
                  printed under every profile. That was their weakest form: the
                  figures are one person's, drawn from the company's own
                  experience panel, and repeating a fixed row under each new
                  profile the client adds would have claimed the same 30 years
                  and 75 banks for all of them. The bio above already says both,
                  in the sentence they belong to.
                */}
              </div>
            </Reveal>
          ))}

          {/* Two dashed placeholder cards stood here, drawn from
              `leadershipPage.pendingProfiles`. Both are gone with that field:
              the page names the people it has, and announcing the ones it does
              not have was doing the opposite of what a leadership page is for. */}
        </div>
      </section>

      {/*
        A dark Careers band closed this page — "Want to build financial
        infrastructure with this team?" against a "View careers" button. It came
        off with the rest of Careers at the client's request. It was that ask and
        nothing else, so there is nothing here to repoint; the page now ends on
        the profiles.
      */}
    </>
  );
}
