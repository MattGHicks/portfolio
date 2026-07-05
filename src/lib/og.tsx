import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// Shared Open Graph card — a Working Drawing "sheet": dark ground, framed
// border, accent rule, Archivo display. Rendered at build time for every
// static route, so it costs nothing at runtime.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const archivo = readFileSync(
  join(process.cwd(), "src/assets/fonts/Archivo-Bold.ttf")
);

export function ogImage({
  title,
  meta,
  accent = "#ff4b21",
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
          background: "#0d0f10",
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
            border: "1px solid rgba(230,228,223,0.22)",
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
          <div style={{ display: "flex", fontSize: 24, color: "#9a978f" }}>
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
              color: "#e6e4df",
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#9a978f" }}>
            {meta}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 21,
            color: "#6d6b64",
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
