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
        ink: '#2a0712',
        paper: '#fffafd',
        blush: '#ff4f93',
        cherry: '#e6003f',
        rosewash: '#fff0f5',
        candy: '#ff7ab5',
        plum: '#6d5dfc',
        lime: '#d4ff3f',
        gold: '#ffd166',
      },
      boxShadow: {
        glow: '0 12px 34px rgba(230, 0, 63, 0.22)',
        lift: '0 18px 48px rgba(230, 0, 63, 0.13)',
      },
    },
  },
  plugins: [],
} satisfies Config;
