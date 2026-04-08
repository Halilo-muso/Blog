import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { getDictionary } from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/locale";
import { getPostsByCategory, postCategories } from "@/lib/posts";

const pageTitle = "Blog";
const pageDescription =
  "All posts published on Shalilo, including notes, diary entries, and long-form writing.";

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

export default async function BlogPage() {
  const locale = await getPreferredLocale();
  const dictionary = getDictionary(locale);
  const groupedPosts = await getPostsByCategory();

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
          {groupedPosts.map((group) => (
            <a
              key={group.category}
              href={`#category-${group.category}`}
              className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_76%,transparent)] px-4 py-2 text-sm text-[var(--color-soft-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
            >
              <span>{dictionary.blog.categories[group.category]}</span>
              <span className="rounded-full bg-[color:color-mix(in_srgb,var(--color-surface)_82%,transparent)] px-2 py-0.5 text-xs text-[var(--color-muted)]">
                {group.posts.length}
              </span>
            </a>
          ))}
        </div>
      </section>

      <div className="space-y-12">
        {postCategories.map((category) => {
          const group = groupedPosts.find((item) => item.category === category);
          const posts = group?.posts ?? [];

          return (
            <section key={category} id={`category-${category}`} className="space-y-6 scroll-mt-28">
              <div className="flex items-end justify-between gap-4 border-b border-[var(--color-border)] pb-4">
                <div className="space-y-2">
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-muted)]">
                    {dictionary.blog.categoryOverview}
                  </p>
                  <h2 className="font-display text-4xl tracking-tight text-[var(--color-text)]">
                    {dictionary.blog.categories[category]}
                  </h2>
                </div>
                <span className="text-sm text-[var(--color-muted)]">
                  {posts.length}
                </span>
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
