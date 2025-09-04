'use client'

import { JobPostingCardSkeleton } from './job-posting-card-skeleton'

function JobPostingCardSkeletonList() {
  return Array.from({ length: 20 }).map((_, index) => (
    <JobPostingCardSkeleton key={`job-posting-card-skeleton-${index + 1}`} />
  ))
}

export { JobPostingCardSkeletonList }
