import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#2b6777",    // Teal
        secondary: "#c8d8e4",  // Light Blue
        accent: "#52ab98",     // Mint Green
        light: "#ffffff",      // White
        neutral: "#f2f2f2",    // Light Gray
      },
      fontFamily: {
        oxanium: ['var(--font-oxanium)'],
      },
      fontWeight: {
        'extra-light': '200',
      }
    },
  },
  plugins: [],
};

export default config; 