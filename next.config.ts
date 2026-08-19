import type { NextConfig } from "next";

/** The Supabase project's host, if this deployment has one. */
const supabase = (() => {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!value) return null;
  try {
    const url = new URL(value);
    // Protocol comes from the URL rather than being assumed https, so a local
    // or self-hosted instance on http is not silently rejected by the image
    // optimiser with an error that points nowhere near the cause.
    return { protocol: url.protocol.replace(":", ""), hostname: url.hostname, port: url.port };
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  images: {
    /**
     * Next 16 serves only the qualities listed here. A `quality={…}` that is
     * not on the list is NOT an error and NOT a fallback to the default — it
     * is silently coerced to the nearest listed value (see the version 16
     * upgrade guide, "qualities Default"). So a missing entry costs no visible
     * failure and no log line; the image simply renders at a quality nobody
     * chose, and the code goes on claiming otherwise.
     *
     * Which is what had happened: 72, 86 and 88 were in use and absent here,
     * so they were being served at 75, 82 and 82. Every value used in the app
     * is now listed. Grep before removing one:
     *
     *     grep -rno "quality={[0-9]*}" app components
     *
     *   72  audience photography
     *   75  Next's default (brand marks are `unoptimized` and skip this)
     *   78  editorial photography
     *   80  hero carousel banners
     *   82  hero globe, insight covers
     *   86  leadership portraits
     *   88  the digital currency hub product shots
     */
    qualities: [72, 75, 78, 80, 82, 86, 88],

    /**
     * Cover images uploaded through the admin portal live in Supabase Storage,
     * not in /public, so next/image needs to be told that host is allowed —
     * without this every uploaded cover 400s.
     *
     * Derived from the same variable the app connects with, rather than
     * hardcoded, so a project rename or a move to a different Supabase project
     * cannot leave the two disagreeing. Absent when no database is configured,
     * which is correct: nothing can have been uploaded yet.
     */
    remotePatterns: supabase
      ? [
          {
            protocol: supabase.protocol as "http" | "https",
            hostname: supabase.hostname,
            ...(supabase.port ? { port: supabase.port } : {}),
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
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

      // Platforms was its own page, then a section of /solutions, and is a page
      // again — /solutions/platforms, under Solutions where it belongs. The
      // `#platforms` anchor it pointed at in between no longer exists, so this
      // has to name the page: a redirect to a missing fragment lands the reader
      // at the top of /solutions with no indication anything was meant to
      // happen.
      { source: "/platforms", destination: "/solutions/platforms", permanent: true },
    ];
  },
};

export default nextConfig;
