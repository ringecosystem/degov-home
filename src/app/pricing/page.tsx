import type { Metadata } from 'next';
import { PRICING_WEBPAGE, SITE_URL, SOCIAL_IMAGE_ALT, SOCIAL_IMAGE_URL } from '@/lib/seo';
import PricingClient from './pricing-client';

const PRICING_WEBPAGE_STRUCTURED_DATA = JSON.stringify(PRICING_WEBPAGE);

export const metadata: Metadata = {
  title: {
    absolute: 'Square Pricing — DeGov.AI'
  },
  description:
    'DeGov.AI Square pricing: self-host for free or choose managed hosting, with the first six months free.',
  alternates: {
    canonical: `${SITE_URL}/pricing`
  },
  openGraph: {
    type: 'website',
    siteName: 'DeGov.AI',
    locale: 'en_US',
    title: 'Square Pricing — DeGov.AI',
    description:
      'Self-host Square for free or choose managed hosting, with the first six months free.',
    url: `${SITE_URL}/pricing`,
    images: [
      {
        url: SOCIAL_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: SOCIAL_IMAGE_ALT,
        type: 'image/png'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ai_degov',
    creator: '@ai_degov',
    title: 'Square Pricing — DeGov.AI',
    description: 'Self-host Square for free or choose managed hosting, with six months free.',
    images: [{ url: SOCIAL_IMAGE_URL, alt: SOCIAL_IMAGE_ALT }]
  }
};

export default function PricingPage() {
  return (
    <>
      <PricingClient />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: PRICING_WEBPAGE_STRUCTURED_DATA }}
      />
    </>
  );
}
