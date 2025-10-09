'use client';

import { useMemo, useState } from 'react';

import { LazyImage } from '@/components/ui/LazyImage';

import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const benefits = [
  {
    id: 'transparency-security',
    title: 'Transparency and Security',
    description:
      'Everything happens on-chain and open-sourced for maximum transparency and security.',
    icon: '/images/feature-2.svg',

    accent: 'rotate'
  },
  {
    id: 'openzeppelin-governor',
    title: 'OpenZeppelin Governor Based',
    description:
      'Fully compatible with OpenZeppelin Governor, a widely adopted and trusted on-chain governance framework.',
    icon: '/images/feature-1.svg',

    accent: 'solid'
  },
  {
    id: 'agent-governance',
    title: 'Agent Governance',
    description:
      'Boost governance participation with AI-powered agent governance, allowing members to delegate their votes to intelligent agents.',
    icon: '/images/feature-4.svg',

    accent: 'solid'
  },
  {
    id: 'degovx-agent',
    title: 'DeGovX Agent',
    description:
      'The agent existed on X (formerly Twitter) to help you stay updated with the latest governance activities.',
    icon: '/images/feature-5.svg',
    accent: 'rotate'
  }
];

export default function BenefitsSection() {
  return (
    <section className="container flex w-full flex-col justify-center gap-[30px] bg-black lg:gap-[60px]">
      <header className="flex flex-col gap-4 text-left">
        <h2 className="text-[34px] leading-[40px] font-medium tracking-wide lg:text-[60px] lg:leading-[72px]">
          Why Choose DeGov.AI?
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2 lg:gap-[60px]">
        {benefits.map((benefit, index) => (
          <BenefitCard key={benefit.id} benefit={benefit} index={index} />
        ))}
      </div>
    </section>
  );
}

type Benefit = (typeof benefits)[number];

function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const { ref, animatedStyles } = useScrollAnimation({
    delay: 0.12 * Math.min(index, 2),
    mobileDelay: 0.06 * Math.min(index, 1),
    mobileDuration: 0.18
  });
  const [isActive, setIsActive] = useState(false);

  const glowSettings = useMemo(() => {
    return {
      spread: 56,
      borderWidth: 1.5,
      proximity: 40,
      inactiveZone: 0.6,
      className: undefined
    } as const;
  }, []);

  return (
    <article
      ref={ref}
      style={animatedStyles}
      onPointerEnter={() => setIsActive(true)}
      onPointerLeave={() => setIsActive(false)}
      onPointerCancel={() => setIsActive(false)}
      className={cn(
        'group relative flex h-full flex-col gap-[20px] rounded-[20px] border-[2px] border-[#474747]/80 bg-[#202224] p-[20px] transition-all duration-300 ease-out lg:gap-[30px] lg:p-[30px]',
        'hover:-translate-y-1 hover:border-white/60 hover:bg-[#25272b]'
      )}
    >
      <GlowingEffect
        glow={isActive}
        disabled={!isActive}
        spread={glowSettings.spread}
        borderWidth={glowSettings.borderWidth}
        proximity={glowSettings.proximity}
        inactiveZone={glowSettings.inactiveZone}
        blur={0}
        className={glowSettings.className}
      />
      <div className="flex h-20 w-20 items-center justify-center">
        <LazyImage
          src={benefit.icon}
          alt={benefit.title}
          width={80}
          height={80}
          showLoadingIndicator={false}
        />
      </div>
      <div className="flex flex-col gap-2.5 text-left">
        <h3 className="text-[22px] font-semibold text-white lg:text-[40px]">{benefit.title}</h3>
        <p className="font-display text-[16px] font-normal text-white/70 lg:text-[24px]">
          {benefit.description}
        </p>
      </div>
    </article>
  );
}
