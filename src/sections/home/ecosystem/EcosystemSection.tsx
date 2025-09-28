'use client';

import { LazyImage } from '@/components/ui/LazyImage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function EcosystemSection() {
  const { ref: headingRef, animatedStyles: headingStyles } = useScrollAnimation({ delay: 0.1 });
  const { ref: imageRef, animatedStyles: imageStyles } = useScrollAnimation({ delay: 0.2 });
  const { ref: buttonRef, animatedStyles: buttonStyles } = useScrollAnimation({ delay: 0.3 });

  return (
    <section className="container flex w-full flex-col justify-center gap-[60px] bg-black">
      <div className="flex flex-col gap-2.5 text-left text-white" ref={headingRef} style={headingStyles}>
        <h2 className="text-[60px] leading-[72px] font-medium tracking-wide">
          Explore the DAOs in our ecosystem
        </h2>
        <p className="text-[30px] leading-[42px] font-normal text-white/70">
          Help our partner DAOs build better communities.
        </p>
      </div>

      <div ref={imageRef} style={imageStyles}>
        <LazyImage
          src="/images/ecosystem/proposal-list.png"
          alt="Proposal List"
          width={1636}
          height={563}
          className="h-auto w-full"
          showLoadingIndicator={false}
        />
      </div>

      <button
        className="inline-flex w-[207px] cursor-pointer items-center justify-center rounded-full border border-white py-2.5 text-[24px] font-medium text-white"
        ref={buttonRef}
        style={buttonStyles}
      >
        <span className="text-white">View All DAOs</span>
      </button>
    </section>
  );
}
