import type { Metadata, Viewport } from "next";
import { Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/Header";
import { SiteFooter } from "@/components/Footer";
import { ConversionProvider } from "@/components/ConversionProvider";
import { AnchorScroll } from "@/components/AnchorScroll";
import { EngagementSlider } from "@/components/EngagementSlider";
import { RfqDialog } from "@/components/RfqDialog";
import "./globals.css";

/**
 * Inter Tight — a neo-grotesque cut specifically for tight display setting.
 *
 * The headline style this site is built to wants letters almost touching and
 * lines almost stacked: heavy negative tracking at large sizes with leading
 * near 1.0. Regular Inter fights that, because its default sidebearings are
 * drawn for UI text at small sizes; Inter Tight is the same skeleton redrawn
 * for the job, so the tracking can be pulled in without the letterforms
 * colliding awkwardly.
 *
 * One family carries display and body. The mono below is for eyebrows,
 * tickers and figures.
 */
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.legalEntity }],
  creator: site.legalEntity,
  publisher: site.legalEntity,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.shareDescription,
    url: site.url,
    locale: "en_IN",
    // PNG, not the WebP derivative: Facebook and LinkedIn still drop WebP
    // share cards, and a missing preview costs more than the extra weight.
    images: [
      {
        url: "/images/og-orbismoneta.png",
        width: 1200,
        height: 800,
        alt: "OrbisMoneta — Engineering the Future of Money",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shareDescription,
    images: ["/images/og-orbismoneta.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // All four are the client's own glyph on the brand's abyss navy, generated
  // from the source SVG in scripts/prepare-assets.mjs so they cannot drift
  // apart. Safari ignores SVG touch icons, hence the PNG raster.
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030d22" },
  ],
  width: "device-width",
  initialScale: 1,
};

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalEntity,
  url: site.url,
  logo: `${site.url}/images/brand/orbismoneta-logo.png`,
  description: site.description,
  slogan: site.tagline,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Skyline Icon, 7th Floor, Andheri – Kurla Rd, Mittal Industrial Estate, Marol",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // `suppressHydrationWarning` covers the `data-js` flag set by the inline
  // script in the head, and nothing else — the prop applies to this element's
  // own attributes, one level deep, not to the tree beneath it.
  //
  // The flag has to be written before first paint and cannot be server
  // rendered (the whole point is that it is absent when scripts do not run),
  // so a mismatch on <html> is unavoidable by construction. Same pattern as
  // theme-flash scripts.
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${plexMono.variable}`}
      /*
        Tells Next the smooth scrolling in globals.css is deliberate. Without
        it, Next's own scroll restoration on a route change inherits
        `scroll-behavior: smooth` and animates the jump to the top of the new
        page — which looks like the page sliding rather than loading. With the
        attribute, Next suspends smooth behaviour for route transitions only,
        and in-page anchor clicks still glide.
      */
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/*
          Scroll reveals only hide content once we know JavaScript is running.
          Without this, a failed or disabled script would leave the page blank.

          An attribute rather than a class: `className` on this element is
          React's, and a script appending to it fights whatever React renders.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.dataset.js="1"` }}
        />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-navy-600 focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <ConversionProvider>
          <AnchorScroll />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <EngagementSlider />
          <RfqDialog />
        </ConversionProvider>
      </body>
    </html>
  );
}
