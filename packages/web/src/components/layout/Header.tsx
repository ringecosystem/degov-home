'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#features', label: 'Features' },
  { href: '#faq', label: 'FAQ' },
  { href: '#get-started', label: 'Get Started' },
  { href: '#roadmap', label: 'Roadmap' }
];

export default function Header() {
  useEffect(() => {
    const sections = navItems.map((item) => item.href.substring(1));

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      // Check if we're at the top first
      if (scrollPosition < 250) {
        if (window.location.hash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (window.location.hash !== `#${section}`) {
              window.history.replaceState(null, '', `#${section}`);
            }
            break;
          }
        }
      }
    };

    const handleNavClick = (e: Event) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 120,
            behavior: 'smooth'
          });

          window.history.pushState(null, '', href);
        }
      }
    };

    // Add click event listeners to all nav links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => link.addEventListener('click', handleNavClick));

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      navLinks.forEach((link) => link.removeEventListener('click', handleNavClick));
    };
  }, []);

  return (
    <header className="absolute top-[100px] container hidden items-center justify-between lg:flex">
      <Link href="/">
        <Image src="/images/logo.svg" alt="DeGov.AI Logo" width={135.316} height={30} priority />
      </Link>
      <div className="flex items-center gap-[30px]">
        <nav className="rounded-[80px] bg-[#202224] px-[30px] py-[10px]">
          <ul className="flex items-center gap-[40px]">
            {navItems.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'relative text-[24px] leading-[140%] font-medium text-[var(--foreground)] transition-all duration-300 ease-in-out hover:opacity-80',
                    'group overflow-hidden'
                  )}
                >
                  {label}
                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--foreground)] transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/app"
          className="flex h-[46px] items-center justify-center rounded-[48px] bg-[var(--foreground)] px-[16px] text-[24px] leading-[140%] font-medium text-[var(--background)] transition-all hover:scale-105 hover:opacity-80"
        >
          Launch App
        </Link>
      </div>
    </header>
  );
}
