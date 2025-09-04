import { VisaType } from '@/types/visa'
import { cn } from '@/utils/cn'

function VisaCheckBoxItem({
  visa,
  isSelected,
  onClick,
  isNone,
}: {
  visa: {
    name: string
    abbreviation: VisaType | 'NA'
    visaCode: string | 'NA'
  }
  isSelected: boolean
  onClick: () => void
  isNone?: boolean
}) {
  return (
    <button
      type="button"
      className={cn(
        'py-8pxr text-16pxr px-6pxr gap-16pxr flex w-full items-center justify-between leading-6 outline-hidden transition-all duration-150',
        isSelected
          ? 'text-blueDark bg-backgroundBlue5 rounded-xl font-bold'
          : 'text-grayDefault font-semibold',
        'mb:text-14pxr',
        'max400:text-12pxr',
      )}
      onClick={onClick}
    >
      <p className={cn('text-left')}>{visa.name}</p>
      {isNone && (
        <p className={cn('text-nowrap')}>
          {visa.abbreviation === 'NA' ? 'N/A' : visa.visaCode}
        </p>
      )}
      {!isNone && (
        <p className={cn('text-nowrap')}>
          {visa.abbreviation === 'NONE' ? 'N/A' : visa.visaCode}
        </p>
      )}
    </button>
  )
}

export { VisaCheckBoxItem }
