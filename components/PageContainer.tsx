'use client'
import { usePlayerContext } from 'lib/playerContext'
import dynamic from 'next/dynamic'

const Player = dynamic(() =>
  import('components/player').then((mod) => mod.Player),
)

interface PageContainerProps {
  children: React.ReactNode
}

export const PageContainer = ({ children }: PageContainerProps) => {
  const {
    state: { activeSong },
  } = usePlayerContext()

  return (
    <>
      <>{children}</>
      {!!activeSong && <Player />}
    </>
  )
}
