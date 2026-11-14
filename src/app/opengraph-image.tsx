import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/content/site";

// Link preview card (LinkedIn, Slack, X). Rendered once at build time.
export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fontDir = join(process.cwd(), "src/app/og-fonts");
  const [regular, medium] = await Promise.all([
    readFile(join(fontDir, "jetbrains-mono-latin-400-normal.woff")),
    readFile(join(fontDir, "jetbrains-mono-latin-500-normal.woff")),
  ]);

  const green = "#22c55e";
  const muted = "#94a3b8";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1120",
          color: "#e2e8f0",
          padding: "72px 80px",
          fontFamily: "JetBrains Mono",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: muted }}>
          <span style={{ color: green }}>$</span>
          <span style={{ marginLeft: 16 }}>whoami</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 500, letterSpacing: -2, lineHeight: 1.05 }}>{profile.name}</div>
          <div style={{ fontSize: 40, marginTop: 20 }}>{profile.title}</div>
          <div style={{ fontSize: 26, color: green, marginTop: 18 }}>{profile.tagline}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: muted }}>
          <span>9+ yrs · fintech · banking · enterprise</span>
          <span>
            <span style={{ color: green }}>~/</span>regahalmaruzty.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400, style: "normal" },
        { name: "JetBrains Mono", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
