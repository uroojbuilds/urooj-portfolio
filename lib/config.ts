/**
 * Single source of truth for the production URL.
 *
 * This is the exact domain already present in the original repository
 * (app/robots.ts and app/sitemap.ts both hardcoded it independently before
 * this phase) and is corroborated by README.md's own deployment
 * instructions ("Your site will be live at a `*.netlify.app` subdomain" —
 * netlify.toml confirms this is a Netlify + @netlify/plugin-nextjs
 * deployment, with no custom domain configured anywhere in the repo).
 *
 * If a custom domain is added later, update it here only — every file that
 * previously hardcoded it (layout metadata, robots.ts, sitemap.ts, the
 * dynamic OG/icon images, JSON-LD) now reads from this one constant.
 */
export const SITE_URL = "https://urooj-portfolio.netlify.app";

export const SITE_NAME = "Urooj Fatima — Portfolio";
