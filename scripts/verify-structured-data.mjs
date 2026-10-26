#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';

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

const homepageHtml = read('.next/server/app/index.html');
const canonicalUrls = readCanonicalUrls(homepageHtml);
if (!canonicalUrls.includes('https://degov.ai/')) {
  errors.push(`Homepage canonical missing, received ${JSON.stringify(canonicalUrls)}`);
}
requireIncludes(homepageHtml, 'Pricing', 'homepage pricing heading');

const jsonLd = readJsonLd(homepageHtml);

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

console.log('Structured-data verification passed for /.');
