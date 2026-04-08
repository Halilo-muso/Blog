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

  return (
    <div className="flex flex-col gap-20 pb-6">
      <section className="hero-grid rounded-[2.4rem] border border-[var(--color-border)] bg-[var(--color-panel)]/90 px-6 py-8 shadow-[0_30px_120px_rgba(15,23,42,0.16)] backdrop-blur xl:px-10 xl:py-10">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_85%,transparent)] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[var(--color-muted)]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-accent-strong)]" />
            {dictionary.home.badge}
          </div>

          <div className="space-y-5">
            <p className="max-w-xl text-sm uppercase tracking-[0.35em] text-[var(--color-muted)]">
              {dictionary.home.eyebrow}
            </p>
            <h1 className="hero-title max-w-4xl font-display text-balance text-[3.4rem] leading-[0.94] tracking-[-0.05em] sm:text-[4.8rem] xl:text-[6rem]">
              {dictionary.home.title[0]}
              <br />
              {dictionary.home.title[1]}
            </h1>
            <div className="max-w-2xl space-y-4 text-base leading-8 text-[var(--color-soft-text)] sm:text-lg">
              <p>{dictionary.home.role}</p>
              <p>{dictionary.home.bio}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-strong))] px-6 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-[0_12px_30px_rgba(15,118,110,0.24)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,118,110,0.35)]"
              >
                {dictionary.home.primaryCta}
              </Link>
              <Link
                href="/feed.xml"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_85%,transparent)] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {dictionary.home.secondaryCta}
              </Link>
            </div>

            <div className="flex items-center gap-3 text-[var(--color-muted)]">
              <span className="text-xs uppercase tracking-[0.28em]">{dictionary.home.linksEyebrow}</span>
              <div className="h-px w-10 bg-[var(--color-border)]" />
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
                      className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_82%,transparent)] text-[var(--color-soft-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-text)]"
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6">
            <div className="absolute right-5 top-5 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.34),transparent_68%)] blur-xl" />
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-strong))] font-display text-3xl text-[var(--color-accent-foreground)] shadow-[0_16px_40px_rgba(15,118,110,0.28)]">
                  S
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    {dictionary.home.statusLabel}
                  </p>
                  <p className="mt-1 text-xl font-semibold text-[var(--color-text)]">
                    {dictionary.home.statusValue}
                  </p>
                </div>
              </div>
              <p className="max-w-md text-sm leading-7 text-[var(--color-soft-text)]">
                {dictionary.home.statusDescription}
              </p>
              <div className="rounded-[1.2rem] border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-surface)_74%,transparent)] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  {dictionary.home.started}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-[var(--color-text)]">
                  {dictionary.home.startedValue}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-[var(--color-border)] pt-4 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                {dictionary.home.highlights.map((item, index) => (
                  <div key={item.label} className="flex items-center gap-3">
                    {index > 0 ? <span className="h-1 w-1 rounded-full bg-[var(--color-border)]" /> : null}
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {dictionary.home.quickLinks.map((item, index) => (
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
              {dictionary.home.recentEyebrow}
            </p>
            <h2 className="font-display text-4xl tracking-tight">{dictionary.home.recentTitle}</h2>
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
