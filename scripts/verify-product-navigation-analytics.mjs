import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  buildProductNavigationEventParams,
  getChannelGroupFromReferrer,
  getProductNavigationTarget,
  PRODUCT_NAVIGATION_EVENT_NAME
} from '../src/lib/analytics.ts';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const read = (path) => readFileSync(join(root, path), 'utf8');
const artifactExpectation = process.argv.find((arg) => arg.startsWith('--expect-'));

function readGeneratedFiles(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? readGeneratedFiles(path) : [readFileSync(path, 'utf8')];
    })
    .join('\n');
}

assert.equal(PRODUCT_NAVIGATION_EVENT_NAME, 'degov_product_navigation');

assert.deepEqual(getProductNavigationTarget('/pricing'), {
  target_surface: 'pricing',
  target_path_class: 'pricing'
});
assert.deepEqual(getProductNavigationTarget('https://docs.degov.ai/integration/deploy/'), {
  target_surface: 'docs',
  target_path_class: 'integration'
});
assert.deepEqual(getProductNavigationTarget('https://square.degov.ai/dao/lisk'), {
  target_surface: 'square',
  target_path_class: 'dao-detail'
});
assert.deepEqual(getProductNavigationTarget('https://atlas.degov.ai/'), {
  target_surface: 'atlas',
  target_path_class: 'root'
});
assert.equal(getProductNavigationTarget('mailto:support@degov.ai'), null);
assert.equal(getProductNavigationTarget('https://github.com/ringecosystem/degov'), null);

assert.deepEqual(
  buildProductNavigationEventParams({
    targetUrl: 'https://square.degov.ai/',
    referrer: 'https://www.google.com/search?q=degov',
    currentHost: 'degov.ai',
    locale: 'en'
  }),
  {
    source_surface: 'home',
    target_surface: 'square',
    target_path_class: 'root',
    channel_group: 'organic-search',
    locale: 'en'
  }
);
assert.equal(
  getChannelGroupFromReferrer('https://www.degov.ai/pricing', 'degov.ai'),
  'direct-unknown'
);
assert.equal(
  getChannelGroupFromReferrer('https://chatgpt.com/share/example', 'degov.ai'),
  'ai-search-assistant-referral'
);
assert.equal(getChannelGroupFromReferrer('https://x.com/ai_degov', 'degov.ai'), 'social-organic');
assert.equal(
  getChannelGroupFromReferrer('https://docs.degov.ai/faqs', 'degov.ai'),
  'documentation-referral'
);
assert.equal(
  getChannelGroupFromReferrer('https://sex.com/post', 'degov.ai'),
  'other-external-referral'
);
assert.equal(
  getChannelGroupFromReferrer('https://evilbing.com/post', 'degov.ai'),
  'other-external-referral'
);

const analyticsSource = read('src/lib/analytics.ts');
const componentSource = read('src/components/ProductNavigationAnalytics.tsx');
const consentComponentSource = read('src/components/AnalyticsConsent.tsx');
const consentSource = read('src/lib/analytics-consent.ts');
const layoutSource = read('src/app/layout.tsx');
const productionWorkflow = read('.github/workflows/deploy-prd.yml');
const stagingWorkflow = read('.github/workflows/deploy-stg.yml');
const previewWorkflow = read('.github/workflows/deploy-dev.yml');
const combinedSource = `${analyticsSource}\n${componentSource}\n${consentComponentSource}\n${consentSource}\n${layoutSource}`;

assert.deepEqual(
  Object.keys(
    buildProductNavigationEventParams({
      targetUrl: '/pricing',
      referrer: '',
      currentHost: 'degov.ai',
      locale: 'en'
    })
  ).sort(),
  ['channel_group', 'locale', 'source_surface', 'target_path_class', 'target_surface']
);

for (const field of [
  'wallet_address',
  'auth_state',
  'full_query_string',
  'window.location.search',
  'window.location.href'
]) {
  assert.ok(!combinedSource.includes(field), `analytics source must not include ${field}`);
}

assert.ok(
  layoutSource.includes('<ProductNavigationAnalytics />'),
  'root layout must mount product navigation analytics once'
);
assert.ok(
  componentSource.includes(
    '`${PRODUCT_NAVIGATION_EVENT_NAME}:${params.target_surface}:${params.target_path_class}`'
  ),
  'dedupe key must use session plus target surface plus target path class'
);
assert.ok(
  layoutSource.includes("const GA4_MEASUREMENT_ID = 'G-QRLBRTT5X1'"),
  'GA4 must use the public production measurement ID'
);
assert.ok(
  layoutSource.includes("process.env.NEXT_PUBLIC_DEGOV_HOME_GA4_ENABLED === 'true'"),
  'GA4 initialization must be gated by a build-time public environment flag'
);
assert.ok(
  layoutSource.indexOf("window.gtag('consent', 'default'") <
    layoutSource.indexOf("window.gtag('config'"),
  'GA4 consent defaults must be denied before configuration'
);
assert.ok(
  layoutSource.includes("readAnalyticsConsent() === 'granted' ? 'granted' : 'denied'") &&
    layoutSource.includes('analytics_storage: analyticsConsent'),
  'analytics storage must default to denied and restore a persisted grant'
);
for (const storage of ['ad_storage', 'ad_user_data', 'ad_personalization']) {
  assert.ok(layoutSource.includes(`${storage}: 'denied'`), `${storage} must default to denied`);
}
assert.ok(
  !layoutSource.includes("from 'next/script'"),
  'GA4 bootstrap must not depend on hydration'
);
assert.ok(
  layoutSource.includes('<script') && layoutSource.includes('id="ga4-bootstrap"'),
  'GA4 bootstrap must be emitted as an executable HTML script'
);
assert.ok(
  layoutSource.indexOf("window.gtag('config'") <
    layoutSource.indexOf("document.createElement('script')"),
  'GA4 consent and configuration must be queued before loading the Google tag'
);
assert.ok(
  layoutSource.includes("window.gtag('consent', 'update'") &&
    layoutSource.includes('window.localStorage.setItem'),
  'analytics consent choices must be persisted and sent to Google without hydration'
);
assert.ok(
  !consentComponentSource.includes("'use client'") &&
    consentComponentSource.includes('id="analytics-consent-banner"') &&
    consentComponentSource.includes('data-analytics-consent="granted"') &&
    consentComponentSource.includes('data-analytics-consent="denied"') &&
    layoutSource.includes("document.addEventListener('DOMContentLoaded'") &&
    layoutSource.includes('button.onclick = function'),
  'analytics consent UI must work before React hydration'
);
assert.ok(
  productionWorkflow.includes('NEXT_PUBLIC_DEGOV_HOME_GA4_ENABLED=true pnpm build'),
  'production tag workflow must enable GA4 at build time'
);
assert.ok(
  !stagingWorkflow.includes('NEXT_PUBLIC_DEGOV_HOME_GA4_ENABLED'),
  'staging workflow must not enable production GA4'
);
assert.ok(
  !previewWorkflow.includes('NEXT_PUBLIC_DEGOV_HOME_GA4_ENABLED'),
  'PR preview workflow must not enable production GA4'
);

if (artifactExpectation) {
  assert.ok(
    ['--expect-enabled', '--expect-disabled'].includes(artifactExpectation),
    'artifact expectation must be --expect-enabled or --expect-disabled'
  );
  const artifact = readGeneratedFiles(join(root, 'out'));
  const homeArtifact = readFileSync(join(root, 'out', 'index.html'), 'utf8');
  if (artifactExpectation === '--expect-enabled') {
    assert.ok(artifact.includes('G-QRLBRTT5X1'), 'production artifact must contain GA4 ID');
    assert.match(
      homeArtifact,
      /<script id="ga4-bootstrap">[\s\S]*document\.createElement\('script'\)[\s\S]*<\/script>/,
      'production HTML must execute the GA4 bootstrap without waiting for hydration'
    );
    assert.ok(
      !homeArtifact.includes(
        '<link rel="preload" href="https://www.googletagmanager.com/gtag/js?id=G-QRLBRTT5X1"'
      ),
      'production HTML must not mistake a preload for an executed Google tag'
    );
    assert.ok(
      artifact.includes('degov_analytics_consent') &&
        /(?:'consent', 'update'|"consent","update")/.test(artifact),
      'production artifact must contain the complete analytics consent flow'
    );
    assert.ok(
      artifact.includes('analytics_storage') && artifact.includes('denied'),
      'production artifact must preserve denied consent defaults'
    );
  } else {
    assert.ok(!artifact.includes('G-QRLBRTT5X1'), 'non-production artifact must exclude GA4 ID');
    assert.ok(
      !artifact.includes('googletagmanager.com/gtag/js'),
      'non-production artifact must exclude the Google tag loader'
    );
  }
}

console.log('Product navigation analytics verification passed.');
