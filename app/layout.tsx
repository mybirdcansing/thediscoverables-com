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
  const { isEnabled } = draftMode()

  return (
    <html>
      <body>
        <WindowProvider>
          <PlayerProvider>
            <PreviewProviderContainer isEnabled={isEnabled}>
              <AppLayout>{children}</AppLayout>
            </PreviewProviderContainer>
          </PlayerProvider>
        </WindowProvider>
        {isEnabled && <VisualEditingView />}
      </body>
    </html>
  )
}
