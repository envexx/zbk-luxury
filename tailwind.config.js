/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'luxury-gold': '#D4AF37',
        'luxury-gold-hover': '#C9A227',
        'luxury-gold-active': '#B8931F',
        'deep-navy': '#111111',
        'off-white': '#1A1A1A',
        
        // Accent Colors
        'charcoal': '#2D3436',
        'light-gray': '#333333',
        'success-green': '#27AE60',
        'alert-red': '#E74C3C',
        'info-blue': '#3498DB',
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      
      fontSize: {
        'h1': ['48px', { lineHeight: '1.2', letterSpacing: '-0.5px' }],
        'h2': ['36px', { lineHeight: '1.2', letterSpacing: '-0.5px' }],
        'h3': ['24px', { lineHeight: '1.2', letterSpacing: '-0.5px' }],
        'h4': ['18px', { lineHeight: '1.2', letterSpacing: '-0.5px' }],
      },
      
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      
      borderRadius: {
        'minimal': '2px',
        'compact': '4px',
        'standard': '8px',
        'large': '12px',
      },
      
      boxShadow: {
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'glow-strong': '0 0 30px rgba(212, 175, 55, 0.4)',
      },
      
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #D4AF37, #E8C547)',
        'gradient-dark': 'linear-gradient(135deg, #111111, #1A1A1A)',
        'gradient-light': 'linear-gradient(135deg, #1A1A1A, #333333)',
      },
      
      transitionTimingFunction: {
        'micro': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'entrance': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      
      transitionDuration: {
        'micro': '150ms',
        'standard': '200ms',
        'entrance': '300ms',
      },
    },
  },
  plugins: [],
}
