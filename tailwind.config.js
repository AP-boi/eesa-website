/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#1e3a8a',
          900: '#0f172a',
          950: '#0a0f1d',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          600: '#059669',
          700: '#047857',
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
