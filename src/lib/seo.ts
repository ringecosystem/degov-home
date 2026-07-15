export const SITE_URL = 'https://degov.ai';

export const SEO_ORGANIZATION = {
  '@context': 'https://schema.org',
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
  '@type': 'WebSite',
  name: 'DeGov.AI',
  url: SITE_URL,
  description:
    'Better governance for better communities. Run governance with Square and understand it with Atlas.'
};
