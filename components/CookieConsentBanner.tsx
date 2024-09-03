'use client'

import { isLocalStorageAvailable } from 'lib/localStorageHelper'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      const consentAccepted = localStorage.getItem('cookieConsent')
      if (!consentAccepted) {
        setIsVisible(true)
      }
    } else {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem('cookieConsent', 'true')
    }
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-4 px-6 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">
          Our website uses cookies to ensure you get the best experience. By
          continuing to use our site, you accept our use of cookies. For more
          details, please read our{' '}
          <Link
            href="/privacy"
            className="hover:underline text-blue-400 hover:text-blue-600"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <button
          onClick={handleAccept}
          className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Got it!
        </button>
      </div>
    </div>
  )
}
