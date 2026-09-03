import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Welcome, {session?.user?.name ?? "there"}</h1>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button type="submit" variant="outline" size="sm">
            Sign out
          </Button>
        </form>
      </div>
      <p className="text-muted-foreground">
        Upload a resume to get an ATS score, or match it against a job description.
      </p>
      <Button asChild className="w-fit">
        <Link href="/analyze">Analyze a resume</Link>
      </Button>
    </div>
  );
}
