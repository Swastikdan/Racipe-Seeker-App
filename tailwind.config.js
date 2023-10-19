/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./index.html" ,"./recipe-details.html" , "./404.html","./500.html" ,"./src/**/*.{html,js}" ,"./public/**/*.{html,js}", "node_modules/preline/dist/*.js"],

  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require("@tailwindcss/typography"),
    require('preline/plugin'),


  ],
}
