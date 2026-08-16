"use client";

import { useEffect, useRef } from "react";

export function FxLayer() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onMove = (event: MouseEvent) => {
      el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="fx-root" aria-hidden>
      <div className="fx-aurora fx-aurora-a" />
      <div className="fx-aurora fx-aurora-b" />
      <div className="fx-aurora fx-aurora-c" />
      <div className="fx-grid" />
      <div className="fx-scan" />
      <div className="fx-vignette" />
      <div ref={cursorRef} className="fx-cursor" />
    </div>
  );
}
