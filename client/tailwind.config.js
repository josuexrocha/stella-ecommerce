// client/tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3D2A54",
        secondary: "#1E1326",
        text: "#AEC9FF",
        background: {
          DEFAULT: 'linear-gradient(90deg, #3D2A54 0%, #1E1326 100%)',
          inverse: 'linear-gradient(90deg, #1E1326 0%, #3D2A54 100%)',
          transparent: 'linear-gradient(90deg, rgba(61, 42, 84, 0.7) 0%, rgba(30, 19, 38, 0.7) 100%)',
        }
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ['"Roboto Slab"', "serif"],
        display: ['"Playwrite FR Moderne"', "serif"],
      },
      height: {
        header: '60px',
        footer: '60px',
      },
    },
  },
  plugins: [],
};
