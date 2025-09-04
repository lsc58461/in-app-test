'use client'

import { Search } from 'lucide-react'
import { CSSProperties, FocusEvent, useRef } from 'react'

import { cn } from '@/utils/cn'

interface ISearchInputProps {
  searchText: string
  setSearchText: (searchText: string) => void
  placeholder: string
  className?: string
  style?: CSSProperties
  onFocus?: (e?: FocusEvent<HTMLInputElement>) => void
  onBlur?: (e?: FocusEvent<HTMLInputElement>) => void
}

function SearchInput({
  searchText,
  setSearchText,
  placeholder,
  className,
  style,
  onFocus,
  onBlur,
}: ISearchInputProps) {
  const searchInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={cn('relative w-full')}>
      <input
        name="searchInput"
        ref={searchInputRef}
        className={cn(
          'py-8pxr pl-16pxr pr-68pxr text-16pxr border-grayLight -z-10 w-full rounded-2xl border bg-white leading-6 font-medium shadow-inner outline-hidden',
          'max700:text-14pxr',
          className,
        )}
        value={searchText}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={placeholder}
        data-cy="searchInput"
        style={style}
      />
      <button
        type="button"
        className={cn(
          'right-4pxr w-44pxr absolute top-1/2 h-full -translate-y-1/2',
        )}
        onClick={() => setSearchText(searchInputRef.current?.value || '')}
      >
        <Search className={cn('text-grayDark size-20pxr place-self-center')} />
      </button>
    </div>
  )
}

export { SearchInput }
