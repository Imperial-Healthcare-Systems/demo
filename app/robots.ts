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
    /*
      `/legal/` came off the disallow list when the documents were written.

      It was there while those pages said "approved copy pending", which is not
      something you want returned for "OrbisMoneta privacy policy". They carry
      the real Privacy Policy, Terms of Use and Disclaimer now, and a vendor-risk
      team looking for them should be able to find them.

      `/admin` stays. It is not a security measure — robots.txt is a request,
      and the portal is protected by its password — but an indexed login form is
      an advertisement, and a stray admin URL lingers in search results long
      after the mistake that put it there.
    */
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
