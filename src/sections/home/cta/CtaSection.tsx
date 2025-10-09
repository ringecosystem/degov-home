'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import { LazyImage } from '@/components/ui/LazyImage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useSpotlightMotion } from '@/hooks/useSpotlightMotion';
import { cn } from '@/lib/utils';

const ctaButtons = [
  {
    id: 'self-deploy',
    label: 'Deploy By Yourself',
    href: 'https://docs.degov.ai/integration/deploy/',
    variant: 'dark',
    icon: '/images/arrow-light.svg'
  },
  {
    id: 'open-square',
    label: 'Open Square',
    href: 'https://square.degov.ai/',
    variant: 'light',
    icon: '/images/arrow-dark.svg'
  }
];

export default function CtaSection() {
  const { ref: cardRef, animatedStyles: cardStyles } = useScrollAnimation({ delay: 0.1 });
  const { ref: headingRef, animatedStyles: headingStyles } = useScrollAnimation({ delay: 0.18 });
  const { ref: descriptionRef, animatedStyles: descriptionStyles } = useScrollAnimation({
    delay: 0.24
  });
  const { ref: buttonsRef, animatedStyles: buttonsStyles } = useScrollAnimation({ delay: 0.3 });
  const spotlight = useSpotlightMotion({ radius: 620, intensity: 0.52 });

  return (
    <section className="container flex w-full flex-col justify-center bg-black">
      <motion.div
        className="relative overflow-hidden rounded-[0px] lg:rounded-[20px]"
        ref={cardRef}
        style={cardStyles}
        onPointerMove={spotlight.onPointerMove}
        onPointerLeave={spotlight.onPointerLeave}
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 240, damping: 24, mass: 1 }}
      >
        <div className="absolute inset-0">
          <motion.div
            className="relative hidden h-full w-full lg:block"
            initial={{ scale: 1.05, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <LazyImage
              src="/images/cta-background.png"
              alt="CTA background"
              fill
              priority
              className="object-cover"
              wrapperClassName="absolute inset-0 hidden h-full w-full lg:block"
            />
          </motion.div>
          <motion.div
            className="relative block h-full w-full lg:hidden"
            initial={{ scale: 1.08, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <LazyImage
              src="/images/cta-background-mobile.png"
              alt="CTA background mobile"
              fill
              priority
              className="object-cover"
              wrapperClassName="absolute inset-0 block h-full w-full lg:hidden"
            />
          </motion.div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={spotlight.style}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#050505]/40 via-transparent to-[#7f5dff1f]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-[50px] px-[20px] py-[90px] text-white lg:px-6">
          <div ref={headingRef} style={headingStyles}>
            <h2 className="text-left text-[34px] leading-[40px] font-medium tracking-wider lg:text-center lg:text-[70px] lg:leading-[84px]">
              Ready to Create Your DAO?
            </h2>
          </div>
          <p
            className="font-display text-left text-[16px] leading-[22px] font-normal text-white/70 lg:max-w-[760px] lg:text-center lg:text-[30px] lg:leading-[42px]"
            ref={descriptionRef}
            style={descriptionStyles}
          >
            Build better communities with DeGov.AI, which makes governance easy, efficient, and
            powerful.
          </p>
          <div
            className="flex w-full flex-col items-center gap-[20px] lg:flex-row lg:justify-center lg:gap-[50px]"
            ref={buttonsRef}
            style={buttonsStyles}
          >
            {ctaButtons.map((button) => (
              <Link
                key={button.id}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex w-full items-center justify-between gap-2.5 rounded-full px-[20px] py-[10px] text-[16px] font-medium transition-transform duration-300 hover:scale-[1.04] lg:w-auto lg:justify-start lg:px-[30px] lg:py-5 lg:text-[24px]',
                  {
                    'bg-[#202224] text-white': button.variant === 'dark',
                    'bg-white text-neutral-900': button.variant !== 'dark'
                  }
                )}
              >
                {button.label}
                <LazyImage
                  src={button.icon}
                  alt="arrow"
                  width={15}
                  height={15}
                  showLoadingIndicator={false}
                />
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
