import AlertBanner from 'components/AlertBanner'
import React from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

export const PageLayout = ({
  isDraft,
  loading,
  children,
  darkBg,
}: {
  isDraft?: boolean
  loading?: boolean
  children: React.ReactNode
  darkBg?: boolean
}) => {
  return (
    <>
      <AlertBanner preview={isDraft} loading={loading} />
      <Header darkBg={darkBg} />
      <main className="min-h-screen relative">{children}</main>
      <Footer />
    </>
  )
}
