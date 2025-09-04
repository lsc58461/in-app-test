'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import { useEffect, useRef, useState } from 'react'

import { nationalities } from '@/assets/data/nationality'
import { SearchInput } from '@/components/search-input/search-input'
import { useBackgroundPosition } from '@/hooks/use-background-position'
import { useDebounce } from '@/hooks/use-debounce'
import { cn } from '@/utils/cn'

import { ModalListItemBackground } from '../modal-list-item-background'

const DEBOUNCE_DELAY = 200

interface INationalitySelectorProps {
  selectedNationality: string | undefined
  onSelectedNationalityClick: (nationality: string | undefined) => void
}

function NationalitySelector({
  selectedNationality,
  onSelectedNationalityClick: handleSelectedNationalityClick,
}: INationalitySelectorProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebounce(searchText, DEBOUNCE_DELAY)

  const {
    backgroundWidth,
    itemRefs,
    itemOffsetTop,
    itemClientHeight,
    updateBackgroundWidth,
  } = useBackgroundPosition({
    listRef,
    selectedItem: selectedNationality,
  })

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      dragFree: true,
      axis: 'y',
    },
    [WheelGesturesPlugin()],
  )

  const filteredNationalities = nationalities.filter((nationality) => {
    const { nameKo, nameEn, continentKo, continentEn } = nationality
    const lowerCaseSearchText = debouncedSearchText.toLowerCase()

    return (
      nameKo.toLowerCase().includes(lowerCaseSearchText) ||
      nameEn.toLowerCase().includes(lowerCaseSearchText) ||
      continentKo.toLowerCase().includes(lowerCaseSearchText) ||
      continentEn.toLowerCase().includes(lowerCaseSearchText)
    )
  })

  useEffect(() => {
    updateBackgroundWidth()
  }, [updateBackgroundWidth])

  useEffect(() => {
    const index = filteredNationalities.findIndex(
      (nationality) => nationality.nameKo === selectedNationality,
    )

    if (emblaApi) {
      emblaApi.scrollTo(index)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emblaApi])

  return (
    <div
      className={cn(
        'min-h-120pxr gap-12pxr h-dynamic-screen-60 flex w-full flex-col',
      )}
    >
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        placeholder="placeholder.searchNationality"
      />

      <div
        className={cn(
          'bg-backgroundBlueLight px-16pxr py-12pxr border-grayLighter relative h-full w-full overflow-hidden rounded-2xl border shadow-inner',
        )}
        ref={emblaRef}
      >
        <ul
          className={cn('gap-4pxr flex h-full w-full flex-col')}
          ref={listRef}
        >
          <ModalListItemBackground
            backgroundWidth={backgroundWidth}
            itemOffsetTop={itemOffsetTop}
            itemClientHeight={itemClientHeight}
          />

          {filteredNationalities.length === 0 && (
            <li className={cn('w-full text-center')}>search.notFound</li>
          )}
          {filteredNationalities.map((nationality, index) => (
            <li
              ref={(el) => {
                itemRefs.current[index] = {
                  el,
                  name: nationality.nameKo,
                }
              }}
              key={nationality.nameEn}
              className={cn('z-20')}
            >
              <button
                type="button"
                onClick={() =>
                  handleSelectedNationalityClick(nationality.nameKo)
                }
                className={cn(
                  'py-8pxr text-16pxr mb:text-14pxr flex w-full flex-col justify-between leading-6 text-nowrap outline-hidden transition-all duration-150',
                  selectedNationality === nationality.nameKo
                    ? 'text-blueDark font-bold'
                    : 'text-grayDefault font-semibold',
                  'max700:text-14pxr',
                )}
                data-cy={`nationality-item-${index}`}
              >
                <div className={cn('text-14pxr text-left text-gray-600')}>
                  {nationality.continentKo} {'>'} {nationality.nameKo}
                </div>
                <div className={cn('font-16pxr text-left text-wrap')}>
                  {nationality.continentEn} {'>'} {nationality.nameEn}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { NationalitySelector }
