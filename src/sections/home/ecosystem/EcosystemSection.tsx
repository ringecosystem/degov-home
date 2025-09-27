import { LazyImage } from '@/components/ui/LazyImage';

export default function EcosystemSection() {
  return (
    <section className="container flex w-full flex-col justify-center gap-[60px] bg-black">
      <div className="flex flex-col gap-2.5 text-left text-white">
        <h2 className="text-[60px] leading-[72px] font-medium tracking-wide">
          Explore the DAOs in our ecosystem
        </h2>
        <p className="text-[30px] leading-[42px] font-normal text-white/70">
          Help our partner DAOs build better communities.
        </p>
      </div>

      <LazyImage
        src="/images/ecosystem/proposal-list.png"
        alt="Proposal List"
        width={1636}
        height={563}
        className="h-auto w-full"
        showLoadingIndicator={false}
      />

      <button className="inline-flex w-[207px] cursor-pointer items-center justify-center rounded-full border border-white py-2.5 text-[24px] font-medium text-white">
        <span className="text-white">View All DAOs</span>
      </button>
    </section>
  );
}
