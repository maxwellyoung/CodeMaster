import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0F0F0F", // Dark background color
        darkCard: "#1B1B1B", // Darker card background
        lightText: "#E5E5E5", // Light text color for contrast
        primary: "#6366F1", // Primary color for buttons and accents
        primaryHover: "#4F46E5", // Hover color for primary buttons
      },
      boxShadow: {
        glow: "#6466F1", // Glow effect for buttons
      },
      backgroundImage: {
        "dark-gradient": "linear-gradient(135deg, #2E2E2E 0%, #0F0F0F 100%)", // Gradient background
      },
    },
  },
  plugins: [],
};
export default config;
