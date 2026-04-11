import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdjacentPostLinks } from "@/components/adjacent-post-links";
import { BackToTopButton } from "@/components/back-to-top-button";
import { DetailPageMetadata } from "@/components/detail-page-metadata";
import { PostTableOfContents } from "@/components/post-table-of-contents";
import { ReadingProgress } from "@/components/reading-progress";
import { getDictionary } from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/locale";
import {
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
  const hasMobileToc = post.toc.length > 0;
  const categoryLabel = dictionary.blog.categories[post.category];

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
                href="/blog"
                className="inline-flex text-sm text-[var(--color-soft-text)] transition hover:text-[var(--color-accent)]"
              >
                {dictionary.post.back}
              </Link>

              <div className="space-y-4">
                <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[var(--color-muted)]">
                  {categoryLabel}
                </p>
                <h1 className="font-display text-5xl leading-[0.96] tracking-[-0.05em] text-balance xl:text-6xl">
                  {post.title}
                </h1>
                <p className="max-w-3xl text-[1.02rem] leading-8 text-[var(--color-soft-text)] sm:text-lg">
                  {post.summary}
                </p>
              </div>

              <DetailPageMetadata
                date={post.date}
                readingMinutes={post.readingMinutes}
                tags={post.tags}
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
                <PostTableOfContents items={post.toc} title={dictionary.post.toc} compact />
              </div>
            </details>
          ) : null}

          <div className="article-reading-shell">
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>

          <AdjacentPostLinks
            previous={previous}
            next={next}
            locale={locale}
            labels={{
              newer: dictionary.post.newer,
              older: dictionary.post.older,
            }}
            categoryLabels={dictionary.blog.categories}
          />
        </div>

        {hasTocSidebar ? (
          <aside className="hidden lg:block lg:sticky lg:top-28">
            <PostTableOfContents items={post.toc} title={dictionary.post.toc} />
          </aside>
        ) : null}
      </article>
      <BackToTopButton label={dictionary.post.backToTop} />
    </div>
  );
}
