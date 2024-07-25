import { useDraftMode } from 'lib/hooks/useDraftMode'
import dynamic from 'next/dynamic'
import React from 'react'

export const usePreviewProvider = ({
  children,
  token,
}: {
  children: React.ReactNode
  token: string
}) => {
  const draftMode = useDraftMode()

  if (draftMode) {
    const PreviewProvider = dynamic(() => import('components/PreviewProvider'))
    return <PreviewProvider token={token}>{children}</PreviewProvider>
  }

  return children
}
