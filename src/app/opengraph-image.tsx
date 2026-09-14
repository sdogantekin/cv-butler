import { ImageResponse } from "next/og";

export const alt = "CV Butler — AI-powered career assistant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Reuses the same mark as src/components/logo-icon.tsx and src/app/icon.svg
// (a black rounded square, white resume-document glyph), rendered larger
// alongside the wordmark and tagline for social link previews.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          background: "#faf9f7",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 120,
              height: 120,
              borderRadius: 26,
              background: "#171717",
            }}
          >
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="2.5" width="16" height="19" rx="2.5" stroke="#ffffff" strokeWidth="1.6" />
              <circle cx="12" cy="9" r="2.2" stroke="#ffffff" strokeWidth="1.6" />
              <path d="M8 14.8a4 4 0 0 1 8 0" stroke="#ffffff" strokeWidth="1.6" />
              <path d="M8 17.3h8M8 19.8h6" stroke="#ffffff" strokeWidth="1.6" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, color: "#171717" }}>CV Butler</div>
        </div>
        <div style={{ display: "flex", fontSize: 34, color: "#57534e" }}>
          ATS scoring, resume matching &amp; cover letters
        </div>
      </div>
    ),
    { ...size },
  );
}
