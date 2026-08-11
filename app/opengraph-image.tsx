import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Dami Owolabi — Marketing Leader, Growth Strategist, Brand Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The dark logo mark reads clearly against this image's light background;
// inlined as a data URI since next/og's renderer (Satori) can't fetch
// relative /public paths at render time.
const logoDataUri = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "Main_Logo_Dark.png")
).toString("base64")}`;

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
          background: "linear-gradient(135deg, #FFFFFF 0%, #E5F1F3 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -140,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(67,154,169,0.18) 0%, rgba(67,154,169,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 36,
          }}
        >
          <img src={logoDataUri} width={40} height={112} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: "#02232A",
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
            color: "#436B6F",
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
