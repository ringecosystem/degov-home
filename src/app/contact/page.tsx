import type { Metadata } from 'next';
import { SOCIAL_IMAGE_URL } from '@/lib/seo';
import { InfoPage } from '@/components/layout/info-page';

export const metadata: Metadata = {
  title: 'Contact DeGov',
  description:
    'Contact DeGov for product support, Square hosting, API access, and data partnerships.',
  alternates: { canonical: 'https://degov.ai/contact/' },
  openGraph: {
    title: 'Contact DeGov',
    description:
      'Contact DeGov for product support, Square hosting, API access, and data partnerships.',
    url: 'https://degov.ai/contact/',
    images: [SOCIAL_IMAGE_URL]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact DeGov',
    description:
      'Contact DeGov for product support, Square hosting, API access, and data partnerships.',
    images: [SOCIAL_IMAGE_URL]
  }
};

export default function ContactPage() {
  return (
    <InfoPage title="Contact DeGov">
      <p>
        Email <a href="mailto:support@degov.ai">support@degov.ai</a> for product support, Square
        managed hosting, Agent API partner access, or an Atlas data partnership. Tell us which
        product you use and what you want to accomplish.
      </p>
      <h2>Integration support</h2>
      <p>
        For API issues, include the public endpoint, HTTP status, and request ID when available.
        Describe the expected result and omit API tokens, wallet credentials, and other secrets. For
        partnership requests, describe the data your product needs and expected usage.
      </p>
      <h2>Start with public resources</h2>
      <p>
        You can browse <a href="https://atlas.degov.ai/">Atlas</a> and use the free DAO directory
        without contacting us. The{' '}
        <a href="https://docs.degov.ai/agent-api/quickstart/">API quickstart</a> explains free
        discovery and per-call paid access. <a href="/pricing/">Square hosting</a> has its own
        pricing and responsibilities.
      </p>
      <p>
        For reproducible documentation issues, use the{' '}
        <a href="https://github.com/ringecosystem/degov-docs/issues">documentation issue tracker</a>
        .
      </p>
    </InfoPage>
  );
}
