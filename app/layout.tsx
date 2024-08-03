import 'tailwindcss/tailwind.css'
import '../styles.css'

import { AppLayout } from 'components/AppLayout'
import { VisualEditingView } from 'components/VisualEditingView'
import { PlayerProvider } from 'lib/playerContext'
import { WindowProvider } from 'lib/windowContext'
import { draftMode } from 'next/headers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isEnabled: draftModeEnabled } = draftMode()
  return (
    <html>
      <body>
        <WindowProvider>
          <PlayerProvider>
            <AppLayout>{children}</AppLayout>
          </PlayerProvider>
        </WindowProvider>
        {draftModeEnabled && <VisualEditingView />}
      </body>
    </html>
  )
}
