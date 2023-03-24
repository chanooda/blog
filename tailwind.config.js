const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        dark: {
          main: "#1e272e",
        },
      },
      colors: {
        dark: {
          main: "#d2dae2",
        },
      },
      fontFamily: {
        sans: ["var(--font-noto-kr)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
