import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "文章",
  description: "静かな森的全部文章列表。",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
          Archive
        </p>
        <h1 className="font-display text-5xl tracking-tight">博客文章</h1>
        <p className="max-w-2xl text-base leading-8 text-[var(--color-soft-text)]">
          这里收纳目前已发布的全部内容。Phase 1
          先用文件系统管理文章，后续可以无缝扩展到 MDX、数据库或 CMS。
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </section>
    </div>
  );
}
