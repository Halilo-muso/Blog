import type { Metadata } from "next";
import { NoteCard } from "@/components/note-card";
import { getAllNotes } from "@/lib/content/notes";
import { getDictionary } from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Notes",
  description: "Process, observations, and stage updates from Shalilo.",
  alternates: {
    canonical: "/notes",
  },
};

export default async function NotesPage() {
  const locale = await getPreferredLocale();
  const dictionary = getDictionary(locale);
  const notes = await getAllNotes();

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
          {dictionary.notes.eyebrow}
        </p>
        <h1 className="font-display text-5xl tracking-tight">{dictionary.notes.title}</h1>
        <p className="max-w-2xl text-base leading-8 text-[var(--color-soft-text)]">
          {dictionary.notes.description}
        </p>
      </section>

      {notes.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} locale={locale} />
          ))}
        </section>
      ) : (
        <div className="rounded-[1.5rem] border border-dashed border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_60%,transparent)] px-5 py-6 text-sm text-[var(--color-soft-text)]">
          {dictionary.notes.empty}
        </div>
      )}
    </div>
  );
}
