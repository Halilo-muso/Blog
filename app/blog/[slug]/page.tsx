import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/reading-progress";
import { getDictionary } from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/locale";
import {
  formatDate,
  formatReadingTime,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
} from "@/lib/posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/blog/${post.slug}`;
  const publishedTime = new Date(post.date).toISOString();

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "article",
      url: canonicalPath,
      title: post.title,
      description: post.summary,
      publishedTime,
      tags: post.tags,
    },
    twitter: {
      title: `${post.title} | Shalilo`,
      description: post.summary,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const locale = await getPreferredLocale();
  const dictionary = getDictionary(locale);
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = await getAdjacentPosts(slug);
  const hasTocSidebar = post.toc.length >= 3;

  return (
    <div className="space-y-6">
      <ReadingProgress />
      <article
        className={`mx-auto w-full gap-12 ${
          hasTocSidebar
            ? "grid max-w-6xl lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start"
            : "max-w-[54rem]"
        }`}
      >
        <div className="min-w-0 space-y-12">
          <header className="relative overflow-hidden rounded-[2.2rem] border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-panel)_84%,transparent)] px-6 py-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:px-8 sm:py-9">
            <div className="absolute -right-10 top-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.24),transparent_68%)] blur-2xl" />
            <div className="relative space-y-6">
              <Link
                href="/blog"
                className="inline-flex text-sm text-[var(--color-soft-text)] transition hover:text-[var(--color-accent)]"
              >
                {dictionary.post.back}
              </Link>

              <div className="space-y-4">
                <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[var(--color-muted)]">
                  {dictionary.post.section}
                </p>
                <h1 className="font-display text-5xl leading-[0.96] tracking-[-0.05em] text-balance xl:text-6xl">
                  {post.title}
                </h1>
                <p className="max-w-3xl text-[1.02rem] leading-8 text-[var(--color-soft-text)] sm:text-lg">
                  {post.summary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)]">
                <span className="rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_75%,transparent)] px-3 py-1.5">
                  {formatDate(post.date, locale)}
                </span>
                <span className="rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_75%,transparent)] px-3 py-1.5">
                  {formatReadingTime(post.readingMinutes, locale)}
                </span>
              </div>

              {post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_68%,transparent)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--color-soft-text)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </header>

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {previous || next ? (
            <nav className="grid gap-4 border-t border-[var(--color-border)] pt-8 sm:grid-cols-2">
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="rounded-[1.5rem] border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_78%,transparent)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[var(--color-muted)]">
                    {dictionary.post.newer}
                  </p>
                  <p className="mt-4 font-display text-2xl tracking-[-0.04em] text-[var(--color-text)]">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="rounded-[1.5rem] border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_78%,transparent)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.26em] text-[var(--color-muted)]">
                    {dictionary.post.older}
                  </p>
                  <p className="mt-4 font-display text-2xl tracking-[-0.04em] text-[var(--color-text)]">
                    {previous.title}
                  </p>
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>

        {hasTocSidebar ? (
          <aside className="hidden lg:block lg:sticky lg:top-28">
            <div className="rounded-[1.4rem] border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_80%,transparent)] p-5 shadow-[0_14px_48px_rgba(15,23,42,0.08)] backdrop-blur">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-muted)]">
                {dictionary.post.toc}
              </p>
              <nav className="mt-4 flex flex-col gap-3 text-sm leading-6 text-[var(--color-soft-text)]">
                {post.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`border-l border-transparent pl-0 transition hover:border-[var(--color-accent)] hover:pl-2 hover:text-[var(--color-accent)] ${
                      item.level === 3 ? "ml-3" : ""
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        ) : null}
      </article>
    </div>
  );
}
