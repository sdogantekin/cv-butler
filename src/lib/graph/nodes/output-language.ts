import type { Locale } from "@/lib/i18n/locales";

const OUTPUT_LANGUAGE_NAMES: Record<Locale, string> = {
  en: "English",
  tr: "Turkish",
};

// Appended to every node prompt that produces free-text output shown to the
// user, so output language is explicit and deterministic rather than left to
// the model mirroring whatever language the resume/JD happens to be in.
// Fixed literal fields (enum-constrained via withStructuredOutput) are
// already structurally protected from translation — this instruction is a
// clarifying belt-and-suspenders, not the only safeguard.
export function buildOutputLanguageInstruction(locale: Locale): string {
  return `Write all free-text output in natural, fluent ${OUTPUT_LANGUAGE_NAMES[locale]}. Any field constrained to one of a fixed set of literal values given elsewhere in these instructions (category or dimension names, severity levels, hard-constraint type, letter variant) must still use exactly that literal value — translate only the natural-language prose content, never a fixed literal field value.`;
}
