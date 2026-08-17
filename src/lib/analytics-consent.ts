export const ANALYTICS_CONSENT_STORAGE_KEY = 'degov_analytics_consent';
export const ANALYTICS_PREFERENCES_EVENT = 'degov:open-analytics-preferences';

export type AnalyticsConsent = 'granted' | 'denied';

export function readAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const storedConsent = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);
    return storedConsent === 'granted' || storedConsent === 'denied' ? storedConsent : null;
  } catch {
    return null;
  }
}

export function updateAnalyticsConsent(consent: AnalyticsConsent): void {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, consent);
  } catch {
    // Consent still applies to the current page when storage is unavailable.
  }

  window.gtag?.('consent', 'update', {
    analytics_storage: consent
  });
}
