"use client";

import { Language } from "@/constants/language-list";
import { cn } from "@/utils/cn";
import { transformLanguage } from "@/utils/transform-language";

function LanguageItem({
  language,
  isSelected,
  onClick,
}: {
  language: Language;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "py-8pxr text-16pxr mb:text-14pxr flex w-full justify-between leading-6 outline-hidden transition-all duration-150",
        isSelected
          ? "text-blueDark font-bold"
          : "text-grayDefault font-semibold",
        "max700:text-14pxr"
      )}
      onClick={onClick}
    >
      <p>{language.originalText}</p>
      <p>{transformLanguage({ language: language.koreanText })}</p>
    </button>
  );
}

export { LanguageItem };
