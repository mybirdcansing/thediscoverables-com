import { usePlayerContext } from 'lib/playerContext'

import { Player } from './Player'

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
