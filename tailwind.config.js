/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/globals.css',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Updated sophisticated dark color palette with blue undertones
        charcoal: { 
          DEFAULT: '#1a1a1c', // Dark charcoal with blue undertone - main background
          100: '#2f2f33', // Lighter charcoal with blue undertone for surfaces
          200: '#242428', // Secondary background
          300: '#1e1e22', // Tertiary background 
          400: '#1a1a1c', // Default dark background
          500: '#161618', // Deeper dark
          600: '#121214', // Very deep dark
          700: '#0e0e10', // Almost black with blue undertone
          800: '#e8eaed', // Light grey text (not pure white)
          900: '#c4c7ca'  // Medium grey secondary text
        },
        // Sophisticated accent colors for strategic color bursts
        accent_teal: {
          DEFAULT: '#008B8B', // Dark Cyan - modern, tech-forward
          hover: '#20B2AA' // Light Sea Green - hover state
        },
        accent_gold: {
          DEFAULT: '#B8860B', // Dark Goldenrod - luxury, sophistication
          hover: '#DAA520' // Goldenrod - hover state
        },
        accent_rose: {
          DEFAULT: '#BC8F8F', // Rosy Brown - warm, elegant
          hover: '#D2B0B0' // Lighter rosy brown - hover state
        },
        accent_purple: {
          DEFAULT: '#6A5ACD', // Slate Blue - creative, distinctive
          hover: '#7B68EE' // Medium Slate Blue - hover state
        },
        persian_green: { 
          DEFAULT: '#2a9d8f', 
          100: '#081f1d', 
          200: '#113f39', 
          300: '#195e56', 
          400: '#217e73', 
          500: '#2a9d8f', 
          600: '#3acbba', 
          700: '#6cd8cb', 
          800: '#9de5dc', 
          900: '#cef2ee' 
        }, 
        saffron: { 
          DEFAULT: '#e9c46a', 
          100: '#3b2c09', 
          200: '#755912', 
          300: '#b0851a', 
          400: '#e0ad2e', 
          500: '#e9c46a', 
          600: '#edd086', 
          700: '#f1dca4', 
          800: '#f6e7c3', 
          900: '#faf3e1' 
        }, 
        sandy_brown: { 
          DEFAULT: '#f4a261', 
          100: '#401f04', 
          200: '#803e09', 
          300: '#c05e0d', 
          400: '#f07e22', 
          500: '#f4a261', 
          600: '#f6b681', 
          700: '#f8c8a1', 
          800: '#fbdac0', 
          900: '#fdede0' 
        }, 
        burnt_sienna: { 
          DEFAULT: '#e76f51', 
          100: '#371107', 
          200: '#6e220f', 
          300: '#a43316', 
          400: '#db441e', 
          500: '#e76f51', 
          600: '#ec8b73', 
          700: '#f1a896', 
          800: '#f5c5b9', 
          900: '#fae2dc' 
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Menlo', 'Monaco', 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Courier New', 'monospace'],
        f1: ['"F1 Black"', 'sans-serif'],
      },
    },
  },
  safelist: [
    // Charcoal colors
    'bg-charcoal', 'bg-charcoal-100', 'bg-charcoal-200', 'bg-charcoal-300', 'bg-charcoal-400', 'bg-charcoal-500', 'bg-charcoal-600', 'bg-charcoal-700', 'bg-charcoal-800', 'bg-charcoal-900',
    'text-charcoal', 'text-charcoal-100', 'text-charcoal-200', 'text-charcoal-300', 'text-charcoal-400', 'text-charcoal-500', 'text-charcoal-600', 'text-charcoal-700', 'text-charcoal-800', 'text-charcoal-900',
    'border-charcoal', 'border-charcoal-100', 'border-charcoal-200', 'border-charcoal-300', 'border-charcoal-400', 'border-charcoal-500', 'border-charcoal-600', 'border-charcoal-700', 'border-charcoal-800', 'border-charcoal-900',
    
    // Accent colors
    'bg-accent_teal', 'bg-accent_teal-hover', 'text-accent_teal', 'text-accent_teal-hover', 'border-accent_teal', 'border-accent_teal-hover',
    'bg-accent_gold', 'bg-accent_gold-hover', 'text-accent_gold', 'text-accent_gold-hover', 'border-accent_gold', 'border-accent_gold-hover',
    'bg-accent_rose', 'bg-accent_rose-hover', 'text-accent_rose', 'text-accent_rose-hover', 'border-accent_rose', 'border-accent_rose-hover',
    'bg-accent_purple', 'bg-accent_purple-hover', 'text-accent_purple', 'text-accent_purple-hover', 'border-accent_purple', 'border-accent_purple-hover',
    'hover:bg-accent_teal', 'hover:bg-accent_gold', 'hover:bg-accent_rose', 'hover:bg-accent_purple',
    'hover:text-accent_teal', 'hover:text-accent_gold', 'hover:text-accent_rose', 'hover:text-accent_purple',
    
    // Persian Green colors
    'bg-persian_green', 'bg-persian_green-100', 'bg-persian_green-200', 'bg-persian_green-300', 'bg-persian_green-400', 'bg-persian_green-500', 'bg-persian_green-600', 'bg-persian_green-700', 'bg-persian_green-800', 'bg-persian_green-900',
    'text-persian_green', 'text-persian_green-100', 'text-persian_green-200', 'text-persian_green-300', 'text-persian_green-400', 'text-persian_green-500', 'text-persian_green-600', 'text-persian_green-700', 'text-persian_green-800', 'text-persian_green-900',
    'border-persian_green', 'border-persian_green-100', 'border-persian_green-200', 'border-persian_green-300', 'border-persian_green-400', 'border-persian_green-500', 'border-persian_green-600', 'border-persian_green-700', 'border-persian_green-800', 'border-persian_green-900',
    
    // Saffron colors
    'bg-saffron', 'bg-saffron-100', 'bg-saffron-200', 'bg-saffron-300', 'bg-saffron-400', 'bg-saffron-500', 'bg-saffron-600', 'bg-saffron-700', 'bg-saffron-800', 'bg-saffron-900',
    'text-saffron', 'text-saffron-100', 'text-saffron-200', 'text-saffron-300', 'text-saffron-400', 'text-saffron-500', 'text-saffron-600', 'text-saffron-700', 'text-saffron-800', 'text-saffron-900',
    'border-saffron', 'border-saffron-100', 'border-saffron-200', 'border-saffron-300', 'border-saffron-400', 'border-saffron-500', 'border-saffron-600', 'border-saffron-700', 'border-saffron-800', 'border-saffron-900',
    
    // Sandy Brown colors
    'bg-sandy_brown', 'bg-sandy_brown-100', 'bg-sandy_brown-200', 'bg-sandy_brown-300', 'bg-sandy_brown-400', 'bg-sandy_brown-500', 'bg-sandy_brown-600', 'bg-sandy_brown-700', 'bg-sandy_brown-800', 'bg-sandy_brown-900',
    'text-sandy_brown', 'text-sandy_brown-100', 'text-sandy_brown-200', 'text-sandy_brown-300', 'text-sandy_brown-400', 'text-sandy_brown-500', 'text-sandy_brown-600', 'text-sandy_brown-700', 'text-sandy_brown-800', 'text-sandy_brown-900',
    'border-sandy_brown', 'border-sandy_brown-100', 'border-sandy_brown-200', 'border-sandy_brown-300', 'border-sandy_brown-400', 'border-sandy_brown-500', 'border-sandy_brown-600', 'border-sandy_brown-700', 'border-sandy_brown-800', 'border-sandy_brown-900',
    
    // Burnt Sienna colors
    'bg-burnt_sienna', 'bg-burnt_sienna-100', 'bg-burnt_sienna-200', 'bg-burnt_sienna-300', 'bg-burnt_sienna-400', 'bg-burnt_sienna-500', 'bg-burnt_sienna-600', 'bg-burnt_sienna-700', 'bg-burnt_sienna-800', 'bg-burnt_sienna-900',
    'text-burnt_sienna', 'text-burnt_sienna-100', 'text-burnt_sienna-200', 'text-burnt_sienna-300', 'text-burnt_sienna-400', 'text-burnt_sienna-500', 'text-burnt_sienna-600', 'text-burnt_sienna-700', 'text-burnt_sienna-800', 'text-burnt_sienna-900',
    'border-burnt_sienna', 'border-burnt_sienna-100', 'border-burnt_sienna-200', 'border-burnt_sienna-300', 'border-burnt_sienna-400', 'border-burnt_sienna-500', 'border-burnt_sienna-600', 'border-burnt_sienna-700', 'border-burnt_sienna-800', 'border-burnt_sienna-900',
    
    // Font classes
    'font-f1',
    'font-bold',
    'font-semibold',
    'font-black',
    'font-poppins',
    'tracking-wide',
    'tracking-tight',
    
    // Background clip and text transparent for gradients
    'bg-gradient-to-r',
    'bg-clip-text',
    'text-transparent',
    'border-2',
    
    // From/to gradient classes
    'from-persian_green',
    'to-saffron',
    'from-sandy_brown',
    'to-burnt_sienna',
    'from-charcoal',
    'to-persian_green',
    'from-saffron',
    'to-sandy_brown',
    'from-burnt_sienna',
    'to-charcoal',
    
    // Divide colors
    'divide-charcoal-300',
    'divide-charcoal-400',
  ],
  plugins: [],
} 