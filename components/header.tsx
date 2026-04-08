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
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-surface)_76%,transparent)] backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-display text-3xl tracking-[-0.04em] text-[var(--color-text)]"
            >
              Shalilo
            </Link>
            <p className="hidden text-xs uppercase tracking-[0.28em] text-[var(--color-muted)] md:block">
              {dictionary.header.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <LocaleSwitcher locale={locale} />
            <ThemeToggle />
          </div>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_82%,transparent)] p-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm whitespace-nowrap text-[var(--color-soft-text)] transition duration-300 hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
