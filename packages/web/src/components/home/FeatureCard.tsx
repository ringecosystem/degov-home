import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { GlowingEffect } from '@/components/ui/glowing-effect';
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

export default function FeatureCard({ title, description, icon, index }: FeatureCardProps) {
  const { ref, animatedStyles } = useScrollAnimation({
    delay: 0.1 * index
  });
  return (
    <div
      className="relative flex flex-col gap-[20px] rounded-sm border-[2px] border-[#474747] px-[20px] pt-[140px] pb-[20px] lg:px-[40px] lg:pt-[170px] lg:pb-[40px]"
      ref={ref}
      style={animatedStyles}
    >
      <GlowingEffect
        blur={0}
        borderWidth={3}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      <Image src={icon} alt={title} width={160} height={160} className="hidden lg:inline-block" />
      <Image src={icon} alt={title} width={120} height={120} className="inline-block lg:hidden" />

      <h3 className="text-[32px] leading-[130%] font-medium">{title}</h3>

      <p className="text-[16px] leading-[100%] font-normal text-[#979797] lg:text-[18px]">
        {description}
      </p>
    </div>
  );
}
