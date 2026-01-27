/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '320px',    // Carbon sm
      'md': '672px',    // Carbon md
      'lg': '1056px',   // Carbon lg
      'xlg': '1312px',  // Carbon xlg
      'max': '1584px',  // Carbon max
      '2xl': '1400px',
    },
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        carbon: {
          gray: {
            100: '#161616', 90: '#262626', 80: '#393939', 70: '#525252',
            60: '#6f6f6f', 50: '#8d8d8d', 40: '#a8a8a8', 30: '#c6c6c6',
            20: '#e0e0e0', 10: '#f4f4f4',
          },
          blue: {
            100: '#001141', 90: '#001d6c', 80: '#002d9c', 70: '#0043ce',
            60: '#0f62fe', 50: '#4589ff', 40: '#78a9ff', 30: '#a6c8ff',
            20: '#d0e2ff', 10: '#edf5ff',
          },
          green: {
            100: '#071908', 90: '#022d0d', 80: '#044317', 70: '#0e6027',
            60: '#198038', 50: '#24a148', 40: '#42be65', 30: '#6fdc8c',
            20: '#a7f0ba', 10: '#defbe6',
          },
          red: {
            100: '#2d0709', 90: '#520408', 80: '#750e13', 70: '#a2191f',
            60: '#da1e28', 50: '#fa4d56', 40: '#ff8389', 30: '#ffb3b8',
            20: '#ffd7d9', 10: '#fff1f1',
          },
          yellow: {
            100: '#1c1500', 90: '#302400', 80: '#483700', 70: '#684e00',
            60: '#8e6a00', 50: '#b28600', 40: '#d2a106', 30: '#f1c21b',
            20: '#fddc69', 10: '#fcf4d6',
          },
          purple: {
            100: '#1c0f30', 90: '#31135e', 80: '#491d8b', 70: '#6929c4',
            60: '#8a3ffc', 50: '#a56eff', 40: '#be95ff', 30: '#d4bbff',
            20: '#e8daff', 10: '#f6f2ff',
          },
          teal: {
            100: '#081a1c', 90: '#022b30', 80: '#004144', 70: '#005d5d',
            60: '#007d79', 50: '#009d9a', 40: '#08bdba', 30: '#3ddbd9',
            20: '#9ef0f0', 10: '#d9fbfb',
          },
          cyan: {
            100: '#061727', 90: '#012749', 80: '#003a6d', 70: '#00539a',
            60: '#0072c3', 50: '#1192e8', 40: '#33b1ff', 30: '#82cfff',
            20: '#bae6ff', 10: '#e5f6ff',
          },
          magenta: {
            100: '#2a0a18', 90: '#510224', 80: '#740937', 70: '#9f1853',
            60: '#d02670', 50: '#ee5396', 40: '#ff7eb6', 30: '#ffafd2',
            20: '#ffd6e8', 10: '#fff0f7',
          },
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      spacing: {
        'carbon-01': '0.125rem',
        'carbon-02': '0.25rem',
        'carbon-03': '0.5rem',
        'carbon-04': '0.75rem',
        'carbon-05': '1rem',
        'carbon-06': '1.5rem',
        'carbon-07': '2rem',
        'carbon-08': '2.5rem',
        'carbon-09': '3rem',
        'carbon-10': '4rem',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: 'shimmer 1.5s infinite linear',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
