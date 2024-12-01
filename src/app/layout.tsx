import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const parkinsans = localFont({
  src: "./fonts/Parkinsans[wght].ttf",
  variable: "--font-parkin-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rega Halma Ruzty",
  description: "Personal website of Rega",
  openGraph: {
    title: "Rega Halma Ruzty",
    description: "Personal website of Rega showcasing my work and projects.",
    url: "https://regahalmaruzty.com", // Replace with your actual URL
    siteName: "Rega Halma Ruzty",
    images: [
      {
        url: "https://regahalmaruzty.com/rega.png", // Replace with your actual image URL
        width: 800,
        height: 600,
        alt: "My name",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${parkinsans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
