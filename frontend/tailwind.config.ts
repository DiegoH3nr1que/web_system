import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        CustomBlue:'#142026',
        CustomBlueLigth: '#0098ae',
        CustomBackground: '#c0c2bd',
        royalblue: '#4169e1',
        lightgray: '#d3d3d3',
      },
    },
  },
  plugins: [],
};
export default config;
