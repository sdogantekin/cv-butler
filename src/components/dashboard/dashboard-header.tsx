import { LogoIcon } from "@/components/logo-icon";

export function DashboardHeader() {
  return (
    <div className="flex items-center gap-1.5 bg-primary px-5 py-4 text-sm font-bold text-primary-foreground">
      <LogoIcon size={20} />
      CV Butler
    </div>
  );
}
