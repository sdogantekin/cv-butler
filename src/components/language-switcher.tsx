"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { LOCALE_COOKIE_NAME } from "@/lib/i18n/locales";
import type { Locale } from "@/lib/i18n/locales";
import { formatMessage } from "@/lib/i18n/format-message";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function LanguageSwitcher({
  locale,
  dict,
  className,
  invert = false,
}: {
  locale: Locale;
  dict: Dictionary["languageSwitcher"];
  className?: string;
  invert?: boolean;
}) {
  const router = useRouter();

  function switchTo(target: Locale) {
    if (target === locale) return;
    document.cookie = `${LOCALE_COOKIE_NAME}=${target}; path=/; max-age=31536000`;
    router.refresh();
  }

  function notifyComingSoon(language: string) {
    toast.info(formatMessage(dict.comingSoon, { language }));
  }

  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-lg border",
        invert && "border-primary-foreground/30",
        className,
      )}
    >
      <button
        type="button"
        aria-pressed={locale === "en"}
        onClick={() => switchTo("en")}
        className={cn(
          "px-2.5 py-1.5 text-xs font-bold",
          locale === "en"
            ? invert
              ? "bg-primary-foreground text-primary"
              : "bg-primary text-primary-foreground"
            : invert
              ? "text-primary-foreground hover:bg-primary-foreground/10"
              : "hover:bg-muted",
        )}
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={locale === "tr"}
        onClick={() => switchTo("tr")}
        className={cn(
          "px-2.5 py-1.5 text-xs font-bold",
          locale === "tr"
            ? invert
              ? "bg-primary-foreground text-primary"
              : "bg-primary text-primary-foreground"
            : invert
              ? "text-primary-foreground hover:bg-primary-foreground/10"
              : "hover:bg-muted",
        )}
      >
        TR
      </button>
      <button
        type="button"
        onClick={() => notifyComingSoon(dict.german)}
        className={cn(
          "px-2.5 py-1.5 text-xs font-bold",
          invert ? "text-primary-foreground hover:bg-primary-foreground/10" : "hover:bg-muted",
        )}
      >
        DE
      </button>
    </div>
  );
}
