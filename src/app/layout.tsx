import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DeGov.AI',
  description:
    'DeGov.AI is a AI-powered platform for decentralized governance, built on the Openzeppelin contracts.'
};

export async function generateMetadata(): Promise<Metadata> {
  const name = 'DeGov.AI';
  const description =
    'DeGov.AI is a AI-powered platform for decentralized governance, built on the Openzeppelin contracts.';
  const siteUrl = 'https://degov.ai';
  const ogImageUrl = `${siteUrl}/image/og.png`;

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
      <body className={cn(urbanist.className, 'bg-black text-white antialiased')}>
        <div className="min-h-screen w-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
