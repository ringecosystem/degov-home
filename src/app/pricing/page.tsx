import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import PricingClient from './pricing-client';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Start free for 6 months. Then self-host for free or choose managed hosting at $200/mo.',
  alternates: {
    canonical: `${SITE_URL}/pricing`
  },
  openGraph: {
    title: 'Pricing | DeGov.AI',
    description:
      'Start free for 6 months. Then self-host for free or choose managed hosting at $200/mo.',
    url: `${SITE_URL}/pricing`
  }
};

export default function PricingPage() {
  return <PricingClient />;
}
