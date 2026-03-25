"use client";

import { useEffect } from "react";

export function AudioGovernor() {
  useEffect(() => {
    const handlePlay = (event: Event) => {
      const current = event.target;
      if (!(current instanceof HTMLAudioElement)) return;

      for (const node of document.querySelectorAll("audio")) {
        if (node !== current) {
          node.pause();
        }
      }
    };

    document.addEventListener("play", handlePlay, true);
    return () => document.removeEventListener("play", handlePlay, true);
  }, []);

  return null;
}
