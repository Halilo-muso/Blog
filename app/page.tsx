import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { getDictionary } from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/locale";
import { getRecentPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
      <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.12 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.9c.85 0 1.71.12 2.51.35 1.91-1.34 2.75-1.06 2.75-1.06.55 1.42.2 2.47.1 2.73.64.73 1.03 1.65 1.03 2.78 0 3.98-2.34 4.86-4.57 5.11.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.27 10.27 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function MusicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
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

export default async function Home() {
  const locale = await getPreferredLocale();
  const dictionary = getDictionary(locale);
  const recentPosts = await getRecentPosts(3);
  const [featuredLink, ...secondaryLinks] = dictionary.home.quickLinks;

  return (
    <div className="flex flex-col gap-24 pb-10">
      <section className="hero-grid rounded-[2.8rem] border border-[var(--color-border)] bg-[var(--color-panel)]/92 px-6 py-8 shadow-[0_28px_120px_rgba(15,23,42,0.14)] backdrop-blur xl:grid xl:grid-cols-[minmax(0,1.22fr)_320px] xl:gap-14 xl:px-10 xl:py-12">
        <div className="space-y-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_82%,transparent)] px-4 py-2 text-[0.68rem] uppercase tracking-[0.32em] text-[var(--color-muted)]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-accent-strong)]" />
            {dictionary.home.badge}
          </div>

          <div className="space-y-6">
            <p className="max-w-xl text-[0.7rem] uppercase tracking-[0.38em] text-[var(--color-muted)] sm:text-xs">
              {dictionary.home.eyebrow}
            </p>
            <h1 className="hero-title max-w-4xl font-display text-balance text-[3.35rem] leading-[0.92] tracking-[-0.06em] sm:text-[4.6rem] xl:text-[6.15rem]">
              {dictionary.home.title[0]}
              <br />
              {dictionary.home.title[1]}
            </h1>
            <div className="max-w-2xl border-l border-[var(--color-border)] pl-5 text-base leading-8 text-[var(--color-soft-text)] sm:text-lg">
              <p>{dictionary.home.role}</p>
              <p className="mt-3">{dictionary.home.bio}</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-strong))] px-6 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-[0_14px_34px_rgba(15,118,110,0.24)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(15,118,110,0.3)]"
              >
                {dictionary.home.primaryCta}
              </Link>
              <Link
                href="/feed.xml"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_78%,transparent)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {dictionary.home.secondaryCta}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[var(--color-muted)]">
              <span className="text-[0.68rem] uppercase tracking-[0.3em]">
                {dictionary.home.linksEyebrow}
              </span>
              <div className="h-px w-12 bg-[var(--color-border)]" />
              <div className="flex items-center gap-2">
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
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_78%,transparent)] text-[var(--color-soft-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <aside className="mt-10 xl:mt-0">
          <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_76%,transparent)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.1)] backdrop-blur">
            <div className="absolute -right-8 top-0 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.3),transparent_70%)] blur-2xl" />
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[var(--color-muted)]">
                  {dictionary.home.statusLabel}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-strong))] font-display text-2xl text-[var(--color-accent-foreground)] shadow-[0_14px_32px_rgba(15,118,110,0.24)]">
                    S
                  </div>
                  <p className="font-display text-3xl leading-none tracking-[-0.04em] text-[var(--color-text)]">
                    {dictionary.home.statusValue}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-7 text-[var(--color-soft-text)]">
                {dictionary.home.statusDescription}
              </p>

              <div className="space-y-3 border-t border-[var(--color-border)] pt-5">
                <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[var(--color-muted)]">
                  {dictionary.home.started}
                </p>
                <p className="font-display text-2xl tracking-[-0.04em] text-[var(--color-text)]">
                  {dictionary.home.startedValue}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--color-border)] pt-5 text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                {dictionary.home.highlights.map((item, index) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {index > 0 ? (
                      <span className="h-1 w-1 rounded-full bg-[var(--color-border)]" />
                    ) : null}
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Link
          href={featuredLink.href}
          className="group rounded-[2rem] border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_76%,transparent)] p-7 shadow-[0_18px_54px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
        >
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[var(--color-muted)]">
            {featuredLink.title}
          </p>
          <p className="mt-6 font-display text-4xl tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl">
            {featuredLink.title}
          </p>
          <p className="mt-6 max-w-lg text-base leading-8 text-[var(--color-soft-text)]">
            {featuredLink.description}
          </p>
          <span className="mt-10 inline-flex text-sm font-medium text-[var(--color-accent)]">
            {dictionary.home.archiveLink}
          </span>
        </Link>

        <div className="grid gap-4">
          {secondaryLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-[1.7rem] border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_70%,transparent)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)]"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[var(--color-muted)]">
                {item.title}
              </p>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-3xl tracking-[-0.04em] text-[var(--color-text)]">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-soft-text)]">
                    {item.description}
                  </p>
                </div>
                <span className="pt-1 text-lg text-[var(--color-muted)] transition duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-accent)]">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-7 border-t border-[var(--color-border)] pt-8">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[var(--color-muted)]">
              {dictionary.home.recentEyebrow}
            </p>
            <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--color-text)] sm:text-5xl">
              {dictionary.home.recentTitle}
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-[var(--color-soft-text)] transition hover:text-[var(--color-accent)]"
          >
            {dictionary.home.archiveLink}
          </Link>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
