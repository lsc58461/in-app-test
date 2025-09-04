"use client";

import { useState } from "react";

import { Button } from "@/components/button/button";

import { Modal } from "../modal";

import { NationalitySelector } from "./nationality-selector";
import { ModalHeader } from "../modal-header";

interface IModalNationalitySelectionProps {
  selectedNationality?: string;
  onSelectedNationalityChange?: (nationality: string | undefined) => void;
  onCloseClick: () => void;
}

function ModalNationalitySelection({
  selectedNationality,
  onSelectedNationalityChange: handleSelectedNationalityChange,
  onCloseClick: handleCloseClick,
}: IModalNationalitySelectionProps) {
  const [choiceNationality, setChoiceNationality] = useState<
    string | undefined
  >(handleSelectedNationalityChange ? selectedNationality : undefined);

  const handleSelectedNationalityClick = (detailItem: string | undefined) => {
    setChoiceNationality(detailItem);
  };

  return (
    <Modal>
      <ModalHeader
        text="국가 선택"
        subText="nationality selection"
        onCloseClick={handleCloseClick}
      />
      <NationalitySelector
        selectedNationality={choiceNationality}
        onSelectedNationalityClick={handleSelectedNationalityClick}
      />

      <Button
        variant="primary"
        size="large"
        className="max-w-160pxr w-full"
        onClick={() => {
          if (handleSelectedNationalityChange) {
            handleSelectedNationalityChange(choiceNationality);
            handleCloseClick();
            return;
          }

          handleCloseClick();
        }}
        data-cy="selectNationalityButton"
      >
        선택
      </Button>
    </Modal>
  );
}

export { ModalNationalitySelection };
