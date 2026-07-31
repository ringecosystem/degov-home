export const SITE_URL = 'https://degov.ai';

// A distinct asset URL helps social platforms invalidate the cached square
// logo that was previously advertised as a large preview card.
export const SOCIAL_IMAGE_URL = `${SITE_URL}/images/degov-social-card.png`;
export const SOCIAL_IMAGE_ALT = 'DeGov.AI — Better governance for better communities.';

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
