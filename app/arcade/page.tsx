import { Reveal } from "@/components/reveal";
import { SnakeArcade } from "@/components/snake-arcade";

const arcadeNotes = [
  "Touch, swipe, arrows, and WASD all work.",
  "Cyan power-ups trigger slow motion so the run gets tactical.",
  "The mini-game now belongs on mobile, not just desktop."
];

export default function ArcadePage() {
  return (
    <section className="page-shell">
      <Reveal className="page-intro">
        <p className="eyebrow">Arcade</p>
        <h1>A futuristic snake gate that turns the entry into an event.</h1>
        <p>
          The arcade route keeps the energy tactile. It gives the site a memory point and makes the first click feel
          authored instead of generic.
        </p>
      </Reveal>
      <div className="split-section">
        <Reveal>
          <SnakeArcade />
        </Reveal>
        <Reveal className="media-card page-spotlight" delay={100}>
          <p className="eyebrow">Arcade upgrades</p>
          <h2>The gate now feels playable, portable, and bright.</h2>
          <div className="feature-list">
            {arcadeNotes.map((item) => (
              <div key={item} className="feature-bullet">
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
