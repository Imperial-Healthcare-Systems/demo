import type { Metadata } from "next";
import { leadershipPage } from "@/content/about";
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
                <div className="surface-deep relative flex aspect-[4/5] w-full max-w-[16rem] items-center justify-center overflow-hidden rounded-[var(--radius-card)] ring-1 ring-navy-900/10">
                  {person.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={person.photo}
                      alt={`${person.name}, ${person.role}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-display text-[3rem] font-bold tracking-[-0.042em] text-white/85">
                      {person.initials}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[1.375rem]">{person.name}</h2>
                  <p className="text-[0.9375rem] text-navy-600">
                    {person.role}
                  </p>
                </div>
              </div>

              {/*
                Centred against the portrait at lg, where it used to sit to the
                top. With the three stat tiles gone the bio ends about 220px
                short of the photograph, and top-aligned that pooled as one
                block of white under the text. Centred, the same space falls
                either side of the bio and the column reads as set against the
                portrait rather than as running out. A bio longer than the
                portrait column fills it, and this does nothing.
              */}
              <div className="flex flex-col justify-center gap-5 lg:col-span-8">
                <div className="rule-brand" aria-hidden="true" />
                <p className="text-[1.0625rem] leading-relaxed text-ink-2">
                  {person.bio}
                </p>
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

          {/* Profiles the client has still to supply */}
          <ul className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: leadershipPage.pendingProfiles }, (_, i) => (
              <Reveal
                as="li"
                key={i}
                delay={i * 80}
                className="flex items-center gap-5 rounded-[var(--radius-card)] border border-dashed border-line-strong bg-surface/60 p-7"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-ink-3 ring-1 ring-line">
                  <Icon name="plus" className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[0.9375rem] font-medium text-ink-2">
                    {leadershipPage.pendingLabel}
                  </p>
                  <p className="text-[0.8125rem] text-ink-3">
                    {leadershipPage.pendingNote}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
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
