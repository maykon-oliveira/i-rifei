import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'ping-once': 'ping 1s linear backwards',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["wireframe"],
  },
} satisfies Config;
