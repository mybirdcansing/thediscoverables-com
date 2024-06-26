import AlertBanner from 'components/AlertBanner'
import React from 'react'

import { Footer } from './Footer'
import { Player } from './player'

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
      <main className="min-h-screen relative">{children}</main>
      <Footer />
      <Player />
    </>
  )
}
