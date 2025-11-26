import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link' // <--- Added Link import
import { RichText } from '../../../components/RichText'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  // 1. Fetch Current Post
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

  // Construct Current Hero Image URL
  const heroImageUrl =
    post.heroImage && typeof post.heroImage === 'object' && 'filename' in post.heroImage
      ? `/media/${post.heroImage.filename}`
      : null

  // 2. Fetch Related Posts (Same Category, Not Current Post)
  const categoryId = typeof post.category === 'object' ? post.category?.id : post.category

  let relatedPosts: any[] = []

  if (categoryId) {
    const relatedResult = await payload.find({
      collection: 'posts',
      limit: 3, // Fetch 3 related
      where: {
        and: [
          { category: { equals: categoryId } }, // Same Category
          { id: { not_equals: post.id } }, // NOT this post
        ],
      },
    })
    relatedPosts = relatedResult.docs
  }

  // Fallback: If no related posts found (e.g. only 1 post in category), fetch recent posts
  if (relatedPosts.length === 0) {
    const recentResult = await payload.find({
      collection: 'posts',
      limit: 3,
      sort: '-publishedDate',
      where: {
        id: { not_equals: post.id },
      },
    })
    relatedPosts = recentResult.docs
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-64 md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-lg mb-6">
        {heroImageUrl ? (
          <img src={heroImageUrl} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full flex flex-col items-start">
          <h1 className="text-white text-base md:text-4xl font-semibold leading-tight drop-shadow-md mb-2 md:mb-3">
            {post.title}
          </h1>
          <span className="inline-block px-1.5 py-0.5 text-[9px] md:text-[11px] font-bold tracking-wider text-white uppercase bg-blue-600 rounded-full shadow-sm">
            {post.category && typeof post.category === 'object' && 'name' in post.category
              ? post.category.name
              : 'Tech'}
          </span>
        </div>
      </div>

      {/* --- METADATA --- */}
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

      {/* --- CONTENT --- */}
      <div className="prose prose-base md:prose-xl prose-slate prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 mx-auto mb-20">
        <RichText content={post.content} />
      </div>

      {/* --- READ NEXT SECTION --- */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-gray-200 pt-10">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Read Next</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => {
              // Image Logic for Related Card
              const relatedImage =
                related.heroImage &&
                typeof related.heroImage === 'object' &&
                'filename' in related.heroImage
                  ? `/media/${related.heroImage.filename}`
                  : null

              return (
                <Link key={related.id} href={`/${related.slug}`} className="group block">
                  <div className="h-40 w-full bg-slate-100 rounded-xl overflow-hidden mb-3 relative">
                    {relatedImage && (
                      <img
                        src={relatedImage}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {related.title}
                  </h4>
                  <div className="text-xs text-slate-500 mt-1">
                    {related.publishedDate
                      ? new Date(related.publishedDate).toLocaleDateString()
                      : ''}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </article>
  )
}
