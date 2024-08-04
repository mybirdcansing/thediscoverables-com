'use client'
import { VisualEditing } from 'next-sanity'
import React from 'react'

export const VisualEditingView = (): React.ReactElement | undefined => {
  return (
    <div data-testid="visual-editing">
      <VisualEditing />
    </div>
  )
}
