'use client';

import { LazyImage } from '@/components/ui/LazyImage';
import Link from 'next/link';

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const footerColumns = [
  {
    title: 'Resources',
    links: [
      { label: 'Deploy By Yourself', href: 'https://docs.degov.ai/integration/deploy/' },
      { label: 'FAQs', href: 'https://docs.degov.ai/faqs' },
      { label: 'License', href: 'https://github.com/ringecosystem/degov/blob/main/LICENSE.md' },
      { label: 'Docs', href: 'https://docs.degov.ai/' }
    ]
  },
  {
    title: 'Community',
    links: [
      { label: 'X', href: 'https://x.com/ai_degov' },
      { label: 'Telegram', href: 'https://t.me/RingDAO_Hub' },
      { label: 'GitHub', href: 'https://github.com/ringecosystem/degov' },
      { label: 'Open Square', href: 'https://square.degov.ai/' }
    ]
  }
];

export default function FooterSection() {
  const { ref: brandRef, animatedStyles: brandStyles } = useScrollAnimation({ delay: 0.1 });
  const { ref: columnsRef, animatedStyles: columnsStyles } = useScrollAnimation({ delay: 0.2 });

  return (
    <footer className="container flex w-full justify-between bg-black py-[120px]">
      <div className="flex flex-col gap-[20px] text-left" ref={brandRef} style={brandStyles}>
        <Link href="/" className="flex items-center">
          <LazyImage
            src="/images/logo.svg"
            alt="DeGov.AI Logo"
            width={190.45}
            height={39}
            showLoadingIndicator={false}
          />
        </Link>
        <p className="h-[136px] text-[20px] leading-[28px] text-[#979797]">
          DeGov.AI is an open-source tool for DAOs built
          <br /> based on the OpenZeppelin governor contracts.
        </p>
        <p className="text-[20px] leading-[28px] text-[#979797]">
          ©{new Date().getFullYear()} RingDAO
        </p>
      </div>

      <div
        className="grid grid-cols-1 gap-[120px] text-left lg:grid-cols-2"
        ref={columnsRef}
        style={columnsStyles}
      >
        {footerColumns.map((column, index) => (
          <FooterColumn key={column.title} column={column} index={index} />
        ))}
      </div>
    </footer>
  );
}

type FooterColumnConfig = (typeof footerColumns)[number];

function FooterColumn({ column, index }: { column: FooterColumnConfig; index: number }) {
  const { ref, animatedStyles } = useScrollAnimation({
    delay: 0.16 + index * 0.08,
    mobileDelay: 0.08 * Math.min(index, 1),
    mobileDuration: 0.2
  });

  return (
    <div ref={ref} style={animatedStyles} className="flex flex-col gap-[40px]">
      <h4 className="text-[26px] font-semibold uppercase">{column.title}</h4>
      <ul className="flex flex-col gap-[20px] text-[20px] leading-[28px] text-white">
        {column.links.map((link) => (
          <li key={link.label} className="opacity-70 transition-opacity hover:opacity-100">
            <Link href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
