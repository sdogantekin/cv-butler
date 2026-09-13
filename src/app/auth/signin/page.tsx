import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/env";
import { getLocale } from "@/lib/i18n/locale-cookie";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { formatMessage } from "@/lib/i18n/format-message";

export default async function SignInPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale).auth.signIn;
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">{dict.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatMessage(dict.subtitle, { count: env.DAILY_ACTION_LIMIT })}
        </p>
      </div>
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <Button type="submit" size="lg">
          {dict.continueWithGoogle}
        </Button>
      </form>
    </div>
  );
}
