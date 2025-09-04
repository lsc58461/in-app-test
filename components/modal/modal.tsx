"use client";

import { EmblaViewportRefType } from "embla-carousel-react";
import { ReactNode, RefObject } from "react";

import { cn } from "@/utils/cn";

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

export { Modal };
