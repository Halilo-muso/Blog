import Link from "next/link";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { getDictionary } from "@/lib/i18n";
import { getPreferredLocale } from "@/lib/locale";

export async function Header() {
  const locale = await getPreferredLocale();
  const dictionary = getDictionary(locale);
  const navigation = dictionary.header.navigation;

  return (
    <header className="sticky top-0 z-30 border-b border-[color:color-mix(in_srgb,var(--color-border)_72%,transparent)] bg-[color:color-mix(in_srgb,var(--color-surface)_82%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <Link
              href="/"
              className="font-display text-[2rem] leading-none tracking-[-0.05em] text-[var(--color-text)]"
            >
              Shalilo
            </Link>
            <p className="mt-1 hidden text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-muted)] sm:block">
              {dictionary.header.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <LocaleSwitcher locale={locale} />
            <div className="h-4 w-px bg-[var(--color-border)]" />
            <ThemeToggle />
          </div>
        </div>

        <nav className="flex items-center gap-5 overflow-x-auto text-sm text-[var(--color-soft-text)] sm:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition duration-300 hover:text-[var(--color-text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
