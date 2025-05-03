'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HeroSection() {
  const { ref, animatedStyles } = useScrollAnimation();
  const { ref: ref2, animatedStyles: animatedStyles2 } = useScrollAnimation({
    delay: 0.3
  });
  const { ref: ref3, animatedStyles: animatedStyles3 } = useScrollAnimation({
    delay: 0.6
  });
  const { ref: ref4, animatedStyles: animatedStyles4 } = useScrollAnimation({
    delay: 0.9
  });
  const { ref: ref5, animatedStyles: animatedStyles5 } = useScrollAnimation({
    delay: 1.2
  });

  const { ref: mobileRef, animatedStyles: mobileAnimatedStyles } = useScrollAnimation();
  const { ref: mobileRef2, animatedStyles: mobileAnimatedStyles2 } = useScrollAnimation({
    delay: 0.3
  });
  const { ref: mobileRef3, animatedStyles: mobileAnimatedStyles3 } = useScrollAnimation({
    delay: 0.6
  });
  const { ref: mobileRef4, animatedStyles: mobileAnimatedStyles4 } = useScrollAnimation({
    delay: 0.9
  });
  const { ref: mobileRef5, animatedStyles: mobileAnimatedStyles5 } = useScrollAnimation({
    delay: 1.2
  });

  return (
    <section className="hero-section bg-[url('/images/hero-background-mobile.png')] bg-cover bg-center py-[100px] md:bg-[url('/images/hero-background.png')]">
      <div className="container flex flex-col gap-[58px] pt-[0] md:gap-[0px] md:pt-[196px]">
        <Link href="/" className="mx-auto flex items-center justify-center md:hidden">
          <Image src="/images/logo.svg" alt="DeGov.AI Logo" width={135.316} height={30} priority />
        </Link>
        <div className="container hidden flex-col gap-[58px] md:flex">
          <div className="flex items-end justify-between">
            <h1 className="flex flex-col">
              <span
                ref={ref}
                className="text-[48px] leading-[100%] font-extralight md:text-[117px]"
                style={animatedStyles}
              >
                Next-Gen DAO
              </span>
              <span
                ref={ref2}
                className="text-[48px] leading-[100%] font-extralight md:text-[117px]"
                style={animatedStyles2}
              >
                Governance
              </span>
              <span
                ref={ref3}
                className="text-[48px] leading-[100%] font-bold md:text-[137px]"
                style={animatedStyles3}
              >
                Made Simple
              </span>
            </h1>

            <Link
              href="/get-started"
              className="rounded-[144px] bg-[var(--foreground)] px-[30px] py-[20px] text-[24px] font-medium text-[var(--background)] transition-opacity duration-300 hover:opacity-80"
              ref={ref4}
              style={animatedStyles4}
            >
              Let&apos;s get started
            </Link>
          </div>
          <div className="flex items-end justify-between" ref={ref5} style={animatedStyles5}>
            <div className="flex flex-col gap-[5px]">
              <p className="text-[24px] leading-[130%] font-medium">Let&apos;s Talk</p>
              <a
                href="mailto:support@degov.ai"
                className="text-[20px] leading-[140%] font-normal text-[var(--foreground)]"
              >
                support@degov.ai
              </a>
            </div>

            <p className="w-[470px] justify-start text-right text-[20px] leading-7 font-normal text-white">
              Scale your DAO on-chain using powerful AI tools, built upon OpenZeppelin&apos;s
              trusted governance contracts.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[58px] md:hidden">
          <h1 className="flex flex-col items-center">
            <span
              className="text-[48px] leading-[100%] font-extralight"
              ref={mobileRef}
              style={mobileAnimatedStyles}
            >
              Next-Gen DAO
            </span>
            <span
              className="text-[48px] leading-[100%] font-extralight"
              ref={mobileRef2}
              style={mobileAnimatedStyles2}
            >
              Governance
            </span>
            <span
              className="text-[48px] leading-[100%] font-bold"
              ref={mobileRef3}
              style={mobileAnimatedStyles3}
            >
              Made Simple
            </span>
          </h1>
          <p
            className="text-center text-[18px] leading-[140%] font-normal text-[var(--foreground)]"
            ref={mobileRef4}
            style={mobileAnimatedStyles4}
          >
            Scale your DAO on-chain using powerful AI tools, built upon OpenZeppelin&apos;s trusted
            governance contracts.
          </p>
          <Link
            href="/get-started"
            className="mx-auto w-fit rounded-[144px] bg-[var(--foreground)] px-[20px] py-[10px] text-[16px] font-medium text-[var(--background)] transition-opacity duration-300 hover:opacity-80"
            ref={mobileRef5}
            style={mobileAnimatedStyles5}
          >
            Let&apos;s get started
          </Link>
        </div>
      </div>
    </section>
  );
}
