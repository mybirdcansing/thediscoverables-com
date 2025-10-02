import { usePlayerContext } from 'lib/playerContext'
import { useSettings } from 'lib/settingsContext'
import Link from 'next/link'

export const Footer = () => {
  const {
    state: { activeSong },
  } = usePlayerContext()

  const { bandName } = useSettings()

  return (
    <>
      <footer className="flex flex-col justify-center p-6 sm:flex-row sm:space-x-4">
        <div className="footer-links mb-2 flex justify-center space-x-2 sm:mb-0">
          <Link href="/">Home</Link>
          <span>|</span>
          <Link href="/contact">Contact</Link>
          <span>|</span>
          <Link href="/privacy">Privacy policy</Link>
        </div>

        <div className="text-center sm:ml-8">
          Copyright © 2019 - {new Date().getFullYear()} {bandName}
        </div>
        <div className={activeSong ? 'h-24' : 'h-4'}></div>
      </footer>
    </>
  )
}
