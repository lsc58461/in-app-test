import { IVisaInfo } from '@/constants/visa-list'
import { cn } from '@/utils/cn'

function VisaItem({
  visa,
  isSelected,
  onClick,
}: {
  visa: IVisaInfo
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={cn(
        'py-8pxr text-16pxr mb:text-14pxr flex w-full justify-between leading-6 outline-hidden transition-all duration-150',
        isSelected
          ? 'text-blueDark font-bold'
          : 'text-grayDefault font-semibold',
      )}
      onClick={onClick}
    >
      <p>{visa.name}</p>
      <p>{visa.abbreviation === 'NONE' ? 'N/A' : visa.visaCode}</p>
    </button>
  )
}

export { VisaItem }
