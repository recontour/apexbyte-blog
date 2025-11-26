import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://apexbyte.blog'

  return {
    rules: {
      userAgent: '*', // Allow all bots (Google, Bing, etc.)
      allow: '/', // Allow them to scan everything
      disallow: '/admin', // EXCEPT the admin panel (keep that private)
    },
    sitemap: `${baseUrl}/sitemap.xml`, // Point them to the map we just made
  }
}
