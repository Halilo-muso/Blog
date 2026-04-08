import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { getDictionary } from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/locale";
import { getAllPosts } from "@/lib/posts";

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
  const posts = await getAllPosts();

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
          {dictionary.blog.eyebrow}
        </p>
        <h1 className="font-display text-5xl tracking-tight">{dictionary.blog.title}</h1>
        <p className="max-w-2xl text-base leading-8 text-[var(--color-soft-text)]">
          {dictionary.blog.description}
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} locale={locale} />
        ))}
      </section>
    </div>
  );
}


