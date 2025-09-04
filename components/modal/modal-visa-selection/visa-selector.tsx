"use client";

import { useEffect, useRef, useState } from "react";

import { SearchInput } from "@/components/search-input/search-input";
import { VISA_LIST } from "@/constants/visa-list";
import { useBackgroundPosition } from "@/hooks/use-background-position";
import { useDebounce } from "@/hooks/use-debounce";
import { VisaType } from "@/types/visa";
import { cn } from "@/utils/cn";

import { ModalListItemBackground } from "../modal-list-item-background";

import { VisaItem } from "./visa-item";

const DEBOUNCE_DELAY = 200;

interface IVisaSelectorProps {
  selectedVisa: VisaType | undefined;
  noneText?: "irrelevant" | "none";
  onSelectedVisaClick: (visa: VisaType | undefined) => void;
}

function VisaSelector({
  selectedVisa,
  noneText,
  onSelectedVisaClick: handleSelectedVisaClick,
}: IVisaSelectorProps) {
  const visaList = Object.entries(
    VISA_LIST({
      noneText: noneText === "irrelevant" ? "irrelevant" : "none",
    })
  ).map(([key, value]) => {
    return {
      key,
      ...value,
    };
  });

  const listRef = useRef<HTMLUListElement>(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, DEBOUNCE_DELAY);
  const { backgroundWidth, itemOffsetTop, itemClientHeight, itemRefs } =
    useBackgroundPosition({
      listRef,
      selectedItem: selectedVisa === undefined ? "NONE" : selectedVisa,
    });
  const [activeIndex, setActiveIndex] = useState(() =>
    visaList.findIndex(
      (visa) =>
        visa.abbreviation === selectedVisa ||
        (selectedVisa === undefined && visa.abbreviation === "NONE")
    )
  );

  const filteredVisaList = visaList.filter((visa) => {
    const { name, abbreviation } = visa;
    const lowerCaseSearchText = debouncedSearchText.toLowerCase();

    return (
      name.toLowerCase().includes(lowerCaseSearchText) ||
      abbreviation.toLowerCase().includes(lowerCaseSearchText)
    );
  });

  useEffect(() => {
    const index = filteredVisaList.findIndex(
      (visa) => visa.abbreviation === selectedVisa
    );

    // 필터링된 목록이 비어있다면 인덱스를 -2로 설정
    if (filteredVisaList.length === 0) {
      setActiveIndex(-2);
    }

    if (index === -1) {
      // 필터링된 목록이 비어있지 않다면 첫 번째 항목의 인덱스를 0으로 설정
      if (filteredVisaList.length > 0) {
        setActiveIndex(0);
        handleSelectedVisaClick(filteredVisaList[0].abbreviation);
      }
    } else {
      setActiveIndex(index);
    }
  }, [selectedVisa, filteredVisaList, activeIndex, handleSelectedVisaClick]);

  return (
    <div
      className={cn(
        "min-h-120pxr gap-12pxr h-dynamic-screen-60 flex w-full flex-col"
      )}
    >
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        placeholder={"placeholder.searchVisa"}
      />
      <div
        className={cn(
          "bg-backgroundBlueLight px-16pxr py-12pxr border-grayLighter relative h-full overflow-y-auto rounded-2xl border shadow-inner"
        )}
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
            <li className={cn("w-full text-center")}>{"search.notFound"}</li>
          )}
          {filteredVisaList.map((visa, index) => {
            return (
              <li
                key={visa.abbreviation}
                ref={(el) => {
                  itemRefs.current[index] = {
                    el,
                    name: visa.abbreviation,
                  };
                }}
              >
                <VisaItem
                  visa={visa}
                  isSelected={selectedVisa === visa.abbreviation}
                  onClick={() => {
                    handleSelectedVisaClick(visa.abbreviation);
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

export { VisaSelector };
