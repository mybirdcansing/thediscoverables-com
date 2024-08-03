'use client'
import { VisualEditing } from 'next-sanity'
import React from 'react'

export const VisualEditingView = (): React.ReactElement | undefined => {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? <VisualEditing /> : undefined
}
