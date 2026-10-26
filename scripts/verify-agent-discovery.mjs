#!/usr/bin/env node

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const openapi = 'https://agent-api.degov.ai/openapi.json';
const docs = 'https://docs.degov.ai/agent-api/';
const homepage = read('.next/server/app/index.html');
const llms = read('public/llms.txt');

assert.ok(!homepage.includes('agent-api.degov.ai/v1/'), 'homepage: retired API link');
assert.ok(homepage.includes(`href="${docs}"`), 'homepage: missing Agent API docs entry');
assert.ok(homepage.includes(`href="${openapi}"`), 'homepage: missing authoritative OpenAPI entry');
assert.ok(homepage.includes('Agent API'), 'Missing visible Agent API link');
assert.ok(!homepage.includes('Add a confirmed reporting date'), 'Editorial placeholder remains');
for (const phrase of [openapi, 'POST /v2/proposals/resolve', 'When to use', 'page', 'Skills']) {
  assert.ok(llms.includes(phrase), `Agent navigation is missing ${phrase}`);
}
assert.ok(
  !/\/v1\/|\/v2\/(?:meta|events|signals)/.test(llms),
  'Agent navigation advertises retired resources'
);

const missing = read('.next/server/app/_not-found.html');
for (const target of ['/', '/llms.txt', '/sitemap.xml', `${docs}quickstart/`, openapi]) {
  assert.ok(missing.includes(`href="${target}"`), `404 is missing recovery link ${target}`);
}
assert.match(missing, /name="robots" content="noindex"/, '404 must not be indexed');

assert.ok(
  read('.next/server/app/sitemap.xml.body').includes('https://degov.ai'),
  'homepage missing from sitemap'
);
assert.ok(!read('.next/server/app/sitemap.xml.body').includes('/pricing'), 'retired pricing route remains in sitemap');
const structuredData = [
  ...homepage.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)
].flatMap((match) => JSON.parse(match[1]));
const organization = structuredData.find((item) => item['@type'] === 'Organization');
assert.equal(organization?.contactPoint?.email, 'support@degov.ai');

const config = JSON.parse(read('vercel.json'));
assert.ok(
  config.redirects.some((rule) => rule.source === '/openapi.json' && rule.destination === openapi),
  'Root OpenAPI discovery must redirect to the API host so relative server URLs remain correct'
);
console.log(
  'Agent discovery verified: current API links, navigation, recoverable 404, and information pages.'
);
