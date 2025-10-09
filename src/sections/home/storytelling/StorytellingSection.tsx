'use client';

import { motion } from 'framer-motion';

import { LazyImage } from '@/components/ui/LazyImage';
import { useParallaxMotion } from '@/hooks/useParallaxMotion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const stories = [
  {
    id: 'always-available',
    title: 'degov-agent.eth: Always Available',
    description:
      'The degov-agent.eth is always available to accept delegations, vote on your behalf, and provide explanations of complex proposals.',
    image: '/images/storytelling/agent.png',
    reverse: false,
    width: 780,
    height: 608.7,
    bordered: true
  },
  {
    id: 'updates-on-x',
    title: 'Automated Proposal Updates on X',
    description:
      'Catch up the latest progress of the proposals on the DeGovX account on X (formerly Twitter).',
    image: '/images/storytelling/automated-proposal-updates-on-x.png',
    reverse: true,
    width: 780,
    height: 562,
    bordered: false
  },
  {
    id: 'never-misses-deadlines',
    title: 'Agent Voting Never Misses Deadlines',
    description:
      'The degov-agent.eth ensures that your votes are always cast before the voting deadline, even if you are busy or forgetful.',
    image: '/images/storytelling/agent-voting-never-misses-deadlines.png',
    reverse: false,
    width: 780,
    height: 517,
    bordered: true
  }
];

export default function StorytellingSection() {
  const { ref: headingRef, animatedStyles: headingStyles } = useScrollAnimation({ delay: 0.1 });

  return (
    <section className="container flex w-full flex-col justify-center gap-[71px] bg-black">
      <div className="flex flex-col gap-2.5 text-left" ref={headingRef} style={headingStyles}>
        <h2 className="text-[34px] leading-[54px] font-medium tracking-wide lg:text-[60px] lg:leading-[72px]">
          Agent governance unlocks new possibilities
        </h2>
        <p className="font-display text-[16px] leading-[24px] font-normal text-white/70 lg:text-[30px] lg:leading-[42px]">
          Empower the latest AI technology to change the way we govern.
        </p>
      </div>

      <div className="flex flex-col items-center gap-[71px]">
        {stories.map((story, index) => (
          <StoryBlock key={story.id} {...story} index={index} />
        ))}
      </div>
    </section>
  );
}

function StoryBlock({
  title,
  description,
  image,
  reverse,
  width,
  height,
  index
}: {
  title: string;
  description: string;
  image: string;
  reverse: boolean;
  width: number;
  height: number;
  index: number;
}) {
  const { ref, animatedStyles } = useScrollAnimation({
    delay: 0.14 * Math.min(index, 3),
    mobileDelay: 0.08 * Math.min(index, 2),
    mobileDuration: 0.2
  });
  const { ref: mediaRef, style: mediaMotionStyles } = useParallaxMotion({
    yRange: reverse ? [18, -18] : [-18, 18],
    rotateRange: reverse ? [1.4, -1.4] : [-1.4, 1.4],
    scaleRange: [0.96, 1]
  });

  return (
    <div
      className={`flex flex-col items-center gap-[20px] lg:flex-row lg:items-center lg:justify-between lg:gap-[71px] ${
        reverse ? 'lg:flex-row-reverse' : ''
      }`}
      ref={ref}
      style={animatedStyles}
    >
      <motion.div
        ref={mediaRef}
        className={`relative w-full overflow-hidden will-change-transform`}
        style={{ maxWidth: `${width}px`, ...mediaMotionStyles }}
      >
        <LazyImage
          src={image}
          alt={title}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 780px, 100vw"
          className="h-auto w-full object-cover"
          wrapperClassName="block w-full"
        />
      </motion.div>

      <div className="flex w-full max-w-[450px] flex-col gap-[10px] text-left text-white lg:gap-[30px]">
        <h3 className="text-[22px] font-semibold lg:text-[40px]">{title}</h3>
        <p className="text-[16px] font-normal text-white/70 lg:text-[24px]">{description}</p>
      </div>
    </div>
  );
}
