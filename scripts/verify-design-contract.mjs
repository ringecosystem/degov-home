#!/usr/bin/env node

import { existsSync, readFileSync, statSync } from 'node:fs';

const errors = [];

function read(path) {
  if (!existsSync(path)) {
    errors.push(`Missing required file: ${path}`);
    return '';
  }
  return readFileSync(path, 'utf8');
}

function requireIncludes(path, needle, label = needle) {
  const content = read(path);
  if (!content.includes(needle)) errors.push(`Missing ${label} in ${path}`);
}

function forbidIncludes(path, needle, label = needle) {
  const content = read(path);
  if (content.includes(needle)) errors.push(`Forbidden ${label} remains in ${path}`);
}

function requireBinary(path, minimumBytes) {
  if (!existsSync(path)) {
    errors.push(`Missing required asset: ${path}`);
    return;
  }
  const size = statSync(path).size;
  if (size < minimumBytes) errors.push(`Asset ${path} is unexpectedly small (${size} bytes)`);
}

const home = 'src/app/home-client.tsx';
const pricing = 'src/app/pricing/pricing-client.tsx';
const css = 'src/app/site.css';
const header = 'src/components/layout/site-header.tsx';
const layout = 'src/app/layout.tsx';

requireIncludes('src/app/page.tsx', '<HomeClient />', 'homepage client mount');
requireIncludes(home, 'Better', 'homepage brand slogan');
requireIncludes(home, 'communities.', 'complete homepage brand slogan');
requireIncludes(home, 'data-od-id="square-path-card"', 'Square task path');
requireIncludes(home, 'data-od-id="atlas-path-card"', 'Atlas task path');
requireIncludes(home, 'data-od-id="community-governance-chain"', 'community capability chain');
requireIncludes(home, 'data-od-id="agent-governance-access"', 'agent-native governance section');
requireIncludes(home, 'Agent × x402', 'Atlas x402 access flow');
requireIncludes(home, '30K+', 'portfolio proposal metric');
requireIncludes(
  home,
  'mailto:contact@degov.ai?subject=Atlas%20data%20partnership',
  'Atlas contact path'
);
forbidIncludes(home, 'pricing.html', 'static prototype pricing URL');
forbidIncludes(home, '/cdn-cgi/', 'Cloudflare prototype email shim');

requireIncludes('src/app/pricing/page.tsx', '<PricingClient />', 'pricing client mount');
requireIncludes(pricing, 'Start managed. Stay in control.', 'pricing hero');
requireIncludes(pricing, 'data-od-id="pricing-timeline"', 'managed-hosting timeline');
requireIncludes(pricing, 'Yearly · save $400', 'annual billing control');
requireIncludes(
  pricing,
  "window.localStorage.setItem('degov-pricing-billing'",
  'persisted billing preference'
);
requireIncludes(pricing, 'data-od-id="responsibility-comparison"', 'responsibility ledger');
requireIncludes(pricing, 'Open by design.', 'open ownership statement');
requireIncludes(pricing, 'Is Atlas included in Square pricing?', 'Square/Atlas pricing boundary');
requireIncludes(pricing, "odId: 'faq-free-period'", 'prototype FAQ identifiers');
requireIncludes(
  pricing,
  'mailto:contact@degov.ai?subject=DeGov%20managed%20hosting',
  'managed-hosting contact path'
);
forbidIncludes(pricing, 'rounded-2xl', 'legacy rounded pricing cards');
forbidIncludes(pricing, '/cdn-cgi/', 'Cloudflare prototype email shim');

requireIncludes(header, "variant: 'home' | 'pricing'", 'shared route-aware header');
requireIncludes(header, "document.body.classList.toggle('menu-open'", 'mobile scroll lock');
requireIncludes(header, "event.key === 'Escape'", 'Escape-to-close behavior');
requireIncludes(header, "event.key !== 'Tab'", 'mobile focus trap');
requireIncludes(header, "target: '_blank'", 'safe external pricing CTA');
requireIncludes(
  header,
  "id={isPricing ? 'mobileMenu' : 'homeMobileMenu'}",
  'detached full-screen mobile menu'
);

requireIncludes(css, '--bg: #1f2228', 'xAI near-black canvas token');
requireIncludes(css, "'GeistMono', ui-monospace", 'GeistMono display stack');
requireIncludes(css, "'universalSans', 'universalSans Fallback'", 'Universal Sans body stack');
requireIncludes(css, 'border-radius: 0', 'square button corners');
requireIncludes(css, '.home-site .paths', 'two-path homepage layout');
requireIncludes(css, '.pricing-site .comparison', 'pricing responsibility table');
requireIncludes(css, '@media (max-width: 820px)', 'tablet/mobile reflow');
requireIncludes(css, '@media (max-width: 600px)', 'phone reflow');
requireIncludes(css, '@media (prefers-reduced-motion: reduce)', 'reduced-motion contract');
forbidIncludes(css, '--bg-primary', 'legacy visual token');
forbidIncludes(css, 'rounded-full', 'legacy pill utility');
forbidIncludes(css, 'box-shadow: 0 0 20px', 'legacy decorative glow');

requireIncludes(layout, "themeColor: '#1f2228'", 'updated browser theme color');
requireIncludes(
  layout,
  'run governance with Square and understand governance with Atlas',
  'two-product metadata'
);
forbidIncludes(layout, '<HeroGrid', 'legacy decorative grid');
forbidIncludes(layout, '<Navbar', 'legacy navbar mount');

requireIncludes(
  'package.json',
  '"test:design": "node scripts/verify-design-contract.mjs"',
  'design-contract package script'
);
requireBinary('public/fonts/GeistMono-Variable.woff2', 50_000);
requireBinary('public/fonts/UniversalSans-Fallback.woff2', 50_000);
requireBinary('public/images/logo.svg', 3_000);

if (errors.length) {
  console.error(`Design contract failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exit(1);
}

console.log('Design contract passed: Open Design homepage and Square pricing routes are aligned.');
