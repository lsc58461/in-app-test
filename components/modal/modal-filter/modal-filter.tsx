"use client";

import { FilterJobPosting } from "@/components/filter/job-posting";
import { FilterWorkerPool } from "@/components/filter/worker-pool";
import { InternalFilterCategory, SelectedOption } from "@/hooks/use-filter";
import { useModalCloseAnimation } from "@/stores/use-modal-close-animation";
import { cn } from "@/utils/cn";

interface IModalFilterProps {
  type: "workerPool" | "jobPosting";
  getCategoryById: (id: string) => InternalFilterCategory | undefined;
  handleCheckboxChange: (
    categoryId: string,
    optionId: string | undefined
  ) => void;
  getSelectedOptions: () => SelectedOption[];
  removeModalOption: (categoryId: string, optionId: string) => void;
  reset: () => void;
  closeModal: () => void;
}

function ModalFilter({
  type,
  getCategoryById,
  handleCheckboxChange,
  getSelectedOptions,
  removeModalOption,
  reset,
  closeModal,
}: IModalFilterProps) {
  const { isAnimating } = useModalCloseAnimation();

  const renderFilter = () => {
    switch (type) {
      case "workerPool":
        return (
          <FilterWorkerPool
            getCategoryById={getCategoryById}
            handleCheckboxChange={handleCheckboxChange}
            getSelectedOptions={getSelectedOptions}
            removeModalOption={removeModalOption}
            reset={reset}
            closeModal={closeModal}
          />
        );
      case "jobPosting":
        return (
          <FilterJobPosting
            getCategoryById={getCategoryById}
            handleCheckboxChange={handleCheckboxChange}
            getSelectedOptions={getSelectedOptions}
            removeModalOption={removeModalOption}
            reset={reset}
            closeModal={closeModal}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "inset-0pxr animate-modalSlideUp fixed z-9802 flex flex-col",
        isAnimating[0] && "animate-modalSlideDown!"
      )}
    >
      {renderFilter()}
    </div>
  );
}

export { ModalFilter };
