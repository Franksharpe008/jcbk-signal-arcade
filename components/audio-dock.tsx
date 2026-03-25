"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { introTracks } from "@/lib/site";

export function AudioDock() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(introTracks[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const refs = useRef<Record<string, HTMLAudioElement | null>>({});

  const current = useMemo(
    () => introTracks.find((track) => track.id === active) ?? introTracks[0],
    [active]
  );

  const pauseAll = useCallback(() => {
    for (const track of introTracks) {
      const node = refs.current[track.id];
      if (!node) continue;
      node.pause();
      node.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const playTrack = useCallback(async (id: string) => {
    const target = refs.current[id];
    if (!target) return;

    for (const track of introTracks) {
      if (track.id !== id) {
        refs.current[track.id]?.pause();
      }
    }

    await target.play();
    setIsPlaying(true);
  }, []);

  const togglePlay = async () => {
    const target = refs.current[active];
    if (!target) return;

    if (target.paused) {
      await playTrack(active);
      return;
    }

    target.pause();
    setIsPlaying(false);
  };

  useEffect(() => {
    const onPlayIntro = () => {
      setOpen(true);
      setActive("intro-voice");
      window.setTimeout(() => {
        void playTrack("intro-voice");
      }, 60);
    };

    window.addEventListener("site:play-intro", onPlayIntro as EventListener);
    return () => window.removeEventListener("site:play-intro", onPlayIntro as EventListener);
  }, [playTrack]);

  useEffect(() => {
    const onAudioStop = () => setIsPlaying(false);
    const nodes = Object.values(refs.current).filter(Boolean) as HTMLAudioElement[];
    nodes.forEach((node) => {
      node.addEventListener("ended", onAudioStop);
      node.addEventListener("pause", onAudioStop);
    });
    return () => {
      nodes.forEach((node) => {
        node.removeEventListener("ended", onAudioStop);
        node.removeEventListener("pause", onAudioStop);
      });
    };
  }, [active]);

  const selectTrack = async (id: string) => {
    const wasPlaying = isPlaying;
    pauseAll();
    setActive(id);
    if (wasPlaying) {
      window.setTimeout(() => {
        void playTrack(id);
      }, 60);
    }
  };

  return (
    <div className={`audio-dock ${open ? "is-open" : ""}`} id="media-dock">
      <button className="audio-dock-toggle" type="button" onClick={() => setOpen((value) => !value)}>
        {open ? "Close" : "Open"}
      </button>
      <div className="audio-dock-copy">
        <p className="eyebrow">Voice welcome</p>
        <strong>{current.label}</strong>
        <span>{current.description}</span>
      </div>
      <div className="audio-dock-controls">
        <button className="pill-button" type="button" onClick={togglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      <div className="audio-dock-track-list">
        {introTracks.map((track) => (
          <button
            key={track.id}
            type="button"
            className={`audio-chip ${track.id === active ? "is-active" : ""}`}
            onClick={() => void selectTrack(track.id)}
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
