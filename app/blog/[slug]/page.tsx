import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getAllPosts, getPostBySlug } from "@/lib/posts";

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
      title: "文章不存在",
    };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-10">
      <div className="space-y-5 border-b border-[var(--color-border)] pb-8">
        <Link
          href="/blog"
          className="inline-flex text-sm text-[var(--color-soft-text)] transition hover:text-[var(--color-accent)]"
        >
          ← 返回文章列表
        </Link>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
            Journal
          </p>
          <h1 className="font-display text-5xl leading-tight tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="text-base leading-8 text-[var(--color-soft-text)]">
            {post.summary}
          </p>
          <p className="text-sm text-[var(--color-muted)]">
            发布于 {formatDate(post.date)}
          </p>
        </div>
      </div>

      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
