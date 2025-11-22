/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 在这里扩展字体
      fontFamily: {
        shanhai: ['"Noto Serif SC"', 'serif'],
        shanhaigu: ['"Noto Serif TC"', 'serif'],
      },
    },
  },
  plugins: [],
}
