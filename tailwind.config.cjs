/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#4d91c6',
          blueDark: '#3d749e',
          green: '#6fbf73',
          greenDark: '#58985c',
          sand: '#d8ae73',
          sandDark: '#b79361',
          orange: '#e87d50',
          orangeDark: '#c56a44',
          yellow: '#edb332',
          yellowDark: '#c9982a',
          off: '#f5f0e6',
          ink: '#0f0f0f',
        }
      },
      boxShadow: {
        soft: '0 6px 20px rgba(0,0,0,0.08)'
      },
      borderRadius: {
        '2xl': '1.25rem'
      }
    }
  },
  plugins: [],
}