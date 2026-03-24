import { Reveal } from "@/components/reveal";

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
