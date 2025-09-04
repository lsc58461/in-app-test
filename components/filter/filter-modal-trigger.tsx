import { Plus, X } from "lucide-react";

import { SelectedOption } from "@/hooks/use-filter";
import { cn } from "@/utils/cn";

interface IFilterModalTriggerProps {
  title: string;
  categoryId: string;
  getSelectedOptions: () => SelectedOption[];
  onRemove: (categoryId: string, optionId: string) => void;
  onModalOpen: () => void;
  isHr?: boolean;
  isNoVisaInfo?: boolean;
}

function FilterModalTrigger({
  title,
  categoryId,
  getSelectedOptions,
  onRemove,
  onModalOpen: handleModalOpen,
  isHr,
  isNoVisaInfo,
}: IFilterModalTriggerProps) {
  const items = getSelectedOptions().filter((option) => {
    return option.categoryId === categoryId;
  });

  return (
    <div>
      <button
        type="button"
        className={cn(
          "group/modalTrigger gap-10pxr py-16pxr flex w-full items-center justify-between",
          "max900:py-14pxr",
          "max700:py-12pxr"
        )}
        onClick={handleModalOpen}
      >
        <h4
          className={cn(
            "text-18pxr text-blackLight text-left leading-[120%] font-bold",
            "max900:text-16pxr"
          )}
        >
          {title}
        </h4>
        <Plus
          className={cn(
            "h-24pxr w-24pxr text-grayDefault group-hover/modalTrigger:bg-blueLighter shrink-0 rounded-full transition-all duration-200 group-hover/modalTrigger:rotate-180"
          )}
        />
      </button>
      <div
        id={`accordion-${title}`}
        className={cn(
          "px-2pxr grid transition-all duration-200 ease-in-out",
          items.length > 0 ? "pb-16pxr grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <ul className={cn("overflow-hidden")}>
          {items.map((item) => (
            <li key={item.label} className={cn("py-8pxr")}>
              <label
                className={cn(
                  "gap-8pxr flex cursor-pointer items-center justify-between"
                )}
              >
                <span
                  className={cn(
                    "text-16pxr text-blackLight leading-[100%]",
                    "max900:text-14pxr"
                  )}
                >
                  {(() => {
                    if (isNoVisaInfo && item.label === "NONE")
                      return "label.noVisaInfo";

                    if (item.label === "NONE") {
                      return "label.irrelevant";
                    }

                    return item.label;
                  })()}
                </span>
                <button
                  className={cn(
                    "p-2pxr hover:bg-grayLight rounded-full transition-all duration-200"
                  )}
                  type="button"
                  onClick={() => onRemove(item.categoryId, item.optionId)}
                >
                  <X
                    className={cn(
                      "size-20pxr text-red-600",
                      "max900:size-16pxr"
                    )}
                  />
                </button>
              </label>
            </li>
          ))}
        </ul>
      </div>
      {isHr && <hr className={cn("border-blueLighter")} />}
    </div>
  );
}

export { FilterModalTrigger };
