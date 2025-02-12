import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff",
          dark: "#0a0a0a",
        },
        foreground: {
          light: "#171717",
          dark: "#ededed",
        },
        primary: {
          light: "#2563eb",
          dark: "#1e90ff",
        },
        secondary: {
          light: "#9333ea",
          dark: "#c084fc",
        },
        accent: {
          light: "#22c55e",
          dark: "#16a34a",
        },
        error: {
          light: "#dc2626",
          dark: "#ef4444",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("daisyui")],
} satisfies Config;
