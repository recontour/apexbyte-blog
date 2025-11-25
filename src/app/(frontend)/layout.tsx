import React from 'react'
import './globals.css'
import { Navbar } from '../../components/Navbar' // <--- The new import

export const metadata = {
  description: 'Insights on Cloud, AI, and Software Architecture by ApexByte.',
  title: 'ApexByte Blog | Tech Insights',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900">
        {/* The New Responsive Navbar */}
        <Navbar />

        {/* CONTENT */}
        <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-5xl mx-auto py-8 px-4 text-center text-gray-400 text-sm flex justify-center items-center">
            <span>© {new Date().getFullYear()} ApexByte. All rights reserved.</span>
            <span className="mx-2">•</span>

            <a
              href="https://www.apexbyte.co/contact"
              className="hover:text-blue-600 transition-colors flex items-center"
            >
              Contact Us
              {/* The Icon */}
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
        </footer>
      </body>
    </html>
  )
}
