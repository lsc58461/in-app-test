'use client'

import { ChevronDown } from 'lucide-react'
import { useState, useEffect, ReactNode } from 'react'

import { FilterOption } from '@/hooks/use-filter'
import { cn } from '@/utils/cn'

interface IFilterAccordionProps {
  categoryId: string
  title: string
  items?: FilterOption[]
  onCheckedChange?: (categoryId: string, optionId: string) => void
  isHr?: boolean
  isLast?: boolean
  initialOpen?: boolean
  children?: ReactNode
}

function FilterAccordion({
  categoryId,
  title,
  items,
  onCheckedChange: handleCheckboxChange,
  isHr,
  isLast,
  initialOpen,
  children,
}: IFilterAccordionProps) {
  const [isOpen, setIsOpen] = useState(initialOpen)

  // 체크된 아이템이 있을 때 자동으로 열리도록 수정
  useEffect(() => {
    if (!items) return

    if (items.some((item) => item.checked)) {
      setIsOpen(true)
    }
  }, [items])

  return (
    <div className={cn('border-gray-200', isLast && 'mb-60pxr')}>
      <button
        type="button"
        className={cn(
          'group/filterAccordion gap-10pxr py-16pxr flex w-full items-center justify-between',
          'max900:py-14pxr',
          'max700:py-12pxr',
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`accordion-${title}`}
      >
        <h4
          className={cn(
            'text-18pxr text-blackLight text-left leading-[120%] font-bold',
            'max900:text-16pxr',
          )}
        >
          {title}
        </h4>
        <ChevronDown
          className={cn(
            'h-24pxr w-24pxr text-grayDefault group-hover/filterAccordion:bg-blueLighter shrink-0 rounded-full transition-all duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <div
        id={`accordion-${title}`}
        className={cn(
          'px-2pxr grid transition-all duration-200 ease-in-out',
          isOpen ? 'pb-16pxr grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <ul className="overflow-hidden">
          {items
            ? items.map((item) => (
                <li key={item.id} className="py-8pxr">
                  <label className="gap-8pxr flex cursor-pointer items-center justify-between">
                    <span
                      className={cn(
                        'text-16pxr text-blackLight leading-[100%]',
                        'max900:text-14pxr',
                      )}
                    >
                      {item.label}
                    </span>
                    <input
                      name="checkbox"
                      type="checkbox"
                      className={cn(
                        'accent-primary h-18pxr w-18pxr border-grayDefault shrink-0',
                        'max900:h-16pxr max700:w-16pxr',
                      )}
                      checked={item.checked}
                      onChange={() => {
                        handleCheckboxChange?.(categoryId, item.id)
                      }}
                    />
                  </label>
                </li>
              ))
            : children}
        </ul>
      </div>

      {isHr && <hr className="border-blueLighter" />}
    </div>
  )
}

export { FilterAccordion }
