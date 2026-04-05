import Link from "next/link";
import type { PostSummary } from "@/lib/posts";
import { formatDate } from "@/lib/posts";

type ArticleCardProps = {
  post: PostSummary;
};

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
    >
      <div className="flex flex-1 flex-col">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
          {formatDate(post.date)}
        </p>
        <h3 className="mt-4 font-display text-3xl leading-tight tracking-tight">
          {post.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--color-soft-text)]">
          {post.summary}
        </p>
      </div>
      <span className="mt-6 text-sm font-semibold text-[var(--color-accent)]">
        继续阅读
      </span>
    </Link>
  );
}
