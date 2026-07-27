import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import PricingClient from './pricing-client';

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
    title: 'Square Pricing — DeGov.AI',
    description:
      'Self-host Square for free or choose managed hosting, with the first six months free.',
    url: `${SITE_URL}/pricing`
  }
};

export default function PricingPage() {
  return <PricingClient />;
}
