'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { DocsIcon, GithubIcon, XIcon } from '@/components/icons/hero';
import { LazyImage } from '@/components/ui/LazyImage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSpotlightMotion } from '@/hooks/useSpotlightMotion';

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
  const { ref: heroDescriptionRef, animatedStyles: heroDescriptionStyles } = useScrollAnimation({ delay: 0.25 });
  const { ref: heroButtonsRef, animatedStyles: heroButtonsStyles } = useScrollAnimation({ delay: 0.3 });
  const spotlight = useSpotlightMotion({ radius: 720, intensity: 0.6 });

  return (
    <section
      className="relative flex w-full justify-center overflow-hidden"
      onPointerMove={spotlight.onPointerMove}
      onPointerLeave={spotlight.onPointerLeave}
    >
      <div className="absolute inset-0 -z-10">
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
            wrapperClassName="h-full w-full"
          />
        </motion.div>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={spotlight.style}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_10%,rgba(118,85,255,0.28),rgba(12,12,20,0)_70%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-[-16%] h-[45%] bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative container flex w-full flex-col gap-[100px] py-[100px]">
        <div
          className="flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"
          ref={headerRef}
          style={headerStyles}
        >
          <Link href="/" className="flex items-center">
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
            <div className="flex h-[46px] items-center gap-[40px] rounded-[80px] bg-[#202224] px-[30px] shadow-[0px_12px_20px_rgba(0,0,0,0.04)]">
              <Link
                href="https://x.com/ai_degov"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow DeGov on X"
                className="group"
              >
                <XIcon className="h-[20px] w-[20px] text-white transition-colors duration-200 group-hover:text-white/70" />
              </Link>
              <Link
                href="https://docs.degov.ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read the DeGov documentation"
                className="group"
              >
                <DocsIcon className="h-[20px] w-[20px] text-white transition-colors duration-200 group-hover:text-white/70" />
              </Link>
              <Link
                href="https://github.com/ringecosystem/degov"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <span className="flex items-center justify-center gap-[10px] transition-colors duration-200 group-hover:text-white/70">
                  <GithubIcon className="h-[23px] w-[24px] rounded-full text-white transition-colors duration-200 group-hover:text-white/70" />
                  <span className="text-[20px] font-medium tracking-[-0.2px]">
                    ringecosystem/degov
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-[60px] text-center">
          <div ref={heroTitleRef} style={heroTitleStyles}>
            <h1 className="flex flex-col text-[100px] font-semibold text-white">
              <span className="leading-tight lg:leading-[100px]">Next-Gen</span>
              <span className="leading-tight lg:leading-[100px]">DAO Governance</span>
              <span className="leading-tight lg:leading-[100px]">Made Simple</span>
            </h1>
          </div>

          <div ref={heroDescriptionRef} style={heroDescriptionStyles}>
            <p className="text-[30px] leading-[40px] font-normal text-white/70">
              An open-source system that equips OpenZeppelin Governor
              <br /> DAOs with AI agents capable of voting and receiving delegations.
            </p>
          </div>

          <div className="flex items-center gap-[20px]" ref={heroButtonsRef} style={heroButtonsStyles}>
            {heroButtons.map((button) => (
              <Link
                key={button.id}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  button.variant === 'light'
                    ? 'flex min-w-[200px] items-center justify-center rounded-full bg-white px-[30px] py-[10px] text-[24px] font-medium text-[#202224] transition-transform duration-300 hover:scale-[1.04]'
                    : 'flex min-w-[200px] items-center justify-center rounded-full border border-white px-[30px] py-[10px] text-[24px] font-medium text-white transition-transform duration-300 hover:scale-[1.04]'
                }
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
