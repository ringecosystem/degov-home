#!/usr/bin/env node

import { existsSync, readFileSync, statSync } from 'node:fs';
import { validateRgbPng } from './png-validation.mjs';

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

function requirePng(path, expectedWidth, expectedHeight) {
  if (!existsSync(path)) {
    errors.push(`Missing required PNG asset: ${path}`);
    return;
  }

  try {
    validateRgbPng(path, expectedWidth, expectedHeight);
  } catch (error) {
    errors.push(error.message);
  }
}

const home = 'src/app/home-client.tsx';
const pricing = 'src/app/pricing/pricing-client.tsx';
const css = 'src/app/site.css';
const homeCss = 'src/app/home.css';
const pricingCss = 'src/app/pricing.css';
const header = 'src/components/layout/site-header.tsx';
const layout = 'src/app/layout.tsx';
const seo = 'src/lib/seo.ts';

requireIncludes('src/app/page.tsx', '<HomeClient />', 'homepage client mount');
requireIncludes(home, 'Better', 'homepage brand slogan');
requireIncludes(home, 'For Better Communities', 'complete homepage brand slogan');
requireIncludes(home, 'data-od-id="square-path-card"', 'Square task path');
requireIncludes(home, 'data-od-id="atlas-path-card"', 'Atlas task path');
requireIncludes(
  home,
  'degov-governance-temporal-field-f885cd9c.png',
  'static hero poster and fallback'
);
requireIncludes(
  home,
  'degov-governance-temporal-field-loop-hd.mp4',
  'looping hero video'
);
requireIncludes(home, 'autoPlay', 'autoplaying hero video');
requireIncludes(home, 'playsInline', 'inline hero video playback');
requireIncludes(home, 'className="arc-closing__art"', 'closing atmosphere layer');
forbidIncludes(home, 'arc-path__rule', 'retired hero product rule');
forbidIncludes(home, 'Public product evidence', 'retired evidence eyebrow');
forbidIncludes(home, 'Why governance builds community', 'retired community eyebrow');
forbidIncludes(home, 'Open agent skills', 'retired agent eyebrow');
forbidIncludes(home, 'Choose your next move', 'retired closing eyebrow');
forbidIncludes(home, 'playground.degov.ai', 'Playground link moved from homepage');
requireIncludes(home, 'data-od-id="community-governance-chain"', 'community capability chain');
requireIncludes(home, 'data-od-id="agent-governance-access"', 'agent-native governance section');
requireIncludes(home, 'Agent × x402', 'Atlas x402 access flow');
requireIncludes(
  home,
  'npx skills add ringecosystem/degov-agent-skills',
  'DeGov agent skills install command'
);
requireIncludes(home, 'data-od-id="agent-skills-copy"', 'agent skills copy control');
requireIncludes(home, 'aria-label="Atlas data lifecycle"', 'Atlas data lifecycle');
requireIncludes(home, '<span>Analyze</span>', 'Atlas analysis stage');
forbidIncludes(home, 'Public snapshot', 'retired evidence snapshot bars');
requireIncludes(home, '30K+', 'portfolio proposal metric');
forbidIncludes(home, 'homepage-content-provenance', 'retired homepage provenance block');
forbidIncludes(home, 'arc-agents__note', 'retired agent consent note');
requireIncludes(
  home,
  'mailto:support@degov.ai?subject=Atlas%20data%20partnership',
  'Atlas contact path'
);
forbidIncludes(home, 'pricing.html', 'static prototype pricing URL');
forbidIncludes(home, '/cdn-cgi/', 'Cloudflare prototype email shim');

requireIncludes('src/app/pricing/page.tsx', '<PricingClient />', 'pricing client mount');
requireIncludes(pricing, 'Start managed. Stay in control', 'pricing hero');
requireIncludes(pricing, 'data-od-id="pricing-playground-entry"', 'Pricing Playground entry');
requireIncludes(pricing, 'data-od-id="pricing-playground-link"', 'Pricing Playground link');
requireIncludes(pricing, 'https://playground.degov.ai/', 'official Playground destination');
requireIncludes(pricing, 'Try the Playground on Base.', 'Playground CTA copy');
requireIncludes(pricing, 'data-od-id="pricing-timeline"', 'managed-hosting timeline');
requireIncludes(pricing, 'Launch now. Choose later', 'current managed-hosting timeline heading');
forbidIncludes(
  pricing,
  'Launch first. Choose your long-term model later.',
  'retired managed-hosting timeline heading'
);
requireIncludes(pricing, 'Yearly · save $400', 'annual billing control');
requireIncludes(
  pricing,
  "window.localStorage.setItem('degov-pricing-billing'",
  'persisted billing preference'
);
requireIncludes(pricing, 'function persistBilling', 'storage-failure-safe billing persistence');
requireIncludes(pricing, 'persistBilling(nextBilling)', 'guarded billing preference write');
requireIncludes(pricing, 'data-od-id="responsibility-comparison"', 'responsibility ledger');
requireIncludes(pricing, 'scope="row"', 'responsibility row headers');
requireIncludes(pricing, 'Open by design', 'open ownership statement');
requireIncludes(pricing, 'Is Atlas included in DeGov pricing?', 'DeGov/Atlas pricing boundary');
requireIncludes(pricing, "odId: 'faq-free-period'", 'prototype FAQ identifiers');
requireIncludes(
  pricing,
  'mailto:support@degov.ai?subject=DeGov%20managed%20hosting',
  'managed-hosting contact path'
);
forbidIncludes(pricing, 'rounded-2xl', 'legacy rounded pricing cards');
forbidIncludes(pricing, '/cdn-cgi/', 'Cloudflare prototype email shim');

requireIncludes(header, "variant: 'home' | 'pricing'", 'shared route-aware header');
requireIncludes(
  header,
  "isPricing ? 'btn btn-primary btn-external' : 'btn btn-ghost'",
  'outlined homepage navigation CTA'
);
requireIncludes(header, "document.body.classList.toggle('menu-open'", 'mobile scroll lock');
requireIncludes(header, "event.key === 'Escape'", 'Escape-to-close behavior');
requireIncludes(header, "event.key !== 'Tab'", 'mobile focus trap');
requireIncludes(header, "target: '_blank'", 'safe external pricing CTA');
requireIncludes(
  header,
  "id={isPricing ? 'mobileMenu' : 'homeMobileMenu'}",
  'detached full-screen mobile menu'
);
requireIncludes(header, '/images/degov-ai-2x.svg', 'approved DeGov logo asset');
requireIncludes(header, "mobileHomeOdId('nav-square')", 'visible mobile navigation selector');
requireIncludes(header, 'https://docs.degov.ai/', 'DeGov Docs navigation destination');
requireIncludes(header, "mobileHomeOdId('nav-docs')", 'visible mobile Docs navigation selector');
requireIncludes(header, 'https://t.me/degov_realtime_signal', 'DeGov Signals destination');
requireIncludes(header, "mobileHomeOdId('nav-signals')", 'visible mobile Signals selector');
requireIncludes(header, "isPricing ? 'Open DeGov'", 'DeGov pricing navigation CTA');
requireIncludes(header, "? 'Close navigation'", 'pricing navigation label');

requireIncludes(css, '--bg: #1f2228', 'xAI near-black canvas token');
requireIncludes(css, '--meta: rgba(255, 255, 255, 0.5)', 'AA-readable metadata token');
requireIncludes(css, "--font-display: 'Instrument Sans'", 'Instrument Sans display stack');
requireIncludes(css, "--font-body:\n    'Instrument Sans'", 'Instrument Sans body stack');
requireIncludes(css, '--radius-sm: 0px', 'approved radius token');
requireIncludes(css, '--elev-ring: 0 0 0 1px var(--border)', 'approved elevation token');
requireIncludes(css, 'border-radius: var(--radius-sm)', 'tokenized sharp control radius');
requireIncludes(css, 'filter: invert(1)', 'approved black logo inversion');
requireIncludes(homeCss, '.home-site .arc-hero__paths', 'two-path homepage layout');
requireIncludes(pricingCss, '.pricing-site .hero-playground', 'Pricing Playground entry styling');
requireIncludes(pricingCss, '.pricing-site .hero-playground a', 'Playground link affordance');
requireIncludes(
  homeCss,
  '/images/home/degov-journey-signal-record.png',
  'dedicated journey atmosphere'
);
requireIncludes(
  homeCss,
  '/images/home/degov-community-common-field.png',
  'dedicated community atmosphere'
);
requireIncludes(
  homeCss,
  '/images/home/degov-agents-verification-lattice.png',
  'dedicated agent atmosphere'
);
requireIncludes(
  homeCss,
  '/images/home/degov-atlas-connection-field.png',
  'dedicated Atlas atmosphere'
);
requireIncludes(
  homeCss,
  '/images/closing/degov-shared-outcome-field-v2.png',
  'dedicated closing atmosphere'
);
requireIncludes(
  pricingCss,
  '/images/pricing/degov-pricing-operating-field.png',
  'dedicated pricing hero atmosphere'
);
requireIncludes(
  pricingCss,
  '/images/pricing/degov-pricing-open-exit-field.png',
  'dedicated pricing closing atmosphere'
);
requireIncludes(css, '.pricing-site .comparison', 'pricing responsibility table');
requireIncludes(css, 'overflow-y: auto', 'scrollable fixed mobile menu');
requireIncludes(homeCss, '.home-site .mobile-menu a', 'home-specific mobile menu treatment');
requireIncludes(homeCss, '@media (max-width: 820px)', 'tablet/mobile reflow');
requireIncludes(homeCss, '@media (max-width: 600px)', 'phone reflow');
requireIncludes(homeCss, '@media (prefers-reduced-motion: reduce)', 'reduced-motion contract');
forbidIncludes(css, '.home-site', 'homepage selectors in shared CSS');
forbidIncludes(css, '--bg-primary', 'legacy visual token');
forbidIncludes(css, 'rounded-full', 'legacy pill utility');
forbidIncludes(css, 'box-shadow: 0 0 20px', 'legacy decorative glow');
forbidIncludes(css, '.home-site .hero,\n  .pricing-site .hero', 'premature pricing hero collapse');
forbidIncludes(css, '.comparison thead {\n    display: none', 'inaccessible hidden table headers');

requireIncludes(layout, "themeColor: '#1f2228'", 'updated browser theme color');
requireIncludes('src/app/pricing/page.tsx', 'Square Pricing — DeGov.AI', 'approved pricing title');
requireIncludes(
  layout,
  'run governance with Square and understand governance with Atlas',
  'two-product metadata'
);
requireIncludes(layout, "card: 'summary_large_image'", 'large X card metadata');
requireIncludes(seo, '/images/degov-social-card.png', 'social preview image metadata');
requireIncludes(layout, 'width: 1200', 'social preview width metadata');
requireIncludes(layout, 'height: 630', 'social preview height metadata');
requireIncludes('src/app/pricing/page.tsx', 'SOCIAL_IMAGE_URL', 'pricing social preview');
forbidIncludes(layout, '<HeroGrid', 'legacy decorative grid');
forbidIncludes(layout, '<Navbar', 'legacy navbar mount');

requireIncludes(
  'package.json',
  '"test:design": "node scripts/verify-design-contract.mjs"',
  'design-contract package script'
);
requireIncludes(
  'package.json',
  '"build": "next build && node scripts/verify-social-metadata.mjs && node scripts/verify-structured-data.mjs && node scripts/verify-home-tokens.mjs"',
  'built social-metadata verification'
);
requireIncludes(
  'package.json',
  '"test:home-tokens": "node scripts/verify-home-tokens.mjs"',
  'homepage token package script'
);
requireIncludes(
  'package.json',
  '"test:structured-data": "node scripts/verify-structured-data.mjs"',
  'structured-data package script'
);
requireBinary('public/fonts/GeistMono-Variable.woff2', 50_000);
requireBinary('public/fonts/UniversalSans-Fallback.woff2', 50_000);
requireBinary('public/images/degov-ai-2x.svg', 3_000);
requireBinary('public/images/home/degov-journey-signal-record.png', 250_000);
requireBinary('public/images/home/degov-community-common-field.png', 250_000);
requireBinary('public/images/home/degov-agents-verification-lattice.png', 250_000);
requireBinary('public/images/home/degov-atlas-connection-field.png', 250_000);
requireBinary('public/images/closing/degov-shared-outcome-field-v2.png', 250_000);
requireBinary('public/images/pricing/degov-pricing-operating-field.png', 250_000);
requireBinary('public/images/pricing/degov-pricing-open-exit-field.png', 250_000);
requireBinary('public/images/degov-social-card.svg', 3_000);
requireBinary('public/images/degov-social-card.png', 20_000);
requirePng('public/images/degov-social-card.png', 1200, 630);

if (errors.length) {
  console.error(`Design contract failed:\n${errors.map((error) => `- ${error}`).join('\n')}`);
  process.exit(1);
}

console.log('Design contract passed: Open Design homepage and Square pricing routes are aligned.');
