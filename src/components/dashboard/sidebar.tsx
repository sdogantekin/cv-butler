"use client";

import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";

export type DashboardTab = "home" | "ats" | "job" | "cover" | "hub";

const NAV_ITEMS: { tab: DashboardTab; label: string }[] = [
  { tab: "home", label: "Home" },
  { tab: "ats", label: "ATS Review" },
  { tab: "job", label: "Job Matching" },
  { tab: "cover", label: "Cover Letter Generation" },
  { tab: "hub", label: "Learning Hub" },
];

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("") || "?";
}

export function Sidebar({
  activeTab,
  onTabChange,
  userName,
  logoutAction,
}: {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  userName: string;
  logoutAction: () => Promise<void>;
}) {
  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-r bg-card p-5">
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.tab}
            type="button"
            onClick={() => onTabChange(item.tab)}
            className={cn(
              "rounded-lg px-3.5 py-2.5 text-left text-sm font-semibold",
              activeTab === item.tab
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted",
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-4 flex flex-col gap-3.5 border-t pt-4">
        <LanguageSwitcher className="self-start" />
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
            {initialsFor(userName)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold">{userName}</div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-xs font-medium text-muted-foreground hover:underline"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </div>
    </aside>
  );
}
