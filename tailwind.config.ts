import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'sans-serif',
        ],
      },
      colors: {
        // Dusty Rose personal-color system — ivory ground, charcoal ink, muted rose accents
        ink: '#2b2622',
        paper: '#fbf8f6',
        blush: '#c9758b', // primary dusty rose (point)
        cherry: '#a65a72', // deeper dusty rose for filled/emphasis (white text passes AA)
        rosewash: '#f5ece7', // warm ivory section ground
        candy: '#e7c9ce', // rose beige (soft fill)
        plum: '#8e6b84', // muted mauve
        lime: '#a9b29a', // muted sage (secondary, replaces neon)
        gold: '#c79a6b', // rose gold accent
        sand: '#efe6de', // warm neutral surface
        line: '#e9dfd8', // hairline border
        muted: '#8b7f77', // secondary text
      },
      boxShadow: {
        glow: '0 10px 30px rgba(166, 90, 114, 0.16)',
        lift: '0 14px 40px rgba(43, 38, 34, 0.07)',
        soft: '0 8px 24px rgba(43, 38, 34, 0.06)',
      },
    },
  },
  plugins: [],
} satisfies Config;
