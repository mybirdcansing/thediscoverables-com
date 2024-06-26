import { usePlayerContext } from 'lib/playerContext'

export const Footer = () => {
  const { activeSong } = usePlayerContext()

  return (
    <footer className="flex flex-row justify-center">
      Copyright © 2019 - {new Date().getFullYear()}{' '}
      {process.env.NEXT_PUBLIC_BAND_NAME}
      <div className={!!activeSong ? 'h-32' : 'h-10'}></div>
    </footer>
  )
}
