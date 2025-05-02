import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="container flex items-center justify-between absolute top-[100px]">
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt="DeGov.AI Logo"
          width={135.316}
          height={30}
          priority
        />
      </Link>
      <div className="flex items-center gap-[30px]">
        <nav className="px-[30px] bg-[#202224] rounded-[80px] py-[10px]">
          <ul className="flex items-center gap-[40px]">
            <li>
              <Link
                href="#features"
                className="text-[24px] font-medium leading-[140%] hover:opacity-80 transition-opacity"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#faq"
                className="text-[24px] font-medium leading-[140%] hover:opacity-80 transition-opacity"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="#get-started"
                className="text-[24px] font-medium leading-[140%] hover:opacity-80 transition-opacity"
              >
                Get Started
              </Link>
            </li>
            <li>
              <Link
                href="#roadmap"
                className="text-[24px] font-medium leading-[140%] hover:opacity-80 transition-opacity"
              >
                Roadmap
              </Link>
            </li>
          </ul>
        </nav>

        <Link
          href="/app"
          className="px-[16px] h-[46px] flex items-center justify-center rounded-[48px] bg-[var(--foreground)] text-[24px] font-medium leading-[140%] hover:opacity-80 transition-opacity text-[var(--background)]"
        >
          Launch App
        </Link>
      </div>
    </header>
  );
}
