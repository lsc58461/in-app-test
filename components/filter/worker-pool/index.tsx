"use client";

import { Button } from "@/components/button/button";
import { Modal } from "@/components/modal/modal";
import { Portal } from "@/components/portal/portal";
import { InternalFilterCategory, SelectedOption } from "@/hooks/use-filter";
import { useModal } from "@/hooks/use-modal";
import { useModalCloseAnimation } from "@/stores/use-modal-close-animation";
import { VisaType } from "@/types/visa";
import { cn } from "@/utils/cn";
import { formateAddress } from "@/utils/formate-address";

import { Filter } from "../filter";

interface IFilterWorkerPoolProps {
  getCategoryById: (id: string) => InternalFilterCategory | undefined;
  handleCheckboxChange: (
    categoryId: string,
    optionId: string | undefined
  ) => void;
  getSelectedOptions: () => SelectedOption[];
  removeModalOption: (categoryId: string, optionId: string) => void;
  reset: () => void;
  closeModal?: () => void;
}

function FilterWorkerPool({
  getCategoryById,
  handleCheckboxChange,
  getSelectedOptions,
  removeModalOption,
  reset,
  closeModal,
}: IFilterWorkerPoolProps) {
  const { isAnimating, setIsAnimating } = useModalCloseAnimation();
  const {
    dimRef: areaDimRef,
    isModalOpen: isAreaModalOpen,
    openModal: openAreaModal,
    closeModal: closeAreaModal,
  } = useModal();
  const {
    dimRef: nationalityDimRef,
    isModalOpen: isNationalityModalOpen,
    openModal: openNationalityModal,
    closeModal: closeNationalityModal,
  } = useModal();
  const {
    dimRef: currentVisaDimRef,
    isModalOpen: isCurrentVisaModalOpen,
    openModal: openCurrentVisaModal,
    closeModal: closeCurrentVisaModal,
  } = useModal();
  const {
    dimRef: preferredVisaDimRef,
    isModalOpen: isPreferredVisaModalOpen,
    openModal: openPreferredVisaModal,
    closeModal: closePreferredVisaModal,
  } = useModal();

  return (
    <Filter.Wrapper onClose={closeModal}>
      <Filter.Title>필터</Filter.Title>
      <Filter.Container>
        <Filter.ModalTrigger
          title={getCategoryById("residence")?.label || ""}
          categoryId="residence"
          getSelectedOptions={getSelectedOptions}
          onModalOpen={openAreaModal}
          onRemove={removeModalOption}
          isHr
        />
        <Portal id="portal2" isPortalOpen={isAreaModalOpen} zIndex={9803}>
          <Modal.Dim dimRef={areaDimRef} onDimClick={closeAreaModal}>
            <Modal.AddressSearch
              onSelectedAddressChange={(address) => {
                handleCheckboxChange(
                  "residence",
                  formateAddress({
                    region1: address?.region1,
                    region2: address?.region2,
                    region3: address?.region3,
                  }) || ""
                );
              }}
              onCloseClick={closeAreaModal}
            />
          </Modal.Dim>
        </Portal>
        <Filter.ModalTrigger
          title={getCategoryById("nationality")?.label || ""}
          categoryId="nationality"
          getSelectedOptions={getSelectedOptions}
          onModalOpen={openNationalityModal}
          onRemove={removeModalOption}
          isHr
        />
        <Portal
          id="portal2"
          isPortalOpen={isNationalityModalOpen}
          zIndex={9803}
        >
          <Modal.Dim
            dimRef={nationalityDimRef}
            onDimClick={closeNationalityModal}
          >
            <Modal.NationalitySelection
              onSelectedNationalityChange={(nationality) => {
                handleCheckboxChange("nationality", nationality);
              }}
              onCloseClick={closeNationalityModal}
            />
          </Modal.Dim>
        </Portal>
        <Filter.ModalTrigger
          title={getCategoryById("currentVisaType")?.label || ""}
          categoryId="currentVisaType"
          getSelectedOptions={getSelectedOptions}
          onModalOpen={openCurrentVisaModal}
          onRemove={removeModalOption}
          isHr
          isNoVisaInfo
        />
        <Portal
          id="portal2"
          isPortalOpen={isCurrentVisaModalOpen}
          zIndex={9803}
        >
          <Modal.Dim
            dimRef={currentVisaDimRef}
            onDimClick={closeCurrentVisaModal}
          >
            <Modal.VisaCheckboxSelection
              onCloseClick={closeCurrentVisaModal}
              onSelectedVisaChange={(visa) => {
                getSelectedOptions()
                  .filter((option) => option.categoryId === "currentVisaType")
                  .forEach((option) => {
                    removeModalOption(
                      "currentVisaType",
                      option.optionId as string
                    );
                  });

                visa?.forEach((option) => {
                  if (option === "NA") return;
                  handleCheckboxChange("currentVisaType", option);
                });
              }}
              selectedVisa={
                getSelectedOptions()
                  .filter((option) => option.categoryId === "currentVisaType")
                  .map((option) => option.optionId) as VisaType[] | undefined
              }
              isNone
            />
          </Modal.Dim>
        </Portal>

        <Filter.ModalTrigger
          title={getCategoryById("preferredVisaType")?.label || ""}
          categoryId="preferredVisaType"
          getSelectedOptions={getSelectedOptions}
          onModalOpen={openPreferredVisaModal}
          onRemove={removeModalOption}
          isHr
          isNoVisaInfo
        />
        <Portal
          id="portal2"
          isPortalOpen={isPreferredVisaModalOpen}
          zIndex={9803}
        >
          <Modal.Dim
            dimRef={preferredVisaDimRef}
            onDimClick={closePreferredVisaModal}
          >
            <Modal.VisaCheckboxSelection
              onCloseClick={closePreferredVisaModal}
              onSelectedVisaChange={(visa) => {
                getSelectedOptions()
                  .filter((option) => option.categoryId === "preferredVisaType")
                  .forEach((option) => {
                    removeModalOption(
                      "preferredVisaType",
                      option.optionId as string
                    );
                  });

                visa?.forEach((option) => {
                  if (option === "NA") return;
                  handleCheckboxChange("preferredVisaType", option);
                });
              }}
              selectedVisa={
                getSelectedOptions()
                  .filter((option) => option.categoryId === "preferredVisaType")
                  .map((option) => option.optionId) as VisaType[] | undefined
              }
              isNone
            />
          </Modal.Dim>
        </Portal>

        <Filter.Accordion
          categoryId="education"
          title={getCategoryById("education")?.label || ""}
          items={getCategoryById("education")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isHr
          initialOpen={getCategoryById("education")?.options.some(
            (option) => option.checked
          )}
        />
        <Filter.Accordion
          categoryId="gender"
          title={getCategoryById("gender")?.label || ""}
          items={getCategoryById("gender")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isHr
          initialOpen={getCategoryById("gender")?.options.some(
            (option) => option.checked
          )}
        />
        <Filter.Accordion
          categoryId="overtime"
          title={getCategoryById("overtime")?.label || ""}
          items={getCategoryById("overtime")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isHr
          initialOpen={getCategoryById("overtime")?.options.some(
            (option) => option.checked
          )}
        />
        <Filter.Accordion
          categoryId="isRelocate"
          title={getCategoryById("isRelocate")?.label || ""}
          items={getCategoryById("isRelocate")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isHr
          initialOpen={getCategoryById("isRelocate")?.options.some(
            (option) => option.checked
          )}
        />
        <Filter.Accordion
          categoryId="etc"
          title={getCategoryById("etc")?.label || ""}
          items={getCategoryById("etc")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isHr
          initialOpen={getCategoryById("etc")?.options.some(
            (option) => option.checked
          )}
        />
        <Filter.Accordion
          categoryId="updatedAt"
          title={getCategoryById("updatedAt")?.label || ""}
          items={getCategoryById("updatedAt")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isLast
          initialOpen={getCategoryById("updatedAt")?.options.some(
            (option) => option.checked
          )}
        />
      </Filter.Container>
      <Filter.Summary
        onRemoveModalOption={removeModalOption}
        selectedOptions={getSelectedOptions()}
        onRemove={handleCheckboxChange}
        onReset={reset}
      />
      <div
        className={cn(
          "border-t-blueLighter p-20pxr hidden h-fit shrink-0 border-t bg-white",
          "max800:block"
        )}
      >
        <Button
          className="w-full"
          variant="primary"
          size="large"
          onClick={() => {
            if (!closeModal) return;

            setIsAnimating([true, isAnimating[1]]);
            setTimeout(() => {
              closeModal();
              setIsAnimating([false, isAnimating[1]]);
            }, 190);
          }}
        >
          적용
        </Button>
      </div>
    </Filter.Wrapper>
  );
}

export { FilterWorkerPool };
