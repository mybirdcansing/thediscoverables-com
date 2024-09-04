// components/Puzzle/PuzzlePiece.tsx

import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import cx from 'classnames'
import Image from 'next/image'
import React from 'react'

interface PuzzlePieceProps {
  id: number
  src: string
  initialPosition: { x: number; y: number }
  quadrantPositions: { x: number; y: number }[]
  onDrop: (id: number, position: { x: number; y: number }) => void
  isSolved: boolean
}

export const PuzzlePiece = ({
  id,
  src,
  initialPosition,
  quadrantPositions,
  onDrop,
  isSolved,
}: PuzzlePieceProps) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const [isMounted, setIsMounted] = React.useState(false)
  const size = isSolved ? 100 : 96
  const [springProps, api] = useSpring(() => ({
    x: initialPosition.x,
    y: initialPosition.y,
    scale: 1,
    config: { tension: 300, friction: 30 },
    immediate: true, // Ensure no animation during SSR
    transform: '',
  }))

  React.useEffect(() => {
    setIsMounted(true)
    api.start({
      x: initialPosition.x,
      y: initialPosition.y,
      scale: 1,
      immediate: false,
    })
  }, [api, initialPosition])

  const findNearestQuadrant = (x: number, y: number) => {
    return quadrantPositions.reduce((nearest, current) => {
      const distanceToCurrent = Math.sqrt(
        Math.pow(x - current.x, 2) + Math.pow(y - current.y, 2),
      )
      const distanceToNearest = Math.sqrt(
        Math.pow(x - nearest.x, 2) + Math.pow(y - nearest.y, 2),
      )
      return distanceToCurrent < distanceToNearest ? current : nearest
    })
  }

  const bindDrag = useDrag(
    ({ offset: [x, y], dragging }) => {
      if (isSolved) {
        return
      }
      const isDragging = !!dragging
      setIsDragging(isDragging)
      if (isDragging) {
        api.start({ x, y, scale: 1.2 })
      } else {
        const nearestQuadrant = findNearestQuadrant(x, y)
        api.start({ x: nearestQuadrant.x, y: nearestQuadrant.y, scale: 1 })
        onDrop(id, nearestQuadrant)
      }
    },
    { from: () => [springProps.x.get(), springProps.y.get()] },
  )

  return (
    <animated.div
      {...bindDrag()}
      className={cx(
        'absolute touch-none',
        {
          'cursor-grab': !isSolved,
        },
        isDragging ? 'z-10' : 'z-0',
      )}
      style={{
        ...springProps,
        transform: isMounted ? springProps.transform : 'none', // Ensuring SSR and CSR match
      }}
    >
      <Image
        src={src}
        alt={`Puzzle piece ${id}`}
        width={size}
        height={size}
        className="select-none pointer-events-none"
      />
    </animated.div>
  )
}
