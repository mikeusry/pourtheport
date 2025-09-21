/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Brand Guide Colors
        brand: {
          'primary-green': '#317D40',
          'accent-orange': '#F09C2B',
          'neutral-dark': '#2C2C2C',
          'background-white': '#FFFFFF',
          'secondary-blue': '#428DC4',
          'usda-blue': '#0066CC',
          'product-amber': '#B8860B',
        },
        // Keep legacy primary for backwards compatibility
        primary: '#317D40',
      },
      fontFamily: {
        // Brand Guide Typography: Montserrat fallback stack
        sans: ['Montserrat', 'Open Sans', 'Lato', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'pulse-gentle': 'pulseGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

