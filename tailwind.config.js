import { addDynamicIconSelectors } from '@iconify/tailwind';
import Daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
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
    Daisyui,
    addDynamicIconSelectors(),
  ],
};
