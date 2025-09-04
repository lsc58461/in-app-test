"use client";

import { Crosshair } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "@/components/button/button";
import { SearchInput } from "@/components/search-input/search-input";
import { useAddressSearch } from "@/hooks/use-address-search";
import { useBackgroundPosition } from "@/hooks/use-background-position";
import { useDebounce } from "@/hooks/use-debounce";
import { IResidence } from "@/stores/use-resume-store";
import { cn } from "@/utils/cn";
import { debounce } from "@/utils/debounce";
import {
  getCurrentPositionWithRetry,
  handleGeolocationError,
} from "@/utils/geolocation";

import { ModalListItemBackground } from "../modal-list-item-background";

import { AddressItem } from "./address-item";
import { toast } from "react-toastify";

const DEBOUNCE_DELAY = 200;

interface IAddressSearchProps {
  selectedAddress: string | undefined;
  isFullAddress?: boolean;
  onSelectedAddressClick: (address: IResidence) => void;
}

function AddressSearch({
  selectedAddress,
  isFullAddress = false,
  onSelectedAddressClick: handleSelectedAddressClick,
}: IAddressSearchProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, DEBOUNCE_DELAY);

  const [isGeoLoading, setIsGeoLoading] = useState(false);

  const {
    backgroundWidth,
    itemOffsetTop,
    itemClientHeight,
    itemRefs,
    updateBackgroundWidth,
  } = useBackgroundPosition({
    listRef,
    selectedItem: selectedAddress,
  });
  const addressData = useAddressSearch({ searchText: debouncedSearchText });

  const [activeIndex, setActiveIndex] = useState(-3);

  const handleAddressClick = (address: IResidence, index: number) => {
    handleSelectedAddressClick(address);
    setActiveIndex(index);
  };

  const handleGeolocationClick = useCallback(() => {
    try {
      setIsGeoLoading(true);
      const geocoder = new kakao.maps.services.Geocoder();

      // 위치 정보 가져오기 성공 콜백
      const successCallback = (position: GeolocationPosition) => {
        const coord = new kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        geocoder.coord2Address(
          coord.getLng(),
          coord.getLat(),
          (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = isFullAddress
                ? result[0].road_address?.address_name ||
                  result[0].address.address_name ||
                  ""
                : `${
                    result[0].road_address?.region_1depth_name ||
                    result[0].address?.region_1depth_name
                  }`;

              setSearchText(address);
            } else {
              toast.error("주소를 찾을 수 없습니다.");
            }
            setIsGeoLoading(false);
          }
        );
      };

      // 공통 유틸 함수 사용
      getCurrentPositionWithRetry({
        onSuccess: successCallback,
        onError: (error) => {
          setIsGeoLoading(false);
          handleGeolocationError(error);
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "kakao is not defined") {
          toast.error("카카오맵을 찾을 수 없습니다.");
        } else {
          toast.error("알 수 없는 오류가 발생했습니다.");
        }
      } else {
        toast.error("알 수 없는 오류가 발생했습니다.");
      }
      setIsGeoLoading(false);
    }
  }, [isFullAddress]);

  const debouncedGeolocationClick = useMemo(
    () => debounce(handleGeolocationClick, 800),
    [handleGeolocationClick]
  );

  useEffect(() => {
    updateBackgroundWidth();
    if (!searchText) {
      setActiveIndex(-3);
      return;
    }

    const index = addressData.findIndex(
      (address) => address.addressName === selectedAddress
    );

    if (addressData.length === 0) {
      setActiveIndex(-2);
      return;
    }

    if (index === -1 && addressData.length > 0) {
      setActiveIndex(0);
      handleSelectedAddressClick(addressData[0]);
      return;
    }

    setActiveIndex(index);
  }, [
    addressData,
    handleSelectedAddressClick,
    searchText,
    selectedAddress,
    updateBackgroundWidth,
  ]);

  return (
    <div
      className={cn(
        "min-h-120pxr gap-12pxr h-dynamic-screen-60 flex w-full flex-col"
      )}
    >
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        placeholder="주소를 입력해주세요."
      />
      <Button
        variant="primary"
        size="small"
        className={cn(
          "gap-6pxr flex w-full items-center justify-center rounded-2xl",
          isGeoLoading && "cursor-progress"
        )}
        onClick={() => {
          if (isGeoLoading) return;

          setIsGeoLoading(true);
          debouncedGeolocationClick();
        }}
        disabled={isGeoLoading}
      >
        <Crosshair
          className={cn("size-20pxr", isGeoLoading && "animate-spin")}
        />
        현재 위치 사용
      </Button>
      <div
        className={cn(
          "bg-backgroundBlueLight px-16pxr py-12pxr border-grayLighter relative h-full w-full overflow-y-auto rounded-2xl border shadow-inner"
        )}
      >
        <ul
          className={cn("gap-4pxr flex h-full w-full flex-col")}
          ref={listRef}
        >
          {activeIndex !== -2 && (
            <ModalListItemBackground
              backgroundWidth={backgroundWidth}
              itemOffsetTop={itemOffsetTop}
              itemClientHeight={itemClientHeight}
            />
          )}
          {activeIndex === -2 && (
            <li className={cn("w-full text-center")}>검색 결과가 없습니다.</li>
          )}
          {activeIndex === -3 && (
            <li className={cn("text-14pxr w-full text-left font-medium")}>
              <span className={cn("text-28pxr font-semibold")}>
                주소를 찾을 수 없습니다.
              </span>
              <br />
              <br />
              <span className={cn("text-24pxr font-bold")}>Tip</span>
              <br />
              <span className={cn("mb-8pxr inline-block")}>
                주소를 찾을 수 없습니다.
                <br />
                주소를 찾을 수 없습니다.
                <br />
                주소를 찾을 수 없습니다.
              </span>
              <br />
              주소를 찾을 수 없습니다.
              <br />
              <span className={cn("text-[#00A3FF]")}>
                제주시 → 제주특별자치도 제주시
              </span>
              <br />
              주소를 찾을 수 없습니다.
              <br />
              <span className={cn("text-[#00A3FF]")}>
                첨단로 242 → 제주특별자치도 제주시 영평동
              </span>
              <br />
              주소를 찾을 수 없습니다.
              <br />
              <span className={cn("text-[#00A3FF]")}>
                제주 영평동 2181 → 제주특별자치도 제주시 영평동
              </span>
            </li>
          )}
          {addressData.map((address, index) => (
            <li
              key={address.addressName}
              ref={(el) => {
                itemRefs.current[index] = {
                  el,
                  name: address.addressName,
                };
              }}
            >
              <AddressItem
                address={address.addressName}
                isSelected={selectedAddress === address.addressName}
                onClick={() => handleAddressClick(address, index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { AddressSearch };
