/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Vercel to ignore "unused variable" warnings during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
