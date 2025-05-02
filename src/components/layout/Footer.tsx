import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-[120px] container flex flex-col gap-[60px]">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-[20px]">
          <Image
            src="/images/logo.svg"
            alt="DeGov.AI Logo"
            width={190}
            height={39}
          />
          <p className="text-[24px] font-normal leading-[140%]">
            Next-generation DAO governance platform projects
          </p>
        </div>

        <div className="grid grid-cols-3 gap-[120px]">
          <div className="flex flex-col gap-[40px]">
            <h4 className="text-[26px] font-semibold leading-[100%]">
              QUICK LINKS
            </h4>
            <ul className="flex flex-col gap-[20px]">
              <li>
                <Link
                  href="/features"
                  className="text-[20px] font-normal leading-[140%] hover:opacity-80 transition-opacity hover:underline"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/roadmap"
                  className="text-[20px] font-normal leading-[140%] hover:opacity-80 transition-opacity hover:underline"
                >
                  Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-[20px] font-normal leading-[140%] hover:opacity-80 transition-opacity hover:underline"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-[40px]">
            <h4 className="text-[26px] font-semibold leading-[100%]">
              RESOURCES
            </h4>
            <ul className="flex flex-col gap-[20px]">
              <li>
                <Link
                  href="/documentation"
                  className="text-[20px] font-normal leading-[140%] hover:opacity-80 transition-opacity hover:underline"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-[20px] font-normal leading-[140%] hover:opacity-80 transition-opacity hover:underline"
                >
                  Support
                </Link>
              </li>

              <li>
                <Link
                  href="https://github.com/degov-ai"
                  className="text-[20px] font-normal leading-[140%] hover:opacity-80 transition-opacity hover:underline"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-[40px]">
            <h4 className="text-[26px] font-semibold leading-[100%]">
              FOLLOW US
            </h4>
            <div className="flex items-center gap-[30px]">
              <Link
                href="https://github.com/degov-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/social/github.svg"
                  alt="GitHub"
                  width={28.286}
                  height={27}
                />
              </Link>
              <Link
                href="https://twitter.com/degov_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/social/x.svg"
                  alt="Twitter"
                  width={20.571}
                  height={20.571}
                />
              </Link>
              <Link
                href="https://discord.gg/degov-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
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
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/images/social/email.svg"
                  alt="Email"
                  width={24.429}
                  height={18}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>©{new Date().getFullYear()} RingDAO</p>
        <div className="flex items-center gap-[50px]">
          <Link
            href="/licenses"
            className="text-[16px] font-normal leading-[140%] hover:opacity-80 hover:underline transition-opacity"
          >
            Licenses
          </Link>
          <Link
            href="/help"
            className="text-[16px] font-normal leading-[140%] hover:opacity-80 hover:underline transition-opacity"
          >
            Help
          </Link>
          <Link
            href="/github"
            className="py-[5px] px-[10px] rounded-[100px] bg-[rgba(255,255,255,0.1)] flex items-center gap-[5px] hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/social/github-light.svg"
              alt="GitHub"
              width={14}
              height={14}
            />
            <span className="text-[20px] font-normal leading-[140%]">
              v 1.2.3
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
