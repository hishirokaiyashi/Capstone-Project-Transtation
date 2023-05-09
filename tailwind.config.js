/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        primaryRed: "#F07272",
        "my-gray": "rgba(67, 65, 65, 1)",
        "my-text-gray": "rgba(65, 66, 66, 1)",
        "my-text-gray-second": "rgba(73, 69, 79, 1)",
        "my-text-gray-third": "rgba(106, 106, 107, 1)",
        "my-blue": "rgba(133, 187, 237, 0.22)",
        "my-text-blue": "rgba(29, 126, 216, 1)",
        btnRed: "#E04141",
      },
      fontFamily: {
        Achivo: ["Archivo Black", "sans-serif"],
        Almarai: ["Almarai", "sans-serif"],

        Amata: ["Armata", "sans-serif"],
        Ballo: ["Baloo 2", "cursive"],
        Besley: ["Besley", "serif"],
        Roboto: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        "banner-about-us":
          "url('/src/assets/images/AboutUs/phong-nam-valley-cao-bang.jpeg')",
        "chat-icon": "url('/src/assets/images/Message/Message-logo-icon.png')",
        "banner-login": "url('/src/assets/images/Login/login-banner.png')",
        "banner-home": "url('/src/assets/images/Home/Banner1.png')",
        "banner-trip": "url('/src/assets/images/Trips/Banner.png')",
        "free-banner": "url('/src/assets/images/Home/HCM-Banner.png')",
        "transit-banner": "url('/src/assets/images/Home/Village-Banner.png')",
        ticket: "url('/src/assets/images/Payment/TicketBg.png')",
      },
      backgroundColor: {
        "black-background": "#1B1A1A",
        "banner-opacity": "rgba(0,0,0,0.3)",
        "my-bg-gray-background": "rgba(217, 217, 217, 0.45)",
        "my-bg-gray-trips": "rgba(243, 243, 243, 0.74)",
        "my-bg-seat": "rgb(242, 242, 242)",
        "my-modal": "rgba(0, 0, 0, 0.5)",
      },
      animation: {
        zoomIn: "zoom 0.3s linear",
      },
      keyframes: {
        zoom: {
          "0%": { transform: "scale(0.5) translate(-60%, -60%)" },
          "100%": { transform: "scale(1) translate(-50%, -50%)" },
        },
      },
    },
  },
  plugins: [],
};
