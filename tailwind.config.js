module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        cupcake: {
          primary: "#446084",
          secondary: "#f6d860",
          accent: "#3d4451",
          neutral: "#37cdbe",
          "base-100": "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
