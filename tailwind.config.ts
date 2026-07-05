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
        // Fresh Rose-Coral system — youthful, lively pink accents over a bright warm-white ground
        ink: '#2a2320',
        paper: '#fffbfa',
        blush: '#ff86ac', // bright fresh rose-pink (point/accent)
        cherry: '#ef5a88', // lively rose-pink for filled/emphasis (matches logo)
        rosewash: '#fff0f4', // soft pink-tinted section ground
        candy: '#ffd6e2', // bubblegum soft pink
        plum: '#e263a3', // bright orchid pink (secondary accent)
        lime: '#8fd3bf', // fresh mint pop (secondary)
        gold: '#f7a072', // lively peach
        sand: '#ffeef1', // pink-tinted warm surface
        line: '#f6dbe1', // pink hairline border
        muted: '#9a8a86', // warm gray secondary text
      },
      boxShadow: {
        glow: '0 10px 30px rgba(239, 90, 136, 0.2)',
        lift: '0 14px 40px rgba(42, 35, 32, 0.08)',
        soft: '0 8px 24px rgba(42, 35, 32, 0.06)',
      },
    },
  },
  plugins: [],
} satisfies Config;
