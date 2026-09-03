import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Sign in to CV Butler</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          3 free actions per day. No credit card required.
        </p>
      </div>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <Button type="submit" size="lg">
          Continue with Google
        </Button>
      </form>
    </div>
  );
}
