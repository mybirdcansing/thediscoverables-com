import AlertBanner from 'components/AlertBanner'
import React from 'react'

import { Footer } from './Footer'

export const PageLayout = ({
  isDraft,
  loading,
  children,
}: {
  isDraft?: boolean
  loading?: boolean
  children: React.ReactNode
}) => {
  return (
    <>
      <AlertBanner preview={isDraft} loading={loading} />
      <main className="min-h-screen relative">{children}</main>
      <Footer />
    </>
  )
}
