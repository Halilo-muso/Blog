"use client";

import { useEffect, useState } from "react";
import type { SiteLocale } from "@/lib/i18n";

type SiteUptimeProps = {
  launchedAt: string;
  locale: SiteLocale;
};

function formatDuration(totalMs: number, locale: SiteLocale) {
  const totalMinutes = Math.max(0, Math.floor(totalMs / 60000));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (locale === "en") {
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    }

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
  }

  const hourLabel = locale === "zh-TW" ? "小時" : "小时";
  const minuteLabel = locale === "zh-TW" ? "分鐘" : "分钟";

  if (days > 0) {
    return `${days}天 ${hours}${hourLabel} ${minutes}${minuteLabel}`;
  }

  if (hours > 0) {
    return `${hours}${hourLabel} ${minutes}${minuteLabel}`;
  }

  return `${minutes}${minuteLabel}`;
}

export function SiteUptime({ launchedAt, locale }: SiteUptimeProps) {
  const [uptime, setUptime] = useState("--");

  useEffect(() => {
    const launched = new Date(launchedAt).getTime();

    const update = () => {
      setUptime(formatDuration(Date.now() - launched, locale));
    };

    update();
    const timer = window.setInterval(update, 60000);

    return () => {
      window.clearInterval(timer);
    };
  }, [launchedAt, locale]);

  return <span>{uptime}</span>;
}
