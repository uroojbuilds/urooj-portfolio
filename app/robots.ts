import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The admin CMS is already fully protected by server-side
      // authentication/authorization (Phase 9) — this disallow rule is an
      // additional, defense-in-depth indexing signal, not the actual access
      // control. /api covers the Auth.js callback routes, which have
      // nothing useful for a crawler and shouldn't be indexed either.
      disallow: ["/admin", "/admin/*", "/api", "/api/*"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
