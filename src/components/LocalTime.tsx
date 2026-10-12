"use client";

import { useEffect, useState } from "react";

// Live local time for Tampa — a small, true detail in the footer.
export default function LocalTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="footer-clock" suppressHydrationWarning>
      Tampa, FL {time ? `· ${time}` : ""}
    </span>
  );
}
