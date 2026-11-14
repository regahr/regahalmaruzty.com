import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const parkinsans = localFont({
  src: "./fonts/Parkinsans[wght].ttf",
  variable: "--font-parkin-sans",
  weight: "100 900",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

const description =
  "Senior Backend Engineer with 9+ years in fintech, banking and enterprise. Node.js, TypeScript, PostgreSQL, distributed systems, and AI-assisted delivery.";

export const metadata: Metadata = {
  metadataBase: new URL("https://regahalmaruzty.com"),
  title: "Rega Halma Ruzty · Senior Backend Engineer",
  description,
  openGraph: {
    title: "Rega Halma Ruzty · Senior Backend Engineer",
    description,
    url: "https://regahalmaruzty.com",
    siteName: "Rega Halma Ruzty",
    images: [
      {
        url: "/rega.png",
        width: 800,
        height: 600,
        alt: "Rega Halma Ruzty",
      },
    ],
  },
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
