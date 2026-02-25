/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/under-the-hood',
        destination: '/about',
        permanent: true, // 301 redirect for SEO
      },
      {
        source: '/under-the-hood.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/artifacts',
        destination: '/',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/posts',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/posts/:slug',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
