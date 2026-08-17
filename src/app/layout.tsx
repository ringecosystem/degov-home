import './globals.css';
import type { Metadata, Viewport } from 'next';

import { AnalyticsConsentBanner } from '@/components/AnalyticsConsent';
import {
  SEO_ORGANIZATION,
  SEO_WEBSITE,
  SITE_URL,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_URL
} from '@/lib/seo';
import { ProductNavigationAnalytics } from '@/components/ProductNavigationAnalytics';
import { ANALYTICS_CONSENT_STORAGE_KEY } from '@/lib/analytics-consent';

const STRUCTURED_DATA = JSON.stringify([SEO_ORGANIZATION, SEO_WEBSITE]);
const GA4_MEASUREMENT_ID = 'G-QRLBRTT5X1';
const IS_GA4_ENABLED = process.env.NEXT_PUBLIC_DEGOV_HOME_GA4_ENABLED === 'true';
const GA4_BOOTSTRAP = `
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  var consentStorageKey = '${ANALYTICS_CONSENT_STORAGE_KEY}';
  function readAnalyticsConsent() {
    try {
      var storedConsent = window.localStorage.getItem(consentStorageKey);
      return storedConsent === 'granted' || storedConsent === 'denied' ? storedConsent : null;
    } catch {
      return null;
    }
  }

  var analyticsConsent = readAnalyticsConsent() === 'granted' ? 'granted' : 'denied';

  window.gtag('consent', 'default', {
    analytics_storage: analyticsConsent,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });

  window.gtag('js', new Date());
  window.gtag('config', '${GA4_MEASUREMENT_ID}');

  var googleTag = document.createElement('script');
  googleTag.async = true;
  googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}';
  document.head.appendChild(googleTag);

  window.degovSetAnalyticsConsent = function (consent) {
    if (consent !== 'granted' && consent !== 'denied') return;

    try {
      window.localStorage.setItem(consentStorageKey, consent);
    } catch {}

    window.gtag('consent', 'update', { analytics_storage: consent });
    var banner = document.getElementById('analytics-consent-banner');
    if (banner) banner.hidden = true;
  };

  window.degovOpenAnalyticsPreferences = function () {
    var banner = document.getElementById('analytics-consent-banner');
    if (banner) banner.hidden = false;
  };

  function initializeAnalyticsConsentControls() {
    var banner = document.getElementById('analytics-consent-banner');
    if (banner) banner.hidden = readAnalyticsConsent() !== null;

    document.querySelectorAll('[data-analytics-consent]').forEach(function (button) {
      button.onclick = function () {
        window.degovSetAnalyticsConsent(button.getAttribute('data-analytics-consent'));
      };
    });

    document.querySelectorAll('[data-open-analytics-preferences]').forEach(function (button) {
      button.onclick = window.degovOpenAnalyticsPreferences;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnalyticsConsentControls);
  } else {
    initializeAnalyticsConsentControls();
  }
`;

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
          url: SOCIAL_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: SOCIAL_IMAGE_ALT,
          type: 'image/png'
        }
      ],
      locale: 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ai_degov',
      creator: '@ai_degov',
      title,
      description,
      images: [
        {
          url: SOCIAL_IMAGE_URL,
          alt: SOCIAL_IMAGE_ALT
        }
      ]
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
      <head>
        {IS_GA4_ENABLED ? (
          <script id="ga4-bootstrap" dangerouslySetInnerHTML={{ __html: GA4_BOOTSTRAP }} />
        ) : null}
      </head>
      <body>
        <AnalyticsConsentBanner />
        <ProductNavigationAnalytics />
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
