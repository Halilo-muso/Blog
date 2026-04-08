import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { getDictionary } from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/locale";
import {
  getPostsForCategory,
  isPostCategory,
  postCategories,
  type PostCategory,
} from "@/lib/posts";

type BlogCategoryPageProps = {
  params: Promise<{ category: string }>;
};

function getChipClassName(active: boolean) {
  return [
    "inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition duration-300",
    active
      ? "border-[var(--color-accent)] bg-[color:color-mix(in_srgb,var(--color-accent)_15%,var(--color-card))] text-[var(--color-text)]"
      : "border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_76%,transparent)] text-[var(--color-soft-text)] hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-text)]",
  ].join(" ");
}

export async function generateStaticParams() {
  return postCategories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: BlogCategoryPageProps): Promise<Metadata> {
  const { category } = await params;

  if (!isPostCategory(category)) {
    return {
      title: "Category not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const locale = await getPreferredLocale();
  const dictionary = getDictionary(locale);
  const categoryLabel = dictionary.blog.categories[category];
  const title = `${categoryLabel} | Blog`;

  return {
    title,
    description: dictionary.blog.description,
    alternates: {
      canonical: `/blog/category/${category}`,
    },
    openGraph: {
      title: `${title} | Shalilo`,
      description: dictionary.blog.description,
      url: `/blog/category/${category}`,
      type: "website",
    },
    twitter: {
      title: `${title} | Shalilo`,
      description: dictionary.blog.description,
    },
  };
}

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { category } = await params;

  if (!isPostCategory(category)) {
    notFound();
  }

  const locale = await getPreferredLocale();
  const dictionary = getDictionary(locale);
  const posts = await getPostsForCategory(category);
  const activeCategory = category as PostCategory;

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <Link
          href="/blog"
          className="inline-flex text-sm text-[var(--color-soft-text)] transition hover:text-[var(--color-accent)]"
        >
          {dictionary.blog.allPosts}
        </Link>
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
          {dictionary.blog.categoryOverview}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <h1 className="font-display text-5xl tracking-tight">
              {dictionary.blog.categories[activeCategory]}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-[var(--color-soft-text)]">
              {dictionary.blog.description}
            </p>
          </div>
          <span className="text-sm text-[var(--color-muted)]">{posts.length}</span>
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[var(--color-muted)]">
          {dictionary.blog.categoryOverview}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/blog" className={getChipClassName(false)}>
            <span>{dictionary.blog.allPosts}</span>
          </Link>
          {postCategories.map((item) => (
            <Link
              key={item}
              href={`/blog/category/${item}`}
              className={getChipClassName(item === activeCategory)}
            >
              <span>{dictionary.blog.categories[item]}</span>
            </Link>
          ))}
        </div>
      </section>

      {posts.length > 0 ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} locale={locale} />
          ))}
        </section>
      ) : (
        <section className="rounded-[1.5rem] border border-dashed border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_60%,transparent)] px-5 py-6 text-sm text-[var(--color-soft-text)]">
          {dictionary.blog.emptyCategory}
        </section>
      )}
    </div>
  );
}
