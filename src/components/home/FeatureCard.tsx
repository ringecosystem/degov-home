import Image from "next/image";
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
}: FeatureCardProps) {
  return (
    <div className="px-[40px] pt-[170px] pb-[40px] border-[#474747] border-[2px] flex flex-col gap-[20px]">
      <Image src={icon} alt={title} width={160} height={160} />

      <h3 className="text-[32px] font-semibold leading-[130%]">{title}</h3>

      <p className="text-[18px] text-[#979797] font-normal leading-[100%]">
        {description}
      </p>
    </div>
  );
}
