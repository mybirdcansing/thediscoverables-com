/** @type {import('tailwindcss').Config} */
const { BreakpointValues } = require('./lib/breakpoints.ts')

module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        'blue-500': '#2276FC',
        'yellow-100': '#fef7da',
        'gray-750': '#262626',
        'gray-850': '#212121',
      },
      spacing: {
        28: '7rem',
        header: '2.25rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      transitionDuration: {
        350: '350ms',
        400: '400ms',
      },
      verticalAlign: {
        top: 'top',
      },
    },
    screens: {
      xs: BreakpointValues.xs,
      sm: BreakpointValues.sm,
      md: BreakpointValues.md,
      lg: BreakpointValues.lg,
      xl: BreakpointValues.xl,
      '2xl': BreakpointValues['2xl'],
    },
  },
  plugins: [],
}
