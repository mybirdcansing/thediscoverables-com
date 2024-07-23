import { Settings } from 'lib/types/settings'
import dynamic from 'next/dynamic'
import React from 'react'

import { useDraftMode } from './hooks/useDraftMode'
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
}

const SettingsContext = React.createContext<Settings | undefined>(undefined)

export const SettingsProvider = ({
  children,
  settings,
}: SettingsProviderProps) => {
  const draftMode = useDraftMode()

  const memoizedSettings = React.useMemo(() => settings, [settings])

  if (draftMode) {
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
    <SettingsContext.Provider value={memoizedSettings}>
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
