import { usePlayerContext } from 'lib/playerContext'
import dynamic from 'next/dynamic'

const Player = dynamic(() =>
  import('components/player').then((mod) => mod.Player),
)

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
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
