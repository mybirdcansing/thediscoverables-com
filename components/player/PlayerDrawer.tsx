import { Close } from 'components/icons/Close'
import { usePlayer } from 'components/player/hooks/usePlayer'
import { PortableTextView } from 'components/PortableTextView'
import { SongList } from 'components/SongList'
import { Breakpoints } from 'lib/breakpoints'
import { urlForImage } from 'lib/sanity.image'
import { useWindowContext } from 'lib/windowContext'
import Image from 'next/image'
import React from 'react'

import styles from './PlayerControls.module.css'

interface Tab {
  name: string
  content: React.ReactNode
}

const PLAYER_HEIGHT = 82
const EXPAND_DELAY = 35
const OFFSET_TAB_HEIGHT = PLAYER_HEIGHT + 160

export const PlayerDrawer = () => {
  const { activeSong, playlist, isDrawerExpanded, toggleExpandDrawer } =
    usePlayer()
  const drawerRef = React.useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = React.useState(0)
  const [isVisible, setIsVisible] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)

  const { scrollY, height, width } = useWindowContext()

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  // Manage drawer visibility and expansion state
  React.useEffect(() => {
    const handleTransitionEnd = () => {
      if (!isDrawerExpanded) {
        setIsVisible(false)
        setIsExpanded(false)
      }
    }

    const drawerElement = drawerRef.current
    if (drawerElement) {
      drawerElement.addEventListener('transitionend', handleTransitionEnd)
    }

    let timer: NodeJS.Timeout | null = null

    if (isDrawerExpanded) {
      setIsVisible(true)
      document.body.classList.add('overflow-hidden')
      timer = setTimeout(() => {
        setIsExpanded(true)
      }, EXPAND_DELAY)
    } else {
      document.body.classList.remove('overflow-hidden')
      setIsExpanded(false)
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
      if (drawerElement) {
        drawerElement.removeEventListener('transitionend', handleTransitionEnd)
      }
      document.body.classList.remove('overflow-hidden')
    }
  }, [isDrawerExpanded])

  const tabs: Array<Tab> = React.useMemo(() => {
    const tabsArray: Array<Tab> = [
      {
        name: 'Next up',
        content: <SongList songs={playlist} />,
      },
    ]

    if (activeSong?.lyrics) {
      tabsArray.push({
        name: 'Lyrics',
        content: <PortableTextView content={activeSong.lyrics} />,
      })
    }

    return tabsArray
  }, [activeSong?.lyrics, playlist])

  // Reset active tab if it exceeds the number of tabs
  React.useEffect(() => {
    if (tabs.length <= activeTab) {
      setActiveTab(0)
    }
  }, [tabs.length, activeTab])

  const album = activeSong?.album

  if (!isVisible) {
    return null
  }

  return (
    <div
      ref={drawerRef}
      className="absolute w-full bg-[rgb(30,32,35)] transition-[top] duration-400 ease-in-out flex flex-row justify-center overflow-y-auto"
      style={{
        top: isExpanded ? `${scrollY}px` : `${scrollY + height}px`,
        height: `${height - PLAYER_HEIGHT}px`,
      }}
    >
      <button
        className={styles['close-button-container']}
        onClick={() => {
          toggleExpandDrawer()
        }}
      >
        <Close />
      </button>
      <div className="w-full flex flex-col lg:flex-row justify-between gap-x-8 gap-y-12 px-4 lg:px-24 pt-11 lg:pt-4">
        {album && (
          <div className="w-full h-full place-content-center flex flex-row justify-center">
            <div className="relative max-w-xl w-full aspect-square">
              <Image
                objectFit="contain"
                layout="fill"
                alt={`Cover image for ${album.title}`}
                src={urlForImage(album.coverImage).url()}
              />
            </div>
          </div>
        )}
        <div className="max-w-xl min-w-md w-full mx-auto lg:mt-11">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`flex-1 py-2 text-center ${
                  activeTab === index
                    ? 'border-b-2 border-slate-400 text-white'
                    : 'text-gray-500'
                }`}
                onClick={() => handleTabClick(index)}
                aria-selected={activeTab === index}
                role="tab"
              >
                {tab.name}
              </button>
            ))}
          </div>
          {tabs.length > activeTab && (
            <div
              role="tabpanel"
              className="w-full p-4 overflow-y-auto min-w-full"
              style={{
                height:
                  width >= Breakpoints.lg
                    ? `${height - OFFSET_TAB_HEIGHT}px`
                    : 'auto',
              }}
            >
              {tabs[activeTab].content}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
