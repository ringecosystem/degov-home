'use client';

import Link from 'next/link';

import { GithubIcon, XIcon } from '@/components/icons/hero';
import { LazyImage } from '@/components/ui/LazyImage';
import { CurrentYear } from '@/components/ui/CurrentYear';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const resourceLinks = [
  { label: 'Self-Host Guide', href: 'https://docs.degov.ai/integration/deploy/' },
  { label: 'FAQs', href: 'https://docs.degov.ai/faqs' },
  { label: 'License', href: 'https://github.com/ringecosystem/degov/blob/main/LICENSE.md' },
  { label: 'Docs', href: 'https://docs.degov.ai/' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/ringecosystem/degov', Icon: GithubIcon },
  { label: 'X', href: 'https://x.com/ai_degov', Icon: XIcon },
  { label: 'Telegram', href: 'https://t.me/RingDAO_Hub', Icon: TelegramIcon },
];

export default function FooterSection() {
  const { ref: brandRef, animatedStyles: brandStyles } = useScrollAnimation({ delay: 0.1 });
  const { ref: linksRef, animatedStyles: linksStyles } = useScrollAnimation({ delay: 0.2 });

  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container flex w-full flex-col justify-between gap-8 pt-8 pb-4 lg:flex-row lg:gap-0 lg:pt-10 lg:pb-4">
        <div className="flex flex-col gap-4" ref={brandRef} style={brandStyles}>
          <Link href="/" className="flex items-center opacity-85 transition-opacity hover:opacity-100">
            <LazyImage
              src="/images/logo.svg"
              alt="DeGov.AI Logo"
              width={136}
              height={30}
              className="h-auto w-[140px]"
              showLoadingIndicator={false}
              loading="eager"
            />
          </Link>
          <p className="max-w-[300px] text-sm leading-relaxed text-text-secondary">
            Open-source governance frontend for OpenZeppelin Governor DAOs.
          </p>
        </div>

        <div className="flex flex-col gap-3" ref={linksRef} style={linksStyles}>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60">
            Resources
          </h3>
          <ul className="flex flex-col gap-2.5">
            {resourceLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary transition-colors duration-150 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container flex items-center justify-between border-t border-white/[0.04] py-4">
        <p className="text-xs text-text-secondary/60">
          &copy;<CurrentYear /> RingDAO
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-text-secondary/50 transition-colors duration-150 hover:text-white"
            >
              <link.Icon className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
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
