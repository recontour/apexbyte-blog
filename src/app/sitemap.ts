import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const baseUrl = 'https://apexbyte.blog' // Your live domain

  // 1. Fetch all your posts (Dynamic Routes)
  const posts = await payload.find({
    collection: 'posts',
    limit: 1000, // Good enough for now
  })

  // 2. Map the posts to the Sitemap format
  const postUrls = posts.docs.map((post) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.updatedAt), // Tells Google when you last edited it
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // 3. Define your Static Pages manually
  const staticRoutes = [
    '', // Homepage
    '/about',
    '/contact',
    '/subscribe',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
  }))

  // 4. Merge them together
  return [...staticRoutes, ...postUrls]
}
