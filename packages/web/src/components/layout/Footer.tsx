import Link from 'next/link';
import Image from 'next/image';
import GithubWithTag from './GithubWithTag';

export default function Footer() {
  return (
    <footer className="container flex flex-col gap-[60px] py-[50px] xl:py-[120px]">
      <div className="flex flex-col items-start gap-[80px] xl:flex-row xl:justify-between xl:gap-0">
        <div className="flex flex-col gap-[20px]">
          <Image src="/images/logo.svg" alt="DeGov.AI Logo" width={190} height={39} />
          <p className="text-[16px] leading-[140%] font-normal xl:text-[24px]">
            Next-generation DAO governance platform powered by AI
          </p>
        </div>

        <div className="grid-col-1 grid gap-[80px] xl:grid-cols-3 xl:gap-[60px] 2xl:gap-[120px]">
          <div className="flex flex-col gap-[20px] xl:gap-[40px]">
            <h4 className="text-[20px] leading-[100%] font-semibold xl:text-[26px]">QUICK LINKS</h4>
            <ul className="flex flex-col gap-[20px]">
              <li>
                <Link
                  href="#features"
                  className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80 xl:text-[20px]"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#roadmap"
                  className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80 xl:text-[20px]"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80 xl:text-[20px]"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-[20px] xl:gap-[40px]">
            <h4 className="text-[20px] leading-[100%] font-semibold xl:text-[26px]">RESOURCES</h4>
            <ul className="flex flex-col gap-[20px]">
              <li>
                <Link
                  href="https://deepwiki.com/ringecosystem/degov/1-overview"
                  className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80 xl:text-[20px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://deepwiki.com/ringecosystem/degov/1-overview"
                  className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80 xl:text-[20px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support
                </Link>
              </li>

              <li>
                <Link
                  href="https://github.com/ringecosystem/degov"
                  className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80 xl:text-[20px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-[20px] xl:gap-[40px]">
            <h4 className="text-[20px] leading-[100%] font-semibold xl:text-[26px]">FOLLOW US</h4>
            <div className="flex items-center gap-[30px]">
              <Link
                href="https://github.com/ringecosystem/degov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 transition-opacity hover:opacity-80"
              >
                <Image src="/images/social/github.svg" alt="GitHub" width={28.286} height={27} />
              </Link>
              <Link
                href="https://x.com/ai_degov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 transition-opacity hover:opacity-80"
              >
                <Image src="/images/social/x.svg" alt="Twitter" width={20.571} height={20.571} />
              </Link>
              <Link
                href="https://t.me/DeGov_AI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 transition-opacity hover:opacity-80"
              >
                <Image
                  src="/images/social/telegram.svg"
                  alt="Telegram"
                  width={25.338}
                  height={21}
                />
              </Link>
              <Link
                href="mailto:support@degov.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 transition-opacity hover:opacity-80"
              >
                <Image src="/images/social/email.svg" alt="Email" width={24.429} height={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[20px] xl:flex-row xl:items-center xl:justify-between xl:gap-0">
        <p className="order-2 text-center xl:order-1 xl:text-left">
          ©{new Date().getFullYear()} RingDAO
        </p>
        <div className="order-1 flex items-center justify-between gap-[50px] xl:order-2 xl:justify-start">
          <Link
            href="https://github.com/ringecosystem/degov?tab=License-1-ov-file"
            className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            Licenses
          </Link>
          <Link
            href="https://deepwiki.com/ringecosystem/degov/1-overview"
            className="text-[16px] leading-[140%] font-normal transition-opacity hover:underline hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            Help
          </Link>
          <GithubWithTag />
        </div>
      </div>
    </footer>
  );
}
