import cx from 'classnames'
import { usePlayer } from 'components/player/hooks/usePlayer'
import { PortableTextView } from 'components/PortableTextView'
import type { Song } from 'lib/types/content'
import { useWindowContext } from 'lib/windowContext'
import React from 'react'

interface Tab {
  name: string
  content: React.ReactNode
}

export const PlayerDrawer = () => {
  const { activeSong, playlist, isDrawerExpanded } = usePlayer()
  const drawerRef = React.useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = React.useState(0)
  const [isVisible, setIsVisible] = React.useState(false)
  const [expand, setExpand] = React.useState(false)

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }
  const { scrollY, height } = useWindowContext()

  React.useEffect(() => {
    const handleTransitionEnd = () => {
      if (!isDrawerExpanded) {
        setIsVisible(false)
        setExpand(false)
      }
    }

    const drawerElement = drawerRef.current
    if (drawerElement) {
      drawerElement.addEventListener('transitionend', handleTransitionEnd)
    }

    if (isDrawerExpanded) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      if (drawerElement) {
        drawerElement.removeEventListener('transitionend', handleTransitionEnd)
      }
    }
  }, [isDrawerExpanded])

  React.useEffect(() => {
    if (isDrawerExpanded) {
      setIsVisible(true)
      setTimeout(() => {
        setExpand(true)
      }, 35)
    } else {
      setExpand(false)
    }
  }, [isDrawerExpanded])

  if (!isVisible && !isDrawerExpanded) return null

  const tabs: Array<Tab> = [
    {
      name: 'Next up',
      content: (
        <div>
          {playlist.map((song: Song, index: number) => (
            <div key={index}>
              <p>{song.title}</p>
            </div>
          ))}
        </div>
      ),
    },
  ]

  if (activeSong?.lyrics) {
    tabs.push({
      name: 'Lyrics',
      content: (
        <div className="h-[60vh] overflow-y-auto">
          <PortableTextView content={activeSong.lyrics} />
        </div>
      ),
    })
  }

  if (tabs.length < activeTab) {
    setActiveTab(0)
  }

  return (
    <div
      ref={drawerRef}
      className={cx(
        'absolute w-full bg-slate-400 h-svh transition-[bottom,top] duration-500 ease-in-out',
      )}
      style={{
        top: expand ? `${scrollY}px` : `${scrollY + height}px`,
        display: isVisible ? 'block' : 'none',
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
            >
              {tab.name}
            </button>
          ))}
        </div>
        {tabs.length > activeTab && (
          <div className="p-4">{tabs[activeTab].content}</div>
        )}
      </div>
    </div>
  )
}
