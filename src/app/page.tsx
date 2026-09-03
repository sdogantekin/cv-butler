import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { RoadmapCallout } from "@/components/landing/roadmap-callout";
import { LearningHubCta } from "@/components/landing/learning-hub-cta";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <HowItWorks />
        <Features />
        <RoadmapCallout />
        <LearningHubCta />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
