import { RefObject } from 'react'
import { create } from 'zustand'

interface IUseLanguageModalStore {
  dimRef: RefObject<HTMLDivElement | null>
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  toggleModal: (locale: boolean) => void
}

const useLanguageModalStore = create<IUseLanguageModalStore>((set) => ({
  dimRef: { current: null },
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}))

export { useLanguageModalStore }
