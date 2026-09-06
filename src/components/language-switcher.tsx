"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";

function notifyLanguageComingSoon(language: string) {
  toast.info(`${language} support is coming in a future iteration — staying in English for now.`);
}

export function LanguageSwitcher({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
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
        aria-pressed="true"
        className={cn(
          "px-2.5 py-1.5 text-xs font-bold",
          invert
            ? "bg-primary-foreground text-primary"
            : "bg-primary text-primary-foreground",
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => notifyLanguageComingSoon("Turkish")}
        className={cn(
          "px-2.5 py-1.5 text-xs font-bold",
          invert ? "text-primary-foreground hover:bg-primary-foreground/10" : "hover:bg-muted",
        )}
      >
        TR
      </button>
      <button
        type="button"
        onClick={() => notifyLanguageComingSoon("German")}
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
