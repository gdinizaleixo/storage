/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        basic: "#121113",
        basicDark: "#0e0e0f",
        basicLight: "#161518",
      },
    },
  },
  plugins: [],
};
