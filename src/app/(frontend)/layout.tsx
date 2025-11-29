import { Inter } from 'next/font/google'
import React from 'react'
import './globals.css'
import { HeaderWrapper } from '../../components/HeaderWrapper' // New Fixed Header
import { GoogleAnalytics } from '@next/third-parties/google'
import { CookieBanner } from '../../components/CookieBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  description: 'Insights on Cloud, AI, and Software Architecture by ApexByte.',
  title: 'ApexByte Blog | Tech Insights',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Apply the Inter font class name */}
      <body
        className={`${inter.className} min-h-screen flex flex-col bg-blue-50/50 text-slate-900`}
      >
        <HeaderWrapper />

        {/* 3. SCROLLING CONTENT (This is the original content from your pages) */}
        <main className="flex-grow max-w-5xl mx-auto w-full">{children}</main>

        {/* 4. FOOTER */}
        <footer className="bg-blue-50 border-t border-blue-100 mt-auto">
          <div className="max-w-5xl mx-auto py-5 px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} ApexByte. All rights reserved.
            </div>
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

        <GoogleAnalytics gaId="G-3E6CB3PP66" />
        <CookieBanner />
      </body>
    </html>
  )
}
