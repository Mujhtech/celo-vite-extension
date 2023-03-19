/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FCFF51",
        bg: "#fbf6f1",
      },
    },
  },
  plugins: [],
};
