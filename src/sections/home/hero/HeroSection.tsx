import { LazyImage } from '@/components/ui/LazyImage';
import Link from 'next/link';

import { DocsIcon, GithubIcon, XIcon } from '@/components/icons/hero';

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
  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <LazyImage
          src="/images/hero-background.png"
          alt="Hero background"
          fill
          priority
          className="object-cover"
          wrapperClassName="hidden h-full w-full lg:block"
        />
        <LazyImage
          src="/images/hero-background-mobile.png"
          alt="Hero background"
          fill
          priority
          className="object-cover"
          wrapperClassName="block h-full w-full lg:hidden"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
      </div>

      <div className="relative flex w-full justify-center px-5 py-20 sm:px-10 lg:px-24 lg:py-24">
        <div className="container flex w-full flex-col items-center gap-24">
          <div className="flex w-full flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
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
              <div className="flex h-11 items-center gap-10 rounded-[80px] bg-[#202224] px-7 shadow-[0px_12px_20px_rgba(0,0,0,0.04)]">
                <Link
                  href="https://x.com/ai_degov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-200 hover:scale-[1.04]"
                  aria-label="Follow DeGov on X"
                >
                  <XIcon className="text-white transition-colors duration-200 group-hover:text-white/70" />
                </Link>
                <Link
                  href="https://docs.degov.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-200 hover:scale-[1.04]"
                  aria-label="Read the DeGov documentation"
                >
                  <DocsIcon className="text-white transition-colors duration-200 group-hover:text-white/70" />
                </Link>
                <Link
                  href="https://github.com/ringecosystem/degov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-white transition-all duration-200 hover:scale-[1.02] hover:text-white/80"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-[6px] bg-white transition-colors duration-200 group-hover:bg-white/80">
                    <GithubIcon className="text-[#202224]" />
                  </span>
                  <span className="text-xl font-medium tracking-[-0.2px]">ringecosystem/degov</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-14 text-center">
            <h1 className="flex flex-col gap-3 text-4xl font-semibold tracking-[3px] text-white sm:text-5xl lg:text-8xl lg:tracking-[5px]">
              <span className="leading-tight lg:leading-[100px]">Next-Gen</span>
              <span className="leading-tight lg:leading-[100px]">DAO Governance</span>
              <span className="leading-tight lg:leading-[100px]">Made Simple</span>
            </h1>

            <p className="max-w-3xl text-lg leading-relaxed font-normal text-white/70 sm:text-xl lg:max-w-4xl lg:text-3xl lg:leading-loose">
              An open-source system that equips OpenZeppelin Governor DAOs with AI agents capable of
              voting and receiving delegations.
            </p>

            <div className="flex flex-col items-center gap-5 sm:flex-row">
              {heroButtons.map((button) => (
                <Link
                  key={button.id}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    button.variant === 'light'
                      ? 'flex min-w-[200px] items-center justify-center rounded-full bg-white px-7 py-2.5 text-2xl font-medium text-[#202224] transition-transform duration-300 hover:scale-[1.04]'
                      : 'flex min-w-[200px] items-center justify-center rounded-full border border-white px-7 py-2.5 text-2xl font-medium text-white transition-transform duration-300 hover:scale-[1.04]'
                  }
                >
                  {button.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
