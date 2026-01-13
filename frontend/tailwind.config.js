/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/renderer/index.html',
    './src/renderer/src/**/*.{js,ts,jsx,tsx}' // renderer 폴더 내의 모든 파일 스캔
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
