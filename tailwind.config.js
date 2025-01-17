/** @type {import('tailwindcss').Config} */

// const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
     
    extend: {},
  },
  plugins: [
    // require('daisyui'),
  ], 
  variants:{
    variants:{
      extend:{
        display:["focus-group"]
      }
    }
  }
}