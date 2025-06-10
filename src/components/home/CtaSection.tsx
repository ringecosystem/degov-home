'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
export default function CtaSection() {
  const { ref, animatedStyles } = useScrollAnimation();
  const { ref: ref2, animatedStyles: animatedStyles2 } = useScrollAnimation({
    delay: 0.1
  });
  const { ref: ref3, animatedStyles: animatedStyles3 } = useScrollAnimation({
    delay: 0.2
  });
  return (
    <section className="container py-[100px] lg:py-[120px]" id="get-started">
      <div className="flex h-full w-full flex-col items-center gap-[50px] bg-[url('/images/cta-background-mobile.png')] bg-cover bg-center px-[20px] py-[90px] lg:bg-[url('/images/cta-background.png')] lg:px-0">
        <div className="flex flex-col items-center gap-[50px]">
          <h2
            className="text-[34px] leading-[120%] font-semibold lg:text-[70px]"
            ref={ref}
            style={animatedStyles}
          >
            Ready to Create Your DAO?
          </h2>

          <p
            className="w-full text-left text-[16px] leading-[140%] font-normal opacity-70 lg:max-w-[760px] lg:text-center lg:text-[30px]"
            ref={ref2}
            style={animatedStyles2}
          >
            Join the future of decentralized governance with tools that make management simple,
            efficient, and powerful.
          </p>

          <div
            className="flex w-full flex-col items-center gap-[20px] lg:w-auto lg:flex-row lg:gap-[50px]"
            ref={ref3}
            style={animatedStyles3}
          >
            <Link
              href="https://forms.gle/d3PUY764urWkm5vz6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-between gap-[10px] rounded-[144px] bg-[#202224] px-[20px] py-[10px] text-[16px] font-semibold transition-all hover:scale-105 hover:opacity-80 lg:w-auto lg:justify-start lg:px-[30px] lg:py-[20px] lg:text-[24px]"
            >
              <span>Launch with Assistance</span>
              <Image src="/images/arrow-light.svg" alt="arrow" width={12.385} height={14.8} />
            </Link>

            <Link
              href="https://docs.degov.ai/integration/launch/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-between gap-[10px] rounded-[144px] bg-[var(--foreground)] px-[20px] py-[10px] text-[16px] font-semibold text-[var(--background)] transition-all hover:scale-105 hover:opacity-80 lg:w-auto lg:justify-start lg:px-[30px] lg:py-[20px] lg:text-[24px]"
            >
              <span>Launch App Now</span>
              <Image src="/images/arrow-dark.svg" alt="arrow" width={12.385} height={14.8} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
