/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f5f6fb",
          100: "#e9ebf6",
          200: "#cdd1e8",
          300: "#a3aad3",
          400: "#7a83bb",
          500: "#5c63a3",
          600: "#454b87",
          700: "#363b6b",
          800: "#2a2e52",
          900: "#1a1c37",
        },
        indigo: {
          50: "#f1f0ff",
          100: "#e4e1ff",
          200: "#cac4ff",
          300: "#a89dff",
          400: "#8a7bff",
          500: "#6c56f9",
          600: "#5a3ee0",
          700: "#4930b8",
          800: "#3b2790",
          900: "#302170",
        },
        teal: {
          50: "#eefcfa",
          100: "#d3f7f1",
          200: "#a9eee3",
          300: "#72dfce",
          400: "#3ec7b3",
          500: "#22a897",
          600: "#18857a",
          700: "#186a63",
          800: "#175450",
          900: "#154643",
        },
        surface: "#FAFBFD",
        card: "#FFFFFF",
      },
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px rgba(16, 24, 40, 0.06)",
        card: "0 1px 3px rgba(16, 24, 40, 0.05), 0 1px 2px rgba(16, 24, 40, 0.03)",
        lift: "0 12px 32px rgba(76, 62, 224, 0.14)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
