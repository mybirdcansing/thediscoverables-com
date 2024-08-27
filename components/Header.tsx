import cx from 'classnames'
import { useSettings } from 'lib/settingsContext'
import { useWindowContext } from 'lib/windowContext'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export interface HeaderProps {
  darkBg?: boolean
}
export const Header = ({ darkBg }: HeaderProps): React.ReactNode => {
  const { scrollY } = useWindowContext()
  const isScrolled = Boolean(scrollY)
  const { title } = useSettings()

  return (
    <header
      className={cx(
        'fixed flex flex-row top-0 z-40 w-full place-items-center px-2 md:px-4',
        darkBg || isScrolled ? 'justify-between' : 'justify-end',
        {
          'bg-[#363c3f] text-white': darkBg || isScrolled,
          'transparent text-gray-800': !isScrolled && !darkBg,
        },
      )}
    >
      <div className={cx({ hidden: !isScrolled && !darkBg }, '')}>
        <Link href="/">
          <Image
            height={24}
            width={24}
            src="/favicon/android-chrome-192x192.png"
            alt={title ?? 'The Discoverables'}
            className="rounded-full"
          />
        </Link>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 10"
        stroke="currentcolor"
        fill="transparent"
        stroke-width=".6"
        className="block md:hidden w-8 my-0 cursor-pointer"
        stroke-linecap="round"
      >
        <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
          <animate
            dur="0.2s"
            attributeName="d"
            values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7"
            fill="freeze"
            begin="start.begin"
          />
          <animate
            dur="0.2s"
            attributeName="d"
            values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"
            fill="freeze"
            begin="reverse.begin"
          />
        </path>
        <rect width="10" height="10" stroke="none">
          <animate dur="2s" id="reverse" attributeName="width" begin="click" />
        </rect>
        <rect width="10" height="10" stroke="none">
          <animate
            dur="0.001s"
            id="start"
            attributeName="width"
            values="10;0"
            fill="freeze"
            begin="click"
          />
          <animate
            dur="0.001s"
            attributeName="width"
            values="0;10"
            fill="freeze"
            begin="reverse.begin"
          />
        </rect>
      </svg>
      <nav className="hidden md:flex flex-row md:place-content-end items-center h-header">
        <ul className="flex space-x-4">
          <li>
            <Link href={'/'} className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <a href="/about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
