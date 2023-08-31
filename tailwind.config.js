/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      height: {
        '1/16': '6.25%',
      },
      width: {
        '19': '65px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
}
