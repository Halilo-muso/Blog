"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const storageKey = "forest-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    const nextTheme =
      stored === "light" || stored === "dark" ? stored : systemTheme;

    applyTheme(nextTheme);
    setTheme(nextTheme);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
    setTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="切换深色模式"
      className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-3 py-2 text-sm text-[var(--color-soft-text)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      {mounted ? (theme === "dark" ? "深色" : "浅色") : "主题"}
    </button>
  );
}
