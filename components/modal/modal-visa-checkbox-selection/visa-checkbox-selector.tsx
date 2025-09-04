"use client";

import { useRef, useState } from "react";

import { SearchInput } from "@/components/search-input/search-input";
import { VISA_LIST } from "@/constants/visa-list";
import { useDebounce } from "@/hooks/use-debounce";
import { VisaType } from "@/types/visa";
import { cn } from "@/utils/cn";

import { VisaCheckBoxItem } from "./visa-checkbox-item";

const DEBOUNCE_DELAY = 200;

interface IVisaCheckboxSelectorProps {
  selectedVisa: (VisaType | "NA")[] | undefined;
  onSelectedVisaClick: (visa: (VisaType | "NA")[]) => void;
  isNone?: boolean;
}

function VisaCheckboxSelector({
  selectedVisa,
  onSelectedVisaClick: handleSelectedVisaClick,
  isNone,
}: IVisaCheckboxSelectorProps) {
  const visaEntries = Object.entries(VISA_LIST({ noneText: "irrelevant" })).map(
    ([key, value]) => {
      return {
        key,
        ...value,
      };
    }
  );

  const visaList: {
    name: string;
    abbreviation: VisaType | "NA";
    visaCode: string | "NA";
    key: string;
  }[] = isNone
    ? [
        {
          name: "label.irrelevant",
          abbreviation: "NA",
          visaCode: "NA",
          key: "NA",
        },
        {
          name: "label.noVisaInfo",
          abbreviation: "NONE",
          visaCode: "NONE",
          key: "NONE",
        },

        ...visaEntries.slice(1),
      ]
    : visaEntries;

  const listRef = useRef<HTMLUListElement>(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, DEBOUNCE_DELAY);

  const filteredVisaList = visaList.filter((visa) => {
    const { name, abbreviation } = visa;
    const lowerCaseSearchText = debouncedSearchText.toLowerCase();

    return (
      name.toLowerCase().includes(lowerCaseSearchText) ||
      abbreviation.toLowerCase().includes(lowerCaseSearchText)
    );
  });

  const handleVisaClick = (abbreviation: VisaType | "NA") => {
    const newSelectedVisa = selectedVisa || [];
    const isSelected = newSelectedVisa.includes(abbreviation);

    let updatedSelection: (VisaType | "NA")[];

    if (isNone) {
      if (isSelected) {
        updatedSelection = newSelectedVisa.filter(
          (visa) => visa !== abbreviation
        );
      } else if (abbreviation === "NA") {
        // NA 선택 시 다른 모든 선택 해제
        updatedSelection = ["NA"];
      } else if (newSelectedVisa.includes("NA")) {
        // NA 선택 해제
        updatedSelection = [abbreviation];
      } else {
        updatedSelection = [...newSelectedVisa, abbreviation];
      }
    } else {
      if (isSelected) {
        updatedSelection = newSelectedVisa.filter(
          (visa) => visa !== abbreviation
        );
      } else if (abbreviation === "NONE") {
        // NONE 선택 시 다른 모든 선택 해제
        updatedSelection = ["NONE"];
      } else if (
        newSelectedVisa.includes("NONE" as VisaType) &&
        abbreviation !== ("NONE" as VisaType)
      ) {
        // NONE 선택 해제
        updatedSelection = [abbreviation];
      } else {
        updatedSelection = [...newSelectedVisa, abbreviation];
      }
    }

    handleSelectedVisaClick(updatedSelection);
  };

  return (
    <div
      className={cn(
        "min-h-120pxr gap-12pxr h-dynamic-screen-60 flex w-full flex-col"
      )}
    >
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        placeholder="placeholder.searchVisa"
      />
      <div
        className={cn(
          "bg-backgroundBlueLight px-16pxr py-12pxr border-grayLighter relative h-full overflow-y-auto rounded-xl border shadow-inner"
        )}
      >
        <ul
          className={cn("gap-4pxr flex h-full w-full flex-col")}
          ref={listRef}
        >
          {filteredVisaList.length === 0 && (
            <li className={cn("w-full text-center")}>{"search.notFound"}</li>
          )}
          {filteredVisaList.map((visa) => {
            const isSelected =
              selectedVisa?.includes(visa.abbreviation) || false;

            return (
              <li key={visa.abbreviation}>
                <VisaCheckBoxItem
                  visa={visa}
                  isSelected={isSelected}
                  onClick={() => handleVisaClick(visa.abbreviation)}
                  isNone={isNone}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export { VisaCheckboxSelector };
