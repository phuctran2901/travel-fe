/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'media.travel.com.vn',
      'media.vietravel.com',
      'wiki-travel.com.vn',
      'res.cloudinary.com'
    ]
  }
}

module.exports = nextConfig
