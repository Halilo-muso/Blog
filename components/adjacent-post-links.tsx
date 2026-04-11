import React from "react";
import Link from "next/link";
import { formatDate, type PostCategory, type PostSummary } from "@/lib/posts";
import type { SiteLocale } from "@/lib/i18n";

type AdjacentPostLinksProps = {
  previous: PostSummary | null;
  next: PostSummary | null;
  locale: SiteLocale;
  labels: {
    newer: string;
    older: string;
  };
  categoryLabels: Record<PostCategory, string>;
};

export function AdjacentPostLinks({ previous, next, locale, labels, categoryLabels }: AdjacentPostLinksProps) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="grid gap-4 border-t border-[var(--color-border)] pt-8 sm:grid-cols-2" aria-label="Post pagination">
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          aria-label={`${labels.newer}: ${next.title}`}
          className="group rounded-[1.7rem] border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_78%,transparent)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
        >
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[var(--color-muted)]">
                  {labels.newer}
                </p>
                <span
                  aria-hidden="true"
                  className="text-lg text-[var(--color-muted)] transition duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-text)]"
                >
                  ��
                </span>
              </div>
              <p className="font-display text-2xl tracking-[-0.04em] text-[var(--color-text)]">{next.title}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-[var(--color-muted)]">
              <time dateTime={next.date}>{formatDate(next.date, locale)}</time>
              <span>{categoryLabels[next.category]}</span>
            </div>
          </div>
        </Link>
      ) : null}

      {previous ? (
        <Link
          href={`/blog/${previous.slug}`}
          aria-label={`${labels.older}: ${previous.title}`}
          className="group rounded-[1.7rem] border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_78%,transparent)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
        >
          <div className="flex h-full flex-col justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[var(--color-muted)]">
                  {labels.older}
                </p>
                <span
                  aria-hidden="true"
                  className="text-lg text-[var(--color-muted)] transition duration-300 group-hover:-translate-x-1 group-hover:text-[var(--color-text)]"
                >
                  ��
                </span>
              </div>
              <p className="font-display text-2xl tracking-[-0.04em] text-[var(--color-text)]">{previous.title}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-[0.24em] text-[var(--color-muted)]">
              <time dateTime={previous.date}>{formatDate(previous.date, locale)}</time>
              <span>{categoryLabels[previous.category]}</span>
            </div>
          </div>
        </Link>
      ) : null}
    </nav>
  );
}
