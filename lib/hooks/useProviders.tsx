import { useDraftMode } from 'lib/hooks/useDraftMode'
import { SettingsProvider } from 'lib/settingsContext'
import type { Settings } from 'lib/types/settings'
import dynamic from 'next/dynamic'
import React from 'react'

const PreviewProvider = dynamic(() => import('components/PreviewProvider'))

export const useProviders = ({
  children,
  settings,
  token,
}: {
  children: React.ReactNode
  settings: Settings
  token: string
}) => {
  const draftMode = useDraftMode()

  if (draftMode) {
    return (
      <PreviewProvider token={token}>
        <SettingsProvider settings={settings}>{children}</SettingsProvider>
      </PreviewProvider>
    )
  }

  return <SettingsProvider settings={settings}>{children}</SettingsProvider>
}
