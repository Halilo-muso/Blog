"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  LOCALE_COOKIE_NAME,
  localeLabels,
  locales,
  type SiteLocale,
} from "@/lib/i18n";

type LocaleSwitcherProps = {
  locale: SiteLocale;
};

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (nextLocale: SiteLocale) => {
    if (nextLocale === locale) {
      return;
    }

    document.cookie = `${LOCALE_COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = nextLocale;

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[color:color-mix(in_srgb,var(--color-card)_82%,transparent)] p-1">
      {locales.map((item) => {
        const active = item === locale;

        return (
          <button
            key={item}
            type="button"
            onClick={() => handleLocaleChange(item)}
            disabled={active || isPending}
            className={`rounded-full px-3 py-2 text-xs font-semibold tracking-[0.18em] transition duration-300 ${
              active
                ? "bg-[var(--color-text)] text-[var(--color-surface)]"
                : "text-[var(--color-soft-text)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
            }`}
            aria-pressed={active}
            aria-label={`Switch language to ${item}`}
          >
            {localeLabels[item]}
          </button>
        );
      })}
    </div>
  );
}
