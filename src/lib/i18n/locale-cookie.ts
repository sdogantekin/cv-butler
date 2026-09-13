import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE_NAME, isLocale, type Locale } from "./locales";

// Server-only: reads the locale cookie set by LanguageSwitcher, falling back
// to DEFAULT_LOCALE when unset or set to something no longer supported.
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE_NAME)?.value;
  return value && isLocale(value) ? value : DEFAULT_LOCALE;
}
