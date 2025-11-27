import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import React from 'react'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    limit: 10,
    sort: '-publishedDate',
  })

  return (
    <div className="space-y-12">
      {/* --- HERO HEADER (Full Screen Width + Flush to Top) --- */}
      {/* 1. w-screen: Makes it as wide as the screen
          2. ml-[calc(50%-50vw)]: Centers it and ignores parent padding
          3. -mt-10: Pulls it up to cover the layout's top padding (removes the gap)
      */}
      <div className="relative w-screen ml-[calc(50%-50vw)] h-64 md:h-[500px] mb-8 overflow-hidden -mt-10">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src="/home-bg.jpg" alt="Tech Background" className="w-full h-full object-cover" />
        </div>

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />

        {/* Text Content */}
        {/* Added max-w-5xl mx-auto to align text with the rest of the site content */}
        <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end">
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 md:pb-16 text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl drop-shadow-xl mb-3 md:mb-4">
              Latest Tech Insights
            </h1>
            <p className="text-base md:text-xl text-slate-200 max-w-2xl font-medium drop-shadow-md leading-relaxed">
              Deep dives into Cloud Architecture, AI Strategy, and Modern Web Development.
            </p>
          </div>
        </div>
      </div>

      {/* --- THE GRID SYSTEM --- */}
      <div className="grid grid-cols-1 px-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.docs.map((post) => {
          const heroImageUrl =
            post.heroImage && typeof post.heroImage === 'object' && 'filename' in post.heroImage
              ? `/media/${post.heroImage.filename}`
              : null

          return (
            <Link
              key={post.id}
              href={`/${post.slug}`}
              className="group flex flex-col bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 hover:border-slate-300 overflow-hidden"
            >
              <div className="h-52 w-full bg-slate-200 relative overflow-hidden">
                {heroImageUrl ? (
                  <img
                    src={heroImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    No Image
                  </div>
                )}

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase bg-black/20 backdrop-blur-md border border-white/20 rounded-full shadow-sm">
                    {post.category && typeof post.category === 'object' && 'name' in post.category
                      ? post.category.name
                      : 'Tech'}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <div className="mt-3 flex items-center text-slate-500 text-xs font-medium">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {post.publishedDate
                      ? new Date(post.publishedDate).toLocaleDateString()
                      : 'Draft'}
                  </div>
                </div>
                <div className="mt-6 flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                  Read Article
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
