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
requireIncludes(home, 'Ask about a proposal, a vote, or what a DAO decided.', 'homepage ask prompt');
requireIncludes(home, 'How to use', 'connected product paths');
forbidIncludes(home, 'degov-governance-temporal-field-loop-hd.mp4', 'retired hero video');
forbidIncludes(home, 'arc-path__rule', 'retired hero product rule');
forbidIncludes(home, 'Public product evidence', 'retired evidence eyebrow');
forbidIncludes(home, 'Why governance builds community', 'retired community eyebrow');
forbidIncludes(home, 'Open agent skills', 'retired agent eyebrow');
forbidIncludes(home, 'Choose your next move', 'retired closing eyebrow');
requireIncludes(home, 'id="pricing"', 'homepage pricing section');
requireIncludes(home, 'https://playground.degov.ai/', 'Playground destination on the homepage');
forbidIncludes(
  home,
  'npx skills add ringecosystem/degov-agent-skills',
  'retired CLI install command'
);
forbidIncludes(home, 'Public snapshot', 'retired evidence snapshot bars');
forbidIncludes(home, 'homepage-content-provenance', 'retired homepage provenance block');
forbidIncludes(home, 'arc-agents__note', 'retired agent consent note');
forbidIncludes(home, 'pricing.html', 'static prototype pricing URL');
forbidIncludes(home, '/cdn-cgi/', 'Cloudflare prototype email shim');

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
requireIncludes(
  layout,
  'run governance with Square and understand governance with Atlas',
  'two-product metadata'
);
requireIncludes(layout, "card: 'summary_large_image'", 'large X card metadata');
requireIncludes(seo, '/images/degov-social-card.png', 'social preview image metadata');
requireIncludes(layout, 'width: 1200', 'social preview width metadata');
requireIncludes(layout, 'height: 630', 'social preview height metadata');
forbidIncludes(layout, '<HeroGrid', 'legacy decorative grid');
forbidIncludes(layout, '<Navbar', 'legacy navbar mount');

requireIncludes(
  'package.json',
  '"test:design": "node scripts/verify-design-contract.mjs"',
  'design-contract package script'
);
requireIncludes(
  'package.json',
  '"build": "next build && node scripts/verify-social-metadata.mjs && node scripts/verify-structured-data.mjs && node scripts/verify-home-tokens.mjs && node scripts/verify-agent-discovery.mjs"',
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
