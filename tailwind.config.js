module.exports = {
  presets: [
    require('@crhio/leviat-tailwind-configuration'),
  ],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './docs/.vitepress/**/*.{js,ts,vue}',
		'./docs/**/*.md',
  ],
};