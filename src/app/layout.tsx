import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteUrl } from "@/content/site";

const parkinsans = localFont({
  src: "./fonts/Parkinsans[wght].ttf",
  variable: "--font-parkin-sans",
  weight: "100 900",
});

// Self-hosted (OFL, see fonts/JetBrainsMono-OFL.txt): next/font/google 14.2.x
// fails on Vercel when Google serves font URLs without a file extension.
const jetbrainsMono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-jetbrains-mono",
});

const description =
  "Senior Backend Engineer with 9+ years in fintech, banking and enterprise. Node.js, TypeScript, PostgreSQL, distributed systems, and AI-assisted delivery.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  title: "Rega Halma Ruzty · Senior Backend Engineer",
  description,
  openGraph: {
    title: "Rega Halma Ruzty · Senior Backend Engineer",
    description,
    url: "/",
    siteName: "Rega Halma Ruzty",
    type: "profile",
    locale: "en_US",
    // image comes from app/opengraph-image.tsx
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${parkinsans.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
