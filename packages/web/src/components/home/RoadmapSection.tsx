'use client';

import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import RoadmapPhase from './RoadmapPhase';
import { Roadmap } from './RoadmapStatus';
const phases = [
  {
    id: 'phase1',
    number: 1,
    description:
      'User-friendly DAO interface with proposal creation, voting, and treasury management capabilities.',
    status: Roadmap.Completed
  },
  {
    id: 'phase2',
    number: 2,
    description:
      'AI-powered governance simplification with enhanced decision-making and improved community engagement features.',
    status: Roadmap.InProgress
  },
  {
    id: 'phase3',
    number: 3,
    description:
      'Multi-agent AI governance system for optimized decision-making. Looking for partners to collaborate!',
    status: Roadmap.SeekingPartners
  }
];
export default function RoadmapSection() {
  const { ref, animatedStyles } = useScrollAnimation();
  const { ref: ref2, animatedStyles: animatedStyles2 } = useScrollAnimation({
    delay: 0.3
  });
  const { ref: ref3, animatedStyles: animatedStyles3 } = useScrollAnimation({
    delay: 0.6
  });
  const { ref: ref4, animatedStyles: animatedStyles4 } = useScrollAnimation({
    delay: 0.9
  });
  return (
    <section className="container flex flex-col items-center py-[100px] md:py-[120px]">
      <div className="flex max-w-[1457px] items-center justify-center gap-[70px]">
        <Image
          src="/images/roadmap-background.png"
          alt="roadmap"
          width={728.5}
          height={1138}
          className="hidden flex-shrink-0 md:inline-block"
          ref={ref}
          style={animatedStyles}
        />
        <div>
          <h2
            className="text-[34px] leading-[120%] font-semibold md:text-[70px]"
            ref={ref2}
            style={animatedStyles2}
          >
            Project Roadmap
          </h2>
          <p
            className="mt-[16px] text-[16px] leading-[140%] font-normal opacity-70 md:mt-[10px] md:text-[30px]"
            ref={ref3}
            style={animatedStyles3}
          >
            Our strategic plan for advancing the DeGov.AI ecosystem
          </p>

          <div className="mt-[70px] flex flex-col gap-[70px]" ref={ref4} style={animatedStyles4}>
            {phases.map((phase, index) => (
              <RoadmapPhase
                key={phase.id}
                number={phase.number}
                description={phase.description}
                status={phase.status}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
