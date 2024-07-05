import { usePlayerContext } from 'lib/playerContext'
import { Settings } from 'lib/types/content'

interface FooterProps {
  settings: Settings
}
export const Footer = ({ settings }: FooterProps) => {
  const {
    state: { activeSong },
  } = usePlayerContext()
  const { title } = settings
  return (
    <footer className="flex flex-row justify-center p-4">
      Copyright © 2019 - {new Date().getFullYear()}{' '}
      {title || process.env.NEXT_PUBLIC_BAND_NAME}
      <div className={!!activeSong ? 'h-32' : 'h-6'}></div>
    </footer>
  )
}
