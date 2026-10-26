'use client';

import { useSyncExternalStore } from 'react';

import { applyThemeChoice, getThemeChoice, subscribeTheme, type ThemeChoice } from '@/lib/theme';

const ORDER: ThemeChoice[] = ['light', 'dark', 'system'];

const LABEL: Record<ThemeChoice, string> = {
  light: 'Light theme. Switch theme',
  dark: 'Dark theme. Switch theme',
  system: 'System theme. Switch theme'
};

function ThemeIcon({ choice }: { choice: ThemeChoice }) {
  if (choice === 'dark') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16.5 13.5A6.5 6.5 0 0 1 10 6.2 6.5 6.5 0 1 0 16.5 13.5Z" />
      </svg>
    );
  }

  if (choice === 'system') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="11" rx="1.5" />
        <path d="M8 19h8M12 16v3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.25" />
      <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M5.8 5.8l1.4 1.4M16.8 16.8l1.4 1.4M18.2 5.8l-1.4 1.4M7.2 16.8l-1.4 1.4" />
    </svg>
  );
}

export function ThemeToggle() {
  const choice = useSyncExternalStore(subscribeTheme, getThemeChoice, () => 'system' as const);
  const next = ORDER[(ORDER.indexOf(choice) + 1) % ORDER.length];

  return (
    <button
      className="theme-switch"
      type="button"
      aria-label={LABEL[choice]}
      onClick={() => applyThemeChoice(next)}
    >
      <ThemeIcon choice={choice} />
    </button>
  );
}
