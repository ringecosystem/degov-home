'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { LazyImage } from '@/components/ui/LazyImage';
import { SectionLabel } from '@/components/ui/section-label';
import { SectionWrapper } from '@/components/ui/section-wrapper';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type Feature = {
  id: string;
  label: string;
  description: string;
  bullets: string[];
  screenshot: string;
};

const features: Feature[] = [
  {
    id: 'proposal-tracking',
    label: 'Proposal Tracking',
    description:
      'Track proposals and voting status in one place.',
    bullets: [
      'On-chain details',
      'Proposal status',
      'OpenZeppelin native',
    ],
    screenshot: '/images/feature/proposal-tracking.png',
  },
  {
    id: 'vote-execute',
    label: 'Vote & Execute',
    description:
      'Review on-chain actions before you vote or execute.',
    bullets: [
      'Action preview',
      'Treasury impact',
      'Direct execution',
    ],
    screenshot: '/images/feature/vote-execute.png',
  },
  {
    id: 'open-source',
    label: 'Open-Source & Self-Hosted',
    description:
      'Run DeGov on your own infrastructure with full source code access.',
    bullets: [
      'MIT license',
      'Self-hosted',
      'No vendor lock-in',
    ],
    screenshot: '/images/feature/open-source.png',
  },
];

export default function FeatureTabsSection() {
  const { ref: headingRef, animatedStyles: headingStyles } = useScrollAnimation({ delay: 0.05 });

  return (
    <SectionWrapper className="relative overflow-hidden bg-white/[0.02]">
      {/* Section heading */}
      <div
        id="features"
        className="mb-8 scroll-mt-[88px] text-center lg:mb-12 lg:scroll-mt-[104px]"
        ref={headingRef}
        style={headingStyles}
      >
        <SectionLabel className="mb-3">Features</SectionLabel>
        <h2 className="text-4xl font-bold tracking-[-0.03em] text-text-primary lg:text-6xl">
          Built for OpenZeppelin Governor
        </h2>
      </div>

      {/* Feature cards — staggered per card */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} feature={feature} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate={prefersReducedMotion ? 'visible' : isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            delay: 0.15 + index * 0.12,
            ease: [0.17, 0.55, 0.55, 1],
          },
        },
      }}
    >
      <Card noPadding className="flex h-full flex-col">
        <div className="relative h-[140px] w-full overflow-hidden rounded-t-[20px] lg:h-[180px]">
          <LazyImage
            src={feature.screenshot}
            alt={`${feature.label} screenshot`}
            width={400}
            height={220}
            className="h-full w-full object-cover brightness-[0.75]"
            wrapperClassName="block h-full w-full"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-lg font-semibold text-text-primary">{feature.label}</h3>
          <p className="mt-2 flex-1 text-sm text-text-secondary">{feature.description}</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
            {feature.bullets.map((bullet) => (
              <span key={bullet} className="flex items-center gap-1.5 text-xs text-text-primary/80">
                <span className="text-brand-blue">&#10003;</span>
                {bullet}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
