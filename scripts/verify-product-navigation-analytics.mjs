import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
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
const layoutSource = read('src/app/layout.tsx');
const combinedSource = `${analyticsSource}\n${componentSource}\n${layoutSource}`;

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

console.log('Product navigation analytics verification passed.');
