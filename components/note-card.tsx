import React from "react";
import Link from "next/link";
import { getDictionary, type SiteLocale } from "@/lib/i18n";
import { formatDate, formatReadingTime } from "@/lib/posts";
import type { NoteSummary } from "@/lib/content/notes";

type NoteCardProps = {
  note: NoteSummary;
  locale: SiteLocale;
};

export function NoteCard({ note, locale }: NoteCardProps) {
  const dictionary = getDictionary(locale);

  return (
    <Link
      href={`/notes/${note.slug}`}
      className="group flex h-full flex-col rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
    >
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
        <span>{formatDate(note.date, locale)}</span>
        <span>{formatReadingTime(note.readingMinutes, locale)}</span>
      </div>
      <h3 className="mt-4 font-display text-3xl leading-tight tracking-tight">{note.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[var(--color-soft-text)]">{note.summary}</p>
      {note.tags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-soft-text)]"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      <span className="mt-6 text-sm font-semibold text-[var(--color-accent)]">
        {dictionary.notes.continueReading}
      </span>
    </Link>
  );
}

