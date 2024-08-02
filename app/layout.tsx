import 'tailwindcss/tailwind.css'
import '../styles.css'

import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
import { AppLayout } from 'components/AppLayout'
import { PlayerProvider } from 'lib/playerContext'
import { WindowProvider } from 'lib/windowContext'
import { draftMode } from 'next/headers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled: isDraftModeEnabled } = draftMode()
  return (
    <html>
      <body>
        <WindowProvider>
          <PlayerProvider>
            <AppLayout>{children}</AppLayout>
          </PlayerProvider>
        </WindowProvider>
        {isDraftModeEnabled && <VisualEditing />}
      </body>
    </html>
  )
}
