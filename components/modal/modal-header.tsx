'use client'

import { X } from 'lucide-react'

import { useModalCloseAnimation } from '@/stores/use-modal-close-animation'
import { cn } from '@/utils/cn'

interface IModalHeaderProps {
  text: string
  subText?: string
  className?: string
  onCloseClick?: () => void
  isNested?: boolean
}

function ModalHeader({
  text,
  subText,
  className,
  onCloseClick: handleCloseClick,
  isNested,
}: IModalHeaderProps) {
  const { isAnimating, setIsAnimating } = useModalCloseAnimation()

  return (
    <div
      className={cn(
        'relative flex w-full items-start justify-between',
        className,
      )}
    >
      {/* 좌측 여백 */}
      <div className={cn('w-32pxr')} />

      {/* Content Section */}
      <div className={cn('flex flex-1 flex-col items-center text-center')}>
        <h1
          className={cn(
            'text-28pxr text-blueDefault mb-2 leading-tight font-semibold tracking-tight',
            'mb:text-24pxr',
          )}
        >
          {text}
        </h1>
        {subText && (
          <h2
            className={cn(
              'text-16pxr max-w-md leading-relaxed font-normal text-blue-600',
              'mb:text-14pxr',
            )}
          >
            {subText}
          </h2>
        )}
      </div>

      {/* Close Button */}
      {handleCloseClick && (
        <button
          type="button"
          className={cn(
            'size-32pxr flex items-center justify-center',
            'rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm',
            'hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm',
            'transition-all duration-200 ease-out active:scale-95',
            'focus:ring-2 focus:ring-slate-400 focus:ring-offset-1 focus:outline-none',
          )}
          onClick={() => {
            setIsAnimating(
              isNested ? [true, isAnimating[1]] : [isAnimating[0], true],
            )

            setTimeout(() => {
              handleCloseClick()
              setIsAnimating(
                isNested ? [false, isAnimating[1]] : [isAnimating[0], false],
              )
            }, 190)
          }}
        >
          <X
            className={cn(
              'size-20pxr text-slate-400 transition-colors hover:text-slate-600',
            )}
          />
        </button>
      )}
    </div>
  )
}

export { ModalHeader }
