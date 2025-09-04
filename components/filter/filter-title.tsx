import { ReactNode } from 'react'

import { cn } from '@/utils/cn'

interface IFilterTitleProps {
  children: ReactNode
}

function FilterTitle({ children }: IFilterTitleProps) {
  return (
    <div
      className={cn(
        'px-32pxr pb-20pxr pt-24pxr relative',
        'max900:px-26pxr max900:pb-16pxr max900:pt-20pxr',
      )}
    >
      <h3
        className={cn(
          'text-24pxr text-blueDark font-bold',
          'max900:text-22pxr',
        )}
      >
        {children}
      </h3>
      <div
        className={cn(
          '-bottom-24pxr left-0pxr h-24pxr absolute w-full bg-linear-to-b from-black/5 to-transparent',
          'max900:-bottom-20pxr',
        )}
      />
    </div>
  )
}

export { FilterTitle }
