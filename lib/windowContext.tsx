import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface WindowContextProps {
  width: number
  height: number
  isLandscape: boolean
  scrollX: number
  scrollY: number
}

const WindowContext = createContext<WindowContextProps | undefined>(undefined)

export const WindowProvider = ({ children }: { children: React.ReactNode }) => {
  const [windowSize, setWindowSize] = useState<WindowContextProps>({
    width: 0,
    height: 0,
    isLandscape: false,
    scrollX: 0,
    scrollY: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isLandscape: window.innerWidth > window.innerHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      })
    }

    updateWindowSize()

    const handleResize = debounce(() => {
      setWindowSize((prevState) => ({
        ...prevState,
        width: window.innerWidth,
        height: window.innerHeight,
        isLandscape: window.innerWidth > window.innerHeight,
      }))
    }, 200)

    const handleScroll = throttle(() => {
      setWindowSize((prevState) => ({
        ...prevState,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      }))
    }, 200)

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      handleResize.cancel()
      handleScroll.cancel()
    }
  }, [])

  return (
    <WindowContext.Provider value={windowSize}>
      {children}
    </WindowContext.Provider>
  )
}

export const useWindowContext = (): WindowContextProps => {
  const context = useContext(WindowContext)
  if (context === undefined) {
    throw new Error('useWindowContext must be used within a WindowProvider')
  }
  return context
}
