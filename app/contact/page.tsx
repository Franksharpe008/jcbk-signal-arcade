import { LeadForm } from "@/components/lead-form";
import { Reveal } from "@/components/reveal";
import { featuredVisuals } from "@/lib/site";

export default function ContactPage() {
  const visual = featuredVisuals[4];

  return (
    <section className="page-shell">
      <Reveal className="page-intro">
        <p className="eyebrow">Contact</p>
        <h1>Capture the next move while the music still has their attention.</h1>
        <p>
          This route is the live handoff. It takes the energy from the songs and turns it into a real name, email,
          interest, and message that can be acted on.
        </p>
      </Reveal>
      <div className="split-section">
        <LeadForm />
        <Reveal className="media-card page-media-slab" delay={100}>
          <img src={visual.src} alt={visual.title} />
        </Reveal>
      </div>
    </section>
  );
}
