import Link from 'next/link';
import Image from 'next/image';
export default function HeroSection() {
  return (
    <section className="hero-section bg-[url('/images/hero-background-mobile.png')] bg-cover bg-center py-[100px] md:bg-[url('/images/hero-background.png')]">
      <div className="container flex flex-col gap-[58px] pt-[0] md:gap-[0px] md:pt-[196px]">
        <Link href="/" className="mx-auto flex items-center justify-center md:hidden">
          <Image src="/images/logo.svg" alt="DeGov.AI Logo" width={135.316} height={30} priority />
        </Link>
        <div className="container hidden flex-col gap-[58px] md:flex">
          <div className="flex items-end justify-between">
            <h1 className="flex flex-col">
              <span className="text-[48px] leading-[100%] font-extralight md:text-[117px]">
                Next-Gen DAO
              </span>
              <span className="text-[48px] leading-[100%] font-extralight md:text-[117px]">
                Governance
              </span>
              <span className="text-[48px] leading-[100%] font-bold md:text-[137px]">
                Made Simple
              </span>
            </h1>

            <Link
              href="/get-started"
              className="rounded-[144px] bg-[var(--foreground)] px-[30px] py-[20px] text-[24px] font-medium text-[var(--background)] transition-opacity duration-300 hover:opacity-80"
            >
              Let's get started
            </Link>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-[5px]">
              <p className="text-[24px] leading-[130%] font-medium">Let's Talk</p>
              <a
                href="mailto:support@degov.ai"
                className="text-[20px] leading-[140%] font-normal text-[var(--foreground)]"
              >
                support@degov.ai
              </a>
            </div>

            <p className="w-[470px] justify-start text-right text-[20px] leading-7 font-normal text-white">
              Scale your DAO on-chain using powerful AI tools, built upon OpenZeppelin's trusted
              governance contracts.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[58px] md:hidden">
          <h1 className="flex flex-col items-center">
            <span className="text-[48px] leading-[100%] font-extralight">Next-Gen DAO</span>
            <span className="text-[48px] leading-[100%] font-extralight">Governance</span>
            <span className="text-[48px] leading-[100%] font-bold">Made Simple</span>
          </h1>
          <p className="text-center text-[18px] leading-[140%] font-normal text-[var(--foreground)]">
            Scale your DAO on-chain using powerful AI tools, built upon OpenZeppelin's trusted
            governance contracts.
          </p>
          <Link
            href="/get-started"
            className="mx-auto w-fit rounded-[144px] bg-[var(--foreground)] px-[20px] py-[10px] text-[16px] font-medium text-[var(--background)] transition-opacity duration-300 hover:opacity-80"
          >
            Let's get started
          </Link>
        </div>
      </div>
    </section>
  );
}
