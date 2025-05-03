import { Roadmap, RoadmapStatus } from './RoadmapStatus';

interface RoadmapPhaseProps {
  number: number;
  description: string;
  status: Roadmap;
}

export default function RoadmapPhase({ number, description, status }: RoadmapPhaseProps) {
  return (
    <div className={`flex flex-col gap-[20px]`}>
      <div className="space-x-[10px] leading-[100%]">
        <span className="text-[40px] leading-[100%] font-[900] capitalize italic">PHASE</span>
        <span className="text-[90px] leading-[100%] font-[900] italic">{number}</span>
      </div>

      <p className="text-[20px] leading-[140%] font-normal md:text-[32px] md:leading-[130%]">
        {description}
      </p>

      <RoadmapStatus status={status} />
    </div>
  );
}
