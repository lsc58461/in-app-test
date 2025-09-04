import { cn } from '@/utils/cn'

interface IBreadcrumbItemProps {
  label: string
  onClick?: () => void
  isLink?: boolean
}

function BreadcrumbItem({ label, onClick, isLink }: IBreadcrumbItemProps) {
  const defaultClassName =
    'select-none whitespace-nowrap text-14pxr mb:text-12pxr font-semibold text-blackLight bg-white px-12pxr py-6pxr rounded-lg'

  return isLink ? (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'cursor-pointer transition-all duration-200 hover:font-bold hover:text-black hover:shadow-lg',
        defaultClassName,
      )}
    >
      {label}
    </button>
  ) : (
    <span className={defaultClassName}>{label}</span>
  )
}

export { BreadcrumbItem }
