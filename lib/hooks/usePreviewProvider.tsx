'use client'
import PreviewProvider from 'components/PreviewProvider'
import React from 'react'

export const usePreviewProvider = ({
  children,
  token,
  draftMode,
}: {
  children: React.ReactNode
  token: string
  draftMode?: boolean
}) => {
  if (draftMode) {
    return <PreviewProvider token={token}>{children}</PreviewProvider>
  }

  return children
}
