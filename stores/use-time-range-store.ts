import { create } from 'zustand'

interface IUseTimeRangeStore {
  range: number[]
  setRange: (range: number[]) => void
}

const useTimeRangeStore = create<IUseTimeRangeStore>((set) => ({
  range: [10, 35],
  setRange: (range) => set({ range }),
}))

export { useTimeRangeStore }
