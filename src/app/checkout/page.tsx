import { headers } from "next/headers";
import { auth } from "@/auth";
import { Header } from "@/components/landing/header";
import { PricingCheckout } from "@/components/checkout/pricing-checkout";
import { getLocale } from "@/lib/i18n/locale-cookie";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function CheckoutPage() {
  const [locale, h, session] = await Promise.all([getLocale(), headers(), auth()]);
  const dict = getDictionary(locale);
  const country = h.get("x-vercel-ip-country") ?? "OTHERS";

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header locale={locale} dict={dict} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
        <h1 className="mb-1.5 text-center text-2xl font-extrabold">{dict.checkout.title}</h1>
        <p className="mx-auto mb-10 max-w-lg text-center text-sm text-muted-foreground">
          {dict.checkout.subtitle}
        </p>
        <PricingCheckout country={country} userEmail={session?.user?.email ?? undefined} />
      </main>
    </div>
  );
}
