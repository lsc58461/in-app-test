/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * 디바운스 함수에 대한 옵션 인터페이스
 */
interface DebounceOptions {
  /** 대기 시간 (밀리초) */
  wait: number
  /** 마지막 호출을 반드시 실행할지 여부 */
  ensureLastCall?: boolean
}

/**
 * 향상된 디바운스 함수를 생성합니다.
 * Promise를 지원하고, 마지막 호출 보장 옵션을 제공합니다.
 */
function debounce<T extends (...args: any[]) => any>(
  func: T,
  options: number | DebounceOptions,
): ((...args: Parameters<T>) => Promise<ReturnType<T>>) & {
  cancel: () => void
} {
  const wait = typeof options === 'number' ? options : options.wait
  const ensureLastCall =
    typeof options === 'object' ? options.ensureLastCall : false

  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null

  const debounced = async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve, reject) => {
      lastArgs = args

      const executeFunc = () => {
        try {
          const result = func(...lastArgs!)
          resolve(result)
        } catch (error) {
          reject(error)
        }
        lastArgs = null
      }

      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        executeFunc()
        timeout = null
      }, wait)
    })
  }

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    if (ensureLastCall && lastArgs) {
      func(...lastArgs)
      lastArgs = null
    }
  }

  return debounced
}

export { debounce, type DebounceOptions }
