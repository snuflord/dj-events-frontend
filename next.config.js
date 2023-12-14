// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp',],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/image/upload/**',
      },
    ],
  },
  swcMinify: true,
  fastRefresh: true,
}