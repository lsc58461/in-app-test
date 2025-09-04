import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { VisaType } from '@/types/visa'

export interface IWorkExperience {
  startDate?: string | Date | null
  endDate?: string | Date | null
  companyName?: string | null
  position?: string | null
  jobDuties?: string | null
  reasonForLeaving?: string | null
  isError?: boolean | null
}

export interface IEducationBackground {
  startDate?: string | Date | null
  endDate?: string | Date | null
  schoolName?: string | null
  major?: string | null
  gpa?: string | null
  isError?: boolean | null
}

export interface ILanguageSkill {
  languageName?: string | null
  languageLevel?: string | null
  isError?: boolean | null
}

export interface ICertificate {
  certName?: string | null
  certLevel?: string | null
  isError?: boolean | null
}

export interface IAdditionalActivity {
  startDate?: string | Date | null
  endDate?: string | Date | null
  organizationName?: string | null
  details?: string | null
  remarks?: string | null
  isError?: boolean | null
}

export interface IResidence {
  addressName: string | null | undefined
  region1?: string | null | undefined
  region2?: string | null | undefined
  region3?: string | null | undefined
  fullAddress?: string | null | undefined
}

export interface ICreatorInfo {
  platform?: 'youtube' | 'tiktok' | null
  channelLink?: string | null
}

export type TDegree =
  | 'HIGHSCHOOL' // 고등학교
  | 'LANGUAGE_SCHOOL' // 어학원
  | 'ASSOCIATE' // 전문학사
  | 'BACHELOR' // 학사
  | 'MASTER' // 석사
  | 'DOCTOR' // 박사

export type TKoreanCertType = 'TOPIK' | 'KIIP' | 'NONE'

export interface IResume {
  englishName?: string | null
  koreanName?: string | null
  nationality?: string | null
  phoneNumber?: string | null
  birthDate?: string | null
  residence?: IResidence
  idPhotoUrl?: string | null
  gender?: string | null
  isRelocate?: boolean | null
  isOverTime?: boolean | null
  currentVisa?: VisaType | null
  preferredVisa?: VisaType | null
  isSelectedWriteGradFromSchool?: boolean | null
  gradCertImgUrl?: string | null
  isGradInKorea?: boolean | null
  highestDegree?: TDegree | null
  isSelectedWriteKoreanCert?: boolean | null
  koreanCertImgUrl?: string | null
  koreanCertType?: TKoreanCertType | null
  koreanLevel?: string | null
  isSelectedWriteResumeDetail?: boolean | null
  WorkExperience?: IWorkExperience[] | null
  EducationBackground?: IEducationBackground[] | null
  LanguageSkill?: ILanguageSkill[] | null
  Certificate?: ICertificate[] | null
  AdditionalActivity?: IAdditionalActivity[] | null
  coverLetter?: string | null
  experienceDescription?: string | null
  recommendJob?: string[] | [] | null
  isCreator?: boolean | null
  creatorInfo?: ICreatorInfo[] | null
  updatedAt: Date | null | undefined
}

interface IUseResumeStore {
  resume: IResume
  setResume: (resume: IResume) => void
  allReset: () => void
  hasHydrated: boolean
  setHasHydrated: (hasHydrated: boolean) => void
}

const useResumeStore = create(
  devtools(
    persist<IUseResumeStore>(
      (set) => ({
        resume: {
          englishName: null,
          koreanName: null,
          nationality: null,
          phoneNumber: null,
          birthDate: null,
          residence: {
            addressName: null,
            region1: null,
            region2: null,
            region3: null,
          },
          idPhotoUrl: null,
          gender: null,
          isRelocate: null,
          isOverTime: null,
          currentVisa: 'NONE',
          preferredVisa: 'NONE',
          isSelectedWriteGradFromSchool: false,
          gradCertImgUrl: null,
          isGradInKorea: null,
          highestDegree: null,
          isSelectedWriteKoreanCert: false,
          koreanCertImgUrl: null,
          koreanLevel: null,
          koreanCertType: null,
          isSelectedWriteResumeDetail: false,
          EducationBackground: [],
          WorkExperience: [],
          LanguageSkill: [],
          Certificate: [],
          AdditionalActivity: [],
          coverLetter: null,
          experienceDescription: null,
          recommendJob: [],
          isCreator: null,
          creatorInfo: [
            {
              platform: null,
              channelLink: null,
            },
          ],
          updatedAt: null,
        },
        setResume: (resume) => set({ resume }),
        allReset: () =>
          set({
            resume: {
              englishName: null,
              koreanName: null,
              nationality: null,
              phoneNumber: null,
              birthDate: null,
              residence: {
                addressName: null,
                region1: null,
                region2: null,
                region3: null,
              },
              idPhotoUrl: null,
              gender: null,
              isRelocate: null,
              isOverTime: null,
              currentVisa: 'NONE',
              preferredVisa: 'NONE',
              isSelectedWriteGradFromSchool: false,
              gradCertImgUrl: null,
              isGradInKorea: null,
              highestDegree: null,
              isSelectedWriteKoreanCert: false,
              koreanCertImgUrl: null,
              koreanLevel: null,
              koreanCertType: null,
              isSelectedWriteResumeDetail: false,
              EducationBackground: [],
              WorkExperience: [],
              LanguageSkill: [],
              Certificate: [],
              AdditionalActivity: [],
              coverLetter: null,
              experienceDescription: null,
              recommendJob: [],
              isCreator: null,
              creatorInfo: [
                {
                  platform: null,
                  channelLink: null,
                },
              ],
              updatedAt: null,
            },
          }),
        hasHydrated: false,
        setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      }),
      {
        name: 'resume',
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true)
        },
      },
    ),
  ),
)

export { useResumeStore }
