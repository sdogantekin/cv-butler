import { auth, signOut } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getUserStats } from "@/lib/stats";
import { getLocale } from "@/lib/i18n/locale-cookie";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function DashboardPage() {
  const session = await auth();
  const stats = session?.user?.id
    ? await getUserStats(session.user.id)
    : { atsReviews: 0, jobMatches: 0, coverLetters: 0 };
  const locale = await getLocale();
  const dict = getDictionary(locale);

  async function logoutAction() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <DashboardShell
      userName={session?.user?.name ?? "there"}
      userEmail={session?.user?.email ?? ""}
      stats={stats}
      locale={locale}
      dict={dict}
      logoutAction={logoutAction}
    />
  );
}
