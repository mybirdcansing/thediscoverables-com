import AlertBanner from 'components/AlertBanner'
import Container from 'components/PageContainer'
import { PlayerProvider } from 'lib/playerContext'
import React from 'react'

import { Footer } from './Footer'
import { Header } from './Header'
import { Player } from './Player'

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
          <Header />
          <main>{children}</main>
          <Footer />
          <Player />
        </Container>
      </PlayerProvider>
    </>
  )
}
