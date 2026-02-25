import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

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
        permanent: true,
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
      {
        source: '/capabilities',
        destination: '/introduction',
        permanent: true,
      },
      {
        source: '/capabilities.html',
        destination: '/introduction',
        permanent: true,
      },
      {
        source: '/farcaster',
        destination: 'https://warpcast.com/georgerm',
        permanent: false,
      },
    ]
  },
}

// Setup Cloudflare bindings in dev mode
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig
