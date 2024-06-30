/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      backgroundColor: {
        active: "#32ef2e",
        card: {
          common: "#919191",
          epic: "#c825ad",
          rare: "#236dc8",
        },
        theme: "#111111",
      },
      borderColor: {
        active: "#32ef2e",
        card: {
          common: "#919191",
          epic: "#c825ad",
          rare: "#236dc8",
        },
        container: "#343434",
        inactive: "#2b2b2b",
        separator: "#fafafa",
      },
      fill: {
        active: "#111111",
        inactive: "#2b2b2b",
      },
      height: {
        screen: ["100vh", "100dvh"],
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
      },
      padding: {
        container: "0.75rem",
      },
      textColor: {
        active: "#32ef2e",
        font: "#fafafa",
        inactive: "#343434",
      },
    },
  },
  plugins: [],
};
