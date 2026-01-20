import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette from moodboard
        magenta: {
          DEFAULT: '#bb0147',
          light: '#e91e76',
          dark: '#8a0035',
        },
        coral: {
          DEFAULT: '#FF8C09', // Exact orange
          light: '#ffa533',
          dark: '#cc7007',
        },
        fuchsia: {
          DEFAULT: '#EB5D9B', // Exact pink
          light: '#ff7ab5',
          dark: '#d44a7f',
        },
        lime: {
          DEFAULT: '#79D37C', // Exact green
          light: '#9de59f',
          dark: '#60c164',
        },
        electric: {
          DEFAULT: '#1a1aff',
          light: '#4d4dff',
          dark: '#0000cc',
        },
        cream: {
          DEFAULT: '#f5f2eb',
          light: '#faf9f6',
          dark: '#e8e4d9',
        },
        ink: {
          DEFAULT: '#0a0a0a',
          light: '#1a1a1a',
          muted: '#6a6d75',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'draw': 'draw 2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
