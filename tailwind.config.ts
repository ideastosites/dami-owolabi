import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          950: "#02232A", // Near-Black Teal
          800: "#054753", // Deep Teal
          500: "#439aa9", // Muted Teal
        },
        primary: {
          DEFAULT: "#054753", // Deep Teal
          muted: "#439aa9", // Muted Teal
          dark: "#02232A", // Near-Black Teal
        },
      },
      fontFamily: {
        mulish: ["var(--font-mulish)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        sans: ["var(--font-mulish)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
