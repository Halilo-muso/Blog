"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/posts";

type PostTableOfContentsProps = {
  items: TocItem[];
  title: string;
  compact?: boolean;
};

export function PostTableOfContents({
  items,
  title,
  compact = false,
}: PostTableOfContentsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const updateActiveId = () => {
      const headings = items
        .map((item) => document.getElementById(item.id))
        .filter((element): element is HTMLElement => element instanceof HTMLElement);

      if (headings.length === 0) {
        return;
      }

      const threshold = 140;
      let nextActiveId = headings[0].id;

      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= threshold) {
          nextActiveId = heading.id;
        } else {
          break;
        }
      }

      setActiveId(nextActiveId);
    };

    updateActiveId();
    window.addEventListener("scroll", updateActiveId, { passive: true });
    window.addEventListener("resize", updateActiveId);

    return () => {
      window.removeEventListener("scroll", updateActiveId);
      window.removeEventListener("resize", updateActiveId);
    };
  }, [items]);

  return (
    <div
      className={`rounded-[1.4rem] border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_82%,transparent)] backdrop-blur ${
        compact
          ? "p-4 shadow-none"
          : "p-5 shadow-[0_14px_48px_rgba(15,23,42,0.08)]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-muted)]">
          {title}
        </p>
        {!compact ? (
          <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {items.length}
          </span>
        ) : null}
      </div>
      <nav
        className={`mt-4 flex flex-col text-sm leading-6 text-[var(--color-soft-text)] ${
          compact ? "gap-2" : "gap-2.5"
        }`}
      >
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rounded-xl border px-3 py-2 transition duration-300 ${
                isActive
                  ? "border-[color:color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))] bg-[color:color-mix(in_srgb,var(--color-accent)_10%,var(--color-card))] text-[var(--color-text)]"
                  : "border-transparent text-[var(--color-soft-text)] hover:border-[var(--color-border)] hover:bg-[color:color-mix(in_srgb,var(--color-card)_72%,transparent)] hover:text-[var(--color-text)]"
              } ${item.level === 3 ? (compact ? "ml-2" : "ml-3") : ""}`}
            >
              {item.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
