"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { Button } from "@/components/button/button";
import { Language } from "@/constants/language-list";
import { cn } from "@/utils/cn";

import { Modal } from "../modal";
import { ModalHeader } from "../modal-header";

import { LocaleSelector } from "./locale-selector";
import Link from "next/link";

interface IModalLanguageSelectionProps {
  locale?: Language;
  onLocaleChange: (locale: Language | undefined) => void;
  onCloseClick: () => void;
  isGlobal?: boolean;
}

function ModalLanguageSelection({
  locale,
  onLocaleChange: handleLocaleChange,
  onCloseClick: handleCloseClick,
  isGlobal = false,
}: IModalLanguageSelectionProps) {
  const searchParams = useSearchParams();
  const [selectedLocale, setSelectedLocale] = useState<Language | undefined>(
    locale
  );

  const handleSelectedLocaleClick = (lo: Language) => {
    setSelectedLocale({ ...lo });
  };

  const queryString = useMemo(() => {
    const params = new URLSearchParams(searchParams);

    return params.toString();
  }, [searchParams]);

  return (
    <Modal>
      <ModalHeader
        text="Select Language"
        subText="Language selection"
        onCloseClick={handleCloseClick}
      />
      <LocaleSelector
        selectedLocale={selectedLocale}
        onSelectedLocaleClick={handleSelectedLocaleClick}
      />
      {isGlobal ? (
        <Link
          className={cn("flex w-full justify-center")}
          locale={selectedLocale?.locale}
          href={`${queryString ? `?${queryString}` : ""}`}
        >
          <Button
            variant="primary"
            size="large"
            className={cn("max-w-160pxr w-full")}
            onClick={() => {
              handleLocaleChange(selectedLocale);
              handleCloseClick();
            }}
          >
            Select
          </Button>
        </Link>
      ) : (
        <Button
          variant="primary"
          size="large"
          className={cn("max-w-160pxr w-full")}
          onClick={() => {
            handleLocaleChange(selectedLocale);
            handleCloseClick();
          }}
        >
          Select
        </Button>
      )}
    </Modal>
  );
}

export { ModalLanguageSelection };
