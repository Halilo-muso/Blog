"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const nextProgress = Math.min(100, (scrollTop / documentHeight) * 100);
      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="sticky top-[73px] z-20 h-1 w-full overflow-hidden rounded-full bg-[color:color-mix(in_srgb,var(--color-border)_70%,transparent)]">
      <div
        className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-accent),var(--color-accent-strong))] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
