/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Add any image domains you need to whitelist
  },
  async redirects() {
    // The AI case study moved to a neutral URL; keep the old link working.
    return [{ source: "/work/ai-assisted-delivery", destination: "/work/shipping-faster", permanent: true }];
  },
  async rewrites() {
    return [
      {
          source: '/api/:path*',
          destination: 'http://localhost:5005/api/:path*', 
        },
    ];
  }
}

module.exports = nextConfig 