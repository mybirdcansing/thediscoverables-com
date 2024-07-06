import { useDrag } from '@use-gesture/react'
import { handleInnerClick } from 'lib/playerHelper'
import * as React from 'react'
import { animated, useSpring } from 'react-spring'

interface AudioSliderProps {
  audioRef: React.RefObject<HTMLAudioElement>
  currentTime: number
  duration: number
}

export const AudioSlider = ({
  audioRef,
  currentTime,
  duration,
}: AudioSliderProps) => {
  const sliderRef = React.useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [buffered, setBuffered] = React.useState(0)

  const [{ x }, api] = useSpring(() => ({ x: 0 }))

  const bind = useDrag(
    ({ down, movement: [mx], memo = x.get() }) => {
      setIsDragging(down)
      const rect = sliderRef.current
        ? sliderRef.current.getBoundingClientRect()
        : { width: 0 }
      const newX = Math.max(0, Math.min(rect.width, memo + mx))
      const newTime = (newX / rect.width) * duration

      if (!down && audioRef.current) {
        audioRef.current.currentTime = newTime
      }

      api.start({ x: newX, immediate: down })
      return memo
    },
    { axis: 'x', from: () => [x.get(), 0] },
  )

  const updateSliderPosition = React.useCallback(() => {
    if (isDragging || !sliderRef.current) {
      return
    }
    const rect = sliderRef.current.getBoundingClientRect()
    const newX = (currentTime / duration) * rect.width

    api.start({ x: isNaN(newX) ? 0 : newX, immediate: false })
  }, [currentTime, duration, isDragging, api])

  React.useEffect(() => {
    const updateBuffered = () => {
      if (audioRef.current) {
        const bufferedEnd = audioRef.current.buffered.length
          ? audioRef.current.buffered.end(audioRef.current.buffered.length - 1)
          : 0
        setBuffered((bufferedEnd / duration) * 100)
      }
    }

    const handleResize = () => {
      if (!isDragging) {
        updateSliderPosition()
      }
    }

    const audio = audioRef.current
    if (audio) {
      audio.addEventListener('progress', updateBuffered)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (audio) {
        audio.removeEventListener('progress', updateBuffered)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [duration, audioRef, isDragging, updateSliderPosition])

  React.useEffect(() => {
    if (!isDragging) {
      updateSliderPosition()
    }
  }, [currentTime, updateSliderPosition, isDragging])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) {
      return
    }
    handleInnerClick(event)
    const rect = sliderRef.current.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const newTime = (clickX / rect.width) * duration

    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }

    const newX = (clickX / rect.width) * rect.width
    api.start({ x: newX, immediate: true })
  }

  return (
    <div className="relative pb-2">
      <div
        ref={sliderRef}
        onClick={handleClick}
        className="bg-gray-200 cursor-pointer absolute top-0 w-full h-2 hover:h-3 hover:-top-0.5"
      >
        <div
          className="absolute h-full bg-gray-300"
          style={{ width: `${buffered}%` }}
        ></div>
        <animated.div
          className="absolute h-full bg-gray-500"
          style={{
            width: x.to(
              (x) =>
                `${(x / (sliderRef.current ? sliderRef.current.getBoundingClientRect().width : 1)) * 100}%`,
            ),
          }}
        ></animated.div>
        <animated.div
          {...bind()}
          className="absolute top-[-5px] left-[-10px] w-5 h-5 bg-gray-600 rounded-full cursor-grab"
          style={{ transform: x.to((x) => `translateX(${x}px)`) }}
        ></animated.div>
      </div>
    </div>
  )
}
