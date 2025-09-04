"use client";

import { useEffect, useRef, useState } from "react";

import { SearchInput } from "@/components/search-input/search-input";
import {
  TResponsibility,
  responsibilityList,
} from "@/constants/responsibility-list";
import { useBackgroundPosition } from "@/hooks/use-background-position";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/utils/cn";

import { ModalListItemBackground } from "../modal-list-item-background";

import { ResponsibilityItem } from "./responsibility-item";

const DEBOUNCE_DELAY = 200;

interface IResponsibilitySelectorProps {
  selectedResponsibility: TResponsibility | null | undefined;
  onSelectedResponsibilityClick: (responsibility: TResponsibility) => void;
}

function ResponsibilitySelector({
  selectedResponsibility,
  onSelectedResponsibilityClick: handleSelectedResponsibilityClick,
}: IResponsibilitySelectorProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, DEBOUNCE_DELAY);
  const { backgroundWidth, itemOffsetTop, itemClientHeight, itemRefs } =
    useBackgroundPosition({
      listRef,
      selectedItem: !selectedResponsibility
        ? "서비스/판매"
        : selectedResponsibility,
    });

  const [activeIndex, setActiveIndex] = useState(() =>
    responsibilityList().findIndex(
      (responsibility) => responsibility.value === selectedResponsibility
    )
  );

  const filteredResponsibility = responsibilityList().filter(
    (responsibility) =>
      responsibility.text
        .toLowerCase()
        .includes(debouncedSearchText.toLowerCase()) ||
      responsibility.text.includes(debouncedSearchText)
  );

  useEffect(() => {
    const index = filteredResponsibility.findIndex(
      (responsibility) => responsibility.value === selectedResponsibility
    );

    // 필터링된 목록이 비어있다면 인덱스를 -2로 설정
    if (filteredResponsibility.length === 0) {
      setActiveIndex(-2);
    }

    if (index === -1) {
      // 필터링된 목록이 비어있지 않다면 첫 번째 항목의 인덱스를 0으로 설정
      if (filteredResponsibility.length > 0) {
        setActiveIndex(0);
        handleSelectedResponsibilityClick(filteredResponsibility[0].value);
      }
    } else {
      setActiveIndex(index);
    }
  }, [
    debouncedSearchText,
    activeIndex,
    handleSelectedResponsibilityClick,
    filteredResponsibility,
    selectedResponsibility,
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
        placeholder={"placeholder.searchResponsibility"}
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
            <li className={cn("w-full text-center")}>search.notFound</li>
          )}
          {filteredResponsibility.map((responsibility, index) => {
            return (
              <li
                key={responsibility.value}
                ref={(el) => {
                  itemRefs.current[index] = {
                    el,
                    name: responsibility.value,
                  };
                }}
              >
                <ResponsibilityItem
                  responsibility={responsibility.text}
                  isSelected={selectedResponsibility === responsibility.value}
                  onClick={() => {
                    handleSelectedResponsibilityClick(responsibility.value);
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

export { ResponsibilitySelector };
