import Image from 'next/image';
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-[20px] border-[2px] border-[#474747] px-[20px] pt-[140px] pb-[20px] md:px-[40px] md:pt-[170px] md:pb-[40px]">
      <Image src={icon} alt={title} width={160} height={160} className="hidden md:inline-block" />
      <Image src={icon} alt={title} width={120} height={120} className="inline-block md:hidden" />

      <h3 className="text-[32px] leading-[130%] font-medium">{title}</h3>

      <p className="text-[16px] leading-[100%] font-normal text-[#979797] md:text-[18px]">
        {description}
      </p>
    </div>
  );
}
