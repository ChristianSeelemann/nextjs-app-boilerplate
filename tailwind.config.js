/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        bglight: "#F8F8F8",
        bgdark: "#111872",
        primary: colors.blue,
        light: colors.slate,
        dark: colors.neutral,
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
