import { TUserType } from './user'

// 날짜 형식 타입 (YYYY-MM-DD)
export type TDateString =
  `${number}${number}${number}${number}-${number}${number}-${number}${number}`

export type TAdsCampaign = 'MAIN_BANNER' | 'REGIONAL_TOP' | 'BOTTOM_FOCUS'

export type TAdsType = 'LANDING_PAGE' | 'RECRUIT'

export type TAdsStatus =
  | 'DRAFT'
  | 'ACTIVE'
  | 'EXPIRED'
  | 'SCHEDULED'
  | 'CANCELLED'

export type TAdsTarget = Exclude<TUserType, 'ADMIN' | null | undefined>

export type TAdsDevice = 'PC' | 'MOBILE' | 'ALL'

// 필터링을 위한 확장 타입들 (ALL 옵션 포함)
export type TAdsStatusFilter = TAdsStatus | 'ALL'

export type TAdsCampaignFilter = TAdsCampaign | 'ALL'

export type TAdsTypeFilter = TAdsType | 'ALL'

export type TAdsTargetFilter = TAdsTarget | 'EMPLOYEE+COMPANY' | 'ALL'

export type TAdsDeviceFilter = TAdsDevice | 'PC+MOBILE' | 'ALL'
