import { usePlayer } from 'components/player/hooks/usePlayer'
import { PortableTextView } from 'components/PortableTextView'
import type { Song } from 'lib/types/song'
import { useWindowContext } from 'lib/windowContext'
import React from 'react'

interface Tab {
  name: string
  content: React.ReactNode
}

const EXPAND_DELAY = 35

export const PlayerDrawer = () => {
  const { activeSong, playlist, isDrawerExpanded } = usePlayer()
  const drawerRef = React.useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = React.useState(0)
  const [isVisible, setIsVisible] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)

  const { scrollY, height } = useWindowContext()

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
        content: (
          <div>
            {playlist?.map((song: Song, index: number) => (
              <div key={index}>
                <p>{song.title}</p>
              </div>
            ))}
          </div>
        ),
      },
    ]

    if (activeSong?.lyrics) {
      tabsArray.push({
        name: 'Lyrics',
        content: (
          <div className="h-[60vh] overflow-y-auto">
            <PortableTextView content={activeSong.lyrics} />
          </div>
        ),
      })
    }

    return tabsArray
  }, [activeSong, playlist])

  // Reset active tab if it exceeds the number of tabs
  React.useEffect(() => {
    if (tabs.length <= activeTab) {
      setActiveTab(0)
    }
  }, [tabs.length, activeTab])

  if (!isVisible) {
    return null
  }

  return (
    <div
      ref={drawerRef}
      className="absolute w-full bg-[rgb(30,32,35)] h-svh transition-[top] duration-400 ease-in-out"
      style={{
        top: isExpanded ? `${scrollY}px` : `${scrollY + height}px`,
      }}
    >
      <div className="w-full max-w-md mx-auto mt-8">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex-1 py-2 text-center ${
                activeTab === index
                  ? 'border-b-2 border-blue-500 text-blue-500'
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
          <div className="p-4" role="tabpanel">
            {tabs[activeTab].content}
          </div>
        )}
      </div>
    </div>
  )
}
