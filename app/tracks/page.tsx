import { Reveal } from "@/components/reveal";
import { TrackGrid } from "@/components/track-grid";
import { featuredVisuals } from "@/lib/site";

export default function TracksPage() {
  const visual = featuredVisuals[1];

  return (
    <section className="page-shell">
      <Reveal className="page-intro">
        <p className="eyebrow">Tracks</p>
        <h1>Five one-minute records. Five different moods. One clean vault.</h1>
        <p>
          Hip-hop, 90s R&B, rock, 80s synth, and soul-pop all sit here as full downloadable tracks with lyrics.
        </p>
      </Reveal>
      <div className="split-section">
        <Reveal className="media-card page-media-slab">
          <video autoPlay loop muted playsInline poster={visual.poster}>
            <source src={visual.src} type="video/mp4" />
          </video>
        </Reveal>
        <Reveal className="section-copy" delay={100}>
          <p className="eyebrow">Range</p>
          <h2>The songs should feel like five lanes of the same world, not five random prompts.</h2>
          <p>
            The visual layer on this route now supports the pack instead of sitting beside it, so the tracks feel
            more like a single release environment.
          </p>
        </Reveal>
      </div>
      <TrackGrid />
    </section>
  );
}
