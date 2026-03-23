'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { GithubIcon, XIcon } from '@/components/icons/hero';
import { LazyImage } from '@/components/ui/LazyImage';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Ecosystem', href: '/#ecosystem' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: 'https://docs.degov.ai/', external: true }
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/ringecosystem/degov',
    Icon: GithubIcon
  },
  { label: 'X', href: 'https://x.com/ai_degov', Icon: XIcon },
  {
    label: 'Telegram',
    href: 'https://t.me/RingDAO_Hub',
    Icon: TelegramIcon
  }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const syncHash = () => setCurrentHash(window.location.hash);

    syncHash();
    window.addEventListener('hashchange', syncHash);

    return () => window.removeEventListener('hashchange', syncHash);
  }, [pathname]);

  // Focus trap for mobile menu
  const handleFocusTrap = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileMenuRef.current) return;
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener('keydown', handleFocusTrap);
      // Focus first link when menu opens
      const firstLink = mobileMenuRef.current?.querySelector<HTMLElement>('a[href]');
      firstLink?.focus();
    } else {
      document.removeEventListener('keydown', handleFocusTrap);
      hamburgerRef.current?.focus();
    }
    return () => document.removeEventListener('keydown', handleFocusTrap);
  }, [mobileOpen, handleFocusTrap]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 right-0 left-0 z-50 transition-colors duration-300',
          mobileOpen
            ? 'bg-black'
            : scrolled
              ? 'bg-black/80 shadow-[0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md'
              : 'bg-transparent'
        )}
      >
        <div className="container flex h-[72px] items-center justify-between lg:h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <LazyImage
              src="/images/logo.svg"
              alt="DeGov.AI Logo"
              width={136}
              height={30}
              className="h-auto w-[120px]"
              showLoadingIndicator={false}
              loading="eager"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isHashLink = link.href.startsWith('/#');
              let isActive = false;
              if (link.external) {
                isActive = false;
              } else if (isHashLink) {
                isActive = pathname === '/' && currentHash === link.href.slice(1);
              } else {
                isActive = pathname === link.href;
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  {...(link.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  onClick={() => {
                    if (isHashLink) {
                      setCurrentHash(link.href.slice(1));
                    } else if (!link.external) {
                      setCurrentHash('');
                    }
                  }}
                  className={cn(
                    'text-sm font-medium transition-colors duration-150 hover:text-white',
                    isActive ? 'text-white' : 'text-text-secondary'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={cn(
                  'block h-0.5 w-full bg-white transition-all duration-300',
                  mobileOpen && 'translate-y-2 rotate-45'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-full bg-white transition-all duration-300',
                  mobileOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-full bg-white transition-all duration-300',
                  mobileOpen && '-translate-y-2 -rotate-45'
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu — outside nav to avoid stacking context issues from backdrop-blur */}
      <div
        ref={mobileMenuRef}
        className={cn(
          'fixed inset-x-0 top-[72px] bottom-0 z-50 bg-black transition-opacity duration-300 lg:hidden',
          mobileOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}
      >
        <div className="container flex flex-col gap-6 pt-8">
          {navLinks.map((link) => {
            const isHashLink = link.href.startsWith('/#');
            let isActive = false;
            if (link.external) {
              isActive = false;
            } else if (isHashLink) {
              isActive = pathname === '/' && currentHash === link.href.slice(1);
            } else {
              isActive = pathname === link.href;
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                {...(link.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                onClick={() => {
                  setMobileOpen(false);
                  if (isHashLink) {
                    setCurrentHash(link.href.slice(1));
                  } else if (!link.external) {
                    setCurrentHash('');
                  }
                }}
                className={cn(
                  'text-lg font-medium transition-colors duration-150 hover:text-text-secondary',
                  isActive ? 'text-white' : 'text-text-secondary'
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="border-t border-white/[0.06] pt-6">
            <div className="flex items-center gap-6">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-text-secondary transition-colors duration-150 hover:text-white"
                >
                  <link.Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TelegramIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-5 w-5', className)}
      aria-hidden
      {...props}
    >
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"
        fill="currentColor"
      />
    </svg>
  );
}
