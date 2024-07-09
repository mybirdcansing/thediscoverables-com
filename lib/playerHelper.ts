export const durationToString = (seconds: number): string => {
  if (isNaN(seconds)) {
    return '0:00'
  }
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
  return `${minutes}:${formattedSeconds}`
}

export const currentTimeToString = (currentTime: number): string => {
  if (isNaN(currentTime)) {
    return '00:00'
  }

  const minute = Number((currentTime / 60).toFixed()) % 60
  const seconds = Number((currentTime % 60).toFixed())
  return minute + ':' + (seconds < 10 ? '0' + seconds : seconds)
}

export const isIOS = () => {
  const ua = navigator.userAgent
  const iOS = /iPad|iPhone|iPod/.test(ua) && !window['MSStream']
  if (iOS) {
    return true
  }
  if (ua.indexOf('Macintosh') > -1) {
    try {
      document.createEvent('TouchEvent')
      return true
    } catch (e) {}
  }

  return false
}
export const isChromeDesktop = (): boolean => {
  const ua = navigator.userAgent
  const isChrome = /Chrome/i.test(ua)
  const isMobile =
    /Android|webOS|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
      ua,
    ) || isIOS()
  return !isMobile && isChrome
}

export const isClient = typeof window !== 'undefined'

export const handleInnerClick = (e: React.MouseEvent) => {
  e.stopPropagation()
}
