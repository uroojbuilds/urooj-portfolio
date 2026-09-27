import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm cream canvas — the dominant page background.
        cream: "#F5F4EE",
        // White surfaces — cards, panels, modals, form fields.
        surface: "#FFFFFF",
        // A warm, restrained neutral border tone (not pure gray) that reads
        // naturally against both the cream background and white surfaces.
        border: "#E4E1D6",
        // Deep teal — primary actions, links, active/selected states.
        teal: {
          DEFAULT: "#0F5B66",
          light: "#3D7C86", // restrained tint for subtle borders/hover states
          dark: "#0B454D", // hover/active shade for primary buttons
          tint: "#E8EFEF", // very light wash for tinted badge/section backgrounds
        },
        // Terracotta / coral — secondary accent, used intentionally and sparingly.
        // NOTE: the locked #E06D53 measures ~2.9:1 against the cream background,
        // below WCAG AA for text (4.5:1). It remains the DEFAULT for decorative/
        // icon/fill use (dots, hover backgrounds, tinted surfaces) where that ratio
        // doesn't apply the same way; `terracotta-dark` is a deepened, same-hue
        // shade (4.87:1 on cream) used specifically where terracotta appears as text
        // (eyebrow labels, category tags) — see Phase 3 report, Accessibility.
        terracotta: {
          DEFAULT: "#E06D53",
          light: "#EDA08D",
          dark: "#A8513E",
          tint: "#FBECE7", // very light wash for tinted badge/section backgrounds
        },
        // Primary text — slate charcoal.
        slate: "#1E293B",
        // Secondary / meta text — muted gray-blue.
        muted: "#64748B",
        // Semantic state colors, re-tuned from the original dark-theme values
        // for AA text contrast on light (cream/white) surfaces.
        success: "#15803D",
        warning: "#B45309",
        error: "#B91C1C",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      maxWidth: {
        content: "1440px",
      },
      borderRadius: {
        btn: "12px",
        card: "20px",
        image: "24px",
      },
      boxShadow: {
        // Soft, physical elevation instead of the old dark-theme glow shadows.
        card: "0 2px 12px rgba(30, 41, 59, 0.06)",
        "card-hover": "0 8px 28px rgba(30, 41, 59, 0.10)",
        nav: "0 2px 16px rgba(30, 41, 59, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
