import type { MetadataRoute } from "next";
import { getAllInsights } from "@/lib/insights-store";
import { legalDocuments, type LegalDocumentKey } from "@/content/legal";
import { site } from "@/content/site";

/** Regenerated on the same cadence as the listing, for the same reason. */
export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] =
    [
      { path: "", priority: 1, changeFrequency: "weekly" },
      { path: "/solutions", priority: 0.9, changeFrequency: "monthly" },
      { path: "/solutions/platforms", priority: 0.9, changeFrequency: "monthly" },
      { path: "/advisory", priority: 0.9, changeFrequency: "monthly" },
      { path: "/products/digital-currency-hub", priority: 0.9, changeFrequency: "monthly" },
      { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
      { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
      { path: "/events", priority: 0.5, changeFrequency: "monthly" },
      { path: "/about", priority: 0.7, changeFrequency: "monthly" },
      { path: "/about/leadership", priority: 0.6, changeFrequency: "monthly" },
      /* /about/careers is not here because it is not routable — the page is
         parked under app/about/_careers. Listing an unrouted URL would send
         crawlers to a 404. */
      { path: "/partners", priority: 0.6, changeFrequency: "monthly" },
      { path: "/lab", priority: 0.5, changeFrequency: "monthly" },
      { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...(await getAllInsights()).map((insight) => ({
      url: `${site.url}/insights/${insight.slug}`,
      lastModified: insight.publishedAt ? new Date(insight.publishedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    /*
      The legal documents. Low priority, because nobody arrives at this site
      looking for them first — but listed, because the people who do go looking
      are procurement and vendor-risk teams deciding whether to deal with us,
      and a policy nothing links to is a policy that looks like it does not
      exist. Their own dates drive lastModified, so a revision is picked up.
    */
    ...(Object.keys(legalDocuments) as LegalDocumentKey[]).map((key) => ({
      url: `${site.url}/legal/${key}`,
      lastModified: new Date(legalDocuments[key].effective),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
