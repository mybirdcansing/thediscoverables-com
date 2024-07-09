import 'tailwindcss/tailwind.css'
import '../styles.css'

import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
import { AppLayout } from 'components/AppLayout'
import { getPageProps } from 'lib/getPageProps'
import { useDraftMode } from 'lib/hooks/useDraftMode'
import { useProviders } from 'lib/hooks/useProviders'
import { PlayerProvider } from 'lib/playerContext'
import { getClient } from 'lib/sanity.client'
import { getSettings } from 'lib/sanity.getters'
import type { SharedPageProps } from 'lib/types/pages'
import type { Settings } from 'lib/types/settings'
import { WindowProvider } from 'lib/windowContext'
import type { AppContext, AppProps } from 'next/app'

interface MyAppProps extends AppProps<SharedPageProps> {
  settings: Settings
}

function App({ Component, pageProps, settings }: MyAppProps) {
  const { token } = pageProps

  const providers = useProviders({
    children: (
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    ),
    settings,
    token,
  })

  return (
    <>
      <WindowProvider>
        <PlayerProvider>{providers}</PlayerProvider>
      </WindowProvider>
      {useDraftMode() && <VisualEditing />}
    </>
  )
}

App.getInitialProps = async (appContext: AppContext) => {
  const client = getClient()
  const settings = await getSettings(client)
  const appProps = await getPageProps(appContext)

  return {
    ...appProps,
    settings,
  }
}

export default App
