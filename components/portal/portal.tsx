'use client'

import { ReactNode, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

interface IPortalProps {
  id: 'portal1' | 'portal2'
  isPortalOpen: boolean
  zIndex?: number
  outsideClick?: () => void
  children: ReactNode
}

function Portal({
  id,
  isPortalOpen,
  zIndex,
  outsideClick,
  children,
}: IPortalProps) {
  const portalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!outsideClick) return undefined

    const handleClickOutside = (event: MouseEvent) => {
      if (
        portalRef.current &&
        !portalRef.current.contains(event.target as Node)
      ) {
        outsideClick()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [outsideClick])

  if (!isPortalOpen) return null

  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', zIndex: zIndex || 9801 }} ref={portalRef}>
      {children}
    </div>,
    document.getElementById(id)!,
  )
}

export { Portal }
