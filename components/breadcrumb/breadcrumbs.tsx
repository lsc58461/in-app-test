'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { useEffect } from 'react'

import { cn } from '@/utils/cn'

import { BreadcrumbItem } from './breadcrumb-item'
import { BreadcrumbSeparator } from './breadcrumb-separator'

interface IBreadcrumbsProps {
  selectedMainCategory: string
  selectedSubCategory?: string
  selectedDetailItem?: string
  handleMainCategoryClick: (category: string) => void
  handleSubCategoryClick: (category: string) => void
}

function Breadcrumbs({
  selectedMainCategory,
  selectedSubCategory,
  selectedDetailItem,
  handleMainCategoryClick,
  handleSubCategoryClick,
}: IBreadcrumbsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      dragFree: true,
    },
    [WheelGesturesPlugin({ forceWheelAxis: 'x' })],
  )

  useEffect(() => {
    if (emblaApi) {
      setTimeout(() => {
        emblaApi.scrollTo(emblaApi.scrollSnapList().length - 1)
      }, 0)
    }
  }, [emblaApi, selectedMainCategory, selectedSubCategory, selectedDetailItem])

  return (
    <div
      ref={emblaRef}
      className={cn(
        'min-h-49pxr bg-backgroundBlueLight p-8pxr relative overflow-hidden rounded-xl shadow-inner',
      )}
    >
      <div className={cn('flex items-center')}>
        {selectedMainCategory && (
          <>
            <BreadcrumbItem
              label={selectedMainCategory}
              onClick={() => handleMainCategoryClick(selectedMainCategory)}
              isLink
            />

            {selectedSubCategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem
                  label={selectedSubCategory}
                  onClick={() => handleSubCategoryClick(selectedSubCategory)}
                  isLink
                />
              </>
            )}

            {selectedDetailItem && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem label={selectedDetailItem} isLink={false} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export { Breadcrumbs }
