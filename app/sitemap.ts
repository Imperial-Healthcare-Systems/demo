import type { MetadataRoute } from "next";
import { getAllInsights } from "@/content/insights";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
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
    ...getAllInsights().map((insight) => ({
      url: `${site.url}/insights/${insight.slug}`,
      lastModified: insight.publishedAt ? new Date(insight.publishedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
