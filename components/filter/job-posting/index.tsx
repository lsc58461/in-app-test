"use client";

import { Button } from "@/components/button/button";
import { Modal } from "@/components/modal/modal";
import { Portal } from "@/components/portal/portal";
import { TimeRangeSlider } from "@/components/time-range-slider/time-range-slider";
import { InternalFilterCategory, SelectedOption } from "@/hooks/use-filter";
import { useModal } from "@/hooks/use-modal";
import { useModalCloseAnimation } from "@/stores/use-modal-close-animation";
import { useTimeRangeStore } from "@/stores/use-time-range-store";
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

function FilterJobPosting({
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
    dimRef: responsibilityDimRef,
    isModalOpen: isResponsibilityModalOpen,
    openModal: openResponsibilityModal,
    closeModal: closeResponsibilityModal,
  } = useModal();
  const {
    dimRef: preferredVisaDimRef,
    isModalOpen: isPreferredVisaModalOpen,
    openModal: openPreferredVisaModal,
    closeModal: closePreferredVisaModal,
  } = useModal();
  const { range, setRange } = useTimeRangeStore();

  return (
    <Filter.Wrapper onClose={closeModal}>
      <Filter.Title>Filter</Filter.Title>
      <Filter.Container>
        <Filter.Accordion
          categoryId="jobPostingType"
          title={getCategoryById("jobPostingType")?.label || ""}
          items={getCategoryById("jobPostingType")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isHr
          initialOpen={getCategoryById("jobPostingType")?.options.some(
            (option) => option.checked
          )}
        />

        <Filter.ModalTrigger
          title={getCategoryById("residence")?.label || ""}
          categoryId="residence"
          getSelectedOptions={getSelectedOptions}
          onModalOpen={openAreaModal}
          onRemove={removeModalOption}
          isHr
        />
        <Portal id="portal2" isPortalOpen={isAreaModalOpen} zIndex={9802}>
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
          title={getCategoryById("responsibility")?.label || ""}
          categoryId="responsibility"
          getSelectedOptions={getSelectedOptions}
          onModalOpen={openResponsibilityModal}
          onRemove={removeModalOption}
          isHr
        />
        <Portal
          id="portal2"
          isPortalOpen={isResponsibilityModalOpen}
          zIndex={9802}
        >
          <Modal.Dim
            dimRef={responsibilityDimRef}
            onDimClick={closeResponsibilityModal}
          >
            <Modal.ResponsibilitySelection
              onSelectedResponsibilityChange={(responsibility) => {
                handleCheckboxChange(
                  "responsibility",
                  responsibility || undefined
                );
              }}
              onCloseClick={closeResponsibilityModal}
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
        />
        <Portal
          id="portal2"
          isPortalOpen={isPreferredVisaModalOpen}
          zIndex={9802}
        >
          <Modal.Dim
            dimRef={preferredVisaDimRef}
            onDimClick={closePreferredVisaModal}
          >
            <Modal.VisaSelection
              type="preferred"
              onCloseClick={closePreferredVisaModal}
              onSelectedVisaChange={(visa) => {
                handleCheckboxChange("preferredVisaType", visa);
              }}
              selectedVisa={
                getSelectedOptions().find(
                  (option) => option.categoryId === "preferredVisaType"
                )?.optionId as VisaType | undefined
              }
              noneText="irrelevant"
            />
          </Modal.Dim>
        </Portal>

        <Filter.Accordion
          categoryId="jobType"
          title={getCategoryById("jobType")?.label || ""}
          items={getCategoryById("jobType")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isHr
          initialOpen={getCategoryById("jobType")?.options.some(
            (option) => option.checked
          )}
        />

        <Filter.Accordion
          categoryId="jobCategory"
          title={getCategoryById("jobCategory")?.label || ""}
          items={getCategoryById("jobCategory")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isHr
          initialOpen={getCategoryById("jobCategory")?.options.some(
            (option) => option.checked
          )}
        />

        <Filter.Accordion
          categoryId="workDays"
          title={getCategoryById("workDays")?.label || ""}
          items={getCategoryById("workDays")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isHr
          initialOpen={getCategoryById("workDays")?.options.some(
            (option) => option.checked
          )}
        />

        <Filter.Accordion
          categoryId="workHours"
          title="Weekly Working Hours"
          isHr
          initialOpen={false}
        >
          <TimeRangeSlider
            range={range}
            setRange={setRange}
            initialRange={[10, 35]}
            min={10}
            max={35}
            interval={5}
          />
        </Filter.Accordion>

        <Filter.Accordion
          categoryId="pay"
          title={getCategoryById("pay")?.label || ""}
          items={getCategoryById("pay")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isHr
          initialOpen={getCategoryById("pay")?.options.some(
            (option) => option.checked
          )}
        />

        <Filter.Accordion
          categoryId="isVisaSupport"
          title={getCategoryById("isVisaSupport")?.label || ""}
          items={getCategoryById("isVisaSupport")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isHr
          initialOpen={getCategoryById("isVisaSupport")?.options.some(
            (option) => option.checked
          )}
        />

        <Filter.Accordion
          categoryId="availableWorkVisas"
          title={getCategoryById("availableWorkVisas")?.label || ""}
          items={getCategoryById("availableWorkVisas")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isHr
          initialOpen={getCategoryById("availableWorkVisas")?.options.some(
            (option) => option.checked
          )}
        />

        <Filter.Accordion
          categoryId="etc"
          title={getCategoryById("etc")?.label || ""}
          items={getCategoryById("etc")?.options || []}
          onCheckedChange={handleCheckboxChange}
          isLast
          initialOpen={getCategoryById("etc")?.options.some(
            (option) => option.checked
          )}
        />
      </Filter.Container>

      <Filter.Summary
        onRemoveModalOption={removeModalOption}
        selectedOptions={[
          ...getSelectedOptions(),
          ...(range[0] && range[0] !== 10
            ? [
                {
                  categoryId: "startWorkHour",
                  optionId: "startWorkHour",
                  label: `${"Minimum"} ${"Hours"} ${range[0]}`,
                },
              ]
            : []),
          ...(range[1] && range[1] !== 35
            ? [
                {
                  categoryId: "endWorkHour",
                  optionId: "endWorkHour",
                  label: `${"Maximum"} ${"Hours"} ${range[1]}`,
                },
              ]
            : []),
        ]}
        onRemove={(categoryId, optionId) => {
          handleCheckboxChange(categoryId, optionId);

          if (categoryId === "startWorkHour") {
            setRange([10, range[1]]);
          }

          if (categoryId === "endWorkHour") {
            setRange([range[0], 35]);
          }
        }}
        onReset={() => {
          reset();
          setRange([10, 35]);
        }}
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

export { FilterJobPosting };
