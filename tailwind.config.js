/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // This line ensures Tailwind applies styles to MUI components as well
    "./node_modules/@mui/material/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // If you wish to use DaisyUI or other plugins, you can uncomment this line
    // require('daisyui'),
  ],
}
