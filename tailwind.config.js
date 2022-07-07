module.exports = {
  presets: [
    require('@crhio/leviat-tailwind-configuration'),
  ],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    require('@headlessui/tailwindcss')({ prefix: 'ui' })
  ],
};