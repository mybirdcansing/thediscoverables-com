import AlertBanner from 'components/AlertBanner'
import { PlayerProvider } from 'lib/pageContext'
import React from 'react'

export default function MainLayout({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  const [ticker, setTicker] = React.useState(0)

  React.useEffect(() => {
    setTimeout(() => {
      setTicker(ticker + 1)
    }, 1000)
  }, [ticker])

  return (
    <div>
      <AlertBanner preview={preview} loading={loading} />
      <PlayerProvider>
        <header>Header {ticker}</header>
        <main>{children}</main>
        <footer>footer</footer>
        <div>player</div>
      </PlayerProvider>
    </div>
  )
}
