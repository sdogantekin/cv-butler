import { MenuIcon } from "lucide-react";
import { LogoIcon } from "@/components/logo-icon";
import { LanguageSwitcher } from "@/components/language-switcher";

export function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-primary px-5 py-4 text-sm font-bold text-primary-foreground">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="-ml-1 rounded-md p-1 hover:bg-primary-foreground/10 lg:hidden"
        >
          <MenuIcon size={22} />
        </button>
        <div className="flex items-center gap-1.5">
          <LogoIcon size={20} />
          CV Butler
        </div>
      </div>
      <LanguageSwitcher invert />
    </div>
  );
}
