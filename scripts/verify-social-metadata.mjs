#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { validateRgbPng } from './png-validation.mjs';

const SOCIAL_IMAGE_URL = 'https://degov.ai/images/degov-social-card.png';
const SOCIAL_IMAGE_ALT = 'DeGov.AI — Better governance for better communities.';
const errors = [];

// Parse attributes independently of their order because Next.js may change the
// serialization order without changing the metadata contract.
function readSocialMetadata(path) {
  if (!existsSync(path)) {
    errors.push(`Missing built route: ${path}`);
    return { metadata: new Map(), canonicalUrls: [] };
  }

  const html = readFileSync(path, 'utf8');
  const metadata = new Map();
  const canonicalUrls = [];
  for (const [tag] of html.matchAll(/<meta\s+[^>]+>/gi)) {
    const attributes = new Map();
    for (const [, name, value] of tag.matchAll(/([\w:-]+)="([^"]*)"/g)) {
      attributes.set(name, value);
    }

    const key = attributes.get('property') ?? attributes.get('name');
    if (key === 'description' || key?.startsWith('og:') || key?.startsWith('twitter:')) {
      const values = metadata.get(key) ?? [];
      values.push(attributes.get('content') ?? '');
      metadata.set(key, values);
    }
  }

  for (const [, title] of html.matchAll(/<title>([^<]*)<\/title>/gi)) {
    const values = metadata.get('title') ?? [];
    values.push(title);
    metadata.set('title', values);
  }

  for (const [tag] of html.matchAll(/<link\s+[^>]+>/gi)) {
    const attributes = new Map();
    for (const [, name, value] of tag.matchAll(/([\w:-]+)="([^"]*)"/g)) {
      attributes.set(name, value);
    }
    if (attributes.get('rel') === 'canonical') canonicalUrls.push(attributes.get('href') ?? '');
  }

  return { metadata, canonicalUrls };
}

function requireMetadata(path, canonicalUrl, expected) {
  const { metadata, canonicalUrls } = readSocialMetadata(path);
  for (const [key, expectedValue] of Object.entries(expected)) {
    const values = metadata.get(key) ?? [];
    if (values.length !== 1 || values[0] !== expectedValue) {
      errors.push(
        `${path}: ${key} must occur once as "${expectedValue}", received ${JSON.stringify(values)}`
      );
    }
  }

  for (const [key, values] of metadata) {
    if (values.length > 1)
      errors.push(`${path}: duplicate ${key} values ${JSON.stringify(values)}`);
  }
  if (canonicalUrls.length !== 1 || canonicalUrls[0] !== canonicalUrl) {
    errors.push(
      `${path}: canonical must occur once as "${canonicalUrl}", received ${JSON.stringify(canonicalUrls)}`
    );
  }
}

function requireBuiltText(path, requiredText) {
  if (!existsSync(path)) {
    errors.push(`Missing built route: ${path}`);
    return;
  }

  const html = readFileSync(path, 'utf8');
  for (const text of requiredText) {
    if (!html.includes(text)) errors.push(`${path}: missing visible content "${text}"`);
  }
}

const sharedMetadata = {
  'og:type': 'website',
  'og:site_name': 'DeGov.AI',
  'og:locale': 'en_US',
  'og:image': SOCIAL_IMAGE_URL,
  'og:image:type': 'image/png',
  'og:image:width': '1200',
  'og:image:height': '630',
  'og:image:alt': SOCIAL_IMAGE_ALT,
  'twitter:card': 'summary_large_image',
  'twitter:site': '@ai_degov',
  'twitter:creator': '@ai_degov',
  'twitter:image': SOCIAL_IMAGE_URL,
  'twitter:image:alt': SOCIAL_IMAGE_ALT
};

requireMetadata('out/index.html', 'https://degov.ai/', {
  ...sharedMetadata,
  title: SOCIAL_IMAGE_ALT,
  description:
    'DeGov.AI helps communities run governance with Square and understand governance with Atlas.',
  'og:title': SOCIAL_IMAGE_ALT,
  'og:description':
    'DeGov.AI helps communities run governance with Square and understand governance with Atlas.',
  'og:url': 'https://degov.ai/',
  'twitter:title': SOCIAL_IMAGE_ALT,
  'twitter:description':
    'DeGov.AI helps communities run governance with Square and understand governance with Atlas.'
});
requireBuiltText('out/index.html', [
  'Content provenance',
  'Canonical owner:',
  'DeGov official website.',
  'Editorial review:',
  '2026-08-05.',
  'not deploy or build freshness',
  'https://docs.degov.ai/',
  'https://square.degov.ai/',
  'https://atlas.degov.ai/',
  'https://github.com/ringecosystem/degov'
]);
requireMetadata('out/pricing/index.html', 'https://degov.ai/pricing/', {
  ...sharedMetadata,
  title: 'Square Pricing — DeGov.AI',
  description:
    'DeGov.AI Square pricing: self-host for free or choose managed hosting, with the first six months free.',
  'og:title': 'Square Pricing — DeGov.AI',
  'og:description':
    'Self-host Square for free or choose managed hosting, with the first six months free.',
  'og:url': 'https://degov.ai/pricing/',
  'twitter:title': 'Square Pricing — DeGov.AI',
  'twitter:description':
    'Self-host Square for free or choose managed hosting, with six months free.'
});

// Validate the copied build artifact rather than only its source file so a
// broken static-export copy cannot pass the release build unnoticed.
const builtImagePath = 'out/images/degov-social-card.png';
if (!existsSync(builtImagePath)) {
  errors.push(`Missing built social image: ${builtImagePath}`);
} else {
  try {
    const sourceImage = validateRgbPng('public/images/degov-social-card.png', 1200, 630);
    const builtImage = validateRgbPng(builtImagePath, 1200, 630);
    if (!sourceImage.equals(builtImage)) {
      errors.push(
        `${builtImagePath} does not match public/images/degov-social-card.png byte-for-byte`
      );
    }
  } catch (error) {
    errors.push(error.message);
  }
}

if (errors.length) {
  console.error(
    `Social metadata verification failed:\n${errors.map((error) => `- ${error}`).join('\n')}`
  );
  process.exit(1);
}

console.log('Social metadata verification passed for / and /pricing/.');
