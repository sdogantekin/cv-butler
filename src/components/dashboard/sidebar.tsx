"use client";

import { trackEvent } from "@/lib/analytics/provider";
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
  mobileOpen,
  onCloseMobile,
}: {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  userName: string;
  logoutAction: () => Promise<void>;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-x-0 top-14 bottom-0 z-40 bg-black/40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-card transition-transform duration-200",
          "lg:static lg:z-auto lg:w-[260px] lg:shrink-0 lg:translate-x-0 lg:border-r lg:p-5",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <nav className="flex flex-1 flex-col gap-1 p-4 lg:p-0">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => {
                trackEvent("dashboard_tab_selected", { tab: item.tab });
                onTabChange(item.tab);
                onCloseMobile();
              }}
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

        <div className="flex flex-col gap-3.5 border-t p-4 lg:mt-4 lg:p-0 lg:pt-4">
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
    </>
  );
}
