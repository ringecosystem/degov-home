import { LazyImage } from '@/components/ui/LazyImage';
import Link from 'next/link';

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
    <footer className="flex w-full justify-center bg-black">
      <div className="container flex w-full flex-col gap-14 px-6 pt-24 pb-20 text-white sm:px-10 lg:px-24 lg:pb-24">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-[384px] flex-col gap-5 text-left">
            <Link href="/" className="flex items-center">
              <LazyImage
                src="/images/logo.svg"
                alt="DeGov.AI Logo"
                width={190.45}
                height={39}
                showLoadingIndicator={false}
              />
            </Link>
            <p className="h-[136px] text-xl leading-7 text-[#979797]">
              DeGov.AI is an open-source tool for DAOs built based on the OpenZeppelin governor
              contracts.
            </p>
            <p className="text-xl leading-7 text-[#979797]">©{new Date().getFullYear()} RingDAO</p>
          </div>

          <div className="grid grid-cols-1 gap-10 text-left lg:grid-cols-2 lg:gap-28">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-10">
                <h4 className="text-2xl font-semibold uppercase">{column.title}</h4>
                <ul className="flex flex-col gap-5 text-xl leading-7 text-white">
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
