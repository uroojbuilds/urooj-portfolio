import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  // The portfolio is currently a single public page — /admin and every
  // route beneath it are intentionally excluded (private CMS, never meant
  // to be publicly indexed; see app/robots.ts's disallow rules and each
  // admin page's own noindex metadata for the other two layers of this).
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
