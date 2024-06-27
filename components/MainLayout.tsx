import AlertBanner from 'components/AlertBanner'
import { Settings } from 'lib/types/content'
import React from 'react'

import { Footer } from './Footer'
import { Player } from './player'

export default function MainLayout({
  preview,
  loading,
  children,
  settings,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
  settings: Settings
}) {
  return (
    <>
      <AlertBanner preview={preview} loading={loading} />
      <main className="min-h-screen relative">{children}</main>
      <Footer settings={settings} />
      <Player />
    </>
  )
}
