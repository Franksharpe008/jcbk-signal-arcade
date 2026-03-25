"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { featuredVisuals, footerLinks, navItems, siteName } from "@/lib/site";

import { AudioDock } from "./audio-dock";
import { AudioGovernor } from "./audio-governor";
import { MotionLayer } from "./motion-layer";

function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="site-nav">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className={pathname === item.href ? "is-active" : ""}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const footerVisual = featuredVisuals[2];

  return (
    <div className="site-shell">
      <MotionLayer />
      <AudioGovernor />
      <header className="site-header">
        <Link href="/" className="brand-mark" aria-label={siteName}>
          <span className="brand-glyph" />
          <span className="brand-copy">
            <strong>Jacob</strong>
            <em>Signal Arcade</em>
          </span>
        </Link>
        <NavLinks />
        <Link className="header-cta" href="/downloads">
          Get the pack
        </Link>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="site-footer-grid">
          <div className="footer-lead">
            <p className="eyebrow">Close strong</p>
            <h2>The site is the trailer. Jacob&apos;s songs are the proof.</h2>
            <p>
              Move through the arcade gate, play the five-track vault, or send a note if you want a brighter custom
              world built around your own release.
            </p>
          </div>
          <div className="site-footer-media media-card">
            <video autoPlay loop muted playsInline poster={footerVisual.poster}>
              <source src={footerVisual.src} type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="footer-links">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </footer>
      <AudioDock />
    </div>
  );
}
