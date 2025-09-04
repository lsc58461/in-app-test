import { cn } from '@/utils/cn'

function ResponsibilityItem({
  responsibility,
  isSelected,
  onClick,
}: {
  responsibility: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={cn(
        'py-8pxr text-16pxr mb:text-14pxr flex w-full justify-between text-left leading-6 break-all outline-hidden transition-all duration-150',
        isSelected
          ? 'text-blueDark font-bold'
          : 'text-grayDefault font-semibold',
        'max700:text-14pxr',
      )}
      onClick={onClick}
    >
      <p>{responsibility}</p>
    </button>
  )
}

export { ResponsibilityItem }
