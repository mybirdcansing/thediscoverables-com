import cx from 'classnames'
import { usePlayerContext } from 'lib/playerContext'
import React from 'react'

import Container from '../PageContainer'

export const Player = () => {
  const playerContext = usePlayerContext()
  const { activeSong, setActiveSong, setIsSongPlaying } = playerContext

  console.log({ activeSong })

  React.useEffect(() => {
    setTimeout(() => {
      setActiveSong({ _id: '234', title: 'Just Let Go' })
      setIsSongPlaying(true)
    }, 5000)
  })
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
