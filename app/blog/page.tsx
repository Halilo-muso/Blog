import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts published on Shalilo.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
          Archive
        </p>
        <h1 className="font-display text-5xl tracking-tight">Blog posts</h1>
        <p className="max-w-2xl text-base leading-8 text-[var(--color-soft-text)]">
          This archive contains every published post. Phase 2 expands the
          reading experience with richer metadata and better post navigation.
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
