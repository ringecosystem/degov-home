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
        display: ['"SF UI Display"', 'SF Pro Display', 'system-ui', 'sans-serif']
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
