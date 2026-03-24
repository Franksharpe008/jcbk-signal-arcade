import { Reveal } from "@/components/reveal";
import { SnakeArcade } from "@/components/snake-arcade";

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
      <SnakeArcade />
    </section>
  );
}
