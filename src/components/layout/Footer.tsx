import { LazyImage } from '@/components/ui/LazyImage';
import Link from 'next/link';

import { CurrentYear } from '@/components/ui/CurrentYear';
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
  return (
    <footer className="flex w-full justify-center bg-[#000000]">
      <div className="container flex w-full flex-col gap-[60px] px-[20px] py-[120px] lg:px-[100px]">
        <div className="grid grid-cols-1 gap-[60px] text-[#ffffff] lg:grid-cols-[420px,1fr] lg:items-start lg:gap-[120px]">
          <div className="flex flex-col gap-[20px] text-left">
            <Link href="/" className="flex items-center">
              <LazyImage
                src="/images/logo.svg"
                alt="DeGov.AI Logo"
                width={190.45}
                height={39}
                showLoadingIndicator={false}
              />
            </Link>
            <p className="h-[136px] text-[18px] leading-[140%] text-[#979797] lg:text-[20px]">
              DeGov.AI is an open-source tool for DAOs built based on the OpenZeppelin governor
              contracts.
            </p>
            <p className="text-[18px] leading-[140%] text-[#979797] lg:text-[20px]">
              ©<CurrentYear /> RingDAO
            </p>
          </div>

          <div className="grid grid-cols-1 gap-[60px] lg:grid-cols-2 lg:gap-[120px]">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-[40px]">
                <h4 className="text-[20px] font-semibold uppercase lg:text-[26px]">
                  {column.title}
                </h4>
                <ul className="flex flex-col gap-[20px] text-[18px] leading-[140%] text-[#ffffff] lg:text-[20px]">
                  {column.links.map((link) => (
                    <li
                      key={link.label}
                      className="opacity-70 transition-opacity hover:opacity-100"
                    >
                      <Link href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
