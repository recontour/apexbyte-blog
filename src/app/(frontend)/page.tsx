// src/app/(frontend)/page.tsx

import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import React from 'react'
import { Metadata } from 'next' // Add Metadata import

export const metadata: Metadata = {
  title: 'ApexByte Blog | Latest Tech Insights',
  description:
    'Deep dives into Cloud Architecture, AI Strategy, and Modern Web Development. Read our comprehensive guides and checklists.',
  openGraph: {
    title: 'ApexByte Blog | Latest Tech Insights',
    description:
      'Deep dives into Cloud Architecture, AI Strategy, and Modern Web Development. Read our comprehensive guides and checklists.',
    url: 'https://apexbyte.blog',
    siteName: 'ApexByte Blog',
    // Use your hero image as the main sharing image
    images: [
      {
        url: 'https://apexbyte.blog/home-bg.jpg', // Ensure this image is prominent and exists in public folder
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ApexByte Blog | Latest Tech Insights',
    description: 'Deep dives into Cloud Architecture, AI Strategy, and Modern Web Development.',
  },
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    limit: 10,
    sort: '-publishedDate',
  })

  return (
    <div className="space-y-12">
      <div className="pt-[31vh] md:pt-52">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {posts.docs.map((post) => {
            // ... (keep the existing grid map logic) ...
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
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
