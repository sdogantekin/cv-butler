import { LearningHubTab } from "@/components/dashboard/learning-hub-tab";
import { getLocale } from "@/lib/i18n/locale-cookie";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function LearningHubPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  return (
    <div className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <LearningHubTab dict={dict.dashboard.learningHub} />
    </div>
  );
}
