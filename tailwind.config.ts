import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1728px'
      },
      fontFamily: {
        sans: ['var(--font-sans)', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', '"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-surface': 'var(--bg-surface)',
        'bg-card': 'var(--bg-card)',
        'bg-card-hover': 'var(--bg-card-hover)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-terminal': 'var(--bg-terminal)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-muted': 'var(--text-muted)',
        'text-code': 'var(--text-code)',
        'brand-blue': {
          DEFAULT: 'var(--brand-blue)',
          dim: 'var(--brand-blue-dim)',
          subtle: 'var(--brand-blue-subtle)'
        },
        'glow-pink': 'var(--glow-pink)',
        'glow-gold': 'var(--glow-gold)',
        'glow-green': 'var(--glow-green)',
        'glow-blue': 'var(--glow-blue)',
        success: 'var(--success)',
        error: 'var(--error)',
        warning: 'var(--warning)',
        'chain-ethereum': 'var(--chain-ethereum)',
        'chain-arbitrum': 'var(--chain-arbitrum)',
        'chain-optimism': 'var(--chain-optimism)',
        'chain-polygon': 'var(--chain-polygon)',
        'chain-base': 'var(--chain-base)'
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '20px',
          sm: '20px',
          md: '40px',
          lg: '40px',
          xl: '50px',
          '2xl': '96px',
          '3xl': '162px'
        }
      }
    }
  }
};
export default config;
