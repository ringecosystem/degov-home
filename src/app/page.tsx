import HeroSection from '@/sections/home/hero/HeroSection';
import FeatureTabsSection from '@/sections/home/feature-tabs/FeatureTabsSection';
import EcosystemSection from '@/sections/home/ecosystem/EcosystemSection';
import OpenSourceSection from '@/sections/home/open-source/OpenSourceSection';
import FaqSection from '@/sections/home/faq/FaqSection';
import CtaSection from '@/sections/home/cta/CtaSection';
import FooterSection from '@/sections/home/footer/FooterSection';

export default function HomePage() {
  return (
    <main className="flex w-full flex-col text-white">
      <HeroSection />
      <FeatureTabsSection />
      <EcosystemSection />
      <OpenSourceSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
