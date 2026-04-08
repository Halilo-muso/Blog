"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const storageKey = "forest-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.75v2.5M12 18.75v2.5M21.25 12h-2.5M5.25 12h-2.5M18.54 5.46l-1.77 1.77M7.23 16.77l-1.77 1.77M18.54 18.54l-1.77-1.77M7.23 7.23 5.46 5.46"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M14.5 3.5a7.5 7.5 0 1 0 6 12.05A8.5 8.5 0 1 1 14.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
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

  const label = mounted
    ? theme === "dark"
      ? "Switch to light mode"
      : "Switch to dark mode"
    : "Toggle theme";
  const Icon = mounted && theme === "light" ? MoonIcon : SunIcon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-[var(--color-soft-text)] transition duration-300 hover:border-[var(--color-border)] hover:bg-[color:color-mix(in_srgb,var(--color-card)_70%,transparent)] hover:text-[var(--color-text)]"
    >
      <Icon />
    </button>
  );
}
