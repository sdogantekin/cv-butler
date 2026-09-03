import { auth, signOut } from "@/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardPage() {
  const session = await auth();

  async function logoutAction() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <DashboardShell
      userName={session?.user?.name ?? "there"}
      userEmail={session?.user?.email ?? ""}
      logoutAction={logoutAction}
    />
  );
}
