'use client'
import { Settings } from 'lib/types/settings'
import dynamic from 'next/dynamic'
import React from 'react'

import { PreviewSettingsProviderProps } from './PreviewSettingsProvider'

const PreviewSettingsProvider = dynamic<PreviewSettingsProviderProps>(
  () =>
    import('./PreviewSettingsProvider').then(
      (mod) => mod.PreviewSettingsProvider,
    ),
  {
    ssr: false,
  },
)

interface SettingsProviderProps {
  children: React.ReactNode
  settings: Settings
  isDraft: boolean
}

const SettingsContext = React.createContext<Settings | undefined>(undefined)

export const SettingsProvider = ({
  children,
  settings,
  isDraft,
}: SettingsProviderProps) => {
  const providerSettings = React.useMemo(() => settings, [settings])

  if (isDraft) {
    return (
      <PreviewSettingsProvider
        initialSettings={settings}
        settingsContext={SettingsContext}
      >
        {children}
      </PreviewSettingsProvider>
    )
  }

  return (
    <SettingsContext.Provider value={providerSettings}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = (): Settings => {
  const context = React.useContext(SettingsContext)

  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }

  return context ?? {}
}
