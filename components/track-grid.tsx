import { songs } from "@/lib/site";

import { Reveal } from "./reveal";

export function TrackGrid({ compact = false }: { compact?: boolean }) {
  const list = compact ? songs.slice(0, 3) : songs;

  return (
    <div className={`track-grid ${compact ? "is-compact" : ""}`}>
      {list.map((song, index) => (
        <Reveal key={song.id} className="track-card media-card" delay={index * 90}>
          <div className={`track-card-glow bg-gradient-to-r ${song.accent}`} />
          <div className="track-card-top">
            <p className="eyebrow">{song.genre}</p>
            <span>{song.runtime}</span>
          </div>
          <h3>{song.title}</h3>
          <p>{song.description}</p>
          <div className="track-mood">{song.mood}</div>
          <audio controls preload="none" src={song.audioSrc} className="track-player" />
          <div className="track-actions">
            <a className="pill-button" href={song.downloadSrc} download>
              Download
            </a>
            <a className="ghost-button" href={song.lyricsSrc} download>
              Lyrics
            </a>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
