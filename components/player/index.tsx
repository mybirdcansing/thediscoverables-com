import cx from 'classnames'
import { usePlayerContext } from 'lib/playerContext'
import React from 'react'

import Container from '../Container'

export const Player = () => {
  const playerContext = usePlayerContext()
  const { state } = playerContext
  const { activeSong, playlist } = state

  React.useEffect(() => {
    console.log('Active song was changed', activeSong, playlist)
  }, [activeSong, playlist])

  return (
    <div
      className={cx('fixed bottom-0 bg-slate-400 w-full p-4', {
        hidden: !activeSong,
      })}
    >
      <Container>Player Active Song: {activeSong?.title}</Container>
    </div>
  )
}
