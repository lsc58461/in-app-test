"use client";

import { useState } from "react";

import { Button } from "@/components/button/button";
import { IResidence, useResumeStore } from "@/stores/use-resume-store";

import { Modal } from "../modal";

import { AddressSearch } from "./address-search";
import { ModalHeader } from "../modal-header";

interface IModalAddressSearchProps {
  selectedAddress?: IResidence;
  isFullAddress?: boolean;
  onSelectedAddressChange?: (address: IResidence | undefined) => void;
  onCloseClick: () => void;
}

function ModalAddressSearch({
  selectedAddress,
  isFullAddress,
  onSelectedAddressChange: handleSelectedAddressChange,
  onCloseClick: handleCloseClick,
}: IModalAddressSearchProps) {
  const { resume, setResume } = useResumeStore();
  const [choiceAddress, setChoiceAddress] = useState<IResidence | undefined>(
    handleSelectedAddressChange ? selectedAddress : resume.residence
  );

  const handleSelectedAddressClick = (address: IResidence) => {
    setChoiceAddress(address);
  };

  return (
    <Modal>
      <ModalHeader
        text="Search for Addresses"
        subText="Search for Addresses"
        onCloseClick={handleCloseClick}
      />
      <AddressSearch
        selectedAddress={choiceAddress?.addressName || ""}
        isFullAddress={isFullAddress}
        onSelectedAddressClick={handleSelectedAddressClick}
      />
      <Button
        variant="primary"
        size="large"
        className="max-w-160pxr w-full"
        onClick={() => {
          if (handleSelectedAddressChange) {
            handleSelectedAddressChange(choiceAddress);
            handleCloseClick();
            return;
          }

          setResume({
            ...resume,
            residence: choiceAddress,
            updatedAt: new Date(),
          });
          handleCloseClick();
        }}
        data-cy="selectAddressButton"
      >
        Select
      </Button>
    </Modal>
  );
}

export { ModalAddressSearch };
