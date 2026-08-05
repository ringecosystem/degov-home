'use client';

import { useEffect } from 'react';

import {
  buildProductNavigationEventParams,
  PRODUCT_NAVIGATION_EVENT_NAME,
  sendProductNavigationEvent
} from '@/lib/analytics';

export function ProductNavigationAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest('a[href]');
      const href = link?.getAttribute('href');
      const params = buildProductNavigationEventParams({
        targetUrl: href,
        referrer: document.referrer,
        currentHost: window.location.hostname,
        locale: document.documentElement.lang
      });

      if (!params) return;

      const dedupeKey = `${PRODUCT_NAVIGATION_EVENT_NAME}:${params.target_surface}:${params.target_path_class}`;

      try {
        if (window.sessionStorage.getItem(dedupeKey)) return;
        if (sendProductNavigationEvent(params)) {
          window.sessionStorage.setItem(dedupeKey, '1');
        }
      } catch {
        sendProductNavigationEvent(params);
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
