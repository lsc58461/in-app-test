'use client'

import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

import { workerPoolProducts } from '@/constants/worker-pool-products'
import { TWorkerPoolProductName } from '@/types/products'
import { cn } from '@/utils/cn'

interface IWorkerPoolQuotationProps {
  productName: TWorkerPoolProductName
  footer: ReactNode
}

const PERIOD = '3개월'

function WorkerPoolQuotation({
  productName,
  footer,
}: IWorkerPoolQuotationProps) {
  const t = useTranslations()

  const productInfo = workerPoolProducts(t).find(
    (product) => product.productName === productName,
  )

  return (
    <>
      {/* Invoice Items */}
      <div className={cn('')}>
        <div className={cn('flex items-center justify-between')}>
          <span className={cn('text-14pxr')}>
            ◎ 견적내용은 아래와 같습니다.
          </span>
          <span className={cn('text-grayDark text-14pxr')}>(VAT포함)</span>
        </div>

        <div className={cn('border-grayLight border')}>
          <table className={cn('text-14pxr w-full')}>
            <thead>
              <tr className={cn('bg-grayLighter')}>
                <th className={cn('border-grayLight p-8pxr border-r border-b')}>
                  서비스명
                </th>
                <th
                  className={cn(
                    'border-grayLight p-8pxr w-[15%] border-r border-b',
                  )}
                >
                  기간
                </th>
                <th
                  className={cn(
                    'border-grayLight p-8pxr w-[15%] border-r border-b',
                  )}
                >
                  단가
                </th>
                <th
                  className={cn(
                    'border-grayLight p-8pxr w-[10%] border-r border-b',
                  )}
                >
                  수량
                </th>
                <th className={cn('border-grayLight p-8pxr w-[15%] border-b')}>
                  금액
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cn('border-grayLight p-8pxr border-r border-b')}>
                  인재풀 이력서 열람권
                </td>
                <td
                  className={cn(
                    'border-grayLight p-8pxr border-r border-b text-center',
                  )}
                >
                  {PERIOD}
                </td>
                <td
                  className={cn(
                    'border-grayLight p-8pxr border-r border-b text-right break-all',
                  )}
                >
                  {productInfo?.discountPrice.toLocaleString()}원
                </td>
                <td
                  className={cn(
                    'border-grayLight p-8pxr border-r border-b text-center',
                  )}
                >
                  {productInfo?.tickets}
                </td>
                <td
                  className={cn(
                    'border-grayLight p-8pxr border-b text-right break-all',
                  )}
                >
                  {productInfo?.discountPrice.toLocaleString()}원
                </td>
              </tr>

              <tr className={cn('font-semibold')}>
                <td
                  colSpan={4}
                  className={cn(
                    'border-grayLight p-8pxr border-r border-b text-center',
                  )}
                >
                  총 견적
                </td>
                <td
                  className={cn(
                    'border-grayLight p-8pxr border-b text-right break-all',
                  )}
                >
                  {productInfo?.discountPrice.toLocaleString()}원
                </td>
              </tr>
              <tr className={cn('font-semibold')}>
                <td
                  colSpan={4}
                  className={cn('border-grayLight p-8pxr border-r text-center')}
                >
                  최종 결제금액
                </td>
                <td className={cn('p-8pxr text-right break-all')}>
                  {productInfo?.discountPrice.toLocaleString()}원
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {footer}
    </>
  )
}

export { WorkerPoolQuotation }
