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
