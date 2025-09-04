import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { TIsHousingSupport } from '@/constants/is-housing-support-list'
import { TIsWorkPermitHolder } from '@/constants/is-work-permit-holder-list'
import { TJobType } from '@/constants/job-type-list'
import { TResponsibility } from '@/constants/responsibility-list'
import { TVisaSupport } from '@/constants/visa-support-list'
import { TApplyType, TJobCategory } from '@/types/job-posting'
import { VisaType } from '@/types/visa'

export type TPayType = 'DAILY' | 'HOURLY' | 'MONTHLY' | 'YEARLY'

export type TDay = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'

export interface IWorkDays {
  days?: TDay[] | null
  lessThanOneMonth?: boolean | null
  isAdjustable?: boolean | null
}

export interface IWorkHours {
  startTime?: string | null
  endTime?: string | null
  overTime?: boolean | null
  isAdjustable?: boolean | null
  isNextDay?: boolean | null
}

export interface IPay {
  payType?: TPayType
  payAmount?: number | null
  payday?: string | null
  isFirstWorkdayBasedPay?: boolean | null
  isSameDayPayment?: boolean | null
  isCompanyPolicy?: boolean | null
  isAdjustable?: boolean | null
}

export interface IPreferredLanguageSkill {
  languageName?: string | null
  languageLevel?: 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE' | null
}

export interface ICompanyAddress {
  addressName?: string | null
  detailAddress?: string | null
}

export interface IContactPerson {
  name?: string | null
  phoneNumber?: string | null
  isPhoneNumberPublic?: boolean | null
}

export interface IJobPosting {
  responsibility?: TResponsibility | null
  jobType?: TJobType[] | null
  jobCategory?: TJobCategory | null
  isWorkPermitHolder?: TIsWorkPermitHolder | null
  isHousingSupport?: TIsHousingSupport[] | null
  workDays?: IWorkDays | null
  workHours?: IWorkHours | null
  gender?: 'NONE' | 'MALE' | 'FEMALE' | null
  pay?: IPay | null
  preferredLanguageSkill?: IPreferredLanguageSkill[] | null
  closingDate?: string | 'always' | null
  recruitmentMethod?: TApplyType | null
  companyWebsite?: string | null
  receivePhoneNumber?: string | null
  preferredVisa?: VisaType[] | null
  companyAddress?: ICompanyAddress | null
  managerInformation?: IContactPerson | null
  postingTitle?: string | null
  isRecruitmentUnlimit?: boolean | null
  isRecruitmentOnePerson?: boolean | null
  isRecruitmentCount?: boolean | null
  recruitmentCount?: number | null
  hasMoreThanFiveKoreanWorkers?: boolean | null
  visaSupportAvailable?: TVisaSupport | null
  postingDescription?: string | null
  updatedAt: Date | null | undefined
}

interface IUseJobPostingStore {
  jobPosting: IJobPosting
  setJobPosting: (jobPosting: IJobPosting) => void
  allReset: () => void
  hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
}

const useJobPostingStore = create(
  devtools(
    persist<IUseJobPostingStore>(
      (set) => ({
        jobPosting: {
          responsibility: null,
          jobType: [],
          jobCategory: null,
          isWorkPermitHolder: null,
          isHousingSupport: null,
          workDays: {
            days: null,
            lessThanOneMonth: null,
            isAdjustable: false,
          },
          workHours: {
            startTime: null,
            endTime: null,
            overTime: null,
            isAdjustable: false,
            isNextDay: false,
          },
          gender: null,
          pay: {
            payType: 'DAILY',
            payAmount: null,
            payday: null,
            isFirstWorkdayBasedPay: false,
            isSameDayPayment: false,
            isCompanyPolicy: false,
            isAdjustable: false,
          },
          preferredLanguageSkill: null,
          closingDate: null,
          recruitmentMethod: null,
          companyWebsite: null,
          receivePhoneNumber: null,
          preferredVisa: null,
          companyAddress: null,
          managerInformation: {
            name: null,
            phoneNumber: null,
            isPhoneNumberPublic: true,
          },
          postingTitle: null,
          isRecruitmentUnlimit: false,
          isRecruitmentOnePerson: false,
          isRecruitmentCount: false,
          hasMoreThanFiveKoreanWorkers: null,
          recruitmentCount: null,
          visaSupportAvailable: null,
          postingDescription: null,
          updatedAt: null,
        },
        setJobPosting: (jobPosting) => set({ jobPosting }),
        allReset: () =>
          set({
            jobPosting: {
              responsibility: null,
              jobType: [],
              jobCategory: null,
              isWorkPermitHolder: null,
              isHousingSupport: null,
              workDays: {
                days: null,
                lessThanOneMonth: null,
                isAdjustable: false,
              },
              workHours: {
                startTime: null,
                endTime: null,
                overTime: null,
                isAdjustable: false,
                isNextDay: false,
              },
              gender: null,
              pay: {
                payType: 'DAILY',
                payAmount: null,
                payday: null,
                isFirstWorkdayBasedPay: false,
                isSameDayPayment: false,
                isCompanyPolicy: false,
                isAdjustable: false,
              },
              preferredLanguageSkill: null,
              closingDate: null,
              recruitmentMethod: null,
              companyWebsite: null,
              receivePhoneNumber: null,
              preferredVisa: null,
              companyAddress: null,
              managerInformation: {
                name: null,
                phoneNumber: null,
                isPhoneNumberPublic: true,
              },
              postingTitle: null,
              isRecruitmentUnlimit: false,
              isRecruitmentOnePerson: false,
              isRecruitmentCount: false,
              recruitmentCount: null,
              hasMoreThanFiveKoreanWorkers: null,
              visaSupportAvailable: null,
              postingDescription: null,
              updatedAt: null,
            },
          }),
        hasHydrated: false,
        setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      }),
      {
        name: 'jobPosting',
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true)
        },
      },
    ),
  ),
)

export { useJobPostingStore }
