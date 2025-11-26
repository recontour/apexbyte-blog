'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      // Small delay so it slides in nicely after page load
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900 text-white p-4 shadow-2xl z-50 border-t border-slate-700 md:flex md:items-center md:justify-between animate-slide-up">
      <div className="text-sm md:text-base mb-4 md:mb-0 max-w-4xl">
        <p>
          We use cookies to improve your experience and analyze traffic. By clicking "Accept", you
          agree to our use of cookies. Read our{' '}
          <Link href="/privacy" className="underline hover:text-blue-400">
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={acceptCookies}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors text-sm whitespace-nowrap"
        >
          Accept
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white underline text-sm whitespace-nowrap py-2"
        >
          Decline
        </button>
      </div>
    </div>
  )
}
