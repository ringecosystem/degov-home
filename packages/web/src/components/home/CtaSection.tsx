'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
export default function CtaSection() {
  const { ref, animatedStyles } = useScrollAnimation();
  const { ref: ref2, animatedStyles: animatedStyles2 } = useScrollAnimation({
    delay: 0.3
  });
  const { ref: ref3, animatedStyles: animatedStyles3 } = useScrollAnimation({
    delay: 0.6
  });
  return (
    <section className="container py-[100px] md:py-[120px]" id="get-started">
      <div className="flex h-full w-full flex-col items-center gap-[50px] bg-[url('/images/cta-background-mobile.png')] bg-cover bg-center px-[20px] py-[90px] md:bg-[url('/images/cta-background.png')] md:px-0">
        <div className="flex flex-col items-center gap-[50px]">
          <h2
            className="text-[34px] leading-[120%] font-semibold md:text-[70px]"
            ref={ref}
            style={animatedStyles}
          >
            Ready to Create Your DAO?
          </h2>

          <p
            className="w-full text-left text-[16px] leading-[140%] font-normal opacity-70 md:max-w-[760px] md:text-center md:text-[30px]"
            ref={ref2}
            style={animatedStyles2}
          >
            Join the future of decentralized governance with tools that make management simple,
            efficient, and powerful.
          </p>

          <div
            className="flex w-full flex-col items-center gap-[20px] md:w-auto md:flex-row md:gap-[50px]"
            ref={ref3}
            style={animatedStyles3}
          >
            <Link
              href="/"
              className="flex w-full items-center justify-between gap-[10px] rounded-[144px] bg-[#202224] px-[20px] py-[10px] text-[16px] font-semibold transition-opacity hover:opacity-80 md:w-auto md:justify-start md:px-[30px] md:py-[20px] md:text-[24px]"
            >
              <span>Let&apos;s talk with specialists</span>
              <Image src="/images/arrow-light.svg" alt="arrow" width={12.385} height={14.8} />
            </Link>

            <Link
              href="/"
              className="flex w-full items-center justify-between gap-[10px] rounded-[144px] bg-[var(--foreground)] px-[20px] py-[10px] text-[16px] font-semibold text-[var(--background)] transition-opacity hover:opacity-80 md:w-auto md:justify-start md:px-[30px] md:py-[20px] md:text-[24px]"
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
