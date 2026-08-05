export const SITE_URL = 'https://degov.ai';
export const PUBLISHER_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PRICING_URL = `${SITE_URL}/pricing/`;

// A distinct asset URL helps social platforms invalidate the cached square
// logo that was previously advertised as a large preview card.
export const SOCIAL_IMAGE_URL = `${SITE_URL}/images/degov-social-card.png`;
export const SOCIAL_IMAGE_ALT = 'DeGov.AI — Better governance for better communities.';

export const SEO_ORGANIZATION = {
  '@context': 'https://schema.org',
  '@id': PUBLISHER_ID,
  '@type': 'Organization',
  name: 'DeGov.AI',
  url: SITE_URL,
  sameAs: [
    'https://x.com/ai_degov',
    'https://docs.degov.ai/',
    'https://github.com/ringecosystem/degov'
  ],
  description:
    'DeGov.AI helps communities run governance with Square and understand governance with Atlas.'
};

export const SEO_WEBSITE = {
  '@context': 'https://schema.org',
  '@id': WEBSITE_ID,
  '@type': 'WebSite',
  name: 'DeGov.AI',
  url: SITE_URL,
  publisher: {
    '@id': PUBLISHER_ID
  },
  description:
    'Better governance for better communities. Run governance with Square and understand it with Atlas.'
};

export const PRICING_WEBPAGE = {
  '@context': 'https://schema.org',
  '@id': `${PRICING_URL}#webpage`,
  '@type': 'WebPage',
  url: PRICING_URL,
  name: 'Square Pricing — DeGov.AI',
  headline: 'Start managed. Stay in control.',
  description:
    'DeGov.AI Square pricing: self-host for free or choose managed hosting, with the first six months free.',
  isPartOf: {
    '@id': WEBSITE_ID
  },
  publisher: {
    '@id': PUBLISHER_ID
  },
  mainEntityOfPage: PRICING_URL,
  about: {
    '@type': 'Thing',
    name: 'DeGov Square managed hosting'
  }
};
