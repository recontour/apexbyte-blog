import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RichText } from '../../../components/RichText'
import { Metadata } from 'next'

type Props = {
  params: Promise<{
    slug: string
  }>
}

// --- NEW FUNCTION: Tells LinkedIn/Google what to show ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
      },
    })

    const post = result.docs[0]

    if (!post) {
      return { title: 'ApexByte Blog' }
    }

    const ogImageUrl =
      post.heroImage && typeof post.heroImage === 'object' && 'filename' in post.heroImage
        ? `https://apexbyte.blog/media/${post.heroImage.filename}`
        : 'https://apexbyte.blog/media/default-og.png'

    return {
      title: `${post.title} | ApexByte`,
      description: `Read insights about ${post.title} on ApexByte.`,
      openGraph: {
        title: post.title,
        description: `Read insights about ${post.title} on ApexByte.`,
        url: `https://apexbyte.blog/${post.slug}`,
        siteName: 'ApexByte Blog',
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
          },
        ],
        type: 'article',
      },
    }
  } catch (error) {
    // SAFETY VALVE: If DB fails during build, return default metadata
    console.error('Metadata generation failed:', error)
    return {
      title: 'ApexByte Blog | Tech Insights',
      description: 'Insights on Cloud, AI, and Software Architecture.',
    }
  }
}
// -------------------------------------------------------

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

  // Construct Current Hero Image URL (Relative path is fine for the website itself)
  const heroImageUrl =
    post.heroImage && typeof post.heroImage === 'object' && 'filename' in post.heroImage
      ? `/media/${post.heroImage.filename}`
      : null

  // 2. Fetch Related Posts
  const categoryId = typeof post.category === 'object' ? post.category?.id : post.category
  let relatedPosts: any[] = []

  if (categoryId) {
    const relatedResult = await payload.find({
      collection: 'posts',
      limit: 3,
      where: {
        and: [{ category: { equals: categoryId } }, { id: { not_equals: post.id } }],
      },
    })
    relatedPosts = relatedResult.docs
  }

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
    <article className="max-w-4xl mx-auto px-2 py-6 md:py-10">
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-64 md:h-[400px] rounded-lg md:rounded-lg overflow-hidden shadow-lg mb-6">
        {/* Image */}
        {heroImageUrl ? (
          <img src={heroImageUrl} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-800" />
        )}

        {/* 1. CATEGORY BADGE (Now moved to Top Left to match Homepage) */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block px-4 py-1 text-[10px] md:text-xs font-bold tracking-wider text-white uppercase bg-blue-400/5 backdrop-blur-md border border-white/20 rounded-full shadow-sm">
            {post.category && typeof post.category === 'object' && 'name' in post.category
              ? post.category.name
              : 'Tech'}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* 2. TITLE (Bottom Left - Clean, without the badge) */}
        <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full flex flex-col items-start">
          <h1 className="text-white text-base md:text-4xl font-semibold leading-tight drop-shadow-md">
            {post.title}
          </h1>
        </div>
      </div>

      {/* METADATA */}
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

      {/* CONTENT */}
      <div className="prose prose-base md:prose-xl prose-slate prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 mx-auto mb-20">
        <RichText content={post.content} />
      </div>

      {/* READ NEXT */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-gray-200 pt-10">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Read Next</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related) => {
              const relatedImage =
                related.heroImage &&
                typeof related.heroImage === 'object' &&
                'filename' in related.heroImage
                  ? `/media/${related.heroImage.filename}`
                  : null

              return (
                <Link key={related.id} href={`/${related.slug}`} className="group block">
                  <div className="h-40 w-full bg-slate-100 rounded-lg overflow-hidden mb-3 relative">
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
