import type { Config } from "tailwindcss";

type AccType = Record<string, string>;

const range = (start: number, end: number): number[] => {
  const array = [];
  for (let i = start; i <= end; i += 1) {
    array.push(i);
  }
  return array;
};

// px을 rem으로 변환하는 함수 사용 예제 pt-20pxr
// 참고 : https://fe-developers.kakaoent.com/2022/221013-tailwind-and-design-system/
const pxToRem = (px: number, base = 16) => `${px / base}rem`;

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      ...range(0, 2000).reduce((acc: AccType, px: number) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    extend: {
      spacing: {
        ...range(0, 2000).reduce((acc: AccType, px: number) => {
          acc[`${px}pxr`] = pxToRem(px);
          return acc;
        }, {}),
      },
      screens: {
        max1500: { max: "1500px" },
        max1440: { max: "1440px" },
        max1400: { max: "1400px" },
        max1340: { max: "1340px" },
        max1200: { max: "1200px" },
        max1140: { max: "1140px" },
        max1020: { max: "1020px" },
        tb: { max: "1199px", min: "480px" },
        max900: { max: "900px" },
        max800: { max: "800px" },
        max700: { max: "700px" },
        max600: { max: "600px" },
        mb: { max: "479px" },
        max400: { max: "400px" },
        max360: { max: "360px" },
      },
    },
  },
  plugins: [],
};
export default config;
