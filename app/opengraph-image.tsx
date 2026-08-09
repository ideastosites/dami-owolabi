import { ImageResponse } from "next/og";

export const alt = "Dami Owolabi — Marketing Leader, Growth Strategist, Brand Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "linear-gradient(135deg, #02232A 0%, #054753 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 36,
          }}
        >
          <div style={{ width: 44, height: 4, background: "#439aa9" }} />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          Dami Owolabi
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 600,
            color: "#94C7D1",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          Marketing Leader, Growth Strategist, Brand Builder
        </div>
      </div>
    ),
    { ...size }
  );
}
