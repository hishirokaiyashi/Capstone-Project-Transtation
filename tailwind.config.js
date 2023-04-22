/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        'my-gray': 'rgba(67, 65, 65, 1)',
        'my-text-gray': 'rgba(65, 66, 66, 1)',
        'my-text-gray-second':'rgba(73, 69, 79, 1)',
        'my-text-gray-third':'rgba(106, 106, 107, 1)'
      },
      fontFamily: {
        'Achivo': [ 'Archivo Black','sans-serif'],
        'Amata' : ['Armata', 'sans-serif'],
        'Ballo' : ['Baloo 2', 'cursive'],
        'Besley': ['Besley', 'serif'],
        'Roboto': ['Roboto', 'sans-serif']
      },
      backgroundImage: {
        "chat-icon": "url('/src/assets/images/Message-logo-icon_3595693.png')",
        "banner-login": "url('/src/assets/images/login-banner.png')",
      },
      backgroundColor:{
      }
    },
  },
  plugins: [],
};
