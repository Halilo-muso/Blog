import { SiteUptime } from "@/components/site-uptime";
import { getDictionary } from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/locale";
import { siteConfig } from "@/lib/site";

export async function Footer() {
  const locale = await getPreferredLocale();
  const dictionary = getDictionary(locale);

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-panel)]/72 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-6 text-sm text-[var(--color-soft-text)] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>{dictionary.footer.line}</p>
        <p>{dictionary.footer.stack}</p>
        <p>
          {dictionary.footer.uptimeLabel} <SiteUptime launchedAt={siteConfig.launchedAt} locale={locale} />
        </p>
      </div>
    </footer>
  );
}
