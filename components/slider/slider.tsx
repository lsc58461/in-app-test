'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/utils/cn'

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none items-center select-none',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="bg-muted h-6pxr bg-grayLighter relative w-full grow overflow-hidden rounded-full">
      <SliderPrimitive.Range className="bg-blueDefault absolute h-full" />
    </SliderPrimitive.Track>
    {props.value?.map((_, index) => (
      <SliderPrimitive.Thumb
        key={`${index + 1}`}
        className="bg-blueDefault h-16pxr w-16pxr border-grayLight block cursor-pointer rounded-full border-2 shadow-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
