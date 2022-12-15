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
      fontFamily: {
        body: ["Bai Jamjuree", "sans-serif"],
        bodyitalic: ["Bai Jamjuree Italic", "sans-serif"],
        bodylight: ["Bai Jamjuree Light", "sans-serif"],
        bodylightitalic: ["Bai Jamjuree Light Italic", "sans-serif"],
        bodymedium: ["Bai Jamjuree Medium", "sans-serif"],
        bodymediumitalic: ["Bai Jamjuree Medium Italic", "sans-serif"],
        bodysemibold: ["Bai Jamjuree Semibold", "sans-serif"],
        bodysemibolditalic: ["Bai Jamjuree Semibold Italic", "sans-serif"],
        chakra: ["Chakra Petch", "sans-serif"],
        chakraitalic: ["Chakra Petch Italic", "sans-serif"],
        chakrabold: ["Chakra Petch Bold", "sans-serif"],
        chakrabolditalic: ["Chakra Petch Bold Italic", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
