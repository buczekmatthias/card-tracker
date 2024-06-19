/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      backgroundColor: {
        active: "#32ef2e",
        theme: "#111111",
        card: {
          common: "#919191",
          rare: "#236dc8",
          epic: "#c825ad",
        },
      },
      borderColor: {
        container: "#343434",
        active: "#32ef2e",
        inactive: "#404040",
      },
      fill: {
        active: "#111111",
        inactive: "#404040",
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
      },
      padding: {
        container: "0.75rem",
      },
      textColor: {
        font: "#fafafa",
        active: "#32ef2e",
        inactive: "#343434",
      },
    },
  },
  plugins: [],
};
