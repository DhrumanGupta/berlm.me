module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,md,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        transparent: "transparent",
        white: "var(--color-white)",
        black: "var(--color-black)",
        accent: "var(--color-accent)",
        current: "var(--color-current)",

        gray: {
          100: "var(--color-gray-100)",
          200: "var(--color-gray-200)",
          300: "var(--color-gray-300)",
          400: "var(--color-gray-400)",
          500: "var(--color-gray-500)",
          600: "var(--color-gray-600)",
          700: "var(--color-gray-700)",
          800: "var(--color-gray-800)",
          900: "var(--color-gray-900)",
        },

        yellow: {
          500: "var(--color-yellow-500)",
        },
        blue: {
          100: "var(--color-blue-100)",
          500: "var(--color-blue-500)",
          800: "var(--color-blue-800)",
        },
        red: {
          500: "var(--color-red-500)",
        },
      },
      gridTemplateRows: {
        "max-content": "max-content",
      },
      spacing: {
        "5vw": "5vw", // pull featured sections and navbar in the margin
        "8vw": "8vw", // positions hero img inside the margin
        "10vw": "10vw", // page margin
        "20vw": "20vw",
      },
      screens: {
        md: "740px",
        lg: "1024px",
      },
      typography: (theme) => {
        // some fontSizes return [size, props], others just size :/
        const fontSize = (size) => {
          const result = theme(`fontSize.${size}`);
          return Array.isArray(result) ? result[0] : result;
        };

        const breakout = {
          marginLeft: 0,
          marginRight: 0,
        };

        return {
          // DEFAULT only holds shared stuff and not the things that change
          // between light/dark
          DEFAULT: {
            css: [
              {
                p: {
                  marginTop: 0,
                  marginBottom: theme("spacing.5"),
                  fontSize: fontSize("base"),
                  lineHeight: "1.75",
                },
                "> div": {
                  marginTop: 0,
                  marginBottom: theme("spacing.5"),
                  fontSize: fontSize("base"),
                  lineHeight: "1.75",
                },
                a: {
                  textDecoration: "none",
                },
                "a:hover,a:focus": {
                  textDecoration: "underline",
                  outline: "none",
                },
                strong: {
                  fontWeight: theme("fontWeight.medium"),
                },
                hr: {
                  marginTop: theme("spacing.10"),
                  marginBottom: theme("spacing.10"),
                },
                pre: {
                  color: "var(--base05)",
                  backgroundColor: "var(--base00)",
                  marginTop: 0,
                  marginBottom: theme("spacing.6"),
                  marginLeft: `-${theme("spacing.10vw")}`,
                  marginRight: `-${theme("spacing.10vw")}`,
                  padding: theme("spacing.6"),
                  borderRadius: 0,

                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    borderRadius: theme("borderRadius.lg"),
                    ...breakout,
                  },
                },
                ul: {
                  marginTop: 0,
                  marginBottom: theme("spacing.5"),
                },
                ol: {
                  marginTop: 0,
                  marginBottom: theme("spacing.5"),
                },
                li: {
                  marginTop: theme("spacing.1"),
                  marginBottom: theme("spacing.1"),
                },
                "h1, h2": {
                  marginTop: 0,
                  fontWeight: theme("fontWeight.medium"),
                  lineHeight: "1.3",

                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    fontWeight: theme("fontWeight.medium"),
                  },
                },
                "h3, h4, h5, h6": {
                  marginTop: 0,
                  marginBottom: 0,
                  fontWeight: theme("fontWeight.medium"),
                  lineHeight: "1.3",

                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    fontWeight: theme("fontWeight.medium"),
                  },
                },
                // tailwind doesn't stick to this property order, so we can't make 'h3' overrule 'h2, h3, h4'
                h1: {
                  fontSize: fontSize("2xl"),
                  marginTop: theme("spacing.10"),
                  marginBottom: theme("spacing.4"),
                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    fontSize: fontSize("3xl"),
                  },
                },
                h2: {
                  fontSize: fontSize("xl"),
                  marginTop: theme("spacing.10"),
                  marginBottom: theme("spacing.4"),
                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    fontSize: fontSize("2xl"),
                  },
                },
                h3: {
                  fontSize: fontSize("lg"),
                  marginTop: theme("spacing.8"),
                  marginBottom: theme("spacing.3"),
                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    fontSize: fontSize("xl"),
                  },
                },
                "h4, h5, h6": {
                  fontSize: fontSize("base"),
                  marginTop: theme("spacing.6"),
                  marginBottom: theme("spacing.2"),
                  [`@media (min-width: ${theme("screens.lg")})`]: {
                    fontSize: fontSize("lg"),
                  },
                },
                img: {
                  // images are wrapped in <p>, which already has margin
                  marginTop: 0,
                  marginBottom: 0,
                  borderRadius: theme("borderRadius.lg"),
                },
                blockquote: {
                  fontWeight: theme("fontWeight.normal"),
                  fontStyle: "italic",
                  borderLeft: `3px solid ${theme("colors.gray.300")}`,
                  borderRadius: 0,
                  paddingLeft: theme("spacing.5"),
                  paddingTop: theme("spacing.1"),
                  paddingBottom: theme("spacing.1"),
                  marginTop: 0,
                  marginBottom: theme("spacing.6"),
                },
                "blockquote > :last-child": {
                  marginBottom: 0,
                },
              },
            ],
          },
          // use prose-light instead of default, so it's easier to see theme differences
          light: {
            css: [
              {
                color: theme("colors.gray.700"),
                strong: {
                  color: theme("colors.black"),
                },
                hr: {
                  borderColor: theme("colors.gray.200"),
                },
                code: {
                  color: theme("colors.gray.800"),
                },
                "h1, h2, h3, h4, h5, h6": {
                  color: theme("colors.black"),
                },
                blockquote: {
                  color: theme("colors.gray.500"),
                  borderLeftColor: theme("colors.gray.300"),
                },
                "blockquote strong": {
                  color: "inherit",
                  fontWeight: theme("fontWeight.medium"),
                },
                "thead, tbody tr": {
                  borderBottomColor: theme("colors.gray.200"),
                },
                a: {
                  color: theme("colors.accent"),
                },
              },
            ],
          },
          dark: {
            css: [
              {
                color: theme("colors.gray.300"),
                a: {
                  color: theme("colors.accent"),
                },
                strong: {
                  color: theme("colors.white"),
                },
                hr: {
                  borderColor: theme("colors.gray.600"),
                },
                code: {
                  color: theme("colors.gray.100"),
                },
                "h1, h2, h3, h4, h5, h6": {
                  color: theme("colors.white"),
                },
                blockquote: {
                  color: theme("colors.gray.300"),
                  borderLeftColor: theme("colors.gray.600"),
                },
                "blockquote strong": {
                  color: "inherit",
                  fontWeight: theme("fontWeight.medium"),
                },
                "thead, tbody tr": {
                  borderBottomColor: theme("colors.gray.600"),
                },
              },
            ],
          },
        };
      },
      minHeight: {
        hero: "calc(100vh - 16rem)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    function ({ addVariant, addComponents }) {
      addVariant("child", "& > *");
    },
  ],
};
