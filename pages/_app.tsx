import 'tailwindcss/tailwind.css'
import '../styles.css'

import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
import { AppLayout } from 'components/AppLayout'
import { PlayerProvider } from 'lib/playerContext'
import { SharedPageProps } from 'lib/types/pages'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const PreviewProvider = dynamic(() => import('components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      <PlayerProvider>
        <AppLayout>
          {draftMode ? (
            <PreviewProvider token={token}>
              <Component {...pageProps} />
            </PreviewProvider>
          ) : (
            <Component {...pageProps} />
          )}
        </AppLayout>
      </PlayerProvider>
      {draftMode && <VisualEditing />}
    </>
  )
}
