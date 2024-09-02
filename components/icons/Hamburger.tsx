import React, { useEffect, useRef } from 'react'

type HamburgerProps = {
  isOpen: boolean
}

export const Hamburger = ({ isOpen }: HamburgerProps) => {
  const startRef = useRef<SVGAnimateElement>(null)
  const reverseRef = useRef<SVGAnimateElement>(null)
  const isMounted = useRef(false)
  const prevIsOpenRef = useRef(isOpen)

  const handleAnimationStart = () => {
    if (startRef.current) {
      startRef.current.beginElement()
    }
  }

  const handleAnimationReverse = () => {
    if (reverseRef.current) {
      reverseRef.current.beginElement()
    }
  }

  useEffect(() => {
    // Only animate if the component has mounted and the prop has changed
    if (isMounted.current && prevIsOpenRef.current !== isOpen) {
      if (isOpen) {
        handleAnimationStart()
      } else {
        handleAnimationReverse()
      }
    } else {
      isMounted.current = true
    }

    prevIsOpenRef.current = isOpen
  }, [isOpen])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
      stroke="currentcolor"
      fill="transparent"
      strokeWidth=".5"
      className="w-8 h-8 cursor-pointer"
      strokeLinecap="round"
    >
      <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
        <animate
          ref={startRef}
          dur="0.2s"
          attributeName="d"
          values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7"
          fill="freeze"
          begin="indefinite"
        />
        <animate
          ref={reverseRef}
          dur="0.2s"
          attributeName="d"
          values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"
          fill="freeze"
          begin="indefinite"
        />
      </path>
      <rect width="10" height="10" stroke="none">
        <animate dur="2s" id="reverse" attributeName="width" begin="click" />
      </rect>
      <rect width="10" height="10" stroke="none">
        <animate
          dur="0.001s"
          id="start"
          attributeName="width"
          values="10;0"
          fill="freeze"
          begin="click"
        />
        <animate
          dur="0.001s"
          attributeName="width"
          values="0;10"
          fill="freeze"
          begin="reverse.begin"
        />
      </rect>
    </svg>
  )
}
