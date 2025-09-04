"use client";

import { useState } from "react";

import { Button } from "@/components/button/button";
import { VisaType } from "@/types/visa";

import { Modal } from "../modal";

import { VisaCheckboxSelector } from "./visa-checkbox-selector";
import { ModalHeader } from "../modal-header";

interface IModalVisaSelectionProps {
  selectedVisa?: (VisaType | "NA")[];
  onSelectedVisaChange?: (visa: (VisaType | "NA")[] | undefined) => void;
  onCloseClick: () => void;
  isNone?: boolean;
}

function ModalVisaCheckboxSelection({
  selectedVisa,
  onSelectedVisaChange,
  onCloseClick: handleCloseClick,
  isNone,
}: IModalVisaSelectionProps) {
  const [choiceVisa, setChoiceVisa] = useState<(VisaType | "NA")[] | undefined>(
    onSelectedVisaChange ? selectedVisa : undefined
  );

  const handleSelectedVisaClick = (visa: (VisaType | "NA")[] | undefined) => {
    setChoiceVisa(visa);
  };

  return (
    <Modal>
      <ModalHeader
        text="title.selectVisa"
        subText="Visa selection"
        onCloseClick={handleCloseClick}
      />
      <VisaCheckboxSelector
        selectedVisa={choiceVisa}
        onSelectedVisaClick={handleSelectedVisaClick}
        isNone={isNone}
      />
      <Button
        variant="primary"
        size="large"
        className="max-w-160pxr w-full"
        onClick={() => {
          if (onSelectedVisaChange) {
            onSelectedVisaChange(choiceVisa);
            handleCloseClick();
            return;
          }

          handleCloseClick();
        }}
      >
        {"button.select"}
      </Button>
    </Modal>
  );
}

export { ModalVisaCheckboxSelection };
