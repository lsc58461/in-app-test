import { FilterCategory } from '@/hooks/use-filter'

function jobPostingInitialCategories() {
  const initialCategories: FilterCategory[] = [
    {
      id: 'jobPostingType',
      label: '채용공고카테고리',
      type: 'checkbox',
      options: [
        {
          id: 'recommendJobPosting',
          label: '추천 공고',
          checked: true,
        },
        {
          id: 'normalJobPosting',
          label: '일반 공고',
          checked: true,
        },
      ],
    },
    {
      id: 'residence',
      label: '지역',
      type: 'modal',
      options: [], // 빈 배열로 초기화 - 모달 타입은 사용자 입력에 따라 동적으로 옵션이 추가됨
    },
    {
      id: 'responsibility',
      label: '업무내용',
      type: 'modal',
      options: [], // 빈 배열로 초기화 - 모달 타입은 사용자 입력에 따라 동적으로 옵션이 추가됨
    },
    {
      id: 'preferredVisaType',
      label: '선호 visa',
      type: 'modal',
      options: [], // 빈 배열로 초기화 - 모달 타입은 사용자 입력에 따라 동적으로 옵션이 추가됨
    },
    {
      id: 'jobType',
      label: '고용형태',
      type: 'checkbox',
      options: [
        { id: 'FULLTIME', label: '정규직', checked: false },
        {
          id: 'INTERNSHIP',
          label: '인턴쉽',
          checked: false,
        },
        { id: 'PARTTIME', label: '파트타임', checked: false },
        { id: 'FREELANCER', label: '프리랜서', checked: false },
        {
          id: 'INDIRECT_EMPLOYMENT',
          label: '대리중개업무',
          checked: false,
        },
      ],
    },
    {
      id: 'jobCategory',
      label: '고용분야',
      type: 'checkbox',
      options: [
        { id: 'OFFICE', label: '사무직', checked: false },
        { id: 'FIELD', label: '장거리', checked: false },
        { id: 'HOME', label: '원격', checked: false },
      ],
    },
    {
      id: 'workDays',
      label: '근무일',
      type: 'checkbox',
      options: [
        { id: 'MON', label: '월', checked: false },
        { id: 'TUE', label: '화', checked: false },
        { id: 'WED', label: '수', checked: false },
        { id: 'THU', label: '목', checked: false },
        { id: 'FRI', label: '금', checked: false },
        { id: 'SAT', label: '토', checked: false },
        { id: 'SUN', label: '일', checked: false },
        {
          id: 'isShortTerm',
          label: '1개월 미만 근무',
          checked: false,
        },
      ],
    },
    {
      id: 'pay',
      label: '급여',
      type: 'checkbox',
      options: [
        {
          id: 'DAILY',
          label: '일급',
          checked: false,
        },
        {
          id: 'HOURLY',
          label: '시간급',
          checked: false,
        },
        {
          id: 'MONTHLY',
          label: '월급',
          checked: false,
        },
        {
          id: 'YEARLY',
          label: '년급',
          checked: false,
        },
        {
          id: 'isPayCompanyPolicy',
          label: '회사정책',
          checked: false,
        },
        {
          id: 'isPayNegotiable',
          label: '협상 가능',
          checked: false,
        },
      ],
    },
    {
      id: 'isVisaSupport',
      label: '비자 지원',
      type: 'radio',
      options: [
        { id: 'OK', label: '가능', checked: false },
        { id: 'NO', label: '불가능', checked: false },
        { id: 'NEGOTIABLE', label: '협상 가능', checked: false },
      ],
    },
    {
      id: 'availableWorkVisas',
      label: '가능한 비자',
      type: 'checkbox',
      options: [
        {
          id: 'hasMoreThanFiveKoreanWorkers',
          label: 'visaE7 가능',
          checked: false,
        },
        {
          id: 'isWorkPermitHolder',
          label: 'visaE9 가능',
          checked: false,
        },
        {
          id: 'depopulationArea',
          label: 'visaF2R 가능',
          checked: false,
        },
        {
          id: 'depopulationInterestArea',
          label: 'visaF4R 가능',
          checked: false,
        },
      ],
    },
    {
      id: 'etc',
      label: '기타',
      type: 'checkbox',
      options: [
        {
          id: 'dormitoryProvided',
          label: 'dormitoryProvided',
          checked: false,
        },
        {
          id: 'monthlyRentSupport',
          label: 'monthlyRentSupport',
          checked: false,
        },
      ],
    },
  ]

  return initialCategories
}

export { jobPostingInitialCategories }
