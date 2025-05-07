import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import RoadmapSection from "@/components/home/RoadmapSection";
import FaqSection from "@/components/home/FaqSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <main className="home-page">
      <HeroSection />
      <FeaturesSection />
      <RoadmapSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
