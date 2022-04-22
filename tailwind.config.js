module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
        '50': 'repeat(50, minmax(0, 1fr))',
      }
    }
  },
  plugins: [],
  darkMode: "media",
}
