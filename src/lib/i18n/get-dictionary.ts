import type { Locale } from "./locales";
import { en, type Dictionary } from "./dictionaries/en";
import { tr } from "./dictionaries/tr";

const DICTIONARIES: Record<Locale, Dictionary> = { en, tr };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };
