'use client'
import React, { useState } from 'react'

export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-xl mx-auto py-20 px-4">
      <div className="bg-white rounded-lg shadow-xl border border-slate-100 p-8 md:p-12 text-center">
        {/* Success State */}
        {status === 'success' ? (
          <div className="space-y-4">
            {/* UPDATED SIZES:
               w-12 h-12 (was w-16 h-16) -> Smaller Green Circle
               w-6 h-6 (was w-8 h-8)     -> Smaller Checkmark
            */}
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">You&apos;re in!</h2>
            <p className="text-slate-600">
              Thanks for subscribing. Expect high-quality tech insights in your inbox soon.
            </p>

            <button
              onClick={() => setStatus('idle')}
              className="text-blue-600 text-sm font-medium hover:underline mt-4"
            >
              Add another email
            </button>
          </div>
        ) : (
          /* Form State */
          <>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Join the Newsletter
            </h1>
            <p className="text-slate-600 mb-8 text-lg">
              Get the latest articles on Cloud, AI, and Next.js delivered straight to your inbox. No
              spam, ever.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Joining...' : 'Subscribe Now'}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-sm mt-2 font-medium">
                  Oops! Something went wrong. You might already be subscribed.
                </p>
              )}
            </form>
            <p className="text-slate-400 text-xs mt-6">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
