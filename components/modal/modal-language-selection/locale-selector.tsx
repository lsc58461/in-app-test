"use client";

import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useEffect, useRef, useState } from "react";

import { SearchInput } from "@/components/search-input/search-input";
import { Language, LANGUAGE_LIST } from "@/constants/language-list";
import { useBackgroundPosition } from "@/hooks/use-background-position";
import { useDebounce } from "@/hooks/use-debounce";
import { useLocaleStore } from "@/stores/use-locale-store";
import { cn } from "@/utils/cn";

import { ModalListItemBackground } from "../modal-list-item-background";

import { LanguageItem } from "./language-item";

const DEBOUNCE_DELAY = 200;

interface ILocaleSelectorProps {
  selectedLocale: Language | undefined;
  onSelectedLocaleClick: (language: Language) => void;
}

function LocaleSelector({
  selectedLocale,
  onSelectedLocaleClick: handleSelectedLocaleClick,
}: ILocaleSelectorProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, DEBOUNCE_DELAY);
  const { backgroundWidth, itemOffsetTop, itemClientHeight, itemRefs } =
    useBackgroundPosition({
      listRef,
      selectedItem: !selectedLocale?.locale ? "ko" : selectedLocale?.locale,
    });
  const { locale } = useLocaleStore();
  const [activeIndex, setActiveIndex] = useState(() =>
    LANGUAGE_LIST().findIndex((lang) => lang.locale === locale.locale)
  );
  const [emblaRef] = useEmblaCarousel(
    {
      loop: false,
      dragFree: true,
      axis: "y",
    },
    [WheelGesturesPlugin()]
  );
  const filteredLanguages = LANGUAGE_LIST().filter(
    (language) =>
      language.originalText
        .toLowerCase()
        .includes(debouncedSearchText.toLowerCase()) ||
      language.koreanText.includes(debouncedSearchText)
  );

  useEffect(() => {
    const index = filteredLanguages.findIndex(
      (lang) => lang.locale === selectedLocale?.locale
    );

    // 필터링된 목록이 비어있다면 인덱스를 -2로 설정
    if (filteredLanguages.length === 0) {
      setActiveIndex(-2);
    }

    if (index === -1) {
      // 필터링된 목록이 비어있지 않다면 첫 번째 항목의 인덱스를 0으로 설정
      if (filteredLanguages.length > 0) {
        setActiveIndex(0);
        handleSelectedLocaleClick(filteredLanguages[0]);
      }
    } else {
      setActiveIndex(index);
    }
  }, [
    debouncedSearchText,
    selectedLocale,
    filteredLanguages,
    activeIndex,
    handleSelectedLocaleClick,
  ]);

  return (
    <div
      className={cn(
        "min-h-120pxr gap-12pxr h-dynamic-screen-60 flex w-full flex-col"
      )}
    >
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        placeholder="Search Language"
      />

      <div
        className={cn(
          "bg-backgroundBlueLight px-16pxr py-12pxr border-grayLighter relative h-full overflow-hidden rounded-2xl border shadow-inner"
        )}
        ref={emblaRef}
      >
        <ul
          className={cn("gap-4pxr flex h-full w-full flex-col")}
          ref={listRef}
        >
          {activeIndex !== -2 && (
            <ModalListItemBackground
              itemOffsetTop={itemOffsetTop}
              itemClientHeight={itemClientHeight}
              backgroundWidth={backgroundWidth}
            />
          )}
          {activeIndex === -2 && (
            <li className={cn("w-full text-center")}>Not Found</li>
          )}
          {filteredLanguages.map((language, index) => {
            return (
              <li
                className={cn("h-40pxr")}
                key={language.locale}
                ref={(el) => {
                  // eslint-disable-next-line no-param-reassign
                  itemRefs.current[index] = {
                    el,
                    name: language.locale,
                  };
                }}
              >
                <LanguageItem
                  language={language}
                  isSelected={selectedLocale?.locale === language.locale}
                  onClick={() => {
                    handleSelectedLocaleClick({
                      ...language,
                    });
                    setActiveIndex(index);
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export { LocaleSelector };
