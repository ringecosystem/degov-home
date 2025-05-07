import { cn } from "@/lib/utils";

export enum Roadmap {
  Completed = "Completed",
  InProgress = "In Progress",
  SeekingPartners = "Seeking Partners",
}

const RoadmapStatusOptions = {
  [Roadmap.Completed]: {
    text: "Completed",
    background: "bg-[#00B624]",
  },
  [Roadmap.InProgress]: {
    text: "In Progress",
    background: "bg-[#ffffff]",
  },
  [Roadmap.SeekingPartners]: {
    text: "Seeking Partners",
    background: "bg-[#979797]",
  },
};

interface RoadmapStatusProps {
  status: Roadmap;
}

export function RoadmapStatus({ status }: RoadmapStatusProps) {
  return (
    <span
      className={cn(
        "rounded-[50px] text-[20px] font-semibold leading-[120%] px-[10px] py-[5px] text-[var(--background)] inline-block w-fit",
        RoadmapStatusOptions[status].background
      )}
    >
      {RoadmapStatusOptions[status].text}
    </span>
  );
}
