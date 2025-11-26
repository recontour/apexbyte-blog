import React from 'react'
import './globals.css'
import { Navbar } from '../../components/Navbar'
import { GoogleAnalytics } from '@next/third-parties/google'
import { CookieBanner } from '../../components/CookieBanner'

export const metadata = {
  description: 'Insights on Cloud, AI, and Software Architecture by ApexByte.',
  title: 'ApexByte Blog | Tech Insights',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans bg-blue-50/50 text-slate-900">
        {/* The New Responsive Navbar */}
        <Navbar />

        {/* CONTENT */}
        <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            {/* Copyright */}
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} ApexByte. All rights reserved.
            </div>

            {/* Links */}
            <div className="flex space-x-6 items-center">
              <a href="/privacy" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-blue-600 transition-colors">
                Terms
              </a>

              <span className="text-gray-300">|</span>

              <a
                href="https://www.apexbyte.co/contact"
                className="hover:text-blue-600 transition-colors flex items-center"
              >
                Contact
                <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </footer>
        <CookieBanner />
        <GoogleAnalytics gaId="G-3E6CB3PP66" />
      </body>
    </html>
  )
}
