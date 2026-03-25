"use client";

import { useEffect, useState } from "react";

import { siteName } from "@/lib/site";

import { SnakeArcade } from "./snake-arcade";

export function SplashGate() {
  const [entered, setEntered] = useState(true);

  useEffect(() => {
    const seen = window.localStorage.getItem("jacob-signal-arcade-entered");
    if (!seen) {
      setEntered(false);
    }
  }, []);

  const handleEnter = () => {
    window.localStorage.setItem("jacob-signal-arcade-entered", "true");
    setEntered(true);
    window.dispatchEvent(new CustomEvent("site:play-intro"));
  };

  if (entered) return null;

  return (
    <div className="splash-gate">
      <div className="splash-grid" />
      <div className="splash-copy">
        <p className="eyebrow">Launch gate</p>
        <h1>{siteName}</h1>
        <p>
          Five original one-minute records. A brighter visual world. A playable snake gate with touch controls,
          sound, and slow-motion power-ups before the vault opens.
        </p>
        <div className="splash-actions">
          <button className="primary-button" type="button" onClick={handleEnter}>
            Enter the site
          </button>
          <span>Swipe on mobile or use arrows and WASD. Catch the cyan orb to trigger slow motion.</span>
        </div>
      </div>
      <SnakeArcade />
    </div>
  );
}
