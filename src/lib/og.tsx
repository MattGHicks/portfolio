import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Shared Open Graph card — a Monograph plate: paper ground, ink type,
// one cobalt mark. (Archivo stands in for Fraunces: satori has no
// variable-font support, and the card reads fine in a grotesk.) Rendered at build time for every
// static route, so it costs nothing at runtime.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const archivo = readFileSync(
  join(process.cwd(), "src/assets/fonts/Archivo-Bold.ttf")
);

export function ogImage({
  title,
  meta,
  accent = "#1b36d6",
}: {
  title: string;
  meta: string;
  accent?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f1ea",
          padding: 72,
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: "1px solid rgba(20,19,17,0.22)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: "#4b4842" }}>
            digitalfish.io
          </div>
          <div
            style={{
              display: "flex",
              width: 12,
              height: 12,
              background: accent,
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{ display: "flex", width: 72, height: 5, background: accent }}
          />
          <div
            style={{
              display: "flex",
              fontSize: title.length > 24 ? 58 : 78,
              fontWeight: 700,
              color: "#141311",
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#4b4842" }}>
            {meta}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 21,
            color: "#8b867c",
          }}
        >
          <div style={{ display: "flex" }}>
            Matt Hicks — product designer &amp; engineer
          </div>
          <div style={{ display: "flex" }}>Tampa, FL · remote</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Archivo", data: archivo, weight: 700, style: "normal" }],
    }
  );
}
