// components/Puzzle/PuzzlePiece.tsx

import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import cx from 'classnames'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

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
  const [isDragging, setIsDragging] = useState(false)
  const [isMounted, setIsMounted] = useState(false) // Track if the component has mounted on the client

  // Set static values initially
  const [springProps, api] = useSpring(() => ({
    x: initialPosition.x,
    y: initialPosition.y,
    scale: 1,
    config: { tension: 300, friction: 30 },
    immediate: true, // Ensure no animation during SSR
    transform: '',
  }))

  // useEffect to update spring properties after mount
  useEffect(() => {
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
      setIsDragging(!!dragging)
      if (!!dragging) {
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
      className={cx('absolute', {
        'cursor-grab': !isSolved,
      })}
      style={{
        transform: isMounted ? springProps.transform : 'none', // Ensuring SSR and CSR match
        zIndex: isDragging ? 1 : 0,
        touchAction: 'none',
        x: springProps.x,
        y: springProps.y,
        scale: springProps.scale,
      }}
    >
      <Image
        src={src}
        alt={`Puzzle piece ${id}`}
        width={96}
        height={96}
        className="select-none pointer-events-none"
      />
    </animated.div>
  )
}
