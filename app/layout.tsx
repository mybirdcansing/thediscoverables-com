import 'tailwindcss/tailwind.css'
import '../styles.css'

import { CookieConsentBanner } from 'components/CookieConsentBanner'
import { PageContainer } from 'components/PageContainer'
import { PreviewProviderContainer } from 'components/PreviewProviderContainer'
import { VisualEditingView } from 'components/VisualEditingView'
import { getSanityClient } from 'lib/getSanityClient'
import { PlayerProvider } from 'lib/playerContext'
import { getSettings } from 'lib/sanity.getters'
import { SettingsProvider } from 'lib/settingsContext'
import { WindowProvider } from 'lib/windowContext'
import { draftMode } from 'next/headers'
import React from 'react'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings(getSanityClient())
  const isDraft = draftMode().isEnabled

  return (
    <html lang="en">
      <body className="min-h-screen">
        <WindowProvider>
          <PlayerProvider>
            <PreviewProviderContainer isEnabled={isDraft}>
              <SettingsProvider settings={settings} isDraft={isDraft}>
                <PageContainer>{children}</PageContainer>
                <CookieConsentBanner />
              </SettingsProvider>
            </PreviewProviderContainer>
          </PlayerProvider>
        </WindowProvider>
        {isDraft && <VisualEditingView />}
      </body>
    </html>
  )
}
