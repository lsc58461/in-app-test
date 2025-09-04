// 채용 공고 지원 타입 (간편 지원, 홈페이지 지원, SMS 지원)
export type TApplyType = 'SIMPLE' | 'HOMEPAGE' | 'SMS'

// 채용 공고 상태 타입 (진행 중, 마감, 임시 저장, 전체)
export type TStatusType = 'inProgress' | 'closed' | 'draft' | 'all'

// 고용 형태 (사무직, 현장직, 재택근무)
export type TJobCategory = 'OFFICE' | 'FIELD' | 'HOME'
