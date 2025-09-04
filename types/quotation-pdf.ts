export type TQuotationType = 'ads' | 'workerPool'

export interface ICompanyInfo {
  name: string
  ceo: string
  businessNumber: string
  type: string
  business: string
  address: string
  tel: string
  email: string
}

export interface IAdsQuotationData {
  serviceName: string
  details: string[]
  periods: string // e.g., "PC, Mobile"
  pcAdsRangesText?: string | null // pre-formatted text
  mobileAdsRangesText?: string | null // pre-formatted text
  price: number
}

export interface IWorkerPoolQuotationData {
  periodText: string // e.g., "3개월"
  unitPrice: number // discountPrice
  tickets: number
  price: number // total equals unitPrice here (for single line)
}

export interface IQuotationPDFPayload {
  type: TQuotationType
  recipientName: string
  companyInfo: ICompanyInfo
  sealImageUrl?: string
  ads?: IAdsQuotationData
  workerPool?: IWorkerPoolQuotationData
  fileName?: string // optional override
}
