import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next 16 only serves the qualities listed here — anything else is a 400
     * from the image optimiser, not a fallback. Every `quality={…}` used in the
     * app has to appear in this list or that image simply does not load.
     *
     * It is easy to miss in development because a previously optimised file is
     * served straight from `.next/cache/images`; the failure only shows up on a
     * cold cache, which is exactly what a fresh clone or a CI build has.
     *
     * Keep in sync with the values in use:
     *   75  Next's default (brand marks are `unoptimized` and skip this)
     *   78  editorial photography
     *   80  hero carousel banners
     *   82  hero globe, audience photography, insight covers
     */
    qualities: [75, 78, 80, 82],
  },
  async redirects() {
    return [
      // The page lives at /advisory, matching its nav heading and its own title
      // ("Strategic Advisory & Engineering Services"). It was previously
      // published at /services, so that path redirects forward — the browser
      // carries the #fragment across, so /services#digital-money-cbdcs still
      // lands on the right service line.
      //
      // Note the direction: source and destination must never be rewritten
      // together by a bulk find-and-replace, or this becomes a self-redirect
      // and the page 500s in a loop.
      { source: "/services", destination: "/advisory", permanent: true },

      // Platforms was briefly its own page. It is now a section of /solutions,
      // because the platforms are what the solutions are delivered on and
      // splitting them made the reader navigate to find the other half.
      { source: "/platforms", destination: "/solutions#platforms", permanent: true },
    ];
  },
};

export default nextConfig;
