import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import NoiseOverlay from "@/components/NoiseOverlay";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalfish.io"),
  title: "Matt Hicks — Product Designer & Engineer",
  description:
    "Product designer and engineer — 190+ civic sites, nine Horizon Interactive awards, hardware side projects, and an AI-native workflow architected from scratch. Tampa, FL.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <NoiseOverlay />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
