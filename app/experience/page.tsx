import { Reveal } from "@/components/reveal";
import { featuredVisuals } from "@/lib/site";

const pillars = [
  {
    title: "Enter like a world",
    copy: "The first screen behaves like a threshold, not a standard homepage."
  },
  {
    title: "Proof lives in the songs",
    copy: "Five short records show range immediately instead of talking around it."
  },
  {
    title: "Motion has a job",
    copy: "Letters, videos, hover borders, and scroll reveals all support attention."
  }
];

export default function ExperiencePage() {
  const visual = featuredVisuals[3];

  return (
    <section className="page-shell">
      <Reveal className="page-intro">
        <p className="eyebrow">Experience</p>
        <h1>This project is built to feel like a vivid release world, not a template.</h1>
        <p>
          The color, the motion, the game gate, the voice intro, and the download flow are all arranged to make the
          pack feel valuable before anyone asks what tools touched it.
        </p>
      </Reveal>
      <div className="split-section">
        <Reveal className="media-card page-media-slab">
          <video autoPlay loop muted playsInline poster={visual.poster}>
            <source src={visual.src} type="video/mp4" />
          </video>
        </Reveal>
        <Reveal className="section-copy" delay={100}>
          <p className="eyebrow">Brighter motion</p>
          <h2>Every route should feel like part of the same world, not a dead-end branch.</h2>
          <p>
            The experience route now leans on fresh motion and cleaner pacing so the site feels like a living release
            environment from splash to contact.
          </p>
        </Reveal>
      </div>
      <div className="pillar-grid">
        {pillars.map((pillar, index) => (
          <Reveal key={pillar.title} className="media-card pillar-card" delay={index * 90}>
            <h2>{pillar.title}</h2>
            <p>{pillar.copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
