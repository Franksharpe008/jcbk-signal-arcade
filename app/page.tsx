import Link from "next/link";

import { AnimatedWord } from "@/components/animated-word";
import { HeroVideo } from "@/components/hero-video";
import { Reveal } from "@/components/reveal";
import { SplashGate } from "@/components/splash-gate";
import { TrackGrid } from "@/components/track-grid";
import { featuredVisuals, heroMetrics } from "@/lib/site";

export default function HomePage() {
  const [heroVisual, secondaryVisual, arcadeVisual] = featuredVisuals;

  return (
    <>
      <SplashGate />
      <section className="hero-section">
        <HeroVideo src={heroVisual.src} poster={heroVisual.poster || "/media/hero/hero-poster.png"} label="JCBK hero video" />
        <div className="hero-copy">
          <Reveal className="hero-kicker">
            <span className="eyebrow">Music flagship</span>
            <span className="status-chip">Playable entrance</span>
          </Reveal>
          <Reveal as="h1" className="hero-title" delay={80}>
            Press play on a <AnimatedWord text="brighter" /> frequency.
          </Reveal>
          <Reveal as="p" className="hero-summary" delay={160}>
            This is a vibrant music world built around five original one-minute drops, a splash-gate arcade,
            premium video motion, and a download flow that keeps the experience moving.
          </Reveal>
          <Reveal className="hero-actions" delay={220}>
            <Link href="/tracks" className="primary-button">
              Hear the five songs
            </Link>
            <Link href="/arcade" className="ghost-button">
              Play the gate
            </Link>
          </Reveal>
          <Reveal className="metric-row" delay={260}>
            {heroMetrics.map((metric) => (
              <div key={metric.label} className="metric-card media-card">
                <p className="eyebrow">{metric.label}</p>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-shell">
        <Reveal className="section-heading">
          <p className="eyebrow">Featured tracks</p>
          <h2>The pack is the proof.</h2>
          <p>Each record is one minute long, styled for a different lane, and ready to preview or download.</p>
        </Reveal>
        <TrackGrid compact />
      </section>

      <section className="section-shell split-section">
        <Reveal className="media-card">
          <div className="section-video-card">
            <video autoPlay loop muted playsInline poster={secondaryVisual.poster}>
              <source src={secondaryVisual.src} type="video/mp4" />
            </video>
          </div>
        </Reveal>
        <Reveal className="section-copy" delay={100}>
          <p className="eyebrow">Visual rhythm</p>
          <h2>Videos keep the page alive before the listener even presses play.</h2>
          <p>
            The site layers hero motion, section loops, hover animation, and a live game gate so every scroll step
            keeps a pulse without drowning the songs.
          </p>
          <Link href="/visuals" className="ghost-button">
            See the motion system
          </Link>
        </Reveal>
      </section>

      <section className="section-shell split-section reverse">
        <Reveal className="section-copy">
          <p className="eyebrow">Arcade entry</p>
          <h2>The first touch feels like crossing a threshold, not loading a brochure.</h2>
          <p>
            The splash page gives visitors something to do, the audio dock gives them something to hear, and the
            tracks page gives them a reason to stay longer than a normal promo site.
          </p>
          <Link href="/downloads" className="primary-button">
            Grab the bundle
          </Link>
        </Reveal>
        <Reveal className="media-card" delay={100}>
          <div className="section-video-card">
            <video autoPlay loop muted playsInline poster={arcadeVisual.poster}>
              <source src={arcadeVisual.src} type="video/mp4" />
            </video>
          </div>
        </Reveal>
      </section>
    </>
  );
}
