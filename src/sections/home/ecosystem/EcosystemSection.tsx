import { LazyImage } from '@/components/ui/LazyImage';

export default function EcosystemSection() {
  return (
    <section className="flex w-full justify-center bg-black">
      <div className="container flex w-full flex-col gap-14 px-6 pt-24 pb-20 sm:px-10 lg:px-24 lg:pb-24">
        <div className="flex flex-col gap-2.5 text-left text-white">
          <h2 className="max-w-[780px] text-4xl leading-[54px] font-medium tracking-wide lg:text-6xl lg:leading-[72px]">
            Explore the DAOs in our ecosystem
          </h2>
          <p className="max-w-[840px] text-lg leading-8 font-normal text-white/70 lg:text-3xl lg:leading-10">
            Help our partner DAOs build better communities.
          </p>
        </div>

        <LazyImage
          src="/images/ecosystem/proposal-list.svg"
          alt="Proposal List"
          width={1636}
          height={563}
          className="h-auto w-full"
          showLoadingIndicator={false}
        />

        <button className="inline-flex w-[207px] items-center justify-center rounded-full border border-white py-2.5 text-2xl font-medium text-white">
          <span className="text-white">View All DAOs</span>
        </button>
      </div>
    </section>
  );
}
