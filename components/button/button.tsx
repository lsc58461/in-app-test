import { cva, VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'

import { cn } from '@/utils/cn'
import twMerge from '@/utils/custom-tw-merge'

const buttonVariants = cva(
  'w-fit transition-all duration-200 font-semibold text-white shadow-sm',
  {
    variants: {
      variant: {
        primary:
          'bg-blueDefault hover:bg-blueDark active:bg-blueDark disabled:bg-blueLight text-white',
        primaryLine:
          'border border-blueDefault hover:border-blueDark hover:text-blueDark active:border-blueDark active:text-blueDark disabled:border-blueLight disabled:text-blueLight text-blueDefault',
        white: 'bg-white hover:text-blackLight text-grayDark',
        gray: 'border border-grayLight bg-white hover:border-grayDark hover:text-blackLight active:border-grayDark active:text-blackLight text-grayDark disabled:border-grayLight disabled:text-grayLight',
        trans: 'border border-white28 bg-transparent text-white',
        input:
          'bg-white border-grayLight focus:border-blueDefault  border focus:outline-hidden',
      },
      size: {
        big: 'min-w-152pxr rounded-3xl py-28pxr text-18pxr leading-6',
        large: 'rounded-2xl px-14pxr py-12pxr text-16pxr leading-6',
        medium: 'rounded-xl px-12pxr py-8pxr text-16pxr leading-6',
        small: 'rounded-xl px-10pxr py-6pxr text-14pxr leading-6 ',
        tiny: 'rounded-md px-5pxr py-2pxr text-12pxr leading-[1.125rem] mb:text-10pxr mb:py-1pxr mb:px-3pxr',
        input:
          'rounded-xl px-16pxr py-12pxr text-16pxr mb:text-14pxr leading-6 font-bold transition-all duration-300 placeholder:text-14pxr w-full max-w-360pxr placeholder-grayDark shadow-inner!',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
)

interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  className?: string
  isError?: boolean
  children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
  ({ className, variant, size, isError, children, ...props }, ref) => {
    const getButtonErrorStyle = () => {
      if (!isError) return ''

      switch (variant) {
        case 'primary':
          return 'bg-redDefault hover:bg-redDark active:bg-redDark disabled:bg-redLight'

        case 'primaryLine':
          return 'border-redDefault text-redDefault hover:text-redDark active:text-redDark disabled:bg-redLight hover:border-redDark active:border-redDark'

        case 'white':
          return 'border-redDefault! border! text-redDefault! hover:text-redDark! active:text-redDark! disabled:bg-redLight! hover:border-redDark! active:border-redDark!'

        default:
          return ''
      }
    }

    return (
      <button
        type="button"
        ref={ref}
        className={twMerge(
          cn(
            buttonVariants({ variant, size }),
            getButtonErrorStyle(),
            className,
          ),
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
