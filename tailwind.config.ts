import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'bg-yellow', 'bg-pink', 'bg-blue',
    'text-yellow', 'text-pink', 'text-blue',
    'text-ink', 'text-white',
    'group-hover:text-yellow', 'group-hover:text-pink', 'group-hover:text-blue',
    'hover:text-yellow', 'hover:text-pink', 'hover:text-blue',
    'hover:border-yellow', 'hover:border-pink', 'hover:border-blue',
    'border-yellow', 'border-pink', 'border-blue',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette from Figma
        yellow: {
          DEFAULT: '#FFE100', // Primary accent
          light: '#FFF44F',
          dark: '#E6CB00',
        },
        pink: {
          DEFAULT: '#FF0B90', // Secondary accent
          light: '#FF4DAD',
          dark: '#CC0073',
        },
        blue: {
          DEFAULT: '#014CFD', // Tertiary accent
          light: '#4D7FFF',
          dark: '#003DCA',
        },
        cream: {
          DEFAULT: '#f5f2eb',
          light: '#faf9f6',
          dark: '#e8e4d9',
        },
        ink: {
          DEFAULT: '#000000',
          light: '#1a1a1a',
          muted: '#6a6d75',
        },
        // Legacy colors for compatibility
        magenta: {
          DEFAULT: '#FF0B90',
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
