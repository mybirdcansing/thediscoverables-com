import cx from 'classnames'
import { handleInnerClick } from 'lib/playerHelper'
import { useSettings } from 'lib/settingsContext'
import { useDisableScrolling } from 'lib/useDisableScrolling'
import { useWindowContext } from 'lib/windowContext'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Hamburger } from './icons/Hamburger'
import { NavMenuItems } from './NavMenuItems'

export interface HeaderProps {
  darkBg?: boolean
}

export const Header = ({ darkBg }: HeaderProps): React.ReactNode => {
  const { scrollY } = useWindowContext()
  const isScrolled = Boolean(scrollY)
  const { title } = useSettings()
  const [openMenu, setOpenMenu] = React.useState<boolean>(false)
  useDisableScrolling(openMenu)

  return (
    <>
      <header
        className={cx(
          'fixed flex flex-row top-0 z-30 w-full place-items-center px-2 md:px-4 h-header max-h-header',
          darkBg || isScrolled ? 'justify-between' : 'justify-end',
          {
            'bg-gray-850 text-gray-50': darkBg || isScrolled,
            'transparent text-gray-800': !isScrolled && !darkBg,
          },
        )}
      >
        <div
          className={cx({
            hidden: !isScrolled && !darkBg,
          })}
        >
          <Link href="/">
            <Image
              height={22}
              width={22}
              src="/favicon/favicon-32x32.png"
              alt={title ?? 'The Discoverables'}
              className="rounded-full"
            />
          </Link>
        </div>

        <nav className="hidden md:flex flex-row place-content-end items-center h-header">
          <NavMenuItems />
        </nav>
      </header>
      <button
        className={cx('block md:hidden fixed top-0 right-1 z-50', {
          'text-gray-50': darkBg || isScrolled,
          'text-black': !isScrolled && !darkBg,
        })}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <Hamburger isOpen={openMenu} />
      </button>
      <div
        className={cx(
          'block md:hidden w-screen h-screen z-30 fixed top-0',
          openMenu ? 'left-0' : 'left-full',
        )}
        onClick={() => setOpenMenu(!openMenu)}
      >
        <nav
          className={cx(
            'h-screen fixed bg-gray-500 z-40 transition-all top-0 p-10',
            openMenu ? 'opacity-100 left-10' : 'opacity-0 left-full',
          )}
          onClick={handleInnerClick}
          style={{ width: 'calc(100vw - 40px)' }}
        >
          <NavMenuItems onClick={() => setOpenMenu(false)} />
        </nav>
      </div>
    </>
  )
}
