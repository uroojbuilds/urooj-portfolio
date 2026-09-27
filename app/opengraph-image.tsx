import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.headline}`;

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#F5F4EE",
          position: "relative",
        }}
      >
        {/* Restrained circuit-node accent, echoing the Hero motif — no
            invented claims, purely decorative brand consistency. */}
        <svg
          width="360"
          height="240"
          viewBox="0 0 360 240"
          style={{ position: "absolute", top: 60, right: 60 }}
        >
          <path
            d="M10 120 H120 L150 60 H230 L260 150 H350"
            stroke="#0F5B66"
            strokeOpacity="0.35"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="120" cy="120" r="6" fill="#0F5B66" />
          <circle cx="150" cy="60" r="7" fill="#0F5B66" />
          <circle cx="230" cy="150" r="8" fill="#0F5B66" />
          <circle cx="350" cy="150" r="9" fill="#E06D53" />
        </svg>

        <p
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#E06D53",
            margin: 0,
          }}
        >
          Portfolio
        </p>
        <p
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#1E293B",
            margin: "16px 0 0 0",
          }}
        >
          {profile.name}
        </p>
        <p
          style={{
            fontSize: 32,
            color: "#0F5B66",
            margin: "20px 0 0 0",
            maxWidth: 800,
          }}
        >
          {profile.headline}
        </p>
      </div>
    ),
    { ...size }
  );
}
