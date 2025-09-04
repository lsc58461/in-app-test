'use client'

import { MouseEventHandler, ReactNode, RefObject } from 'react'

import { useModalCloseAnimation } from '@/stores/use-modal-close-animation'
import { cn } from '@/utils/cn'

interface IModalDimProps {
  dimRef: RefObject<HTMLDivElement | null>
  onDimClick?: MouseEventHandler<HTMLDivElement>
  isNested?: boolean
  className?: string
  children?: ReactNode
}

function ModalDim({
  dimRef,
  onDimClick: handleOutsideClick,
  isNested,
  className,
  children,
}: IModalDimProps) {
  const { isAnimating, setIsAnimating } = useModalCloseAnimation()

  return (
    <div
      className={cn(
        'modal-container',
        'inset-0pxr animate-fadeIn fixed flex items-center justify-center will-change-transform',
        isAnimating[isNested ? 0 : 1] && 'animate-fadeOut!',
      )}
    >
      <div
        ref={dimRef}
        className={cn(
          'inset-0pxr animate-dimFadeIn absolute bg-black opacity-0 will-change-transform',
          isAnimating[isNested ? 0 : 1] && 'animate-dimFadeOut!',
        )}
        onClick={(e) => {
          if (!handleOutsideClick) return

          setIsAnimating(
            isNested ? [true, isAnimating[1]] : [isAnimating[0], true],
          )

          setTimeout(() => {
            handleOutsideClick(e)
            setIsAnimating(
              isNested ? [false, isAnimating[1]] : [isAnimating[0], false],
            )
          }, 190)
        }}
        role="presentation"
      />
      <div
        className={cn(
          'max-w-600pxr animate-modalFadeIn p-20pxr relative w-full will-change-transform',
          'max700:w-full max700:animate-modalSlideUp',
          isAnimating[1] &&
            'animate-modalFadeOut! max700:animate-modalSlideDown!',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export { ModalDim }
