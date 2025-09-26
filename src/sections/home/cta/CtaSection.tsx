import { LazyImage } from '@/components/ui/LazyImage';
import Link from 'next/link';

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
  return (
    <section className="flex w-full justify-center bg-black">
      <div className="container w-full px-6 pt-24 pb-20 sm:px-10 lg:px-24 lg:pb-24">
        <div className="relative overflow-hidden rounded-[20px]">
          <LazyImage
            src="/images/cta-background.png"
            alt="CTA background"
            fill
            priority
            className="object-cover"
            wrapperClassName="hidden h-full w-full lg:block"
          />
          <LazyImage
            src="/images/cta-background-mobile.png"
            alt="CTA background mobile"
            fill
            priority
            className="object-cover"
            wrapperClassName="block h-full w-full lg:hidden"
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative flex flex-col items-center gap-12 px-6 py-24 text-white">
            <h2 className="text-center text-6xl leading-[84px] font-medium tracking-wider lg:text-7xl">
              Ready to Create Your DAO?
            </h2>
            <p className="max-w-[760px] text-center text-3xl leading-10 font-normal text-white/70">
              Build better communities with <span className="underline">DeGov.AI</span>, which makes
              governance easy, efficient, and powerful.
            </p>
            <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
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
      </div>
    </section>
  );
}
