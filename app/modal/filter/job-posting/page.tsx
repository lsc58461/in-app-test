"use client";

import { FilterFloatingButton } from "@/components/filter/filter-floating-button";
import { jobPostingInitialCategories } from "@/components/filter/job-posting/job-posting-initial-categories";
import { Modal } from "@/components/modal/modal";
import { Portal } from "@/components/portal/portal";
import { useFilter } from "@/hooks/use-filter";
import { useModal } from "@/hooks/use-modal";

function FilterModal() {
  const {
    isModalOpen: isFilterModal,
    openModal: openFilterModal,
    closeModal: closeFilterModal,
  } = useModal();
  const {
    handleCheckboxChange,
    getSelectedOptions,
    getCategoryById,
    removeModalOption,
    reset,
  } = useFilter(jobPostingInitialCategories());

  return (
    <div>
      <FilterFloatingButton onButtonClick={openFilterModal} />
      <Portal id="portal1" isPortalOpen={isFilterModal}>
        <Modal.Filter
          type="jobPosting"
          getCategoryById={getCategoryById}
          handleCheckboxChange={handleCheckboxChange}
          getSelectedOptions={getSelectedOptions}
          removeModalOption={removeModalOption}
          reset={reset}
          closeModal={closeFilterModal}
        />
      </Portal>
    </div>
  );
}

export default FilterModal;
