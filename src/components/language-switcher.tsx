"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LOCALE_COOKIE_NAME } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";

export function LanguageSwitcher({
  locale,
  className,
  invert = false,
}: {
  locale: Locale;
  className?: string;
  invert?: boolean;
}) {
  const router = useRouter();

  function switchTo(target: Locale) {
    if (target === locale) return;
    document.cookie = `${LOCALE_COOKIE_NAME}=${target}; path=/; max-age=31536000`;
    router.refresh();
  }

  function buttonClassName(target: Locale) {
    return cn(
      "px-2.5 py-1.5 text-xs font-bold",
      locale === target
        ? invert
          ? "bg-primary-foreground text-primary"
          : "bg-primary text-primary-foreground"
        : invert
          ? "text-primary-foreground hover:bg-primary-foreground/10"
          : "hover:bg-muted",
    );
  }

  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-lg border",
        invert && "border-primary-foreground/30",
        className,
      )}
    >
      <button type="button" aria-pressed={locale === "en"} onClick={() => switchTo("en")} className={buttonClassName("en")}>
        EN
      </button>
      <button type="button" aria-pressed={locale === "tr"} onClick={() => switchTo("tr")} className={buttonClassName("tr")}>
        TR
      </button>
      <button type="button" aria-pressed={locale === "de"} onClick={() => switchTo("de")} className={buttonClassName("de")}>
        DE
      </button>
    </div>
  );
}
