import { usePlayerContext } from 'lib/playerContext'
import React from 'react'

export const HeaderView = () => {
  const playerContext = usePlayerContext()
  const { activeSong, setActiveSong } = playerContext
  React.useEffect(() => {
    setTimeout(() => {
      setActiveSong({ _id: '234', title: 'Just Let Go' })
    }, 4000)
  })
  return (
    <header>
      Active Song: {activeSong?.title}
      <button></button>
    </header>
  )
}
