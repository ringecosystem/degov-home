import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="container flex flex-col gap-[60px] py-[50px] md:py-[120px]">
      <div className="flex flex-col items-start gap-[80px] md:flex-row md:justify-between md:gap-0">
        <div className="flex flex-col gap-[20px]">
          <Image src="/images/logo.svg" alt="DeGov.AI Logo" width={190} height={39} />
          <p className="text-[16px] leading-[140%] font-normal md:text-[24px]">
            Next-generation DAO governance platform powered by AI
          </p>
        </div>

        <div className="grid-col-1 grid gap-[80px] md:grid-cols-3 md:gap-[120px]">
          <div className="flex flex-col gap-[20px] md:gap-[40px]">
            <h4 className="text-[20px] leading-[100%] font-semibold md:text-[26px]">QUICK LINKS</h4>
            <ul className="flex flex-col gap-[20px]">
              <li>
                <Link
                  href="/features"
                  className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80 md:text-[20px]"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80 md:text-[20px]"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80 md:text-[20px]"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-[20px] md:gap-[40px]">
            <h4 className="text-[20px] leading-[100%] font-semibold md:text-[26px]">RESOURCES</h4>
            <ul className="flex flex-col gap-[20px]">
              <li>
                <Link
                  href="/documentation"
                  className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80 md:text-[20px]"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80 md:text-[20px]"
                >
                  Support
                </Link>
              </li>

              <li>
                <Link
                  href="https://github.com/degov-ai"
                  className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80 md:text-[20px]"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-[20px] md:gap-[40px]">
            <h4 className="text-[20px] leading-[100%] font-semibold md:text-[26px]">FOLLOW US</h4>
            <div className="flex items-center gap-[30px]">
              <Link
                href="https://github.com/degov-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Image src="/images/social/github.svg" alt="GitHub" width={28.286} height={27} />
              </Link>
              <Link
                href="https://twitter.com/degov_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Image src="/images/social/x.svg" alt="Twitter" width={20.571} height={20.571} />
              </Link>
              <Link
                href="https://discord.gg/degov-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src="/images/social/telegram.svg"
                  alt="Telegram"
                  width={25.338}
                  height={21}
                />
              </Link>
              <Link
                href="https://medium.com/degov-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Image src="/images/social/email.svg" alt="Email" width={24.429} height={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[20px] md:flex-row md:items-center md:justify-between md:gap-0">
        <p className="order-2 text-center md:order-1 md:text-left">
          ©{new Date().getFullYear()} RingDAO
        </p>
        <div className="order-1 flex items-center justify-between gap-[50px] md:order-2 md:justify-start">
          <Link
            href="/licenses"
            className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80"
          >
            Licenses
          </Link>
          <Link
            href="/help"
            className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80"
          >
            Help
          </Link>
          <Link
            href="/github"
            className="flex items-center gap-[5px] rounded-[100px] bg-[rgba(255,255,255,0.1)] px-[10px] py-[5px] transition-opacity hover:opacity-80"
          >
            <Image src="/images/social/github-light.svg" alt="GitHub" width={14} height={14} />
            <span className="text-[20px] leading-[140%] font-normal">v 1.2.3</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
