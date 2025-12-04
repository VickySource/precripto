module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure this includes your files
  theme: {
    extend: {
      colors: {
        primary: "#5f6FFF",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))", // Corrected
      },
    },
  },
  plugins: [],
};
