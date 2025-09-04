import { cn } from '@/utils/cn'

interface IAddressItemProps {
  address: string
  isSelected: boolean
  onClick: () => void
}

function AddressItem({ address, isSelected, onClick }: IAddressItemProps) {
  return (
    <button
      type="button"
      className={cn(
        'py-8pxr text-16pxr mb:text-14pxr flex w-full justify-between leading-6 outline-hidden transition-all duration-150',
        isSelected
          ? 'text-blueDark font-bold'
          : 'text-grayDefault font-semibold',
        'max700:text-14pxr',
      )}
      onClick={onClick}
      data-cy={`address-item-${address}`}
    >
      <p>{address}</p>
    </button>
  )
}

export { AddressItem }
