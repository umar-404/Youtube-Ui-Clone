/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./public/*"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "youtube-bg": "#0f0f0f",
        "youtube-card": "#212121",
        "youtube-text": "#f1f1f1",
        "youtube-text-secondary": "#aaaaaa",
        "youtube-border": "#303030",
        "youtube-red": "#ff0033",
        "youtube-hover": "#272727",
      },
    },
  },
  plugins: [],
};
