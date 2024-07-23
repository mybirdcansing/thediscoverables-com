import 'tailwindcss/tailwind.css'
import '../styles.css'

import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
import { AppLayout } from 'components/AppLayout'
import { useDraftMode } from 'lib/hooks/useDraftMode'
import { usePreviewProvider } from 'lib/hooks/useProviders'
import { PlayerProvider } from 'lib/playerContext'
import type { SharedPageProps } from 'lib/types/pages'
import { WindowProvider } from 'lib/windowContext'
import type { AppProps } from 'next/app'

export type MyAppProps = AppProps<SharedPageProps>

const App = ({ Component, pageProps }: MyAppProps) => {
  const { token } = pageProps

  const wrappedPage = usePreviewProvider({
    children: (
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    ),
    token,
  })

  return (
    <>
      <WindowProvider>
        <PlayerProvider>{wrappedPage}</PlayerProvider>
      </WindowProvider>
      {useDraftMode() && <VisualEditing />}
    </>
  )
}

export default App
