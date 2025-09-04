'use client'

import { useEffect, useState } from 'react'

const useWindowWidth = () => {
  const [windowSize, setWindowSize] = useState<number | null>(
    typeof window !== 'undefined' ? window.innerWidth : null,
  )

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const handleResize = () => {
      setWindowSize(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

export { useWindowWidth }
