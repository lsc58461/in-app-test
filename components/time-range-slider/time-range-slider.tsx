"use client";

import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/utils/cn";

import { Button } from "../button/button";
import { Slider } from "../slider/slider";

type TRange = number[];

interface ITimeRangeSliderProps {
  range: TRange;
  setRange: (range: TRange) => void;
  initialRange?: TRange;
  min?: number;
  max?: number;
  interval?: number;
}

function TimeRangeSlider({
  range,
  setRange,
  initialRange = [10, 35],
  min = 10,
  max = 35,
  interval = 5,
}: ITimeRangeSliderProps) {
  const [displayRange, setDisplayRange] = useState<TRange>(range);

  useEffect(() => {
    setDisplayRange(range);
  }, [range]);

  return (
    <div
      className={cn(
        "gap-24pxr flex w-full flex-col rounded-lg bg-white shadow-sm"
      )}
    >
      <div className={cn("flex items-center justify-between")}>
        <h2 className={cn("text-16pxr text-blackLight font-medium")}>
          {displayRange[0] === min ? "label.minimum" : displayRange[0]}~
          {displayRange[1] === max ? "label.maximum" : displayRange[1]}
        </h2>
        <Button
          className={cn("gap-8pxr flex items-center")}
          variant="gray"
          size="tiny"
          onClick={() => {
            setDisplayRange(initialRange);
          }}
        >
          <RefreshCw className={cn("size-14pxr shrink-0")} />
          {"button.reset"}
        </Button>
      </div>

      <div className={cn("gap-12pxr flex flex-col")}>
        <Slider
          defaultValue={initialRange}
          value={displayRange}
          onValueChange={setDisplayRange}
          max={max}
          min={min}
          step={1}
          className={cn("[&_[role=slider]]:h-16pxr [&_[role=slider]]:w-16pxr")}
        />

        <div className={cn("text-12pxr flex justify-between")}>
          {Array.from({ length: (max - min) / interval + 1 }).map(
            (_, index) => {
              if (index === 0)
                return (
                  <p
                    key={`${index + 1}`}
                    className={cn("text-grayDark flex flex-col items-center")}
                  >
                    {"label.minimum"}
                  </p>
                );

              if (index === (max - min) / interval)
                return (
                  <p
                    key={`${index + 1}`}
                    className={cn("text-grayDark flex flex-col items-center")}
                  >
                    {"label.maximum"}
                  </p>
                );

              return (
                <p
                  key={`${index + 1}`}
                  className={cn("text-grayDark flex flex-col items-center")}
                >
                  {min + interval * index}
                </p>
              );
            }
          )}
        </div>
        <div className={cn("w-full")}>
          <Button
            className={cn("w-full")}
            variant="primary"
            size="small"
            onClick={() => {
              setRange(displayRange);
            }}
          >
            {"button.apply"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export { TimeRangeSlider };
