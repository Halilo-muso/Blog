import Link from "next/link";
import { getDictionary, type SiteLocale } from "@/lib/i18n";
import {
  formatDate,
  formatReadingTime,
  type PostSummary,
} from "@/lib/posts";

type ArticleCardProps = {
  post: PostSummary;
  locale: SiteLocale;
};

export function ArticleCard({ post, locale }: ArticleCardProps) {
  const dictionary = getDictionary(locale);
  const categoryLabel = dictionary.blog.categories[post.category];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
    >
      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
          <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[0.68rem]">
            {categoryLabel}
          </span>
          <span>{formatDate(post.date, locale)}</span>
          <span>{formatReadingTime(post.readingMinutes, locale)}</span>
        </div>
        <h3 className="mt-4 font-display text-3xl leading-tight tracking-tight">
          {post.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--color-soft-text)]">
          {post.summary}
        </p>
      </div>

      {post.tags.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
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
        {dictionary.blog.continueReading}
      </span>
    </Link>
  );
}
