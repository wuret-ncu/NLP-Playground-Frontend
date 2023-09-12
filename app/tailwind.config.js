/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      height: {
        '5vh': '5vh',
        '10vh': '10vh',
        '90vh': '90vh',
        '85vh': '85vh',
      },
      gridTemplateRows: {
        '8': 'repeat(8, minmax(0, 1fr))',
        '1-18-1': '5% 90% 5%',
        '2-23': '8% 92%',
        '2-20-3': '8% 80% 12%',
        '2-19-4': '8% 76% 16%',
        '1-9': '10% 90%',
        '9-1': '90% 10%',
        '8-7-85': '8% 7% 85%',
      },
      gridTemplateColumns: {
        '2-4-1-1': '25% 50% 12.5% 12.5%',
        '2-2-1': '40% 40% 20%',
        '9-1': '90% 10%',
        '1-9': '10% 90%',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          'primary': '#67e8f9',
          'secondary': '#7dd3fc',
          'accent': '#93c5fd',
          'neutral': '#f3f4f6',
          'base-100': '#FFFFFF',
          'info': '#3ABFF8',
          'success': '#36D399',
          'warning': '#FBBD23',
          'error': '#F87272',
          '--btn-text-case': 'normal-case',
        },
      },
    ],
  },
};
