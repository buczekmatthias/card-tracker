/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      backgroundColor: {
        card: {
          common: "#919191",
          epic: "#c825ad",
          rare: "#236dc8",
        },
        theme: "#1c1c1c",
      },
      borderColor: {
        card: {
          common: "#919191",
          epic: "#c825ad",
          rare: "#236dc8",
        },
        container: "#343434",
        inactive: "#4f4f4f",
      },
      fill: {
        active: "#111111",
        inactive: "#4f4f4f",
      },
      height: {
        screen: ["100vh", "100dvh"],
      },
      maxWidth: {
        loadout: "800px",
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
      },
      padding: {
        container: "0.75rem",
      },
      screens: {
        cardsDouble: "825px",
        cardsTriple: "1200px",
        loadout: "800px",
      },
      textColor: {
        inactive: "#4f4f4f",
      },
    },
  },
  plugins: [],
};
