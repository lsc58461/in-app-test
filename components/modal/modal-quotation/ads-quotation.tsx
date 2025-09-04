'use client'

import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { getAdsProductPrice } from '@/apis/ads/get-ads-product-price'
import { useAdsPrice } from '@/hooks/ads/use-ads-price'
import { cn } from '@/utils/cn'
import { formatDateRanges } from '@/utils/date-utils'

interface IAdsQuotationProps {
  footer: ReactNode
}

function AdsQuotation({ footer }: IAdsQuotationProps) {
  const { data: adsProductPriceData } = useQuery({
    queryKey: ['adsProductPriceData'],
    queryFn: () => getAdsProductPrice(),
  })
  const { adsPrice, adsInfo } = useAdsPrice({
    adsProductPriceData,
  })

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
                  광고 서비스명
                </th>
                <th
                  className={cn(
                    'border-grayLight p-8pxr w-[15%] border-r border-b',
                  )}
                >
                  플랫폼
                </th>
                <th
                  className={cn(
                    'border-grayLight p-8pxr w-[15%] border-r border-b',
                  )}
                >
                  광고 단가
                </th>
                <th
                  className={cn(
                    'border-grayLight p-8pxr w-[25%] border-r border-b',
                  )}
                >
                  노출 기간
                </th>
                <th className={cn('border-grayLight p-8pxr w-[15%] border-b')}>
                  총 금액
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cn('border-grayLight p-8pxr border-r border-b')}>
                  <div>
                    <div className={cn('font-medium')}>
                      {adsInfo.serviceName}
                    </div>
                    {adsInfo.details.length > 0 && (
                      <div className={cn('text-12pxr text-grayDark mt-1')}>
                        {adsInfo.details.join(', ')}
                      </div>
                    )}
                  </div>
                </td>
                <td
                  className={cn(
                    'border-grayLight p-8pxr border-r border-b text-center',
                  )}
                >
                  {adsInfo.periods || '-'}
                </td>
                <td
                  className={cn(
                    'border-grayLight p-8pxr border-r border-b text-right break-all',
                  )}
                >
                  {adsPrice.toLocaleString()}원
                </td>
                <td
                  className={cn(
                    'border-grayLight p-8pxr text-12pxr border-r border-b text-left',
                  )}
                >
                  {/* PC 광고 날짜 표시 */}
                  {adsInfo.pcAdsPeriods && adsInfo.pcAdsPeriods.length > 0 && (
                    <>PC 광고: {formatDateRanges(adsInfo.pcAdsPeriods)}</>
                  )}
                  {adsInfo.pcAdsPeriods &&
                    adsInfo.pcAdsPeriods.length > 0 &&
                    adsInfo.mobileAdsPeriods &&
                    adsInfo.mobileAdsPeriods.length > 0 && (
                      <>
                        <br />{' '}
                        <div className={cn('h-1pxr bg-grayLight w-full')} />
                      </>
                    )}
                  {/* 모바일 광고 날짜 표시 */}
                  {adsInfo.mobileAdsPeriods &&
                    adsInfo.mobileAdsPeriods.length > 0 && (
                      <>
                        Mobile 광고:{' '}
                        {formatDateRanges(adsInfo.mobileAdsPeriods)}
                      </>
                    )}
                </td>
                <td
                  className={cn(
                    'border-grayLight p-8pxr border-b text-right break-all',
                  )}
                >
                  {adsPrice.toLocaleString()}원
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
                  {adsPrice.toLocaleString()}원
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
                  {adsPrice.toLocaleString()}원
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

export { AdsQuotation }
