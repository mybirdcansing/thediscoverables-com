import { Player } from 'components/player'
import { usePlayerContext } from 'lib/playerContext'

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
