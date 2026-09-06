import { LogoIcon } from "@/components/logo-icon";
import { LanguageSwitcher } from "@/components/language-switcher";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between gap-4 bg-primary px-5 py-4 text-sm font-bold text-primary-foreground">
      <div className="flex items-center gap-1.5">
        <LogoIcon size={20} />
        CV Butler
      </div>
      <LanguageSwitcher invert />
    </div>
  );
}
