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
    'DeGov.AI is an AI-powered, open-source governance platform built on the OpenZeppelin Governor framework.'
};

export const SEO_WEBSITE = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DeGov.AI',
  url: SITE_URL,
  description:
    'DeGov.AI equips DAOs with AI delegation, real-time monitoring, and transparent on-chain governance tooling.'
};
