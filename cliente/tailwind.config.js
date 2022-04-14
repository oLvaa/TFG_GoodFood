module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "3xl": "2000px",
    },
    extend: {
      colors: {
        main: "#60992D",
        mainHover: "#467120",
        oscuro: "#2E2C2F",
        fondoBlanco: "#FCFCFC",
        fondoGris: "#EBEDEE",
        contrasteGris: "#969696",
      },
    },
  },
  plugins: [],
};
