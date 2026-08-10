'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { MotionButtonContent } from '@/components/layout/motion-button-content';

type SiteHeaderProps = {
  variant: 'home' | 'pricing';
};

export function SiteHeader({ variant }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const isPricing = variant === 'pricing';
  const desktopHomeOdId = (value: string) => (!isPricing && !isOpen ? value : undefined);
  const mobileHomeOdId = (value: string) => (!isPricing && isOpen ? value : undefined);

  useEffect(() => {
    const closeForDesktop = () => {
      if (window.innerWidth > 820) setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;

      const links = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a') ?? []);
      const first = links.at(0);
      const last = links.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.classList.toggle('menu-open', isOpen);
    document.getElementById('site-content')?.toggleAttribute('inert', isOpen);
    document.getElementById('site-footer')?.toggleAttribute('inert', isOpen);
    window.addEventListener('resize', closeForDesktop);
    document.addEventListener('keydown', handleKeyDown);

    if (isOpen) {
      requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>('a')?.focus());
    }

    return () => {
      document.body.classList.remove('menu-open');
      document.getElementById('site-content')?.removeAttribute('inert');
      document.getElementById('site-footer')?.removeAttribute('inert');
      window.removeEventListener('resize', closeForDesktop);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="topnav" data-od-id={isPricing ? 'pricing-header' : 'site-header'}>
        <div className="nav-inner container">
          <a
            className="brand"
            data-od-id={isPricing ? 'pricing-brand' : 'brand-home'}
            href={isPricing ? '/' : '#top'}
            aria-label="DeGov.AI home"
          >
            <Image
              className="brand-logo"
              src="/images/degov-ai-2x.svg"
              alt="DeGov.AI"
              width={147}
              height={30}
              priority
            />
            {isPricing ? <span className="brand-context">Square pricing</span> : null}
          </a>

          <nav
            className="nav-links"
            aria-label={isPricing ? 'Pricing navigation' : 'Main navigation'}
          >
            {isPricing ? (
              <>
                <a href="#models" onClick={closeMenu}>
                  Models
                </a>
                <a href="#responsibilities" onClick={closeMenu}>
                  Responsibilities
                </a>
                <a href="#faq" onClick={closeMenu}>
                  FAQ
                </a>
              </>
            ) : (
              <>
                <a
                  data-od-id={desktopHomeOdId('nav-square')}
                  href="https://square.degov.ai/"
                  onClick={closeMenu}
                >
                  Square
                </a>
                <a
                  data-od-id={desktopHomeOdId('nav-atlas')}
                  href="https://atlas.degov.ai/"
                  onClick={closeMenu}
                >
                  Atlas
                </a>
                <a data-od-id={desktopHomeOdId('nav-pricing')} href="/pricing" onClick={closeMenu}>
                  Pricing
                </a>
                <a data-od-id={desktopHomeOdId('nav-agents')} href="#agents" onClick={closeMenu}>
                  For agents
                </a>
                <a
                  data-od-id={desktopHomeOdId('nav-community')}
                  href="#community"
                  onClick={closeMenu}
                >
                  Why governance
                </a>
              </>
            )}
          </nav>

          <div className="nav-actions">
            <a
              className={`${isPricing ? 'btn btn-primary btn-external' : 'btn btn-ghost'} motion-btn`}
              data-od-id={isPricing ? 'pricing-nav-cta' : 'nav-choose-path'}
              href={isPricing ? 'https://square.degov.ai/' : '#products'}
              {...(isPricing
                ? {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    'aria-label': 'Open Square app in a new tab'
                  }
                : {})}
            >
              <MotionButtonContent label={isPricing ? 'Open Square' : 'Choose your path'} />
            </a>
            <button
              ref={menuButtonRef}
              className="menu-button"
              id={isPricing ? 'pricingMenuButton' : 'menuButton'}
              data-od-id={isPricing ? 'pricing-menu-button' : 'mobile-menu-button'}
              type="button"
              aria-expanded={isOpen}
              aria-controls={isPricing ? 'mobileMenu' : 'homeMobileMenu'}
              aria-label={
                isPricing
                  ? isOpen
                    ? 'Close navigation'
                    : 'Open navigation'
                  : isOpen
                    ? 'Close menu'
                    : 'Open menu'
              }
              onClick={() => setIsOpen((open) => !open)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  d={!isPricing && isOpen ? 'M5 5l14 14M19 5L5 19' : 'M4 7h16M4 12h16M4 17h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <nav
        className="mobile-menu"
        id={isPricing ? 'mobileMenu' : 'homeMobileMenu'}
        ref={menuRef}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        <div className="mobile-menu-inner container">
          {isPricing ? (
            <>
              <a href="#models" onClick={closeMenu}>
                Models <span>01</span>
              </a>
              <a href="#responsibilities" onClick={closeMenu}>
                Responsibilities <span>02</span>
              </a>
              <a href="#faq" onClick={closeMenu}>
                FAQ <span>03</span>
              </a>
              <a
                className="external"
                href="https://square.degov.ai/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Open Square
              </a>
              <a
                className="external"
                href="https://atlas.degov.ai/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                Open Atlas
              </a>
            </>
          ) : (
            <>
              <a
                data-od-id={mobileHomeOdId('nav-square')}
                href="https://square.degov.ai/"
                onClick={closeMenu}
              >
                Square
              </a>
              <a
                data-od-id={mobileHomeOdId('nav-atlas')}
                href="https://atlas.degov.ai/"
                onClick={closeMenu}
              >
                Atlas
              </a>
              <a data-od-id={mobileHomeOdId('nav-pricing')} href="/pricing" onClick={closeMenu}>
                Pricing
              </a>
              <a data-od-id={mobileHomeOdId('nav-agents')} href="#agents" onClick={closeMenu}>
                For agents
              </a>
              <a data-od-id={mobileHomeOdId('nav-community')} href="#community" onClick={closeMenu}>
                Why governance
              </a>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
