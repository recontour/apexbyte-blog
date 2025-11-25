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
          <div className="max-w-5xl mx-auto py-8 px-4 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} ApexByte. All rights reserved.
            <span className="mx-2">•</span>
            <a
              href="https://www.apexbyte.co/contact"
              className="hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
