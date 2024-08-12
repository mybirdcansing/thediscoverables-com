import type { PreviewProviderProps } from 'components/PreviewProvider'
import { readToken } from 'lib/sanity.api'
import dynamic from 'next/dynamic'
import React from 'react'

const PreviewProvider = dynamic<PreviewProviderProps>(
  () => import('components/PreviewProvider').then((mod) => mod.default),
  { ssr: false },
)

export const PreviewProviderContainer = ({
  children,
  isEnabled,
}: {
  children: React.ReactNode
  isEnabled?: boolean
}): React.ReactNode => {
  if (isEnabled) {
    return <PreviewProvider token={readToken}>{children}</PreviewProvider>
  }

  return children
}
