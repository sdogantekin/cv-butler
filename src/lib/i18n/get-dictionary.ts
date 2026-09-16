import type { Locale } from "./locales";
import { en, type Dictionary } from "./dictionaries/en";
import { tr } from "./dictionaries/tr";
import { de } from "./dictionaries/de";

const DICTIONARIES: Record<Locale, Dictionary> = { en, tr, de };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export type { Dictionary };
