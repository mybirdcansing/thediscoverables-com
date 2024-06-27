export const durationToString = (duration): string => {
  if (isNaN(duration)) {
    return '00:00'
  }
  const minutes = Math.floor(duration / 60)
  const seconds = (duration - minutes * 60).toString().substr(0, 2)
  return `${minutes}:${seconds}`
}

export const currentTimeToString = (currentTime): string => {
  if (isNaN(currentTime)) {
    return '00:00'
  }
  const minute = Number((currentTime / 60).toFixed()) % 60
  const seconds = Number((currentTime % 60).toFixed())
  return (
    (minute < 10 ? '0' + minute : minute) +
    ':' +
    (seconds < 10 ? '0' + seconds : seconds)
  )
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
