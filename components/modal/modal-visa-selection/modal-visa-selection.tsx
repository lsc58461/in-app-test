"use client";

import { useState } from "react";

import { Button } from "@/components/button/button";
import { VisaType } from "@/types/visa";

import { Modal } from "../modal";

import { VisaSelector } from "./visa-selector";

interface IModalVisaSelectionProps {
  type: "current" | "preferred";
  selectedVisa?: VisaType;
  noneText?: "irrelevant" | "none";
  onSelectedVisaChange?: (visa: VisaType | undefined) => void;
  onCloseClick: () => void;
}

function ModalVisaSelection({
  type,
  selectedVisa,
  noneText,
  onSelectedVisaChange,
  onCloseClick: handleCloseClick,
}: IModalVisaSelectionProps) {
  const [choiceVisa, setChoiceVisa] = useState<VisaType | undefined>(
    onSelectedVisaChange ? selectedVisa : undefined
  );

  const handleSelectedVisaClick = (visa: VisaType | undefined) => {
    setChoiceVisa(visa);
  };

  return (
    <Modal>
      <Modal.Header
        text="title.selectVisa"
        subText="Visa selection"
        onCloseClick={handleCloseClick}
      />
      <VisaSelector
        selectedVisa={choiceVisa}
        noneText={noneText}
        onSelectedVisaClick={handleSelectedVisaClick}
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
        button.select
      </Button>
    </Modal>
  );
}

export { ModalVisaSelection };
