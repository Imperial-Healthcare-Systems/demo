import { site } from "@/content/site";
import { SiteHeader } from "@/components/Header";
import { SiteFooter } from "@/components/Footer";
import { ConversionProvider } from "@/components/ConversionProvider";
import { AnchorScroll } from "@/components/AnchorScroll";
import { EngagementSlider } from "@/components/EngagementSlider";
import { RfqDialog } from "@/components/RfqDialog";
import { PageViews } from "@/components/PageViews";

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
    streetAddress:
      "Skyline Icon, 7th Floor, Andheri – Kurla Rd, Mittal Industrial Estate, Marol",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  sameAs: site.social.map((s) => s.href),
};

/**
 * The public website's chrome.
 *
 * This was the root layout until the admin portal needed to not have it. The
 * group `(site)` contributes nothing to any URL — it exists purely so there is
 * a level between <body> and the pages where the header, footer and the rest
 * can live without /admin inheriting them.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
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
        <PageViews />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <EngagementSlider />
        <RfqDialog />
      </ConversionProvider>
    </>
  );
}
