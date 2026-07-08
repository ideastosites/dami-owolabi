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
        primary: {
          DEFAULT: "#439aa9",
          light: "#62b6c4",
          dark: "#2a717e",
        },
        secondary: {
          DEFAULT: "#054753",
          dark: "#022930",
        },
      },
    },
  },
  plugins: [],
};

export default config;
