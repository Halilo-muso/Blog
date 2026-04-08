import { cookies } from "next/headers";
import {
  defaultLocale,
  isSupportedLocale,
  LOCALE_COOKIE_NAME,
  type SiteLocale,
} from "@/lib/i18n";

export async function getPreferredLocale(): Promise<SiteLocale> {
  const cookieStore = await cookies();
  const storedLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  if (isSupportedLocale(storedLocale)) {
    return storedLocale;
  }

  return defaultLocale;
}
