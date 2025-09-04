'use client'

import { CSSProperties, useEffect, useMemo, useState } from 'react'

import { cn } from '@/utils/cn'

function BackgroundDecoBlue({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'size-250pxr rounded-full bg-blue-500/50 blur-[50px]',
        className,
      )}
    />
  )
}

function BackgroundDecoGreen({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'size-250pxr rounded-full bg-cyan-400/50 blur-[50px]',
        className,
      )}
    />
  )
}

function BackgroundDecoPink({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'size-150pxr rounded-full bg-pink-500/50 blur-[50px]',
        className,
      )}
    />
  )
}

function BackgroundDecoPurple({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'size-200pxr rounded-full bg-purple-600/50 blur-[50px]',
        className,
      )}
    />
  )
}

function BackgroundDecoYellow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'size-100pxr rounded-full bg-yellow-400/50 blur-[50px]',
        className,
      )}
    />
  )
}

function BackgroundDeco({ currentSection }: { currentSection: number }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const positions = useMemo(
    () => ({
      blue: {
        initial: { x: '10vw', y: '50vh' },
        final: { x: '90vw', y: '0vh' },
      },
      green: {
        initial: { x: '0vw', y: '0vh' },
        final: { x: '80vw', y: '0vh' },
      },
      purple: {
        initial: { x: '15vw', y: '10vh' },
        final: { x: '10vw', y: '80vh' },
      },
      pink: {
        initial: { x: '85vw', y: '10vh' },
        final: { x: '95vw', y: '80vh' },
      },
      yellow: {
        initial: { x: '0vw', y: '0vh' },
        final: { x: '20vw', y: '20vh' },
      },
      blue2: {
        initial: { x: '8vw', y: '65vh' },
        final: { x: '55vw', y: '5vh' },
      },
    }),
    [],
  )

  const decos = useMemo(
    () => [
      {
        id: 'blue',
        section: 0,
        component: BackgroundDecoBlue,
        position: positions.blue,
      },
      {
        id: 'green',
        section: 1,
        component: BackgroundDecoGreen,
        position: positions.green,
      },
      {
        id: 'purple',
        section: 2,
        component: BackgroundDecoPurple,
        position: positions.purple,
      },
      {
        id: 'pink',
        section: 3,
        component: BackgroundDecoPink,
        position: positions.pink,
      },
      {
        id: 'yellow',
        section: 4,
        component: BackgroundDecoYellow,
        position: positions.yellow,
      },
      {
        id: 'blue2',
        section: 5,
        component: BackgroundDecoBlue,
        position: positions.blue2,
      },
    ],
    [
      positions.blue,
      positions.green,
      positions.purple,
      positions.pink,
      positions.yellow,
      positions.blue2,
    ],
  )

  return (
    <div
      className={cn('inset-0pxr pointer-events-none fixed -z-10 select-none')}
    >
      {decos.map(({ id, section, component: DecoComponent, position }) => {
        const isActive = currentSection === section
        const { x, y } =
          !isMounted || isActive ? position.initial : position.final

        return (
          <div
            key={id}
            className={cn(
              'absolute transition-transform duration-1000 ease-in-out will-change-transform',
              'max700:scale-75',
              'mb:scale-50',
            )}
            style={
              {
                '--tw-translate-x': x,
                '--tw-translate-y': y,
                transform:
                  'translate3d(var(--tw-translate-x), var(--tw-translate-y), 0)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                perspective: 1000,
              } as CSSProperties
            }
            aria-hidden
          >
            <DecoComponent />
          </div>
        )
      })}
    </div>
  )
}

export { BackgroundDeco }
