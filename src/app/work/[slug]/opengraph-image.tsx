import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { caseStudies, profile } from "@/content/site";

// Per case study preview card, same look as the homepage card.
export const alt = "Case study by Rega Halma Ruzty";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: { slug: string } }) {
  const c = caseStudies.find((x) => x.slug === params.slug) ?? caseStudies[0];
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
        <div style={{ display: "flex", fontSize: 28, color: muted }}>
          <span style={{ color: green }}>{"// "}</span>
          <span style={{ marginLeft: 12 }}>case study · {c.meta}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 500, letterSpacing: -1.5, lineHeight: 1.12 }}>{c.title}</div>
          <div style={{ fontSize: 28, color: green, marginTop: 26, lineHeight: 1.35 }}>{c.result}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: muted }}>
          <span>
            {profile.name} · {profile.title}
          </span>
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
