import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/lib/config";
import { profile } from "@/data/profile";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

const TITLE = "Urooj Fatima | AI/ML Developer & EE Student";
const DESCRIPTION =
  "Electrical Engineering student at NUST and AI/ML developer building RAG systems, computer vision models, and applied ML products.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${profile.name}`,
  },
  description: DESCRIPTION,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    // The actual image comes from app/opengraph-image.tsx (Next.js's file
    // convention) — not declared manually here, so there's exactly one
    // source of truth for it rather than two possibly-conflicting ones.
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    // Same reasoning as above — falls back to opengraph-image.tsx.
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Person structured data — every field below is either already-approved,
// existing copy (name, description) or a real, existing link from
// data/profile.ts. No employer, job title, credential, or award is
// asserted here, deliberately, since none of that is documented content.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.jpg`,
  description: DESCRIPTION,
  sameAs: Object.values(profile.social),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-body bg-cream text-slate antialiased`}
      >
        {/* Safely serialized: JSON.stringify escapes quotes/backslashes, and
            replacing "<" specifically closes off any "</script>"-style
            injection even though every value here comes from our own
            trusted data/profile.ts rather than user input. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-teal focus:text-white focus:px-4 focus:py-2 focus:rounded-btn"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
