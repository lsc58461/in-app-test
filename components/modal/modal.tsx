"use client";

import { EmblaViewportRefType } from "embla-carousel-react";
import { ReactNode, RefObject } from "react";

import { cn } from "@/utils/cn";

import { ModalAddressSearch } from "./modal-address-search/modal-address-search";

import { ModalDim } from "./modal-dim";
import { ModalFilter } from "./modal-filter/modal-filter";
import { ModalHeader } from "./modal-header";
import { ModalListItemBackground } from "./modal-list-item-background";
import { ModalNationalitySelection } from "./modal-nationality-selection/modal-nationality-selection";
import { ModalResponsibilitySelection } from "./modal-responsibility-selection/modal-responsibility-selection";
import { ModalVisaCheckboxSelection } from "./modal-visa-checkbox-selection/modal-visa-checkbox-selection";
import { ModalVisaSelection } from "./modal-visa-selection/modal-visa-selection";

interface IModalWrapperProps {
  className?: string;
  subClassName?: string;
  modalRef?: RefObject<HTMLDivElement | null> | EmblaViewportRefType;
  children: ReactNode;
}

function Modal({
  className,
  subClassName,
  modalRef,
  children,
}: IModalWrapperProps) {
  return (
    <div
      ref={modalRef}
      className={cn(
        "p-32pxr shadow-gray4 mb:p-20pxr isolate w-full overflow-hidden rounded-4xl bg-white",
        className
      )}
    >
      <div
        className={cn(
          "gap-28pxr max-h-dynamic-screen-80 flex flex-col items-center",
          "max700:gap-22pxr",
          "mb:gap-12pxr",
          subClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}

Modal.Dim = ModalDim;
Modal.Header = ModalHeader;
Modal.ListItemBackground = ModalListItemBackground;
Modal.VisaSelection = ModalVisaSelection;
Modal.AddressSearch = ModalAddressSearch;
Modal.NationalitySelection = ModalNationalitySelection;
Modal.Filter = ModalFilter;
Modal.ResponsibilitySelection = ModalResponsibilitySelection;
Modal.VisaCheckboxSelection = ModalVisaCheckboxSelection;

export { Modal };
