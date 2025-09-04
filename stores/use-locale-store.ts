import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Language } from '@/constants/language-list'
import { Locales } from '@/types/locales'

interface ILocaleStore {
  locale: Language
  setLocale: (locale: Language) => void
}

const useLocaleStore = create(
  persist<ILocaleStore>(
    (set) => ({
      locale: {
        locale: 'ko' as Locales,
        koreanText: '한국어',
        originalText: 'Korean',
      },
      setLocale: (locale: Language) => set({ locale }),
    }),
    {
      name: 'locale',
    },
  ),
)

export { useLocaleStore }
