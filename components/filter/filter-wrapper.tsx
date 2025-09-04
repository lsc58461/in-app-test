"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

import { useModalCloseAnimation } from "@/stores/use-modal-close-animation";
import { cn } from "@/utils/cn";

interface IFilterWrapperProps {
  onClose?: () => void;
  children: ReactNode;
}

function FilterWrapper({ onClose, children }: IFilterWrapperProps) {
  const { isAnimating, setIsAnimating } = useModalCloseAnimation();
  return (
    <div
      className={cn(
        "shadow-gray2 border-grayLighter relative flex h-full w-full flex-col border bg-white",
        "rounded-none"
      )}
    >
      {onClose && (
        <button
          className={cn("top-20pxr right-20pxr absolute block z-20")}
          type="button"
          onClick={() => {
            setIsAnimating([true, isAnimating[1]]);
            setTimeout(() => {
              onClose();
              setIsAnimating([false, isAnimating[1]]);
            }, 190);
          }}
        >
          <X className={cn("text-blackLight")} />
        </button>
      )}
      {children}
    </div>
  );
}

export { FilterWrapper };
