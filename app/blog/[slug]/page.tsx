import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/reading-progress";
import {
  formatDate,
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
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = await getAdjacentPosts(slug);

  return (
    <div className="space-y-6">
      <ReadingProgress />
      <article className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
        <div className="min-w-0 space-y-10">
          <div className="space-y-5 border-b border-[var(--color-border)] pb-8">
            <Link
              href="/blog"
              className="inline-flex text-sm text-[var(--color-soft-text)] transition hover:text-[var(--color-accent)]"
            >
              Back to all posts
            </Link>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
                Journal
              </p>
              <h1 className="font-display text-5xl leading-tight tracking-tight text-balance xl:text-6xl">
                {post.title}
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-soft-text)]">
                {post.summary}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)]">
                <span>{formatDate(post.date)}</span>
                <span>{post.readingTime}</span>
              </div>
              {post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_80%,transparent)] px-3 py-1 text-xs text-[var(--color-soft-text)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {previous || next ? (
            <nav className="grid gap-4 border-t border-[var(--color-border)] pt-8 sm:grid-cols-2">
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    Newer post
                  </p>
                  <p className="mt-3 font-display text-2xl tracking-tight">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {previous ? (
                <Link
                  href={`/blog/${previous.slug}`}
                  className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    Older post
                  </p>
                  <p className="mt-3 font-display text-2xl tracking-tight">
                    {previous.title}
                  </p>
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>

        {post.toc.length > 0 ? (
          <aside className="hidden lg:block lg:sticky lg:top-28">
            <div className="rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-card)]/92 p-5 shadow-[0_14px_48px_rgba(15,23,42,0.08)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                On this page
              </p>
              <nav className="mt-4 flex flex-col gap-3 text-sm text-[var(--color-soft-text)]">
                {post.toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`transition hover:text-[var(--color-accent)] ${
                      item.level === 3 ? "pl-4" : ""
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
