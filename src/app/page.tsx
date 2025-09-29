import HeroSection from '@/sections/home/hero/HeroSection';
import FeatureTabsSection from '@/sections/home/feature-tabs/FeatureTabsSection';
import EcosystemSection from '@/sections/home/ecosystem/EcosystemSection';
import ToolsSection from '@/sections/home/tools/ToolsSection';
import StorytellingSection from '@/sections/home/storytelling/StorytellingSection';
import BenefitsSection from '@/sections/home/benefits/BenefitsSection';
import FaqSection from '@/sections/home/faq/FaqSection';
import CtaSection from '@/sections/home/cta/CtaSection';
import FooterSection from '@/sections/home/footer/FooterSection';

export default function HomePage() {
  return (
    <main className="flex w-full flex-col gap-[58px] bg-black text-white lg:gap-[140px]">
      <HeroSection />
      <FeatureTabsSection />
      <EcosystemSection />
      <ToolsSection />
      <StorytellingSection />
      <BenefitsSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
