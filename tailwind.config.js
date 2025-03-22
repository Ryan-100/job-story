/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundImage: {
      "hero-bg": "url('/images/hero_bg.jpeg')",
      "company-cta-prior-bg": "url('/images/company_prior_bg.svg')",
    },

    screens: {
      // xs: "480px",
      // // => @media (min-width: 480px) { ... }

      // sm: "640px",
      // // => @media (min-width: 640px) { ... }

      // md: "768px",
      // // => @media (min-width: 768px) { ... }

      // lg: "1024px",
      // // => @media (min-width: 1024px) { ... }

      // xl: "1280px",
      // // => @media (min-width: 1280px) { ... }

      // "2xl": "1536px",
      // // => @media (min-width: 1536px) { ... }
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      maxlg: { max: "1023px" },
      maxMd: { max: "991px" },
      maxSm: { max: "768px" },
      maxXs: { max: "375px" },
    },
    extend: {},
  },
  plugins: [],
};
