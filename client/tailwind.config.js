/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rachna: {
          cream:    '#FFF8E1',
          indigo:   '#4540C8',
          violet:   '#9B7FD8',
          lavender: '#EDE9FF',
          dark:     '#0F0E24',
          muted:    '#8B89B0',
          surface:  '#F7F7FD',
          border:   '#E5E3F8',
          success:  '#1D9E75',
          warning:  '#F59E0B',
          danger:   '#EF4444',
        },
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(2.5rem, 5vw, 4rem)',
        'h1':   'clamp(1.75rem, 3vw, 2.5rem)',
        'h2':   'clamp(1.25rem, 2vw, 1.75rem)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'rachna-gradient': 'linear-gradient(135deg, #4540C8 0%, #9B7FD8 100%)',
      },
      boxShadow: {
        'card':   '0 2px 16px 0 rgba(69,64,200,0.08)',
        'card-lg': '0 8px 40px 0 rgba(69,64,200,0.14)',
        'glow':   '0 0 0 3px rgba(69,64,200,0.18)',
      },
      borderRadius: {
        'xl2': '1.25rem',
        '2xl2': '1.5rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
