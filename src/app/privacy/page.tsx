import type { Metadata } from 'next';
import { SOCIAL_IMAGE_URL } from '@/lib/seo';
import { InfoPage } from '@/components/layout/info-page';

export const metadata: Metadata = {
  title: 'Website privacy',
  description: 'How the DeGov official website uses analytics, browser storage, and contact links.',
  alternates: { canonical: 'https://degov.ai/privacy/' },
  openGraph: {
    title: 'Website privacy',
    description:
      'How the DeGov official website uses analytics, browser storage, and contact links.',
    url: 'https://degov.ai/privacy/',
    images: [SOCIAL_IMAGE_URL]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Website privacy',
    description:
      'How the DeGov official website uses analytics, browser storage, and contact links.',
    images: [SOCIAL_IMAGE_URL]
  }
};

export default function PrivacyPage() {
  return (
    <InfoPage title="Website privacy">
      <p>
        Last reviewed: 10 September 2026. This notice describes the official website at degov.ai.
      </p>
      <h2>Website analytics</h2>
      <p>
        The production website uses Google Analytics to understand page visits and navigation to
        DeGov products. Navigation events describe the destination product, path category, and
        referral category. The site uses browser session storage to avoid counting repeated product
        navigation in the same session. Google Analytics can store analytics cookies in your
        browser.
      </p>
      <p>
        The website enables analytics storage and disables advertising storage, advertising user
        data, and ad personalization in its Google tag configuration. Your browser settings and
        extensions can restrict cookies or block analytics requests. Read{' '}
        <a href="https://policies.google.com/privacy">Google&apos;s privacy policy</a> for how
        Google processes information through its services.
      </p>
      <h2>Contact and linked services</h2>
      <p>
        Email links open your email application. If you contact support, include only the
        information needed to answer your request. This website links to documentation, GitHub,
        Square, Atlas, and other services; their accounts, wallets, and data handling are separate
        from browsing this website. Public governance records do not become private when viewed
        through DeGov.
      </p>
      <h2>Questions</h2>
      <p>
        Contact <a href="mailto:support@degov.ai">support@degov.ai</a> with questions about this
        website&apos;s analytics or information you have shared with support.
      </p>
    </InfoPage>
  );
}
