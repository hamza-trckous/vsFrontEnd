import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],

  safelist: [
    // Patterns
    {
      pattern:
        /hover:text-(teal|blue|red|green|yellow|purple|pink|gray|black|white|orange)-(100|200|300|400|500|600|700|800|900)/
    },
    {
      pattern:
        /hover:border-(teal|blue|red|green|yellow|purple|pink|gray|black|white|orange)-(100|200|300|400|500|600|700|800|900)/
    },

    // Standard strings
    ...[
      "teal",
      "blue",
      "gray",
      "red",
      "green",
      "yellow",
      "purple",
      "pink",
      "emerald",
      "sky",
      "rose",
      "orange",
      "fuchsia",
      "zinc"
    ].flatMap((color) => [
      `bg-${color}-200`,
      `bg-${color}-500`,
      `bg-${color}-600`,
      `bg-${color}-700`
    ]),

    "bg-black",

    ...[
      "blue",
      "pink",
      "green",
      "red",
      "orange",
      "teal",
      "emerald",
      "sky",
      "rose",
      "fuchsia",
      "zinc"
    ].flatMap((color) => [`text-${color}-400`, `text-${color}-500`]),

    ...[
      "teal",
      "blue",
      "gray",
      "red",
      "green",
      "yellow",
      "purple",
      "pink",
      "emerald",
      "sky",
      "rose",
      "orange",
      "fuchsia",
      "zinc"
    ].flatMap((color) => [`from-${color}-400`, `to-${color}-600`]),

    ...[
      "teal",
      "blue",
      "gray",
      "red",
      "green",
      "yellow",
      "purple",
      "pink",
      "sky",
      "rose",
      "orange",
      "fuchsia",
      "zinc"
    ].flatMap((color) => [`hover:bg-${color}-700`, `focus:ring-${color}-500`]),

    ...[
      "teal",
      "blue",
      "red",
      "green",
      "yellow",
      "purple",
      "pink",
      "gray",
      "emerald",
      "sky",
      "rose",
      "orange",
      "fuchsia",
      "zinc"
    ].flatMap((color) =>
      Array.from(
        { length: 9 },
        (_, n) => `hover:text-${color}-${(n + 1) * 100}`
      )
    ),

    ...[
      "teal",
      "blue",
      "red",
      "green",
      "yellow",
      "purple",
      "pink",
      "gray",
      "emerald",
      "sky",
      "rose",
      "orange",
      "fuchsia",
      "zinc"
    ].flatMap((color) =>
      Array.from(
        { length: 9 },
        (_, n) => `hover:border-${color}-${(n + 1) * 100}`
      )
    )
  ],
  theme: {
    extend: {
      fontFamily: {
        macondo: ["Macondo", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"]
      },
      boxShadow: {
        "white-glow": "0 0 30px white"
      },
      colors: {
        fontColor: "#343045",
        mycolor: "#302C42",
        purpleDark: "#8176AF",
        purpleWhite: "#C0B7E8",
        darkfigma: "#343045",
        radialform: "#3A3456",
        radialto: "#211E2E",
        f8f9fa: "#f8f9fa",
        dark: "#343a40",
        muted: "#6c757d",
        white: "#ffffff",
        black: "#000000",
        gray: colors.gray
      }
    }

    // screens: {
    //   xs: "320px",
    //   xsm: "375px",
    //   lsm: "425px",
    //   sm: "640px",
    //   md: "768px",
    //   lg: "1024px",
    // },
  },

  plugins: []
} satisfies Config;
