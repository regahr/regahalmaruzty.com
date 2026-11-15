import type { Config } from "tailwindcss";

export default {
  // hover: styles apply only on devices that can hover, so a tap on a phone
  // does not leave a card lifted.
  future: { hoverOnlyWhenSupported: true },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        line: "var(--line)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "on-accent": "var(--on-accent)",
      },
      fontFamily: {
        sans: ["var(--font-parkin-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        page: "1040px",
      },
    },
  },
  plugins: [],
} satisfies Config;
