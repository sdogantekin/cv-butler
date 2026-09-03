"use client";

import { toast } from "sonner";
import { cn } from "@/lib/utils";

function notifyLanguageComingSoon(language: string) {
  toast.info(`${language} support is coming in a future iteration — staying in English for now.`);
}

export function LanguageSwitcher({ className }: { className?: string }) {
  return (
    <div className={cn("flex overflow-hidden rounded-lg border", className)}>
      <button
        type="button"
        aria-pressed="true"
        className="bg-primary px-2.5 py-1.5 text-xs font-bold text-primary-foreground"
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => notifyLanguageComingSoon("Turkish")}
        className="px-2.5 py-1.5 text-xs font-bold hover:bg-muted"
      >
        TR
      </button>
      <button
        type="button"
        onClick={() => notifyLanguageComingSoon("German")}
        className="px-2.5 py-1.5 text-xs font-bold hover:bg-muted"
      >
        DE
      </button>
    </div>
  );
}
