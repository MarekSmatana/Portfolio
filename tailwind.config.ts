import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        panel: "rgb(var(--color-panel) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        soft: "rgb(var(--color-soft) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
        leaf: "rgb(var(--color-leaf) / <alpha-value>)",
        ember: "rgb(var(--color-ember) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        river: "rgb(var(--color-river) / <alpha-value>)",
      },
      boxShadow: {
        lift: "0 18px 50px rgb(15 23 42 / 0.12)",
        darklift: "0 18px 50px rgb(0 0 0 / 0.34)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
