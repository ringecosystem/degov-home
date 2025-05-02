import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero-section bg-[url('/images/hero-background.png')] bg-cover bg-center py-[100px]">
      <div className="container pt-[196px]">
        <div className="flex flex-col gap-[58px]">
          <div className="flex items-end justify-between">
            <h1 className="flex flex-col">
              <span className="text-[117px] leading-[100%] font-extralight">
                Next-Gen DAO
              </span>
              <span className="text-[117px] leading-[100%] font-extralight">
                Governance
              </span>
              <span className="text-[137px] font-bold leading-[100%]">
                Made Simple
              </span>
            </h1>

            <Link
              href="/get-started"
              className="rounded-[144px] bg-[var(--foreground)] text-[var(--background)] px-[30px] py-[20px] text-[24px] font-medium  hover:opacity-80 duration-300 transition-opacity"
            >
              Let's get started
            </Link>
          </div>
          <div className="flex  items-end justify-between ">
            <div className="flex flex-col gap-[5px]">
              <p className="text-[24px] font-medium leading-[130%]">
                Let's Talk
              </p>
              <a
                href="mailto:support@degov.ai"
                className="text-[20px] font-normal leading-[140%] text-[var(--foreground)]"
              >
                support@degov.ai
              </a>
            </div>

            <p className="w-[470px] text-right justify-start text-white text-[20px] font-normal leading-7">
              Scale your DAO on-chain using powerful AI tools, built upon
              OpenZeppelin's trusted governance contracts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
