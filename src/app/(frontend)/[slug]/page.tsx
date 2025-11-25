import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import { notFound } from 'next/navigation'
import { RichText } from '../../../components/RichText'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!result.docs[0]) notFound()

  const post = result.docs[0]

  // Extract Image URL safely
  const heroImageUrl =
    post.heroImage && typeof post.heroImage === 'object' && 'filename' in post.heroImage
      ? `/media/${post.heroImage.filename}`
      : null

  return (
    <article className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-64 md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg mb-6">
        {/* Image */}
        {heroImageUrl ? (
          <img src={heroImageUrl} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-800" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full flex flex-col items-start">
          {/* TITLE (Top) */}
          <h1 className="text-white text-base md:text-4xl font-medium leading-tight drop-shadow-md mb-2 md:mb-3">
            {post.title}
          </h1>

          {/* CATEGORY BADGE */}
          <span className="inline-block px-2 py-0.5 text-[8px] md:text-[10px] tracking-wider text-white uppercase bg-blue-600 rounded-full shadow-sm">
            {post.category && typeof post.category === 'object' && 'name' in post.category
              ? post.category.name
              : 'Tech'}
          </span>
        </div>
      </div>

      {/* 2. METADATA SECTION */}
      <div className="flex flex-col items-end border-b border-gray-200 pb-4 mb-6 md:mb-10">
        {typeof post.author === 'object' && (
          <span className="text-base md:text-lg font-bold text-slate-900">
            {post.author?.name || 'Ashwin Torphe'}
          </span>
        )}

        <time className="text-xs md:text-sm text-slate-500 mt-1">
          {post.publishedDate
            ? new Date(post.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : ''}
        </time>
      </div>

      {/* 3. CONTENT SECTION */}
      {/* Mobile: prose-base | Desktop: prose-xl */}
      <div className="prose prose-base md:prose-xl prose-slate prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 mx-auto">
        <RichText content={post.content} />
      </div>
    </article>
  )
}
