'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Helper Icon
const ExternalArrow = () => (
  <svg
    className="w-3 h-3 ml-1 inline-block opacity-70"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
)

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <>
      {/* PREMIUM HEADER 
        UPDATED: Changed bg-white/80 to bg-blue-50/80 (Hint of blue)
      */}
      <nav className="fixed w-full top-0 z-50 border-b border-blue-100/50 backdrop-blur-md bg-blue-100/90 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* LOGO */}
            <div className="flex-shrink-0 z-50">
              <Link
                href="/"
                className="text-2xl font-bold text-slate-900 tracking-tight"
                onClick={() => setIsOpen(false)}
              >
                Apex<span className="text-blue-600">Byte</span>.Blog
              </Link>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex space-x-8 items-center">
              <NavLink href="/">Home</NavLink>

              <NavLink href="https://www.apexbyte.co/about">
                About <ExternalArrow />
              </NavLink>

              <NavLink href="https://www.apexbyte.co/contact">
                Contact <ExternalArrow />
              </NavLink>

              <Link
                href="/subscribe"
                className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-blue-600/20"
              >
                Subscribe
              </Link>
            </div>

            {/* HAMBURGER ICON */}
            <div className="md:hidden flex items-center z-50">
              <button
                onClick={toggleMenu}
                className="text-slate-600 hover:text-blue-600 focus:outline-none p-2 transition-transform duration-200 active:scale-90"
              >
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU 
           UPDATED: bg-white/90 -> bg-blue-50/90
        */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full h-[calc(100vh-64px)] bg-blue-50/90 backdrop-blur-xl border-t border-blue-100 animate-menu-open shadow-2xl overflow-hidden">
            <div className="px-6 pt-8 pb-4 space-y-4 flex flex-col">
              <MobileNavLink href="/">Home</MobileNavLink>

              <MobileNavLink href="https://www.apexbyte.co/about">
                About <ExternalArrow />
              </MobileNavLink>

              <MobileNavLink href="https://www.apexbyte.co/contact">
                Contact <ExternalArrow />
              </MobileNavLink>

              <div className="pt-6 border-t border-gray-200 mt-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">
                  Get Updates
                </p>
                <Link
                  href="/subscribe"
                  className="block w-full text-center bg-blue-600 text-white font-bold py-4 rounded-lg shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
                >
                  Subscribe to Newsletter
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="h-16" />
    </>
  )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
  >
    {children}
  </Link>
)

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="block text-xl font-semibold text-slate-800 hover:text-blue-600 py-2 transition-colors border-b border-transparent hover:border-blue-100 hover:pl-2 duration-200 flex items-center"
  >
    {children}
  </Link>
)
