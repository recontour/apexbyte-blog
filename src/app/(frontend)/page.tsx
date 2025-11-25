import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import React from 'react'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    limit: 10,
    sort: '-publishedDate', // Sort by newest first
  })

  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Latest Tech Insights
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Deep dives into Next.js, Cloud Architecture, and the future of AI.
        </p>
      </div>

      {/* The Grid System */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.docs.map((post) => {
          // Safety Check for Image
          const heroImageUrl =
            post.heroImage && typeof post.heroImage === 'object' && 'url' in post.heroImage
              ? post.heroImage.url
              : null

          return (
            <Link
              key={post.id}
              href={`/${post.slug}`}
              className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden"
            >
              {/* Card Image */}
              <div className="h-48 w-full bg-slate-200 relative overflow-hidden">
                {heroImageUrl ? (
                  <img
                    src={heroImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600 mb-2">
                    {/* Placeholder for Category later */}
                    Tech
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                </div>

                <div className="mt-4 flex items-center text-slate-500 text-sm">
                  <span>
                    {post.publishedDate
                      ? new Date(post.publishedDate).toLocaleDateString()
                      : 'Draft'}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
