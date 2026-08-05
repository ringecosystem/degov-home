'use client';

export const PRODUCT_NAVIGATION_EVENT_NAME = 'degov_product_navigation';

export type ChannelGroup =
  | 'organic-search'
  | 'social-organic'
  | 'documentation-referral'
  | 'cross-product-degov-referral'
  | 'ai-search-assistant-referral'
  | 'other-external-referral'
  | 'direct-unknown';

export type TargetSurface = 'docs' | 'square' | 'atlas' | 'pricing';
export type TargetPathClass =
  | 'root'
  | 'pricing'
  | 'integration'
  | 'dao-directory'
  | 'dao-detail'
  | 'other';

export type ProductNavigationEventParams = {
  source_surface: 'home';
  target_surface: TargetSurface;
  target_path_class: TargetPathClass;
  channel_group: ChannelGroup;
  locale: string;
};

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, params: ProductNavigationEventParams) => void;
  }
}

const SEARCH_HOST_SUBSTRINGS = ['google.', 'yahoo.'];
const SEARCH_HOST_DOMAINS = ['bing.com', 'duckduckgo.com', 'baidu.com', 'yandex.com'];
const SOCIAL_HOSTS = [
  'x.com',
  'twitter.com',
  'linkedin.com',
  'facebook.com',
  'discord.com',
  'telegram.org',
  't.me'
];
const AI_REFERRER_HOSTS = [
  'chatgpt.com',
  'perplexity.ai',
  'copilot.microsoft.com',
  'gemini.google.com'
];

function normalizeHost(hostname: string | null | undefined): string {
  return String(hostname ?? '')
    .toLowerCase()
    .replace(/^www\./, '');
}

function normalizePathname(pathname: string | null | undefined): string {
  const path = String(pathname ?? '/').toLowerCase();
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

function hostMatchesDomain(hostname: string, candidate: string): boolean {
  return hostname === candidate || hostname.endsWith(`.${candidate}`);
}

function hostMatchesDomains(hostname: string, candidates: string[]): boolean {
  return candidates.some((candidate) => hostMatchesDomain(hostname, candidate));
}

export function getChannelGroupFromReferrer(
  referrer: string | null | undefined,
  currentHost: string | null | undefined
): ChannelGroup {
  if (!referrer) return 'direct-unknown';

  let referrerUrl: URL;
  try {
    referrerUrl = new URL(referrer);
  } catch {
    return 'direct-unknown';
  }

  const referrerHost = normalizeHost(referrerUrl.hostname);
  const current = normalizeHost(currentHost);

  if (current && referrerHost === current) {
    return 'direct-unknown';
  }

  if (hostMatchesDomains(referrerHost, AI_REFERRER_HOSTS)) {
    return 'ai-search-assistant-referral';
  }

  if (
    SEARCH_HOST_SUBSTRINGS.some((candidate) => referrerHost.includes(candidate)) ||
    hostMatchesDomains(referrerHost, SEARCH_HOST_DOMAINS)
  ) {
    return 'organic-search';
  }

  if (hostMatchesDomains(referrerHost, SOCIAL_HOSTS)) {
    return 'social-organic';
  }

  if (referrerHost === 'docs.degov.ai') {
    return 'documentation-referral';
  }

  if (referrerHost.endsWith('.degov.ai') || referrerHost === 'degov.ai') {
    return 'cross-product-degov-referral';
  }

  return 'other-external-referral';
}

export function getProductNavigationTarget(targetUrl: string | null | undefined): {
  target_surface: TargetSurface;
  target_path_class: TargetPathClass;
} | null {
  if (!targetUrl) return null;

  let url: URL;
  try {
    url = new URL(targetUrl, 'https://degov.ai/');
  } catch {
    return null;
  }

  const host = normalizeHost(url.hostname);
  const path = normalizePathname(url.pathname);

  if (host === 'docs.degov.ai') {
    return {
      target_surface: 'docs',
      target_path_class: path.startsWith('/integration')
        ? 'integration'
        : path === '/'
          ? 'root'
          : 'other'
    };
  }

  if (host === 'square.degov.ai') {
    return {
      target_surface: 'square',
      target_path_class: path.startsWith('/dao/')
        ? 'dao-detail'
        : path === '/'
          ? 'root'
          : 'dao-directory'
    };
  }

  if (host === 'atlas.degov.ai') {
    return {
      target_surface: 'atlas',
      target_path_class: path === '/' ? 'root' : 'other'
    };
  }

  if (host === 'degov.ai' && path === '/pricing') {
    return {
      target_surface: 'pricing',
      target_path_class: 'pricing'
    };
  }

  return null;
}

export function buildProductNavigationEventParams({
  targetUrl,
  referrer,
  currentHost,
  locale
}: {
  targetUrl: string | null | undefined;
  referrer: string | null | undefined;
  currentHost: string | null | undefined;
  locale: string | null | undefined;
}): ProductNavigationEventParams | null {
  const target = getProductNavigationTarget(targetUrl);
  if (!target) return null;

  return {
    source_surface: 'home',
    ...target,
    channel_group: getChannelGroupFromReferrer(referrer, currentHost),
    locale: String(locale || 'en').slice(0, 16)
  };
}

export function sendProductNavigationEvent(params: ProductNavigationEventParams): boolean {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return false;
  }

  window.gtag('event', PRODUCT_NAVIGATION_EVENT_NAME, params);
  return true;
}
