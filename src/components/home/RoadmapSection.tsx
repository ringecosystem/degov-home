import RoadmapPhase from "./RoadmapPhase";
import Image from "next/image";
import { Roadmap } from "./RoadmapStatus";
const phases = [
  {
    id: "phase1",
    number: 1,
    description:
      "User-friendly DAO interface with proposal creation, voting, and treasury management capabilities.",
    status: Roadmap.Completed,
  },
  {
    id: "phase2",
    number: 2,
    description:
      "AI-powered governance simplification with enhanced decision-making and improved community engagement features.",
    status: Roadmap.InProgress,
  },
  {
    id: "phase3",
    number: 3,
    description:
      "Multi-agent AI governance system for optimized decision-making. Looking for partners to collaborate!",
    status: Roadmap.SeekingPartners,
  },
];
export default function RoadmapSection() {
  return (
    <section className="py-[120px] container flex flex-col items-center">
      <div className=" max-w-[1457px] flex items-center justify-center gap-[70px]">
        <Image
          src="/images/roadmap-background.png"
          alt="roadmap"
          width={728.5}
          height={1138}
        />
        <div>
          <h2 className="text-[70px] font-semibold leading-[120%]">
            Project Roadmap
          </h2>
          <p className="text-[30px] font-normal leading-[140%] mt-[10px] opacity-70">
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
