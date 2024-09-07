import cx from 'classnames'
import React, { useEffect, useState } from 'react'

import { Position } from './Position'
import { PuzzlePiece } from './PuzzlePiece'

const shuffleArray = (arr: any[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

interface PuzzleProps {
  onCorrectPositions: () => void
}

export const Puzzle = ({ onCorrectPositions }: PuzzleProps) => {
  const quadrantPositions: Position[] = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 0, y: 100 },
    { x: 100, y: 100 },
  ]

  const shuffledPositions: Position[] = shuffleArray([...quadrantPositions])

  const initialPositions = [
    {
      id: 1,
      src: '/puzzle/piece1.png',
      initialPosition: shuffledPositions[0],
      correctPosition: quadrantPositions[0],
    },
    {
      id: 2,
      src: '/puzzle/piece2.png',
      initialPosition: shuffledPositions[1],
      correctPosition: quadrantPositions[1],
    },
    {
      id: 3,
      src: '/puzzle/piece3.png',
      initialPosition: shuffledPositions[2],
      correctPosition: quadrantPositions[2],
    },
    {
      id: 4,
      src: '/puzzle/piece4.png',
      initialPosition: shuffledPositions[3],
      correctPosition: quadrantPositions[3],
    },
  ]

  const [pieces, setPieces] = useState(initialPositions)
  const [isSolved, setIsSolved] = useState(false)

  useEffect(() => {
    const allCorrect = pieces.every(
      (piece) =>
        piece.initialPosition.x === piece.correctPosition.x &&
        piece.initialPosition.y === piece.correctPosition.y,
    )
    if (allCorrect && !isSolved) {
      setIsSolved(true)
      onCorrectPositions()
    }
  }, [pieces, onCorrectPositions, isSolved])

  const handleDrop = (id: number, newPosition: Position) => {
    if (isSolved) {
      return
    }

    setPieces((prevPieces) => {
      const draggedPieceIndex = prevPieces.findIndex((piece) => piece.id === id)
      const draggedPiece = prevPieces[draggedPieceIndex]

      // Find the piece that is currently at the new position
      const occupyingPieceIndex = prevPieces.findIndex(
        (piece) =>
          piece.initialPosition.x === newPosition.x &&
          piece.initialPosition.y === newPosition.y,
      )

      if (
        occupyingPieceIndex !== -1 &&
        occupyingPieceIndex !== draggedPieceIndex
      ) {
        // If there's an occupying piece, swap the positions
        const updatedPieces = prevPieces.map((piece, index) => {
          if (index === draggedPieceIndex) {
            return { ...piece, initialPosition: newPosition }
          }
          if (index === occupyingPieceIndex) {
            return { ...piece, initialPosition: draggedPiece.initialPosition }
          }
          return piece
        })

        return updatedPieces
      } else {
        // If there's no occupying piece, just move the dragged piece
        return prevPieces.map((piece) =>
          piece.id === id ? { ...piece, initialPosition: newPosition } : piece,
        )
      }
    })
  }

  return (
    <div
      className={cx({
        'border-green-500 border-4 border-e-lime-500 mx-auto': isSolved,
      })}
    >
      <div className="relative w-[200px] h-[200px] mx-auto">
        {pieces.map((piece) => (
          <PuzzlePiece
            key={piece.id}
            id={piece.id}
            src={piece.src}
            initialPosition={piece.initialPosition}
            quadrantPositions={quadrantPositions}
            onDrop={handleDrop}
            isSolved={isSolved}
          />
        ))}
      </div>
    </div>
  )
}
