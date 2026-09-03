import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Defense in depth: middleware.ts already protects this route, but each
// protected layout also checks auth() itself rather than relying on
// middleware alone.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/auth/signin");
  return <>{children}</>;
}
