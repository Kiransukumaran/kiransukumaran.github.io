"use client";

import { useEffect, useState } from "react";

export function SystemClock() {
  const [now, setNow] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      setNow(
        new Date().toLocaleTimeString("en-GB", {
          hour12: false,
          timeZone: "Asia/Kolkata",
        }),
      );
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="tabular-nums">{now} IST</span>;
}
