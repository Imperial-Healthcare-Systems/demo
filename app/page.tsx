import type { Metadata } from "next";
import { site } from "@/content/site";
import { HeroCarousel } from "@/components/HeroCarousel";
import { AudienceMarquee } from "@/components/AudienceMarquee";
import {
  EngagementModel,
  IndustryContext,
  WhyOrbisMoneta,
} from "@/components/Sections";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: "/" },
};

/**
 * Home page.
 *
 * Cut back to four blocks at the client's request: the hero, the industries
 * they serve, why OrbisMoneta, and one ask. Both "industry" blocks from the
 * client's HTML are here — `#industries` (the audiences, as the marquee) and
 * `#challenges` (the Industry Context narrative).
 *
 * There is exactly one ask at the bottom of the page — the footer's connect
 * strip — plus the floating popup. The standalone `RequestToConnect` band that
 * used to close this page sat directly above the footer strip, so the same ask
 * appeared twice in one scroll; it is parked, not deleted, and goes back with
 * one line if the footer strip is ever removed instead.
 *
 * Everything that came off the page is kept, built and working, and can be
 * re-mounted with a single line:
 *
 *   · ServicesIndex · InsightsTeaser → components/home/parked-sections.tsx
 *   · Proposition · FutureOfMoney · ClosingCta → components/home/sections.tsx
 *   · RequestToConnect → components/conversion/request-to-connect.tsx
 *   · PlatformPoster → components/Sections.tsx
 *
 * None of it has been deleted. See the note at the top of parked-sections.tsx.
 */
export default function HomePage() {
  return (
    <>
      {/* The capability ticker used to run here, between the industries band
          and the editorial sections. It is now the closing strip of the hero
          itself, where it reads as part of the opening statement rather than as
          a divider between two other blocks. `CapabilityTicker` stays in
          ParkedSections, unchanged, for wherever it is wanted next. */}
      <HeroCarousel />
      <AudienceMarquee />
      <IndustryContext />
      <WhyOrbisMoneta />
      {/* The client's four-phase engagement model, closing the page on how a
          project actually runs. It is the same content the Industries page
          carries on dark, rendered light here — one source, two treatments. */}
      <EngagementModel />
    </>
  );
}
