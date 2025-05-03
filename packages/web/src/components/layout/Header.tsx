import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="absolute top-[100px] container hidden items-center justify-between md:flex">
      <Link href="/">
        <Image src="/images/logo.svg" alt="DeGov.AI Logo" width={135.316} height={30} priority />
      </Link>
      <div className="flex items-center gap-[30px]">
        <nav className="rounded-[80px] bg-[#202224] px-[30px] py-[10px]">
          <ul className="flex items-center gap-[40px]">
            <li>
              <Link
                href="#features"
                className="text-[24px] leading-[140%] font-medium transition-opacity hover:opacity-80"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#faq"
                className="text-[24px] leading-[140%] font-medium transition-opacity hover:opacity-80"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="#get-started"
                className="text-[24px] leading-[140%] font-medium transition-opacity hover:opacity-80"
              >
                Get Started
              </Link>
            </li>
            <li>
              <Link
                href="#roadmap"
                className="text-[24px] leading-[140%] font-medium transition-opacity hover:opacity-80"
              >
                Roadmap
              </Link>
            </li>
          </ul>
        </nav>

        <Link
          href="/app"
          className="flex h-[46px] items-center justify-center rounded-[48px] bg-[var(--foreground)] px-[16px] text-[24px] leading-[140%] font-medium text-[var(--background)] transition-opacity hover:opacity-80"
        >
          Launch App
        </Link>
      </div>
    </header>
  );
}
