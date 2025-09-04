import { ReactNode } from 'react'

import { cn } from '@/utils/cn'

interface IFilterContainerProps {
  children: ReactNode
}

function FilterContainer({ children }: IFilterContainerProps) {
  return (
    <div
      className={cn(
        'px-32pxr pt-20pxr relative h-full w-full overflow-y-auto bg-white',
        'max900:px-26pxr max900:pt-16pxr',
      )}
    >
      {children}
    </div>
  )
}

export { FilterContainer }
