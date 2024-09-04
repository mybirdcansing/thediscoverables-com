// components/Puzzle/Puzzle.tsx

import React, { useEffect, useState } from 'react'

import { PuzzlePiece } from './PuzzlePiece'

// Helper function to shuffle an array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

interface PuzzleProps {
  onCorrectPositions: () => void
}

export const Puzzle = ({ onCorrectPositions }: PuzzleProps) => {
  const quadrantPositions = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 0, y: 100 },
    { x: 100, y: 100 },
  ]

  // Randomly shuffle the initial positions to start the puzzle in a random state
  const shuffledPositions = shuffleArray([...quadrantPositions])

  // Assign shuffled positions to pieces to ensure they start in a random layout
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
  const [isSolved, setIsSolved] = useState(false) // State to track if the puzzle is solved

  useEffect(() => {
    // Check if all pieces are in their correct positions
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

  const handleDrop = (id: number, newPosition: { x: number; y: number }) => {
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
    <div className="relative w-48 h-48 mx-auto">
      {pieces.map((piece) => (
        <PuzzlePiece
          key={piece.id}
          id={piece.id}
          src={piece.src}
          initialPosition={piece.initialPosition}
          quadrantPositions={quadrantPositions}
          onDrop={handleDrop}
          isSolved={isSolved} // Pass the solved state to the PuzzlePiece component
        />
      ))}
    </div>
  )
}
