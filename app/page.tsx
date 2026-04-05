import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { getRecentPosts } from "@/lib/posts";

export default async function Home() {
  const recentPosts = await getRecentPosts(3);

  return (
    <div className="flex flex-col gap-16">
      <section className="grid gap-10 rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-panel)]/85 px-6 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.16)] backdrop-blur md:grid-cols-[1.5fr_0.9fr] md:px-10 md:py-14">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-[var(--color-muted)]">
            Quietly Building
          </p>
          <div className="space-y-4">
            <h1 className="font-display text-5xl leading-none tracking-tight text-balance sm:text-6xl">
              This is Shalilo,
              <br />
              a personal blog that is still growing.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-soft-text)] sm:text-lg">
              This is the Phase 1 version. It already supports Markdown posts,
              a post archive, detail pages, and a calm dark-first reading
              experience.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] transition hover:translate-y-[-1px] hover:opacity-95"
            >
              Browse posts
            </Link>
            <Link
              href="/blog/hello-forest"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Read sample post
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <p className="text-sm text-[var(--color-muted)]">Current status</p>
            <p className="mt-3 text-2xl font-semibold">Phase 1 shell</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-soft-text)]">
              Next.js 15 App Router, Tailwind CSS, filesystem Markdown, and a
              simple theme toggle.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <p className="text-sm text-[var(--color-muted)]">What comes next</p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-soft-text)]">
              Metadata, table of contents, syntax highlighting, better article
              navigation, and stronger typography.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
              Recent Posts
            </p>
            <h2 className="font-display text-3xl tracking-tight">Latest writing</h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--color-soft-text)] transition hover:text-[var(--color-accent)]"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
