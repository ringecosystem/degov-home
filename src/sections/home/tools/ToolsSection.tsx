'use client';

import { motion } from 'framer-motion';

import { LazyImage } from '@/components/ui/LazyImage';
import { useParallaxMotion } from '@/hooks/useParallaxMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const tools = [
  {
    id: 'user-friendly-interface',
    title: 'User Friendly Interface',
    description:
      'Well-designed and intuitive interface for easy navigation and management of proposals, voting and delegation.',
    image: '/images/tools/user-friendly-interface.png'
  },
  {
    id: 'real-time-proposal-tracking',
    title: 'Real-time Proposal Tracking',
    description: 'Real-time updates on proposal status, voting progress, and community engagement.',
    image: '/images/tools/real-time-proposal-tracking.png'
  },
  {
    id: 'delegate-voting-power',
    title: 'Delegate Voting Power',
    description:
      'Allows users to delegate their voting power to trusted community members, enhancing participation and decision-making.',
    image: '/images/tools/delegate-voting-power.png'
  },
  {
    id: 'transparent-treasury-management',
    title: 'Transparent Treasury Management',
    description:
      'Provides a clear view of treasury assets, liabilities, and overall financial health.',
    image: '/images/tools/treasury.png'
  }
];

export default function ToolsSection() {
  const { ref: headingRef, animatedStyles: headingStyles } = useScrollAnimation({ delay: 0.1 });

  return (
    <section className="container flex w-full flex-col justify-center gap-[30px] bg-black lg:gap-[60px]">
      <div className="flex flex-col gap-2.5 text-left" ref={headingRef} style={headingStyles}>
        <h2 className="text-[34px] leading-[40px] font-medium tracking-wide lg:text-[60px] lg:leading-[72px]">
          All Your Governance Tools in One Place
        </h2>
        <p className="text-[16px] leading-[24px] font-normal text-white/70 lg:text-[30px] lg:leading-[42px]">
          Offer a unified platform for governance: proposals, voting and delegation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[30px] lg:grid-cols-2 lg:gap-[60px]">
        {tools.map((tool, index) => (
          <ToolCard key={tool.id} tool={tool} index={index} />
        ))}
      </div>
    </section>
  );
}

type Tool = (typeof tools)[number];

function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const { ref, animatedStyles } = useScrollAnimation({
    delay: 0.12 * Math.min(index, 3),
    mobileDelay: 0.06 * Math.min(index, 2),
    mobileDuration: 0.18
  });
  const { ref: mediaRef, style: mediaStyles } = useParallaxMotion({
    yRange: [-12, 12],
    scaleRange: [0.98, 1.02]
  });

  return (
    <motion.article
      ref={ref}
      style={animatedStyles}
      className="group flex h-full flex-col gap-[30px] rounded-[20px] bg-[#202224]/90 p-[20px] shadow-[6px_6px_54px_rgba(0,0,0,0.05)] backdrop-blur-sm transition-[background] duration-300 lg:p-[30px]"
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.9 }}
    >
      <motion.div
        ref={mediaRef}
        className="relative w-full overflow-hidden rounded-[12px] will-change-transform"
        style={{ aspectRatio: '674 / 354', ...mediaStyles }}
      >
        <LazyImage
          src={tool.image}
          alt={tool.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="rounded-[10px] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          wrapperClassName="relative h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </motion.div>

      <div className="flex flex-col gap-2.5 text-left">
        <h3 className="text-[22px] font-semibold text-white lg:text-[40px]">{tool.title}</h3>
        <p className="text-[16px] font-normal text-white/70 lg:text-[20px]">{tool.description}</p>
      </div>
    </motion.article>
  );
}
