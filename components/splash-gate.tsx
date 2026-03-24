"use client";

import { useEffect, useState } from "react";

import { siteName } from "@/lib/site";

import { SnakeArcade } from "./snake-arcade";

export function SplashGate() {
  const [entered, setEntered] = useState(true);

  useEffect(() => {
    const seen = window.localStorage.getItem("jcbk-entered");
    if (!seen) {
      setEntered(false);
    }
  }, []);

  const handleEnter = () => {
    window.localStorage.setItem("jcbk-entered", "true");
    setEntered(true);
  };

  if (entered) return null;

  return (
    <div className="splash-gate">
      <div className="splash-grid" />
      <div className="splash-copy">
        <p className="eyebrow">Launch gate</p>
        <h1>{siteName}</h1>
        <p>
          Five original one-minute records. A brighter visual world. A playable snake gate before the vault
          opens.
        </p>
        <div className="splash-actions">
          <button className="primary-button" type="button" onClick={handleEnter}>
            Enter the site
          </button>
          <span>Play the gate for a second, then move when you are ready.</span>
        </div>
      </div>
      <SnakeArcade compact />
    </div>
  );
}
