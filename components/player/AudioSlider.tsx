import { useDrag } from '@use-gesture/react'
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
  const [src, setSrc] = React.useState('')

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

  React.useEffect(() => {
    if (audioRef.current) {
      setSrc(audioRef.current.src)
    }
  }, [audioRef, audioRef.current?.src])

  React.useEffect(() => {
    if (isDragging || !sliderRef.current) {
      return
    }
    const rect = sliderRef.current.getBoundingClientRect()
    const newX = (currentTime / duration) * rect.width
    api.start({ x: newX, immediate: true })
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

    const audio = audioRef.current
    if (audio) {
      audio.addEventListener('progress', updateBuffered)
    }

    return () => {
      if (audio) {
        audio.removeEventListener('progress', updateBuffered)
      }
    }
  }, [duration, src, audioRef])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) {
      return
    }
    const rect = sliderRef.current.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const newTime = (clickX / rect.width) * duration

    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  return (
    <div
      ref={sliderRef}
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '100%',
        height: '10px',
        background: '#ddd',
        margin: '20px 0',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: `${buffered}%`,
          height: '100%',
          background: '#bbb',
        }}
      ></div>
      <animated.div
        style={{
          position: 'absolute',
          height: '100%',
          background: '#666',
          width: x.to(
            (x) =>
              `${(x / (sliderRef.current ? sliderRef.current.getBoundingClientRect().width : 1)) * 100}%`,
          ),
        }}
      ></animated.div>
      <animated.div
        {...bind()}
        style={{
          position: 'absolute',
          top: '-5px',
          left: '-10px',
          width: '20px',
          height: '20px',
          background: '#333',
          borderRadius: '50%',
          transform: x.to((x) => `translateX(${x}px)`),
          cursor: 'grab',
        }}
      ></animated.div>
    </div>
  )
}
