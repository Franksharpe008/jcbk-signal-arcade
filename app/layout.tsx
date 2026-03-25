import type { Metadata } from "next";
import { IBM_Plex_Sans, Orbitron, Space_Grotesk } from "next/font/google";

import { SiteShell } from "@/components/site-shell";

import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading"
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Jacob Kocsis Signal Arcade",
  description:
    "Five original one-minute records inside a vibrant Jacob Kocsis music flagship with a touch-ready arcade gate, animated visuals, video, and direct downloads."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${spaceGrotesk.variable} ${plex.variable}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
