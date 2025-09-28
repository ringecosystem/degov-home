'use client';

import { LazyImage } from '@/components/ui/LazyImage';
import Link from 'next/link';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  const { ref: descriptionRef, animatedStyles: descriptionStyles } = useScrollAnimation({ delay: 0.24 });
  const { ref: buttonsRef, animatedStyles: buttonsStyles } = useScrollAnimation({ delay: 0.3 });

  return (
    <section className="container flex w-full flex-col justify-center bg-black">
      <div className="relative overflow-hidden rounded-[20px]" ref={cardRef} style={cardStyles}>
        <LazyImage
          src="/images/cta-background.png"
          alt="CTA background"
          fill
          priority
          className="object-cover"
          wrapperClassName="hidden h-full w-full lg:block absolute inset-0"
        />
        <LazyImage
          src="/images/cta-background-mobile.png"
          alt="CTA background mobile"
          fill
          priority
          className="object-cover"
          wrapperClassName="block h-full w-full lg:hidden absolute inset-0"
        />
        {/* <div className="absolute inset-0 bg-black/60" /> */}

        <div className="relative flex flex-col items-center gap-[50px] px-6 py-[90px] text-white">
          <div ref={headingRef} style={headingStyles}>
            <h2 className="text-center text-[70px] leading-[84px] font-medium tracking-wider">
              Ready to Create Your DAO?
            </h2>
          </div>
          <p
            className="max-w-[760px] text-center text-[30px] leading-[42px] font-normal text-white/70"
            ref={descriptionRef}
            style={descriptionStyles}
          >
            Build better communities with <span className="underline">DeGov.AI</span>, which makes
            governance easy, efficient, and powerful.
          </p>
          <div className="flex items-center gap-[50px]" ref={buttonsRef} style={buttonsStyles}>
            {ctaButtons.map((button) => (
              <Link
                key={button.id}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  button.variant === 'dark'
                    ? 'flex items-center gap-2.5 rounded-full bg-[#202224] px-7 py-5 text-2xl font-medium text-white transition-transform duration-300 hover:scale-[1.04]'
                    : 'flex items-center gap-2.5 rounded-full bg-white px-7 py-5 text-2xl font-medium text-neutral-900 transition-transform duration-300 hover:scale-[1.04]'
                }
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
      </div>
    </section>
  );
}
