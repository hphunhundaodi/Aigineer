/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [],
  theme: {
    extend: {
      backgroundColor: {
        "theme-dark": "#05051d",
      },
      colors: {
        "theme-dark": "#05051d",
      },
      fontFamily: {
        customFont: ["sans-serif"],
      },
      borderColor: {
        "theme-dark": "#05051d",
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
};
