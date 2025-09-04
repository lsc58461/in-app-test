'use client'

import { cn } from '@/utils/cn'

function JobPostingCardSkeleton() {
  return (
    <div
      className={cn(
        'p-12pxr gap-20pxr relative flex w-full items-center justify-between rounded-3xl border bg-white/50 transition-all',
      )}
    >
      <div className={cn('gap-12pxr flex w-full flex-col')}>
        <ul className={cn('gap-4pxr flex flex-wrap')}>
          <li className={cn('gap-2pxr flex items-center')}>
            <div
              className={cn(
                'animate-skeleton-bg-gray h-18pxr w-80pxr rounded-lg',
                'max1200:h-16pxr',
                'max700:h-14pxr',
              )}
            />
          </li>
          <li className={cn('gap-2pxr flex items-center')}>
            <div
              className={cn(
                'animate-skeleton-bg-gray h-18pxr w-60pxr rounded-lg',
                'max1200:h-16pxr',
                'max700:h-14pxr',
              )}
            />
          </li>
        </ul>

        <div className={cn('gap-4pxr flex flex-col')}>
          <div
            className={cn(
              'animate-skeleton-bg-gray h-24pxr w-full max-w-[400px] rounded-md',
              'max1200:h-20pxr',
              'max900:h-18pxr',
              'max700:h-16pxr',
            )}
          />
          <div
            className={cn(
              'animate-skeleton-bg-gray h-24pxr w-2/3 max-w-[300px] rounded-md',
              'max1200:h-20pxr',
              'max900:h-18pxr',
              'max700:h-16pxr',
            )}
          />
        </div>

        <div className={cn('gap-2pxr flex flex-wrap items-center')}>
          <div
            className={cn(
              'animate-skeleton-bg-gray h-14pxr w-220pxr rounded-md',
              'max900:h-12pxr',
            )}
          />
        </div>
      </div>

      <div
        className={cn(
          'gap-8pxr ml-4 flex flex-col items-center',
          'max700:gap-6pxr',
          'mb:hidden',
        )}
      >
        <div
          className={cn(
            'animate-skeleton-bg-gray h-36pxr w-150pxr rounded-2xl',
            'max1200:h-32pxr max1200:w-140pxr',
            'max800:h-30pxr max800:w-120pxr',
          )}
        />

        <div className={cn('gap-8pxr flex items-center justify-end')}>
          <div
            className={cn(
              'animate-skeleton-bg-gray size-34pxr rounded-full',
              'max700:size-28pxr',
            )}
          />
          <div
            className={cn(
              'animate-skeleton-bg-gray size-34pxr rounded-full',
              'max700:size-28pxr',
            )}
          />
        </div>
      </div>

      <div className={cn('hidden', 'mb:flex')}>
        <div
          className={cn('animate-skeleton-bg-gray size-24pxr rounded-full')}
        />
      </div>
    </div>
  )
}

export { JobPostingCardSkeleton }
