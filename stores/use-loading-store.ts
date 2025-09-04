import { create } from 'zustand'

type LoadingStore = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  onLoading: (duration: number) => void
}

const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  onLoading: (duration) => {
    set({ isLoading: true })
    const timeoutId = setTimeout(() => set({ isLoading: false }), duration)

    return () => clearTimeout(timeoutId)
  },
}))

export { useLoadingStore }
