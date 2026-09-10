#!/usr/bin/env node

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const openapi = 'https://agent-api.degov.ai/openapi.json';
const docs = 'https://docs.degov.ai/agent-api/';
const homepage = read('out/index.html');
const llms = read('out/llms.txt');

for (const path of ['out/index.html', 'out/pricing/index.html']) {
  const html = read(path);
  assert.ok(!html.includes('agent-api.degov.ai/v1/'), `${path}: retired API link`);
  assert.ok(html.includes(`href="${docs}"`), `${path}: missing Agent API docs entry`);
  assert.ok(html.includes(`href="${openapi}"`), `${path}: missing authoritative OpenAPI entry`);
}
assert.ok(homepage.includes('API quickstart'), 'Missing visible API quickstart');
assert.ok(!homepage.includes('Add a confirmed reporting date'), 'Editorial placeholder remains');
for (const phrase of [openapi, 'POST /v2/proposals/resolve', 'When to use', 'page', 'Skills']) {
  assert.ok(llms.includes(phrase), `Agent navigation is missing ${phrase}`);
}
assert.ok(
  !/\/v1\/|\/v2\/(?:meta|events|signals)/.test(llms),
  'Agent navigation advertises retired resources'
);

const missing = read('out/404.html');
for (const target of ['/', '/llms.txt', '/sitemap.xml', `${docs}quickstart/`, openapi]) {
  assert.ok(missing.includes(`href="${target}"`), `404 is missing recovery link ${target}`);
}
assert.match(missing, /name="robots" content="noindex"/, '404 must not be indexed');

for (const slug of ['about', 'contact', 'privacy']) {
  const html = read(`out/${slug}/index.html`);
  assert.ok(
    html.includes(`rel="canonical" href="https://degov.ai/${slug}/"`),
    `${slug}: wrong canonical`
  );
  assert.ok(
    read('out/sitemap.xml').includes(`https://degov.ai/${slug}/`),
    `${slug}: missing sitemap entry`
  );
  assert.ok(
    html.includes('support@degov.ai') || html.includes('href="/contact/"'),
    `${slug}: no contact path`
  );
  assert.ok(html.includes('property="og:image"'), `${slug}: missing social image`);
}
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
