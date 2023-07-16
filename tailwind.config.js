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
    },
    colors: {
      primary: "#009a76",
      light: "#cde5e5",
      second: "#65afa6",
      third: "#024b42",
    },
  },
};
export const darkMode = "class";
export const plugins = [];
