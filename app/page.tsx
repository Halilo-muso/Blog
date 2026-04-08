import Image from "next/image";
import Link from "next/link";
import { getDictionary, type SiteLocale } from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/locale";
import { formatDate, formatReadingTime, getAllPosts, getRecentPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

type StatItem = {
  label: string;
  value: string;
};

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.9c.85 0 1.71.12 2.51.35 1.91-1.34 2.75-1.06 2.75-1.06.55 1.42.2 2.47.1 2.73.64.73 1.03 1.65 1.03 2.78 0 3.98-2.34 4.86-4.57 5.11.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M18.5 5.5v8.75a2.75 2.75 0 1 1-1.5-2.45V8.48l-7 1.56v6.21a2.75 2.75 0 1 1-1.5-2.45V6.84c0-.7.49-1.31 1.18-1.46l7-1.56A1.5 1.5 0 0 1 18.5 5.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const socialLinks = [
  {
    key: "github",
    href: siteConfig.links.github,
    label: "GitHub",
    icon: GitHubIcon,
  },
  {
    key: "music",
    href: siteConfig.links.music,
    label: "NetEase Music",
    icon: MusicIcon,
  },
] as const;

function getHomeStats(
  locale: SiteLocale,
  totalPosts: number,
  categoryCount: number,
  startedValue: string,
  statusLabel: string,
  statusValue: string,
): StatItem[] {
  if (locale === "zh-CN") {
    return [
      { label: "文章", value: String(totalPosts) },
      { label: "分类", value: String(categoryCount) },
      { label: "开始于", value: startedValue },
      { label: statusLabel, value: statusValue },
    ];
  }

  if (locale === "zh-TW") {
    return [
      { label: "文章", value: String(totalPosts) },
      { label: "分類", value: String(categoryCount) },
      { label: "開始於", value: startedValue },
      { label: statusLabel, value: statusValue },
    ];
  }

  return [
    { label: "Posts", value: String(totalPosts) },
    { label: "Categories", value: String(categoryCount) },
    { label: "Started", value: startedValue },
    { label: statusLabel, value: statusValue },
  ];
}

export default async function Home() {
  const locale = await getPreferredLocale();
  const dictionary = getDictionary(locale);
  const recentPosts = await getRecentPosts(3);
  const allPosts = await getAllPosts();
  const [featuredLink, ...secondaryLinks] = dictionary.home.quickLinks;
  const stats = getHomeStats(
    locale,
    allPosts.length,
    new Set(allPosts.map((post) => post.category)).size,
    dictionary.home.startedValue,
    dictionary.home.statusLabel,
    dictionary.home.statusValue,
  );
  const avatar = siteConfig.profile.avatar.trim();
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-18 pb-12 lg:gap-24">
      <section className="space-y-10 border-b border-[var(--color-border)] pb-12 lg:space-y-12 lg:pb-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <div className="space-y-5">
            <p className="text-[0.7rem] uppercase tracking-[0.34em] text-[var(--color-muted)]">
              {dictionary.home.eyebrow}
            </p>
            <div className="space-y-6">
              <p className="text-sm leading-7 text-[var(--color-soft-text)]">
                {dictionary.home.badge}
              </p>
              <h1 className="max-w-4xl font-display text-balance text-[3.3rem] leading-[0.96] tracking-[-0.055em] text-[var(--color-text)] sm:text-[4.35rem] lg:text-[5.55rem]">
                {dictionary.home.title[0]}
                <br />
                {dictionary.home.title[1]}
              </h1>
              <div className="max-w-3xl space-y-4 text-base leading-8 text-[var(--color-soft-text)] sm:text-[1.05rem]">
                <p className="text-[var(--color-text)]">{dictionary.home.role}</p>
                <p>{dictionary.home.bio}</p>
              </div>
            </div>
          </div>

          <aside className="home-quiet-panel rounded-[2rem] p-6">
            <div className="space-y-5">
              <div className="home-avatar-frame">
                {avatar ? (
                  <Image
                    src={avatar}
                    alt={siteConfig.profile.avatarAlt}
                    width={104}
                    height={104}
                    className="home-avatar-image"
                    priority
                  />
                ) : (
                  <div className="home-avatar-fallback">
                    {siteConfig.profile.displayName.slice(0, 1)}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <p className="font-display text-3xl tracking-[-0.05em] text-[var(--color-text)]">
                  {siteConfig.profile.displayName}
                </p>
                <p className="text-sm leading-7 text-[var(--color-soft-text)]">
                  {dictionary.home.statusDescription}
                </p>
              </div>
              <div className="space-y-2 border-t border-[var(--color-border)] pt-4 text-sm text-[var(--color-soft-text)]">
                <p>{siteConfig.profile.role}</p>
                <p>
                  {dictionary.home.started}: {dictionary.home.startedValue}
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-[var(--color-text)] px-5 py-2.5 text-sm font-medium text-[var(--color-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-text)] hover:text-[var(--color-surface)]"
            >
              {dictionary.home.primaryCta}
            </Link>
            <Link
              href="/feed.xml"
              className="inline-flex items-center rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-soft-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
            >
              {dictionary.home.secondaryCta}
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-soft-text)]">
            <span className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--color-muted)]">
              {dictionary.home.linksEyebrow}
            </span>
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3.5 py-2 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
                >
                  <Icon />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        <dl className="grid gap-x-6 gap-y-5 border-y border-[var(--color-border)] py-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="space-y-2">
              <dt className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-muted)]">
                {item.label}
              </dt>
              <dd className="font-display text-3xl tracking-[-0.04em] text-[var(--color-text)]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Link
          href={featuredLink.href}
          className="home-quiet-panel group flex min-h-[17rem] flex-col justify-between rounded-[2rem] p-7 sm:p-8"
        >
          <div className="space-y-5">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-muted)]">
              {featuredLink.title}
            </p>
            <h2 className="max-w-xl font-display text-4xl tracking-[-0.05em] text-[var(--color-text)] sm:text-[3.35rem]">
              {featuredLink.title}
            </h2>
            <p className="max-w-xl text-base leading-8 text-[var(--color-soft-text)]">
              {featuredLink.description}
            </p>
          </div>
          <span className="mt-8 text-sm font-medium text-[var(--color-text)] transition duration-300 group-hover:translate-x-1">
            {dictionary.home.archiveLink} -&gt;
          </span>
        </Link>

        <div className="grid gap-4">
          {secondaryLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="home-quiet-panel group rounded-[1.7rem] p-6"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-muted)]">
                {item.title}
              </p>
              <h3 className="mt-5 font-display text-3xl tracking-[-0.04em] text-[var(--color-text)]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-soft-text)]">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-6 border-t border-[var(--color-border)] pt-8">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-[0.68rem] uppercase tracking-[0.32em] text-[var(--color-muted)]">
              {dictionary.home.recentEyebrow}
            </p>
            <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl">
              {dictionary.home.recentTitle}
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--color-soft-text)] transition hover:text-[var(--color-text)]"
          >
            {dictionary.home.archiveLink}
          </Link>
        </div>

        <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid gap-4 py-5 transition duration-300 first:pt-0 last:pb-0 md:grid-cols-[minmax(0,1fr)_auto]"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                  <span>{formatDate(post.date, locale)}</span>
                  <span>{formatReadingTime(post.readingMinutes, locale)}</span>
                  <span>{dictionary.blog.categories[post.category]}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-3xl tracking-[-0.04em] text-[var(--color-text)] transition group-hover:text-[var(--color-accent)]">
                    {post.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-7 text-[var(--color-soft-text)]">
                    {post.summary}
                  </p>
                </div>
              </div>

              <span className="text-sm font-medium text-[var(--color-soft-text)] transition duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-text)]">
                -&gt;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
