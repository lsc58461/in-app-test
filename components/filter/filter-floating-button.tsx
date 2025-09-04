"use client";

import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/utils/cn";

import { Button } from "../button/button";

interface IFilterFloatingButtonProps {
  onButtonClick: () => void;
  className?: string;
}

function FilterFloatingButton({
  onButtonClick: handleButtonClick,
  className,
}: IFilterFloatingButtonProps) {
  return (
    <Button
      className={cn(
        "bottom-20pxr gap-8pxr px-16pxr py-12pxr shadow-purple2 fixed flex left-1/2 -translate-x-1/2 items-center rounded-full transition-all duration-200",
        "max800:flex max800:bottom-96pxr",
        "max700:py-10pxr",
        "mb:py-8pxr mb:text-14pxr",
        className
      )}
      onClick={handleButtonClick}
    >
      <SlidersHorizontal className={cn("size-20pxr", "mb:size-16pxr")} />
      필터
    </Button>
  );
}

export { FilterFloatingButton };
