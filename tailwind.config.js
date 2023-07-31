/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      noto: "Noto Sans",
      amiri: "Amiri",
      nunito: "Nunito",
      comfortaa: "Comfortaa",
      poppins: "Poppins",
      quicksand: "Quicksand",
      lateef: "Lateef",
      kufi: "Reem Kufi",
    },
    colors: {
      primary: "#38a3a5",
      light: "#cde5e5",
      second: "#38a3a5",
      third: "#024b42",
      greenday: "#57cc99",
      bluegreen: "#22577a",
    },
  },
};
export const darkMode = "class";
export const plugins = [require("@tailwindcss/line-clamp")];
