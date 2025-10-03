import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

import './globals.css';
import { cn } from '@/lib/utils';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

const SITE_URL = 'https://degov.ai';
const STRUCTURED_DATA = JSON.stringify([
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DeGov.AI',
    url: SITE_URL,
    sameAs: [
      'https://x.com/ai_degov',
      'https://docs.degov.ai/',
      'https://github.com/ringecosystem/degov'
    ],
    description:
      'DeGov.AI is an AI-powered, open-source governance platform built on the OpenZeppelin Governor framework.'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DeGov.AI',
    url: SITE_URL,
    description:
      'DeGov.AI equips DAOs with AI delegation, real-time monitoring, and transparent on-chain governance tooling.'
  }
]);

const urbanist = Urbanist({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const name = 'DeGov.AI';
  const description =
    'DeGov.AI is a AI-powered platform for decentralized governance, built on the Openzeppelin contracts.';
  const siteUrl = SITE_URL;
  const ogImageUrl = `${siteUrl}/images/og.png`;
  const keywords = [
    'DeGov',
    'DAO governance',
    'on-chain governance',
    'OpenZeppelin Governor',
    'AI delegation',
    'decentralized decision making'
  ];

  return {
    title: {
      default: name,
      template: `%s | ${name}`
    },
    description,
    metadataBase: new URL(siteUrl),
    keywords,
    alternates: {
      canonical: siteUrl
    },
    openGraph: {
      type: 'website',
      siteName: name,
      title: name,
      description,
      url: siteUrl,
      images: [
        {
          url: ogImageUrl,
          width: 512,
          height: 512,
          alt: name
        }
      ],
      locale: 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ai_degov',
      creator: '@ai_degov',
      title: name,
      description,
      images: [ogImageUrl]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1
      }
    }
  };
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(urbanist.className, 'overflow-x-hidden bg-black text-white antialiased')}>
        <ReactQueryProvider>
          <div className="min-h-screen w-full overflow-x-hidden">{children}</div>
        </ReactQueryProvider>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }}
        />
      </body>
    </html>
  );
}
