'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { RotateCcw, X } from 'lucide-react'

import { SelectedOption } from '@/hooks/use-filter'
import { cn } from '@/utils/cn'

interface IFilterSummaryProps {
  selectedOptions: SelectedOption[]
  onRemoveModalOption: (categoryId: string, optionId: string) => void
  onRemove: (categoryId: string, optionId: string | undefined) => void
  onReset: () => void
}

function FilterSummary({
  selectedOptions,
  onRemoveModalOption: handleRemoveModalOption,
  onRemove: handleRemove,
  onReset: handleReset,
}: IFilterSummaryProps) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true })

  return (
    <div
      className={cn(
        'p-18pxr shadow-gray5 z-10 flex w-full items-center rounded-b-2xl bg-white',
      )}
    >
      <div className={cn('relative w-full overflow-hidden')}>
        <div className={cn('overflow-hidden')} ref={emblaRef}>
          <ul className={cn('gap-4pxr flex')}>
            {selectedOptions.map((option) => (
              <li
                key={`${option.categoryId}-${option.optionId}`}
                className={cn(
                  'gap-2pxr bg-grayWhite px-8pxr py-6pxr flex shrink-0 items-center rounded-xl',
                )}
              >
                <span
                  className={cn(
                    'text-14pxr text-grayDark font-bold select-none',
                  )}
                >
                  {option.label === 'NONE'
                    ? "label.irrelevant"
                    : option.label}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      option.categoryId === 'residence' ||
                      option.categoryId === 'nationality' ||
                      option.categoryId === 'currentVisaType' ||
                      option.categoryId === 'preferredVisaType' ||
                      option.categoryId === 'region' ||
                      option.categoryId === 'supportLanguage'
                    ) {
                      handleRemoveModalOption(
                        option.categoryId,
                        option.optionId,
                      )

                      return
                    }

                    handleRemove(option.categoryId, option.optionId)
                  }}
                  className={cn('p-2pxr hover:bg-grayLight rounded-full')}
                >
                  <X className={cn('size-14pxr text-red-600')} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={cn(
            'right-0pxr top-0pxr w-20pxr absolute h-full bg-linear-to-r from-transparent to-white',
          )}
        />
      </div>
      <button
        className={cn(
          'size-34pxr border-grayDefault p-4pxr hover:bg-grayLight active:bg-grayLight text-grayDefault flex shrink-0 items-center justify-center rounded-xl border transition-colors duration-200 hover:text-white active:text-white',
        )}
        type="button"
        onClick={handleReset}
      >
        <RotateCcw className={cn('size-20pxr')} />
      </button>
    </div>
  )
}

export { FilterSummary }
