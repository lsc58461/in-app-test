import Image from 'next/image'

import chevronRightIcon from '@/public/images/svgs/chevron_right.svg'
import { cn } from '@/utils/cn'

function BreadcrumbSeparator() {
  return (
    <Image
      src={chevronRightIcon}
      width={16}
      height={16}
      className={cn('mx-8pxr text-gray-400 select-none')}
      alt="Chevron Right Icon"
    />
  )
}

export { BreadcrumbSeparator }
