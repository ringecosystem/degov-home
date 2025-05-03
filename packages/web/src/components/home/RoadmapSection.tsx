import RoadmapPhase from './RoadmapPhase';
import Image from 'next/image';
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
  return (
    <section className="container flex flex-col items-center py-[100px] md:py-[120px]">
      <div className="flex max-w-[1457px] items-center justify-center gap-[70px]">
        <Image
          src="/images/roadmap-background.png"
          alt="roadmap"
          width={728.5}
          height={1138}
          className="hidden md:inline-block"
        />
        <div>
          <h2 className="text-[34px] leading-[120%] font-semibold md:text-[70px]">
            Project Roadmap
          </h2>
          <p className="mt-[16px] text-[16px] leading-[140%] font-normal opacity-70 md:mt-[10px] md:text-[30px]">
            Our strategic plan for advancing the DeGov.AI ecosystem
          </p>

          <div className="mt-[70px] flex flex-col gap-[70px]">
            {phases.map((phase) => (
              <RoadmapPhase
                key={phase.id}
                number={phase.number}
                description={phase.description}
                status={phase.status}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
