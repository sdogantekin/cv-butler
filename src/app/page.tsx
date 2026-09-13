import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { RoadmapCallout } from "@/components/landing/roadmap-callout";
import { LearningHubCta } from "@/components/landing/learning-hub-cta";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { getLocale } from "@/lib/i18n/locale-cookie";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export default async function Home() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header locale={locale} dict={dict} />
      <main className="flex flex-1 flex-col">
        <Hero dict={dict.landing.hero} common={dict.common} />
        <HowItWorks dict={dict.landing.howItWorks} />
        <Features dict={dict.landing.features} />
        <RoadmapCallout dict={dict.landing.roadmap} />
        <LearningHubCta dict={dict.landing.learningHubCta} />
        <Faq dict={dict.landing.faq} />
        <FinalCta dict={dict.landing.finalCta} common={dict.common} />
      </main>
      <Footer dict={dict.landing} />
    </div>
  );
}
