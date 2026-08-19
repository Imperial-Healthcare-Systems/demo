import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    /*
      `/admin` joins the disallow list. It is not a security measure — robots.txt
      is a request, and the portal is protected by the password, not by this —
      but a login form indexed by Google is an invitation, and any admin page
      that did leak would linger in search results long after.
    */
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/legal/", "/admin"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
