import AlertBanner from 'components/AlertBanner'
import { PlayerProvider } from 'lib/playerContext'
import React from 'react'

import { Footer } from './Footer'
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
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Player />
      </PlayerProvider>
    </>
  )
}
