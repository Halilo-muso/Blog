"use client";

import { useEffect, useState } from "react";

type BackToTopButtonProps = {
  label: string;
};

export function BackToTopButton({ label }: BackToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(window.scrollY > 720);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-30 inline-flex h-12 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_88%,transparent)] px-4 text-sm font-medium text-[var(--color-text)] shadow-[0_16px_40px_rgba(15,23,42,0.14)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label={label}
    >
      <span aria-hidden="true">↑</span>
      <span>{label}</span>
    </button>
  );
}
