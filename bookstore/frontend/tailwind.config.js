/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: "#FF003E",
        customBlack: "#080A0C",
        customWhite: "#EDEEF3",
        customDarkGray: "#1D232B",
        customLightGray: "#5A6B87",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        sm: "300px",
        md: "500px",
        lg: "700px",
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        notaSans: ["var(--font-nota-sans)"],
      },
    },
  },
  plugins: [],
};
