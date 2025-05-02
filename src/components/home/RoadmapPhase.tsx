import { Roadmap, RoadmapStatus } from "./RoadmapStatus";

interface RoadmapPhaseProps {
  number: number;
  description: string;
  status: Roadmap;
}

export default function RoadmapPhase({
  number,
  description,
  status,
}: RoadmapPhaseProps) {
  return (
    <div className={`flex flex-col gap-[20px]`}>
      <div className="space-x-[10px] leading-[100%]">
        <span className="text-[40px] font-[900]  italic capitalize  leading-[100%]">
          PHASE
        </span>
        <span className="text-[90px] font-[900]  italic  leading-[100%]">
          {number}
        </span>
      </div>

      <p className="text-[32px] font-normal leading-[130%]">{description}</p>

      <RoadmapStatus status={status} />
    </div>
  );
}
