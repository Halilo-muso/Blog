import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { getRecentPosts } from "@/lib/posts";

const quickLinks = [
  {
    title: "Writing",
    description: "Longer posts, build notes, and personal reflections.",
    href: "/blog",
  },
  {
    title: "Now",
    description: "Currently refining the blog, writing more, and learning in public.",
    href: "/blog/diary",
  },
  {
    title: "Direction",
    description: "Aiming for a quieter, sharper, more personal reading experience.",
    href: "/blog/hello-forest",
  },
];

const highlights = [
  { label: "Current stage", value: "Phase 3" },
  { label: "Stack", value: "Next.js 15" },
  { label: "Mode", value: "Dark-first" },
];

export default async function Home() {
  const recentPosts = await getRecentPosts(3);

  return (
    <div className="flex flex-col gap-20 pb-6">
      <section className="hero-grid rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-panel)]/90 px-6 py-8 shadow-[0_30px_120px_rgba(15,23,42,0.16)] backdrop-blur xl:px-10 xl:py-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_85%,transparent)] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent-strong)] animate-pulse" />
            Personal system in progress
          </div>

          <div className="space-y-5">
            <p className="max-w-xl text-sm uppercase tracking-[0.35em] text-[var(--color-muted)]">
              Shalilo&apos;s corner on the web
            </p>
            <h1 className="hero-title max-w-4xl font-display text-balance text-[3.4rem] leading-[0.94] tracking-[-0.05em] sm:text-[4.8rem] xl:text-[6rem]">
              A quieter blog
              <br />
              with sharper edges.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-soft-text)] sm:text-lg">
              This site is no longer just a shell. It is turning into a personal
              reading space for notes, posts, build logs, and the kind of small
              details that make a website feel inhabited.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-strong))] px-6 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-[0_12px_30px_rgba(15,118,110,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,118,110,0.35)]"
            >
              Read the archive
            </Link>
            <Link
              href="/feed.xml"
              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_85%,transparent)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Follow via RSS
            </Link>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6">
            <div className="absolute right-5 top-5 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.34),transparent_68%)] blur-xl" />
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-strong))] font-display text-3xl text-[var(--color-accent-foreground)] shadow-[0_16px_40px_rgba(15,118,110,0.28)]">
                  S
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    Status
                  </p>
                  <p className="mt-1 text-xl font-semibold text-[var(--color-text)]">
                    Building deliberately
                  </p>
                </div>
              </div>
              <p className="max-w-md text-sm leading-7 text-[var(--color-soft-text)]">
                Less noise, fewer rushed additions, more pages that feel worth
                returning to.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {highlights.map((item) => (
              <div key={item.label} className="glass-panel rounded-[1.6rem] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  {item.label}
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {quickLinks.map((item, index) => (
          <Link
            key={item.title}
            href={item.href}
            className="quick-card rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-card)]/90 p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)]">
              {item.title}
            </p>
            <p className="mt-4 font-display text-3xl tracking-tight text-[var(--color-text)]">
              {item.title}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-soft-text)]">
              {item.description}
            </p>
          </Link>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
              Recent posts
            </p>
            <h2 className="font-display text-4xl tracking-tight">Latest writing</h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--color-soft-text)] transition hover:text-[var(--color-accent)]"
          >
            View archive
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

