import AlertBanner from 'components/AlertBanner'
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
    <div>
      <AlertBanner preview={preview} loading={loading} />
      <PlayerProvider>
        <HeaderView />

        <main>{children}</main>
        <footer>footer</footer>
        <div>player</div>
      </PlayerProvider>
    </div>
  )
}
