import { Reveal } from "@/components/reveal";
import { TrackGrid } from "@/components/track-grid";

export default function TracksPage() {
  return (
    <section className="page-shell">
      <Reveal className="page-intro">
        <p className="eyebrow">Tracks</p>
        <h1>Five one-minute records. Five different moods. One clean vault.</h1>
        <p>
          Hip-hop, 90s R&B, rock, 80s synth, and soul-pop all sit here as full downloadable tracks with lyrics.
        </p>
      </Reveal>
      <TrackGrid />
    </section>
  );
}
