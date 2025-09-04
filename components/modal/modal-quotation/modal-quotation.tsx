'use client'

import { useQuery } from '@tanstack/react-query'
import { Download, Printer, X } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { toast } from 'react-toastify'

import { getAdsProductPrice } from '@/apis/ads/get-ads-product-price'
import { useAdsPrice } from '@/hooks/ads/use-ads-price'
import { useQuotationPdfDownload } from '@/hooks/use-quotation-pdf-download'
import sealImpressionImage from '@/public/images/pngs/seal-impression.png'
import { useUserStore } from '@/stores/use-user-store'
import { TWorkerPoolProductName } from '@/types/products'
import { IQuotationPDFPayload } from '@/types/quotation-pdf'
import { cn } from '@/utils/cn'
import { formatDateRanges } from '@/utils/date-utils'

import { AdsQuotation } from './ads-quotation'
import { WorkerPoolQuotation } from './worker-pool-quotation'

interface IModalQuotationProps {
  type: 'workerPool' | 'ads'
  productName?: TWorkerPoolProductName
  notModal?: boolean
  closeModal?: () => void
}

const COMPANY_INFO = {
  name: '주식회사 워크비자 (workvisa)',
  ceo: '고경우',
  businessNumber: '673-87-02961',
  type: '정보통신업',
  business: '포털 및 기타 인터넷 정보 매개 서비스업',
  address: '대구광역시 동구 장등로 76, 302호',
  tel: process.env.NEXT_PUBLIC_COMPANY_PHONE_NUMBER || '',
  email: 'workvisahr@naver.com',
}

function ModalQuotation({
  type,
  productName,
  closeModal,
  notModal,
}: IModalQuotationProps) {
  const t = useTranslations()
  const { user } = useUserStore()
  const quotationRef = useRef<HTMLDivElement>(null)

  // 광고 가격 데이터 가져오기
  const { data: adsProductPriceData } = useQuery({
    queryKey: ['adsProductPriceData'],
    queryFn: () => getAdsProductPrice(),
    enabled: type === 'ads',
  })
  const { adsPrice, adsInfo } = useAdsPrice({
    adsProductPriceData,
  })

  // 워커풀 상품 정보 가져오기
  const workerPoolProducts = useMemo(() => {
    const PERIOD = '3개월'
    return [
      {
        productName: 'WORKER_POOL_10' as const,
        tickets: 10,
        price: 60000,
        discountPrice: 43000,
        periodText: PERIOD,
      },
      {
        productName: 'WORKER_POOL_20' as const,
        tickets: 20,
        price: 120000,
        discountPrice: 75000,
        periodText: PERIOD,
      },
      {
        productName: 'WORKER_POOL_30' as const,
        tickets: 30,
        price: 180000,
        discountPrice: 98000,
        periodText: PERIOD,
      },
    ]
  }, [])

  // PDF 페이로드 생성
  const pdfPayload = useMemo((): IQuotationPDFPayload => {
    const companyInfo = {
      name: COMPANY_INFO.name,
      ceo: COMPANY_INFO.ceo,
      businessNumber: COMPANY_INFO.businessNumber,
      type: COMPANY_INFO.type,
      business: COMPANY_INFO.business,
      address: COMPANY_INFO.address,
      tel: COMPANY_INFO.tel,
      email: COMPANY_INFO.email,
    }

    if (type === 'ads') {
      return {
        type: 'ads',
        recipientName: user.name || '',
        companyInfo,
        sealImageUrl:
          'https://kr.object.ncloudstorage.com/workvisa/assets/seal-impression.png',
        fileName: '워크비자_견적서',
        ads: {
          serviceName: adsInfo.serviceName,
          details: adsInfo.details,
          periods: adsInfo.periods,
          pcAdsRangesText: adsInfo.pcAdsPeriods
            ? formatDateRanges(adsInfo.pcAdsPeriods)
            : null,
          mobileAdsRangesText: adsInfo.mobileAdsPeriods
            ? formatDateRanges(adsInfo.mobileAdsPeriods)
            : null,
          price: adsPrice,
        },
      }
    }

    // workerPool
    const productInfo = workerPoolProducts.find(
      (product) => product.productName === productName,
    )

    return {
      type: 'workerPool',
      recipientName: user.name || '',
      companyInfo,
      sealImageUrl:
        'https://kr.object.ncloudstorage.com/workvisa/assets/seal-impression.png',
      fileName: '워크비자_견적서',
      workerPool: {
        periodText: productInfo?.periodText || '3개월',
        unitPrice: productInfo?.discountPrice || 0,
        tickets: productInfo?.tickets || 0,
        price: productInfo?.discountPrice || 0,
      },
    }
  }, [type, user.name, adsInfo, adsPrice, productName, workerPoolProducts])

  // PDF 다운로드 훅
  const { isLoading: isPdfDownloading, handleDownload } =
    useQuotationPdfDownload({
      payload: pdfPayload,
    })

  const isWebView = useMemo(() => {
    if (typeof window === 'undefined') return false
    const { userAgent } = window.navigator
    return (
      userAgent.includes('NAVER') ||
      userAgent.includes('wv') ||
      userAgent.includes('WebView') ||
      userAgent.includes('workvisa') ||
      (window as unknown as { ReactNativeWebView?: unknown })
        .ReactNativeWebView !== undefined
    )
  }, [])

  const handlePrint = useReactToPrint({
    contentRef: quotationRef,
    documentTitle: '워크비자 서비스 견적서',
    pageStyle: '@page { margin: 10mm; }',
    onBeforePrint: async () => {
      if (window.navigator.userAgent.includes('NAVER')) {
        toast.error(t('toast.naverBrowserNotSupported'))
        return
      }

      toast.info(t('toast.estimatePrinting'))
    },
    onAfterPrint: () => {
      if (window.navigator.userAgent.includes('NAVER')) return

      toast.success(t('toast.estimatePrintComplete'))
    },
  })

  // 다운로드는 훅의 handleDownload 사용

  const footer = useMemo(
    () => (
      <div>
        <div>
          <span className={cn('text-14pxr')}>
            ◎ 문의처 및 결제방식은 아래와 같습니다.
          </span>
        </div>

        <div
          className={cn(
            'p-12pxr text-14pxr gap-14pxr border-grayLight flex flex-col border',
          )}
        >
          <div>
            <p>사업자 고객센터</p>
            <p>
              • 전화 : {COMPANY_INFO.tel} / 이메일 :{COMPANY_INFO.email}
            </p>
          </div>

          <div>
            <p>결제방식</p>
            <p>
              • 신용/체크카드, 실시간 계좌이체, 간편 결제(네이버페이, 토스페이,
              삼성페이, 카카오페이, 페이코 등)에서 결제됩니다.
            </p>
            <p>
              • 결제하는 상품 및 정책에 따라 일부 결제 수단이 제한될 수
              있습니다.
            </p>
          </div>
        </div>
      </div>
    ),
    [],
  )

  const quotation = useMemo(() => {
    switch (type) {
      case 'workerPool':
        if (!productName) return null
        return <WorkerPoolQuotation productName={productName} footer={footer} />

      case 'ads':
        return <AdsQuotation footer={footer} />
      default:
        return null
    }
  }, [type, productName, footer])

  return (
    <div
      className={cn(
        'max-h-dynamic-screen-80 flex flex-col overflow-hidden rounded-md bg-white',
        type === 'ads' && 'max-h-[initial] overflow-visible',
      )}
    >
      {!notModal && (
        <div
          className={cn(
            'gap-8pxr0pxr bg-blueDefault px-20pxr py-10pxr flex items-center justify-between',
          )}
        >
          <h2 className={cn('text-16pxr font-semibold text-white')}>
            {t('title.quotationTitle')}
          </h2>
          <button
            className={cn(
              'group/closeButton p-8pxr rounded-full border border-white transition-all duration-200 hover:bg-white active:bg-white',
            )}
            type="button"
            onClick={closeModal}
          >
            <X
              className={cn(
                'text-white transition-all duration-200 group-hover/closeButton:text-black group-active/closeButton:text-black',
              )}
              size={16}
            />
          </button>
        </div>
      )}
      <div
        className={cn(
          'px-20pxr py-10pxr border-grayLight gap-12pxr flex items-center justify-between border-b shadow-sm',
          'mb:flex-col',
        )}
      >
        <div>
          <p className={cn('text-14pxr text-blackLight')}>
            • {t('description.pcOptimizedNotice')}
          </p>
          <p className={cn('text-14pxr text-blackLight')}>
            • {t('description.printNotice')}
          </p>
        </div>

        {!isWebView ? (
          <button
            className={cn(
              'group/downloadButton px-8pxr py-4pxr border-grayDefault text-blackLight gap-4pxr text-14pxr flex items-center rounded-full border text-nowrap transition-all duration-200',
              'hover:border-blueDefault hover:text-blueDefault',
              'active:border-blueDefault active:text-blueDefault',
            )}
            type="button"
            onClick={handleDownload}
            disabled={isPdfDownloading}
          >
            <Download
              className={cn(
                'text-blackLight transition-all duration-200',
                'group-hover/downloadButton:text-blueDefault group-active/downloadButton:text-blueDefault',
              )}
              size={16}
            />
            {t('button.download')}
          </button>
        ) : (
          <button
            className={cn(
              'group/printButton px-8pxr py-4pxr border-grayDefault text-blackLight gap-4pxr text-14pxr flex items-center rounded-full border text-nowrap transition-all duration-200',
              'hover:border-blueDefault hover:text-blueDefault',
              'active:border-blueDefault active:text-blueDefault',
            )}
            type="button"
            onClick={handlePrint}
          >
            <Printer
              className={cn(
                'text-blackLight transition-all duration-200',
                'group-hover/printButton:text-blueDefault group-active/printButton:text-blueDefault',
              )}
              size={16}
            />
            {t('button.print')}
          </button>
        )}
      </div>

      <div
        className={cn(
          'px-20pxr py-10pxr gap-18pxr flex flex-col overflow-y-scroll',
          type === 'ads' && 'overflow-y-visible',
        )}
        ref={quotationRef}
      >
        {/* Title */}
        <div className={cn('border-grayLight p-16pxr border text-center')}>
          <h2 className={cn('text-24pxr font-medium')}>
            워크비자 서비스 견적서
          </h2>
        </div>

        {/* Company Info */}
        <div className={cn('')}>
          <div className={cn('flex items-center')}>
            <span className={cn('text-14pxr')}>◎ 수신 : {user.name}</span>
          </div>

          <div className={cn('border-grayLight border')}>
            <table className={cn('text-14pxr w-full')}>
              <tbody>
                <tr>
                  <td
                    rowSpan={4}
                    className={cn(
                      'p-8pxr border-grayLight bg-grayLighter w-[10%] border-r text-center',
                    )}
                  >
                    공급자
                  </td>

                  <td
                    className={cn(
                      'border-grayLight p-8pxr bg-grayLighter w-[15%] border-r border-b text-center',
                    )}
                  >
                    법인명
                  </td>
                  <td
                    className={cn(
                      'border-grayLight p-8pxr w-[30%] border-r border-b',
                    )}
                  >
                    {COMPANY_INFO.name}
                  </td>

                  <td
                    rowSpan={2}
                    className={cn(
                      'border-grayLight p-8pxr bg-grayLighter w-[10%] border-r border-b text-center',
                    )}
                  >
                    대표
                  </td>
                  <td
                    rowSpan={2}
                    className={cn(
                      'border-grayLight p-8pxr relative w-[40%] border-b',
                    )}
                  >
                    <div className={cn('gap-8pxr flex items-center')}>
                      <span>{COMPANY_INFO.ceo}</span>

                      <Image
                        className={cn('h-60pxr w-60pxr select-none')}
                        src={sealImpressionImage}
                        alt="인감도장"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    className={cn(
                      'border-grayLight p-8pxr bg-grayLighter border-r border-b text-center',
                    )}
                  >
                    사업자번호
                  </td>
                  <td
                    className={cn('border-grayLight p-8pxr border-r border-b')}
                  >
                    {COMPANY_INFO.businessNumber}
                  </td>
                </tr>
                <tr>
                  <td
                    className={cn(
                      'border-grayLight p-8pxr bg-grayLighter border-r border-b text-center',
                    )}
                  >
                    업태
                  </td>
                  <td
                    className={cn('border-grayLight p-8pxr border-r border-b')}
                  >
                    {COMPANY_INFO.type}
                  </td>
                  <td
                    className={cn(
                      'border-grayLight p-8pxr bg-grayLighter border-r border-b text-center',
                    )}
                  >
                    품목
                  </td>
                  <td className={cn('border-grayLight p-8pxr border-b')}>
                    {COMPANY_INFO.business}
                  </td>
                </tr>
                <tr>
                  <td
                    className={cn(
                      'border-grayLight p-8pxr bg-grayLighter border-r text-center',
                    )}
                  >
                    사업장주소
                  </td>
                  <td colSpan={3} className={cn('p-8pxr')}>
                    {COMPANY_INFO.address}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {quotation}
      </div>
      {/* Action Button */}
      <div
        className={cn(
          'py-20pxr border-grayLight flex justify-center border-t shadow-sm',
        )}
      >
        {isWebView ? (
          <button
            className={cn(
              'group/downloadButton px-8pxr py-4pxr border-grayDefault text-blackLight gap-4pxr text-14pxr flex items-center rounded-full border text-nowrap transition-all duration-200',
              'hover:border-blueDefault hover:text-blueDefault',
              'active:border-blueDefault active:text-blueDefault',
            )}
            type="button"
            onClick={handleDownload}
            disabled={isPdfDownloading}
          >
            <Download
              className={cn(
                'text-blackLight transition-all duration-200',
                'group-hover/downloadButton:text-blueDefault group-active/downloadButton:text-blueDefault',
              )}
              size={16}
            />
            {t('button.download')}
          </button>
        ) : (
          <button
            className={cn(
              'group/printButton px-8pxr py-4pxr border-grayDefault text-blackLight gap-4pxr text-14pxr flex items-center rounded-full border text-nowrap transition-all duration-200',
              'hover:border-blueDefault hover:text-blueDefault',
              'active:border-blueDefault active:text-blueDefault',
            )}
            type="button"
            onClick={handlePrint}
          >
            <Printer
              className={cn(
                'text-blackLight transition-all duration-200',
                'group-hover/printButton:text-blueDefault group-active/printButton:text-blueDefault',
              )}
              size={16}
            />
            {t('button.print')}
          </button>
        )}
      </div>
    </div>
  )
}

export { ModalQuotation }
