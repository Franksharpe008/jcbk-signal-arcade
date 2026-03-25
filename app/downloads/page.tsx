import { Reveal } from "@/components/reveal";
import { bundleFiles, featuredVisuals, songs } from "@/lib/site";

export default function DownloadsPage() {
  const visual = featuredVisuals[2];

  return (
    <section className="page-shell">
      <Reveal className="page-intro">
        <p className="eyebrow">Downloads</p>
        <h1>Everything can be taken with you.</h1>
        <p>The site is bright on purpose, but the pack is still built to leave with one clean click.</p>
      </Reveal>
      <div className="split-section">
        <Reveal className="media-card page-media-slab">
          <video autoPlay loop muted playsInline poster={visual.poster}>
            <source src={visual.src} type="video/mp4" />
          </video>
        </Reveal>
        <Reveal className="section-copy" delay={100}>
          <p className="eyebrow">Takeaway</p>
          <h2>The bundle should feel worth grabbing even if you only landed for one song.</h2>
          <p>
            This route keeps the handoff clean: full pack, single-track downloads, and a brighter visual kit to keep
            the world intact after the session.
          </p>
        </Reveal>
      </div>
      <div className="download-grid">
        {bundleFiles.map((bundle, index) => (
          <Reveal key={bundle.href} className="media-card" delay={index * 90}>
            <p className="eyebrow">Bundle</p>
            <h2>{bundle.label}</h2>
            <p>{bundle.note}</p>
            <a className="primary-button" href={bundle.href} download>
              Download bundle
            </a>
          </Reveal>
        ))}
      </div>
      <div className="download-grid tracks-only">
        {songs.map((song, index) => (
          <Reveal key={song.id} className="media-card" delay={index * 70}>
            <p className="eyebrow">{song.genre}</p>
            <h3>{song.title}</h3>
            <p>{song.mood}</p>
            <a className="ghost-button" href={song.downloadSrc} download>
              Download track
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
