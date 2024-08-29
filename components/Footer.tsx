import { usePlayerContext } from 'lib/playerContext'
import { useSettings } from 'lib/settingsContext'
import Link from 'next/link'

export const Footer = () => {
  const {
    state: { activeSong },
  } = usePlayerContext()

  const { bandName } = useSettings()

  return (
    <footer className="flex flex-col items-center p-4 sm:flex-row justify-center sm:space-x-4">
      <div className="flex space-x-2 mb-2 sm:mb-0">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>|</span>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </div>

      <div className="text-center sm:ml-8">
        Copyright © 2019 - {new Date().getFullYear()} {bandName}
      </div>
      <div className={activeSong ? 'h-32' : 'h-6'}></div>
    </footer>
  )
}
