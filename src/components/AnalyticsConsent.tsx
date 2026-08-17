const IS_GA4_ENABLED = process.env.NEXT_PUBLIC_DEGOV_HOME_GA4_ENABLED === 'true';

export function AnalyticsConsentBanner() {
  if (!IS_GA4_ENABLED) return null;

  return (
    <section
      aria-label="Analytics preferences"
      aria-live="polite"
      className="fixed right-4 bottom-4 left-4 z-[100] mx-auto max-w-[720px] border border-white/15 bg-[#17191e] p-5 text-white shadow-2xl md:flex md:items-center md:justify-between md:gap-8 md:p-6"
      hidden
      id="analytics-consent-banner"
    >
      <div>
        <h2 className="m-0 text-base font-semibold">Help us improve DeGov</h2>
        <p className="mt-2 mb-0 max-w-[52ch] text-sm leading-6 text-white/65">
          Allow anonymous analytics so we can understand how the site is used. Advertising storage
          stays disabled.
        </p>
      </div>
      <div className="mt-5 flex shrink-0 gap-3 md:mt-0">
        <button
          className="min-h-10 border border-white/20 px-4 text-sm font-medium transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none"
          data-analytics-consent="denied"
          type="button"
        >
          Decline
        </button>
        <button
          className="min-h-10 bg-white px-4 text-sm font-medium text-[#17191e] transition-colors hover:bg-white/85 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#17191e] focus-visible:outline-none"
          data-analytics-consent="granted"
          type="button"
        >
          Allow analytics
        </button>
      </div>
    </section>
  );
}

export function AnalyticsPreferencesButton() {
  if (!IS_GA4_ENABLED) return null;

  return (
    <button className="analytics-preferences-button" data-open-analytics-preferences type="button">
      Analytics preferences
    </button>
  );
}
