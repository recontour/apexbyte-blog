import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import { headers } from 'next/headers'
import { Navbar } from './Navbar'
import Link from 'next/link'
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'

// --- Helper function to determine the image and title based on the route ---
async function getPageData() {
  const headerList: ReadonlyHeaders = await headers()
  const pathname = headerList.get('x-pathname') || '/'

  const payload = await getPayload({ config })
  const slug = pathname.substring(1) || 'home'

  // Default for Homepage or missing post
  let title = 'Latest Tech Insights'
  let subtitle = 'Deep dives into Cloud Architecture, AI Strategy, and Modern Web Development.'
  let imageUrl = '/home-bg.jpg'

  if (slug !== 'home') {
    const result = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const post = result.docs[0]

    if (post) {
      title = post.title
      subtitle = post.publishedDate
        ? `Published: ${new Date(post.publishedDate).toLocaleDateString()}`
        : 'Draft'

      const filename =
        typeof post.heroImage === 'object' && 'filename' in post.heroImage
          ? post.heroImage.filename
          : null
      if (filename) {
        imageUrl = `/media/${filename}`
      }
    }
  }

  return { title, subtitle, imageUrl, pathname }
}

export async function HeaderWrapper() {
  const data = await getPageData()
  const isHomepage = data.pathname === '/'

  return (
    <>
      <Navbar />

      {/* FIXED BANNER: Changed h-[55vh] md:h-[500px] to h-[30vh] md:h-48 */}
      <div
        className="fixed inset-x-0 top-0 w-full h-[30vh] md:h-48 z-10 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('${data.imageUrl}')` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Text Content */}
        <div className="absolute bottom-0 left-0 w-full h-full flex flex-col justify-end">
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-4 md:pb-8 text-left">
            {/* Title - Dynamic based on page */}
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-xl md:text-xl drop-shadow-xl mb-1 md:mb-2">
              {data.title}
            </h1>

            {/* Subtitle / Meta */}
            <p
              className={`text-base md:text-lg max-w-2xl font-medium drop-shadow-md leading-relaxed ${isHomepage ? 'text-slate-200' : 'text-blue-200'}`}
            >
              {data.subtitle}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
