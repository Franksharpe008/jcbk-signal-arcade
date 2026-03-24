"use client";

import { useMemo, useRef, useState } from "react";

import { introTracks } from "@/lib/site";

export function AudioDock() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(introTracks[0].id);
  const refs = useRef<Record<string, HTMLAudioElement | null>>({});

  const current = useMemo(
    () => introTracks.find((track) => track.id === active) ?? introTracks[0],
    [active]
  );

  const togglePlay = async () => {
    const target = refs.current[active];
    if (!target) return;

    for (const track of introTracks) {
      if (track.id !== active) {
        refs.current[track.id]?.pause();
      }
    }

    if (target.paused) {
      await target.play();
    } else {
      target.pause();
    }
  };

  return (
    <div className={`audio-dock ${open ? "is-open" : ""}`} id="media-dock">
      <button className="audio-dock-toggle" type="button" onClick={() => setOpen((value) => !value)}>
        {open ? "Close" : "Open"}
      </button>
      <div className="audio-dock-copy">
        <p className="eyebrow">Optional audio</p>
        <strong>{current.label}</strong>
        <span>{current.description}</span>
      </div>
      <div className="audio-dock-controls">
        <button className="pill-button" type="button" onClick={togglePlay}>
          Play
        </button>
      </div>
      <div className="audio-dock-track-list">
        {introTracks.map((track) => (
          <button
            key={track.id}
            type="button"
            className={`audio-chip ${track.id === active ? "is-active" : ""}`}
            onClick={() => setActive(track.id)}
          >
            {track.label}
          </button>
        ))}
      </div>
      {introTracks.map((track) => (
        <audio
          key={track.id}
          ref={(node) => {
            refs.current[track.id] = node;
          }}
          preload="none"
          src={track.src}
        />
      ))}
    </div>
  );
}
