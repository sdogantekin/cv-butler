import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { RoadmapCallout } from "@/components/landing/roadmap-callout";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col">
        <Hero />
        <Features />
        <RoadmapCallout />
      </main>
      <Footer />
    </div>
  );
}
