import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackToTopButton } from "@/components/back-to-top-button";
import { DetailPageMetadata } from "@/components/detail-page-metadata";
import { NoteAiVersionPanel } from "@/components/note-ai-version-panel";
import { PostTableOfContents } from "@/components/post-table-of-contents";
import { ReadingProgress } from "@/components/reading-progress";
import { getAllNotes, getNoteBySlug } from "@/lib/content/notes";
import { getDictionary } from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/locale";

type NotePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const notes = await getAllNotes();

  return notes.map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    return {
      title: "Note not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: note.title,
    description: note.summary,
    alternates: {
      canonical: `/notes/${note.slug}`,
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const locale = await getPreferredLocale();
  const dictionary = getDictionary(locale);
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const hasTocSidebar = note.toc.length >= 3;
  const hasMobileToc = note.toc.length > 0;

  return (
    <div className="space-y-6">
      <ReadingProgress />
      <article
        className={`mx-auto w-full gap-12 ${
          hasTocSidebar
            ? "grid max-w-6xl lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start"
            : "max-w-[54rem]"
        }`}
      >
        <div className="min-w-0 space-y-10">
          <header className="relative overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-panel)_84%,transparent)] px-6 py-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:px-8 sm:py-9">
            <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.24),transparent_68%)] blur-2xl" />
            <div className="relative space-y-6">
              <Link
                href="/notes"
                className="inline-flex text-sm text-[var(--color-soft-text)] transition hover:text-[var(--color-accent)]"
              >
                {dictionary.notes.back}
              </Link>

              <div className="space-y-4">
                <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[var(--color-muted)]">
                  {dictionary.notes.eyebrow}
                </p>
                <h1 className="font-display text-5xl leading-[0.96] tracking-[-0.05em] text-balance xl:text-6xl">
                  {note.title}
                </h1>
                <p className="max-w-3xl text-[1.02rem] leading-8 text-[var(--color-soft-text)] sm:text-lg">
                  {note.summary}
                </p>
              </div>

              <DetailPageMetadata
                date={note.date}
                readingMinutes={note.readingMinutes}
                tags={note.tags}
                locale={locale}
                labels={{
                  metadata: dictionary.common.metadata,
                  publishedOn: dictionary.common.publishedOn,
                  readingTime: dictionary.common.readingTime,
                  tags: dictionary.common.tags,
                }}
              />
            </div>
          </header>

          {hasMobileToc ? (
            <details className="article-mobile-toc lg:hidden">
              <summary>
                <span>{dictionary.post.toc}</span>
                <span aria-hidden="true">+</span>
              </summary>
              <div className="mt-4">
                <PostTableOfContents items={note.toc} title={dictionary.post.toc} compact />
              </div>
            </details>
          ) : null}

          <div className="article-reading-shell">
            <div className="article-body" dangerouslySetInnerHTML={{ __html: note.contentHtml }} />
          </div>

          <NoteAiVersionPanel
            contentHtml={note.aiVersionHtml}
            labels={{
              toggle: dictionary.notes.aiVersionToggle,
              badge: dictionary.notes.aiVersionBadge,
              description: dictionary.notes.aiVersionDescription,
            }}
          />
        </div>

        {hasTocSidebar ? (
          <aside className="hidden lg:block lg:sticky lg:top-28">
            <PostTableOfContents items={note.toc} title={dictionary.post.toc} />
          </aside>
        ) : null}
      </article>
      <BackToTopButton label={dictionary.post.backToTop} />
    </div>
  );
}