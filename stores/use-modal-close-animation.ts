import { create } from 'zustand'

interface IModalCloseAnimationStore {
  /**
   * 신규 API: 모달 ID 기반 애니메이션 상태
   * - 다중/중첩 모달을 제한 없이 지원
   */
  animatingMap: Record<string, boolean>
  /** 특정 모달(id)의 애니메이션 상태 설정 */
  setAnimating: (id: string, value: boolean) => void
  /**
   * 편의 함수: 닫기 애니메이션 → 콜백 → 애니메이션 해제까지 한 번에 처리
   * 기본 지연 시간은 190ms (현재 CSS 애니메이션 지속 시간과 일치)
   */
  animateAndRun: (id: string, fn: () => void, delay?: number) => void
  /** 특정 id만 초기화하거나, id 미지정 시 전체 초기화 */
  clear: (id?: string) => void

  /**
   * 기존 하위 호환 API (배열 인덱스 기반)
   * - 0: 중첩 모달, 1: 루트 모달로 사용하던 관례를 유지
   * - 신규 구현에서는 setLevelAnimating 사용을 권장
   */
  isAnimating: boolean[]
  setIsAnimating: (isAnimating: boolean[]) => void
  setLevelAnimating: (level: number, value: boolean) => void
}

// 중첩 모달 다수 지원: id 기반 상태 + 하위 호환(배열) 유지
const useModalCloseAnimation = create<IModalCloseAnimationStore>(
  (set, get) => ({
    // 신규: ID 기반 상태
    animatingMap: {},
    setAnimating: (id, value) =>
      set((state) => ({
        animatingMap: { ...state.animatingMap, [id]: value },
      })),
    animateAndRun: (id, fn, delay = 190) => {
      const { setAnimating } = get()
      setAnimating(id, true)
      setTimeout(() => {
        try {
          fn()
        } finally {
          setAnimating(id, false)
        }
      }, delay)
    },
    clear: (id) =>
      set((state) =>
        id
          ? { animatingMap: { ...state.animatingMap, [id]: false } }
          : { animatingMap: {} },
      ),

    // 하위 호환: 배열 기반 상태 (기존 컴포넌트가 그대로 동작하도록 유지)
    isAnimating: [false, false],
    setIsAnimating: (isAnimating) => set({ isAnimating }),
    setLevelAnimating: (level, value) =>
      set((state) => {
        const next = state.isAnimating.slice()
        while (next.length <= level) next.push(false)
        next[level] = value
        return { isAnimating: next }
      }),
  }),
)

export { useModalCloseAnimation }
