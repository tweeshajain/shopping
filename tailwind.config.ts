import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FBF8F3",
          100: "#F7F2EA",
          200: "#F1EADD"
        },
        beige: {
          100: "#EDE3D2",
          200: "#E3D6BF",
          300: "#D8C7AC"
        },
        taupe: {
          100: "#C9B9A6",
          200: "#B09F8B",
          300: "#8C7B68",
          400: "#6E5E4D"
        },
        warmgrey: {
          100: "#E8E3DC",
          200: "#CBC4BB",
          300: "#9A938A",
          400: "#6B665E"
        },
        softblack: {
          DEFAULT: "#1B1714",
          800: "#22201D"
        },
        signature: {
          DEFAULT: "#C4607A",
          light: "#EFB8C3",
          faint: "#FBF0F2",
        },
        rose: {
          50: "#F6E5DE",
          100: "#EDCFC3",
          200: "#E1B6A6",
          300: "#C99685",
          400: "#A87767"
        },
        berry: {
          DEFAULT: "#B5294E",
          soft: "#E8809A",
          light: "#F5C5D0",
          dark: "#7E1535"
        },
        sage: {
          DEFAULT: "#7DAF9C",
          light: "#C2DDD5",
          faint: "#E8F3EF"
        },
        lavender: {
          DEFAULT: "#9B86C4",
          light: "#D4C8EB",
          faint: "#F0EBF9"
        },
        gold: {
          DEFAULT: "#C4913A",
          light: "#EDD9A3",
          faint: "#FBF4E6"
        }
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "ui-serif", "Georgia", "serif"],
        editorial: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        widest2: "0.32em",
        ultra: "0.5em"
      },
      backgroundImage: {
        "soft-radial":
          "radial-gradient(60% 60% at 50% 35%, rgba(237,207,195,0.35) 0%, rgba(247,242,234,0) 70%)",
        "warm-gradient":
          "linear-gradient(180deg, #FBF8F3 0%, #F7F2EA 48%, #EDE3D2 100%)"
      },
      boxShadow: {
        glass:
          "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 12px 40px -12px rgba(110,94,77,0.25)",
        soft: "0 30px 80px -40px rgba(110,94,77,0.35)",
        ring: "0 0 0 1px rgba(140,123,104,0.15)"
      },
      transitionDuration: {
        cine: "900ms"
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};

export default config;
