'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { DocsIcon, GithubIcon, XIcon } from '@/components/icons/hero';
import { LazyImage } from '@/components/ui/LazyImage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSpotlightMotion } from '@/hooks/useSpotlightMotion';
import { cn } from '@/lib/utils';

const heroButtons = [
  {
    id: 'open-square',
    label: 'Open Square',
    href: 'https://square.degov.ai/',
    variant: 'light'
  },
  {
    id: 'contact-sales',
    label: 'Contact Sales',
    href: 'https://docs.google.com/forms/d/e/1FAIpQLSdYjX87_xxTQFLl-brEj87vxU3ucH682nYy3bGUNpR4nL9HaQ/viewform',
    variant: 'outline'
  }
];

export default function HeroSection() {
  const { ref: headerRef, animatedStyles: headerStyles } = useScrollAnimation({ delay: 0.1 });
  const { ref: heroTitleRef, animatedStyles: heroTitleStyles } = useScrollAnimation({ delay: 0.2 });
  const { ref: heroDescriptionRef, animatedStyles: heroDescriptionStyles } = useScrollAnimation({
    delay: 0.25
  });
  const { ref: heroButtonsRef, animatedStyles: heroButtonsStyles } = useScrollAnimation({
    delay: 0.3
  });
  const spotlight = useSpotlightMotion({ radius: 720, intensity: 0.6 });

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden"
      onPointerMove={spotlight.onPointerMove}
      onPointerLeave={spotlight.onPointerLeave}
    >
      <div className="absolute inset-0 z-0">
        <motion.div
          className="relative hidden h-full w-full lg:block"
          initial={{ scale: 1.1, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <LazyImage
            src="/images/hero-background.png"
            alt="Hero background"
            fill
            priority
            className="object-cover"
            wrapperClassName="h-full w-full"
          />
        </motion.div>
        <motion.div
          className="relative block h-full w-full lg:hidden"
          initial={{ scale: 1.08, opacity: 0.6 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <LazyImage
            src="/images/hero-background-mobile.png"
            alt="Hero background"
            fill
            priority
            className="object-cover"
            wrapperClassName="h-full w-full "
          />
        </motion.div>
      </div>

      <div className="relative z-10 container flex w-full flex-col gap-[60px] py-[30px] lg:gap-[100px] lg:py-[100px]">
        <div
          className="flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"
          ref={headerRef}
          style={headerStyles}
        >
          <Link href="/" className="hidden items-center lg:flex">
            <LazyImage
              src="/images/logo.svg"
              alt="DeGov.AI Logo"
              width={135.316}
              height={30}
              priority
              showLoadingIndicator={false}
              wrapperClassName="h-auto"
            />
          </Link>

          <div className="flex w-full items-center justify-center lg:w-auto lg:justify-end">
            <div className="flex h-[46px] w-full items-center justify-between gap-0 rounded-[80px] bg-[#202224] px-[30px] shadow-[0px_12px_20px_rgba(0,0,0,0.04)] lg:w-auto lg:justify-start lg:gap-[40px]">
              <Link
                href="https://x.com/ai_degov"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow DeGov on X"
                className="group"
              >
                <XIcon className="h-[16px] w-[16px] text-white transition-colors duration-200 group-hover:text-white/70 lg:h-[20px] lg:w-[20px]" />
              </Link>
              <Link
                href="https://docs.degov.ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read the DeGov documentation"
                className="group"
              >
                <DocsIcon className="h-[16px] w-[16px] text-white transition-colors duration-200 group-hover:text-white/70 lg:h-[20px] lg:w-[20px]" />
              </Link>
              <Link
                href="https://github.com/ringecosystem/degov"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span className="flex items-center justify-center gap-[10px] transition-colors duration-200 group-hover:text-white/70">
                  <GithubIcon className="h-[16px] w-[16px] rounded-full text-white group-hover:text-white/70 lg:h-[24px] lg:w-[24px]" />
                  <span className="text-[16px] font-normal tracking-[-0.2px] lg:text-[20px] lg:font-medium">
                    ringecosystem/degov
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center lg:hidden">
          <LazyImage
            src="/images/logo.svg"
            alt="DeGov.AI Logo"
            width={135.316}
            height={30}
            priority
            showLoadingIndicator={false}
            wrapperClassName="h-[30px]"
          />
        </div>

        <div className="flex w-full flex-col items-center gap-[60px] text-center">
          <div ref={heroTitleRef} style={heroTitleStyles}>
            <h1 className="hidden flex-col text-[100px] font-semibold text-white lg:flex">
              <span className="leading-tight lg:leading-[100px]">Next-Gen</span>
              <span className="leading-tight lg:leading-[100px]">DAO Governance</span>
              <span className="leading-tight lg:leading-[100px]">Made Simple</span>
            </h1>
            <h1 className="flex flex-col text-[44px] font-extrabold text-white lg:hidden">
              <span className="leading-tight lg:leading-[44px]">Next-Gen DAO</span>
              <span className="leading-tight lg:leading-[44px]"> Governance</span>
              <span className="leading-tight lg:leading-[44px]">Made Simple</span>
            </h1>
          </div>

          <div ref={heroDescriptionRef} style={heroDescriptionStyles}>
            <p className="hidden text-[30px] leading-[40px] font-normal text-white/70 lg:block">
              An open-source system that equips OpenZeppelin Governor
              <br /> DAOs with AI agents capable of voting and receiving delegations.
            </p>
            <p className="px-4 text-[18px] leading-[28px] font-normal text-white lg:hidden">
              An open-source system that equips OpenZeppelin Governor DAOs with AI agents capable of
              voting and receiving delegations.
            </p>
          </div>

          <div
            className="flex items-center gap-[20px]"
            ref={heroButtonsRef}
            style={heroButtonsStyles}
          >
            {heroButtons.map((button) => (
              <Link
                key={button.id}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center justify-center rounded-full px-[30px] py-[10px] text-[16px] font-medium transition-transform duration-300 hover:scale-[1.04] lg:min-w-[200px] lg:text-[24px]',
                  button.variant === 'light'
                    ? 'bg-white text-[#202224]'
                    : 'border border-white text-white'
                )}
              >
                {button.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
