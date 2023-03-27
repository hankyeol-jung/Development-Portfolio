const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        opaqueGray: {
          500: "#94a3b850",
          600: "#94a3b860",
          700: "#94a3b870",
        },
      },
    },
  },
};
