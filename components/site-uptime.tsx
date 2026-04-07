"use client";

import { useEffect, useState } from "react";

type SiteUptimeProps = {
  launchedAt: string;
};

function formatDuration(totalMs: number) {
  const totalMinutes = Math.max(0, Math.floor(totalMs / 60000));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

export function SiteUptime({ launchedAt }: SiteUptimeProps) {
  const [uptime, setUptime] = useState("--");

  useEffect(() => {
    const launched = new Date(launchedAt).getTime();

    const update = () => {
      setUptime(formatDuration(Date.now() - launched));
    };

    update();
    const timer = window.setInterval(update, 60000);

    return () => {
      window.clearInterval(timer);
    };
  }, [launchedAt]);

  return <span>{uptime}</span>;
}
