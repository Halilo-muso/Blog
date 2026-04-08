"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/posts";

type PostTableOfContentsProps = {
  items: TocItem[];
  title: string;
};

export function PostTableOfContents({ items, title }: PostTableOfContentsProps) {
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
    <div className="rounded-[1.4rem] border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_80%,transparent)] p-5 shadow-[0_14px_48px_rgba(15,23,42,0.08)] backdrop-blur">
      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-muted)]">
        {title}
      </p>
      <nav className="mt-4 flex flex-col gap-3 text-sm leading-6 text-[var(--color-soft-text)]">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`border-l pl-0 transition ${
                isActive
                  ? "border-[var(--color-accent)] pl-2 text-[var(--color-text)]"
                  : "border-transparent hover:border-[var(--color-accent)] hover:pl-2 hover:text-[var(--color-accent)]"
              } ${item.level === 3 ? "ml-3" : ""}`}
            >
              {item.text}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
