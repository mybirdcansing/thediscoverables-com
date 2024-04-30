import AlertBanner from 'components/AlertBanner'
import Container from 'components/PageContainer'
import { PlayerProvider } from 'lib/playerContext'
import React from 'react'

import { HeaderView } from './HeaderView'

export default function MainLayout({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <AlertBanner preview={preview} loading={loading} />
      <PlayerProvider>
        <Container>
          <HeaderView />
          <main>{children}</main>
          <footer>footer</footer>
          <div>player</div>
        </Container>
      </PlayerProvider>
    </>
  )
}
