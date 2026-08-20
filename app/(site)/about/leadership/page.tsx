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
                  (() => {
                    const portrait = (
                      <Image
                        src={person.photo.src}
                        alt={`${person.name}, ${person.role}`}
                        width={person.photo.width}
                        height={person.photo.height}
                        sizes="(max-width: 1024px) 16rem, 18vw"
                        quality={86}
                        className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:group-hover/photo:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/photo:scale-100"
                      />
                    );

                    /*
                      No profile address, no link.

                      The photograph is the LinkedIn link where there is a
                      profile to open — the client asked for the mark alone, on
                      the picture, revealed on hover, and it is a far better
                      target than the pill it replaced: the whole portrait
                      rather than a 48px row.

                      Where no address has been supplied the portrait renders
                      bare. An <a> with no href is not a link — it is not
                      focusable, it does nothing when clicked, and a hover mark
                      promising a profile that does not open is worse than no
                      mark at all.
                    */
                    if (!person.linkedin) {
                      return (
                        <span className="group/photo block w-full max-w-[16rem] overflow-hidden rounded-[var(--radius-card)] ring-1 ring-navy-900/10">
                          {portrait}
                        </span>
                      );
                    }

                    return (
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${person.name} on LinkedIn — opens in a new tab`}
                        className="group/photo relative block w-full max-w-[16rem] overflow-hidden rounded-[var(--radius-card)] ring-1 ring-navy-900/10 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-600"
                      >
                        {portrait}

                        {/*
                          The scrim only exists to hold the mark off the
                          picture. It never shows on touch, where the mark is on
                          anyway and a permanent wash over the photograph would
                          be damage.

                          The hover states are an explicit `@media (hover:hover)`
                          rather than a bare `hover:` for a reason that decides
                          whether this works on a phone at all. A touch screen
                          has no hover: a tap fires :hover and leaves it stuck,
                          so a mark that only appears on hover is either
                          invisible or permanently on. Here the badge is simply
                          always visible on touch.
                        */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,27,77,.72),rgba(0,27,77,.12)_45%,transparent_70%)] opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover/photo:opacity-100 [@media(hover:hover)]:group-focus-visible/photo:opacity-100"
                        />

                        <span
                          aria-hidden="true"
                          className="absolute right-3 bottom-3 flex h-11 w-11 items-center justify-center rounded-full bg-navy-600 text-white shadow-[0_10px_24px_-8px_rgba(3,13,34,.7)] transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover/photo:translate-y-0 [@media(hover:hover)]:group-hover/photo:opacity-100 [@media(hover:hover)]:group-focus-visible/photo:translate-y-0 [@media(hover:hover)]:group-focus-visible/photo:opacity-100"
                        >
                          <Icon name="linkedin" className="h-5 w-5" />
                        </span>
                      </a>
                    );
                  })()
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
                  The "View full profile" pill stood here. It has gone into the
                  photograph above at the client's request — the LinkedIn mark
                  alone, on the picture. Nothing was lost with it: the same
                  address, the same new tab, the same accessible name, and a
                  target the size of the portrait instead of a 48px row.

                  A profile with no photograph keeps no link at all, because
                  there is nothing for it to sit on. Both current profiles have
                  one; if that changes, the initials tile is the place to put
                  it back.
                */}
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
