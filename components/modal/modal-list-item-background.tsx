import { cn } from '@/utils/cn'

interface IModalListItemBackgroundProps {
  itemOffsetTop: number | undefined
  itemClientHeight: number | undefined
  backgroundWidth: number | undefined
  className?: string
}

function ModalListItemBackground({
  itemOffsetTop,
  backgroundWidth,
  itemClientHeight,
  className,
}: IModalListItemBackgroundProps) {
  return (
    <div
      className={cn(
        '-left-8pxr bg-blueLighter border-grayLighter absolute -z-10 rounded-2xl border transition-all duration-150',
        className,
      )}
      style={{
        top: `${itemOffsetTop}px`,
        width: `${(backgroundWidth || 0) + 32}px`,
        height: `${itemClientHeight}px`,
      }}
      aria-hidden="true"
    />
  )
}

export { ModalListItemBackground }
