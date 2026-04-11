import React from "react";
import { formatDate, formatReadingTime } from "@/lib/posts";
import type { SiteLocale } from "@/lib/i18n";

type DetailPageMetadataProps = {
  date: string;
  readingMinutes: number;
  tags: string[];
  locale: SiteLocale;
  labels: {
    metadata: string;
    publishedOn: string;
    readingTime: string;
    tags: string;
  };
};

export function DetailPageMetadata({
  date,
  readingMinutes,
  tags,
  locale,
  labels,
}: DetailPageMetadataProps) {
  return (
    <div className="space-y-3">
      <dl
        aria-label={labels.metadata}
        className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)]"
      >
        <div>
          <dt className="sr-only">{labels.publishedOn}</dt>
          <dd className="rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_75%,transparent)] px-3 py-1.5">
            <time dateTime={date}>{formatDate(date, locale)}</time>
          </dd>
        </div>
        <div>
          <dt className="sr-only">{labels.readingTime}</dt>
          <dd className="rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_75%,transparent)] px-3 py-1.5">
            {formatReadingTime(readingMinutes, locale)}
          </dd>
        </div>
      </dl>

      {tags.length > 0 ? (
        <ul aria-label={labels.tags} className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_68%,transparent)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--color-soft-text)]"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
