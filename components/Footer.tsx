import { usePlayerContext } from 'lib/playerContext'
import { useSettings } from 'lib/settingsContext'

export const Footer = () => {
  const {
    state: { activeSong },
  } = usePlayerContext()

  const { title: bandName } = useSettings()

  return (
    <footer className="flex flex-row justify-center p-4">
      Copyright © 2019 - {new Date().getFullYear()} {bandName}
      <div className={!!activeSong ? 'h-32' : 'h-6'}></div>
    </footer>
  )
}
