import 'tailwindcss/tailwind.css'
import '../styles.css'

import { AppLayout } from 'components/AppLayout'
import { PreviewProviderContainer } from 'components/PreviewProviderContainer'
import { VisualEditingView } from 'components/VisualEditingView'
import { PlayerProvider } from 'lib/playerContext'
import { WindowProvider } from 'lib/windowContext'
import { draftMode } from 'next/headers'
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isDraft = draftMode().isEnabled

  return (
    <html>
      <body>
        <WindowProvider>
          <PlayerProvider>
            <PreviewProviderContainer isEnabled={isDraft}>
              <AppLayout>{children}</AppLayout>
            </PreviewProviderContainer>
          </PlayerProvider>
        </WindowProvider>
        {isDraft && <VisualEditingView />}
      </body>
    </html>
  )
}
