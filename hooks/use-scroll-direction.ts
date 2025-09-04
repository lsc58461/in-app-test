'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface IUseScrollDirectionProps {
  scrollThreshold?: number
  throttleDelay?: number
}

const DEFAULT_SCROLL_THRESHOLD = 20 // 높을 수록 스크롤 방향 변경이 덜 민감해짐
const DEFAULT_THROTTLE_DELAY = 16 // ~60fps

function useScrollDirection(options?: IUseScrollDirectionProps) {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  const updateScrollState = useCallback(() => {
    const currentScrollY = window.scrollY
    const threshold = options?.scrollThreshold || DEFAULT_SCROLL_THRESHOLD

    // 임계값 이상 내려갔는지 확인
    const newIsScrolled = currentScrollY > threshold
    if (newIsScrolled !== isScrolled) {
      setIsScrolled(newIsScrolled)
    }

    // 스크롤 방향 결정 (최소 변화량 확인)
    const scrollDiff = currentScrollY - lastScrollY.current
    if (Math.abs(scrollDiff) > 5) {
      // 최소 5px 이상 스크롤해야 방향 변경
      const newDirection = scrollDiff > 0 ? 'down' : 'up'
      setScrollDirection((prev) =>
        prev !== newDirection ? newDirection : prev,
      )
    }

    lastScrollY.current = currentScrollY
    ticking.current = false
  }, [isScrolled, options?.scrollThreshold])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const handleScroll = () => {
      if (!ticking.current) {
        const delay = options?.throttleDelay || DEFAULT_THROTTLE_DELAY
        setTimeout(() => {
          updateScrollState()
        }, delay)
        ticking.current = true
      }
    }

    // 초기 상태 설정
    lastScrollY.current = window.scrollY

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [updateScrollState, options?.throttleDelay])

  return { scrollDirection, isScrolled }
}

export { useScrollDirection }
