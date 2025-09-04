import { Locales } from "@/types/locales";

export type TKoreanText =
  | "한국어"
  | "영어"
  | "베트남어"
  | "우즈베크어"
  | "몽골어"
  | "일본어"
  | "태국어"
  | "중국어";

export interface Language {
  locale: Locales;
  originalText: string;
  koreanText: TKoreanText;
  text?: string;
}

const LANGUAGE_LIST = (): Language[] =>
  [
    {
      locale: "ko",
      originalText: "Korean",
      koreanText: "한국어",
      text: "한국어",
    },
    {
      locale: "en",
      originalText: "English",
      koreanText: "영어",
      text: "영어",
    },
    {
      locale: "vi",
      originalText: "Tiếng Việt",
      koreanText: "베트남어",
      text: "베트남어",
    },
    {
      locale: "uz",
      originalText: "O‘zbekcha",
      koreanText: "우즈베크어",
      text: "우즈베크어",
    },
    {
      locale: "mn",
      originalText: "Монгол",
      koreanText: "몽골어",
      text: "몽골어",
    },
    {
      locale: "ja",
      originalText: "日本語",
      koreanText: "일본어",
      text: "일본어",
    },
    {
      locale: "th",
      originalText: "ภาษาไทย",
      koreanText: "태국어",
      text: "태국어",
    },
    {
      locale: "zh",
      originalText: "中文",
      koreanText: "중국어",
      text: "중국어",
    },
  ] as const;

export { LANGUAGE_LIST };
