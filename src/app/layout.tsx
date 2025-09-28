import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { cn } from '@/lib/utils';

const urbanist = Urbanist({ subsets: ['latin'] });

export async function generateMetadata(): Promise<Metadata> {
  const name = 'DeGov.AI';
  const description =
    'DeGov.AI is a AI-powered platform for decentralized governance, built on the Openzeppelin contracts.';
  const siteUrl = 'https://degov.ai';
  const ogImageUrl = `${siteUrl}/images/og.png`;

  return {
    title: name,
    description,
    metadataBase: new URL(siteUrl),
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
      ]
    },
    twitter: {
      card: 'summary',
      site: '@ai_degov',
      creator: '@ai_degov',
      title: name,
      description,
      images: [ogImageUrl]
    },
    other: {
      timestamp: Date.now()
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
      </body>
    </html>
  );
}
