import { useDraftMode } from 'lib/hooks/useDraftMode'
import dynamic from 'next/dynamic'
import React from 'react'

const PreviewProvider = dynamic(() => import('components/PreviewProvider'))

export const useProviders = ({
  children,
  token,
}: {
  children: React.ReactNode
  token: string
}) => {
  const draftMode = useDraftMode()

  if (draftMode) {
    return <PreviewProvider token={token}>{children}</PreviewProvider>
  }

  return children
}
