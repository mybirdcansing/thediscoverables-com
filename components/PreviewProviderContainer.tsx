import PreviewProvider from 'components/PreviewProvider'
import { readToken } from 'lib/sanity.api'
import React from 'react'

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
