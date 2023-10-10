/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#CA2E55',
      },
      keyframes: {
        astronaut: {
          '0%': { transform: 'translateX(0px)', rotate: '0deg'},
          '50%': { transform: 'translateX(100px)', rotate: '5deg' },
          '100%': { transform: 'translateX(0px)', rotate: '0deg'},
        },
        planet: {
          '0%': { transform: 'translateY(0px)', rotate: '0deg'},
          '50%': { transform: 'translateY(20px)', rotate: '0deg' },
          '100%': { transform: 'translateY(0px)', rotate: '0deg'},
        }
      },
      animation: {
       astronaut: "astronaut 5s ease-in-out infinite",
       planet: "planet 6s ease-in-out infinite"
      }
    }
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
}

