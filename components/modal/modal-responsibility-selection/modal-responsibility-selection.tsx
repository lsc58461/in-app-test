"use client";

import { useState } from "react";

import { Button } from "@/components/button/button";
import { TResponsibility } from "@/constants/responsibility-list";
import { useJobPostingStore } from "@/stores/use-job-posting-store";
import { useLoadingStore } from "@/stores/use-loading-store";

import { Modal } from "../modal";

import { ResponsibilitySelector } from "./responsibility-selector";

interface IModalResponsibilitySelectionProps {
  selectedResponsibility?: TResponsibility;
  onSelectedResponsibilityChange?: (
    responsibility: TResponsibility | undefined
  ) => void;
  onCloseClick: () => void;
}

function ModalResponsibilitySelection({
  selectedResponsibility,
  onSelectedResponsibilityChange,
  onCloseClick: handleCloseClick,
}: IModalResponsibilitySelectionProps) {
  const { jobPosting, setJobPosting } = useJobPostingStore();
  const [choiceResponsibility, setChoiceResponsibility] = useState<
    TResponsibility | undefined
  >(
    onSelectedResponsibilityChange
      ? selectedResponsibility
      : jobPosting.responsibility || undefined
  );
  const { onLoading } = useLoadingStore();

  const handleSelectedResponsibilityClick = (
    clickedResponsibility: TResponsibility
  ) => {
    setChoiceResponsibility(clickedResponsibility);
  };

  const handleLoading = () => {
    onLoading(1000);
  };

  return (
    <Modal>
      <Modal.Header
        text="업무내용"
        subText="responsibility selection"
        onCloseClick={handleCloseClick}
      />
      <ResponsibilitySelector
        selectedResponsibility={choiceResponsibility}
        onSelectedResponsibilityClick={handleSelectedResponsibilityClick}
      />

      <Button
        variant="primary"
        size="large"
        className="max-w-160pxr w-full"
        onClick={() => {
          if (onSelectedResponsibilityChange) {
            onSelectedResponsibilityChange(choiceResponsibility);
            handleCloseClick();
            return;
          }

          setJobPosting({
            ...jobPosting,
            responsibility: choiceResponsibility,
            updatedAt: new Date(),
          });
          handleLoading();
        }}
      >
        선택
      </Button>
    </Modal>
  );
}

export { ModalResponsibilitySelection };
