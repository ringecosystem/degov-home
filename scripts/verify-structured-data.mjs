#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';

const PRICING_URL = 'https://degov.ai/pricing/';
const PUBLISHER_ID = 'https://degov.ai/#organization';
const WEBSITE_ID = 'https://degov.ai/#website';
const errors = [];

function read(path) {
  if (!existsSync(path)) {
    errors.push(`Missing built route: ${path}`);
    return '';
  }

  return readFileSync(path, 'utf8');
}

function readAttributes(tag) {
  const attributes = new Map();
  for (const [, name, value] of tag.matchAll(/([\w:-]+)="([^"]*)"/g)) {
    attributes.set(name, value);
  }
  return attributes;
}

function readCanonicalUrls(html) {
  const canonicalUrls = [];
  for (const [tag] of html.matchAll(/<link\s+[^>]+>/gi)) {
    const attributes = readAttributes(tag);
    if (attributes.get('rel') === 'canonical') canonicalUrls.push(attributes.get('href') ?? '');
  }
  return canonicalUrls;
}

function readJsonLd(html) {
  const blocks = [];
  for (const [, body] of html.matchAll(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
  )) {
    try {
      const parsed = JSON.parse(body);
      if (Array.isArray(parsed)) blocks.push(...parsed);
      else blocks.push(parsed);
    } catch (error) {
      errors.push(`Invalid JSON-LD block: ${error.message}`);
    }
  }
  return blocks;
}

function requireEqual(actual, expected, label) {
  if (actual !== expected) errors.push(`${label} must be ${expected}, received ${actual}`);
}

function requireIncludes(html, needle, label = needle) {
  if (!html.includes(needle)) errors.push(`Missing visible content: ${label}`);
}

const pricingHtml = read('out/pricing/index.html');
const canonicalUrls = readCanonicalUrls(pricingHtml);
if (canonicalUrls.length !== 1 || canonicalUrls[0] !== PRICING_URL) {
  errors.push(
    `Pricing canonical must occur once as ${PRICING_URL}, received ${JSON.stringify(canonicalUrls)}`
  );
}

requireIncludes(pricingHtml, 'Start managed. Stay in control', 'pricing visible H1');
requireIncludes(
  pricingHtml,
  'Self-hosted and managed deployments run the same open-source DeGov code',
  'pricing visible content description'
);

const jsonLd = readJsonLd(pricingHtml);
const pricingWebPage = jsonLd.find((item) => item?.['@type'] === 'WebPage');
if (!pricingWebPage) {
  errors.push('Pricing page must emit generic WebPage JSON-LD');
} else {
  requireEqual(pricingWebPage['@id'], `${PRICING_URL}#webpage`, 'WebPage @id');
  requireEqual(pricingWebPage.url, PRICING_URL, 'WebPage url');
  requireEqual(pricingWebPage.name, 'Square Pricing — DeGov.AI', 'WebPage name');
  requireEqual(pricingWebPage.headline, 'Start managed. Stay in control', 'WebPage headline');
  requireEqual(pricingWebPage.publisher?.['@id'], PUBLISHER_ID, 'WebPage publisher @id');
  requireEqual(pricingWebPage.isPartOf?.['@id'], WEBSITE_ID, 'WebPage isPartOf @id');
  requireEqual(pricingWebPage.mainEntityOfPage, PRICING_URL, 'WebPage mainEntityOfPage');
  if (!pricingHtml.includes(pricingWebPage.headline)) {
    errors.push('WebPage headline must match visible pricing content');
  }
}

const forbiddenTypes = new Set(['Product', 'Offer', 'AggregateRating', 'Review']);
for (const block of jsonLd) {
  const types = Array.isArray(block?.['@type']) ? block['@type'] : [block?.['@type']];
  for (const type of types) {
    if (forbiddenTypes.has(type)) errors.push(`Forbidden richer schema type emitted: ${type}`);
  }
}

const organization = jsonLd.find((item) => item?.['@type'] === 'Organization');
if (organization) {
  requireEqual(organization['@id'], PUBLISHER_ID, 'Organization @id');
}

const website = jsonLd.find((item) => item?.['@type'] === 'WebSite');
if (website) {
  requireEqual(website['@id'], WEBSITE_ID, 'WebSite @id');
  requireEqual(website.publisher?.['@id'], PUBLISHER_ID, 'WebSite publisher @id');
}

if (errors.length) {
  console.error(
    `Structured-data verification failed:\n${errors.map((error) => `- ${error}`).join('\n')}`
  );
  process.exit(1);
}

console.log('Structured-data verification passed for /pricing/.');
