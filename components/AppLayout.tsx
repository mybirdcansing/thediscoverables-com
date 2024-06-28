import { Player } from 'components/Player'
import { usePlayerContext } from 'lib/playerContext'

export const AppLayout = ({ children }) => {
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
