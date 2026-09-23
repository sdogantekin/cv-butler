import { Header } from "@/components/landing/header";
import { KeywordStrategyGuide } from "@/components/dashboard/keyword-strategy-guide";
import { getLocale } from "@/lib/i18n/locale-cookie";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function KeywordStrategyPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header locale={locale} dict={dict} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <KeywordStrategyGuide dict={dict.dashboard.learningHub} />
      </main>
    </div>
  );
}
