'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface IUseModalProps {
  scrollable?: boolean
  isNested?: boolean
}

function useModal(options?: IUseModalProps) {
  const dimRef = useRef<HTMLDivElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [setIsModalOpen])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [setIsModalOpen])

  const toggleModal = useCallback(() => {
    setIsModalOpen((prev) => !prev)
  }, [setIsModalOpen])

  useEffect(() => {
    if (options?.isNested) return
    if (isModalOpen && options?.scrollable) return

    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      return
    }

    document.body.style.overflow = 'auto'
  }, [isModalOpen, options?.isNested, options?.scrollable])

  return {
    dimRef,
    isModalOpen,
    openModal,
    closeModal,
    toggleModal,
    setIsModalOpen,
  }
}

export { useModal }
