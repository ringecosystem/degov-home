import './globals.css';
import type { Metadata, Viewport } from 'next';

import { SEO_ORGANIZATION, SEO_WEBSITE, SITE_URL } from '@/lib/seo';

const STRUCTURED_DATA = JSON.stringify([SEO_ORGANIZATION, SEO_WEBSITE]);

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1f2228'
};

export async function generateMetadata(): Promise<Metadata> {
  const siteName = 'DeGov.AI';
  const title = 'DeGov.AI — Better governance for better communities.';
  const description =
    'DeGov.AI helps communities run governance with Square and understand governance with Atlas.';
  const siteUrl = SITE_URL;
  const ogImageUrl = `${siteUrl}/images/og.png`;
  const keywords = [
    'DeGov',
    'DAO governance',
    'on-chain governance',
    'DeGov Square',
    'DeGov Atlas',
    'OpenZeppelin Governor',
    'governance intelligence',
    'agent governance data'
  ];

  return {
    title: {
      default: title,
      template: '%s | DeGov.AI'
    },
    description,
    metadataBase: new URL(siteUrl),
    keywords,
    alternates: {
      canonical: siteUrl
    },
    openGraph: {
      type: 'website',
      siteName,
      title,
      description,
      url: siteUrl,
      images: [
        {
          url: ogImageUrl,
          width: 512,
          height: 512,
          alt: 'DeGov.AI'
        }
      ],
      locale: 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ai_degov',
      creator: '@ai_degov',
      title: siteName,
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
      <body>
        {children}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }}
        />
      </body>
    </html>
  );
}
