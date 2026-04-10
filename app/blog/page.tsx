import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { getDictionary } from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/locale";
import { getPostsByCategory, isPostCategory, postCategories } from "@/lib/posts";

const pageTitle = "Blog";
const pageDescription =
  "All formal posts published on Shalilo, grouped by category for a clearer browsing flow.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `${pageTitle} | Shalilo`,
    description: pageDescription,
    url: "/blog",
    type: "website",
  },
  twitter: {
    title: `${pageTitle} | Shalilo`,
    description: pageDescription,
  },
};

type BlogPageProps = {
  searchParams: Promise<{ category?: string }>;
};

function getChipClassName(active: boolean) {
  return [
    "inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition duration-300",
    active
      ? "border-[var(--color-accent)] bg-[color:color-mix(in_srgb,var(--color-accent)_15%,var(--color-card))] text-[var(--color-text)]"
      : "border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_76%,transparent)] text-[var(--color-soft-text)] hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-text)]",
  ].join(" ");
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const locale = await getPreferredLocale();
  const dictionary = getDictionary(locale);
  const groupedPosts = await getPostsByCategory();
  const { category } = await searchParams;
  const activeCategory = isPostCategory(category) ? category : null;
  const visibleCategories = activeCategory ? [activeCategory] : postCategories;

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
          {dictionary.blog.eyebrow}
        </p>
        <h1 className="font-display text-5xl tracking-tight">{dictionary.blog.title}</h1>
        <p className="max-w-2xl text-base leading-8 text-[var(--color-soft-text)]">
          {dictionary.blog.description}
        </p>
      </section>

      <section className="space-y-4">
        <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[var(--color-muted)]">
          {dictionary.blog.categoryOverview}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/blog" className={getChipClassName(activeCategory === null)}>
            <span>{dictionary.blog.allPosts}</span>
            <span className="rounded-full bg-[color:color-mix(in_srgb,var(--color-surface)_82%,transparent)] px-2 py-0.5 text-xs text-[var(--color-muted)]">
              {groupedPosts.reduce((total, group) => total + group.posts.length, 0)}
            </span>
          </Link>

          {groupedPosts.map((group) => (
            <Link
              key={group.category}
              href={`/blog?category=${group.category}`}
              className={getChipClassName(activeCategory === group.category)}
            >
              <span>{dictionary.blog.categories[group.category]}</span>
              <span className="rounded-full bg-[color:color-mix(in_srgb,var(--color-surface)_82%,transparent)] px-2 py-0.5 text-xs text-[var(--color-muted)]">
                {group.posts.length}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="space-y-12">
        {visibleCategories.map((categoryKey) => {
          const group = groupedPosts.find((item) => item.category === categoryKey);
          const posts = group?.posts ?? [];

          return (
            <section
              key={categoryKey}
              id={`category-${categoryKey}`}
              className="space-y-6 scroll-mt-28"
            >
              <div className="flex flex-col gap-4 border-b border-[var(--color-border)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-muted)]">
                    {dictionary.blog.categoryOverview}
                  </p>
                  <h2 className="font-display text-4xl tracking-tight text-[var(--color-text)]">
                    {dictionary.blog.categories[categoryKey]}
                  </h2>
                </div>
                <div className="flex items-center gap-3 text-sm text-[var(--color-muted)]">
                  <span>{posts.length}</span>
                  <Link
                    href={`/blog/category/${categoryKey}`}
                    className="transition hover:text-[var(--color-accent)]"
                  >
                    {dictionary.blog.viewCategory}
                  </Link>
                </div>
              </div>

              {posts.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {posts.map((post) => (
                    <ArticleCard key={post.slug} post={post} locale={locale} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_60%,transparent)] px-5 py-6 text-sm text-[var(--color-soft-text)]">
                  {dictionary.blog.emptyCategory}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

