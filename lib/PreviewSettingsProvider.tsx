'use client'
import type { Settings } from 'lib/types/settings'
import { useLiveQuery } from 'next-sanity/preview'
import React from 'react'

import { settingsQuery } from './sanity.queries'

export interface PreviewSettingsProviderProps {
  children: React.ReactNode
  initialSettings: Settings
  settingsContext: React.Context<Settings | undefined>
}

export const PreviewSettingsProvider = ({
  initialSettings,
  children,
  settingsContext,
}: PreviewSettingsProviderProps) => {
  const [settings] = useLiveQuery<Settings>(initialSettings, settingsQuery)

  const memoizedSettings = React.useMemo(() => settings, [settings])

  return (
    <settingsContext.Provider value={memoizedSettings}>
      {children}
    </settingsContext.Provider>
  )
}
