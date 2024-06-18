/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}',],
  theme: {
    extend: {
      screens: {
        'smx':{'max':'640px'},
      },
      colors: {
        customBlue: '#3D8B95',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

