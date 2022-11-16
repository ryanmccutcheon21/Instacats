/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'post.medicalnewstoday.com',
      'catstagram.lofty.codes',
      'avatars.githubusercontent.com',
      'upcdn.io'
    ]
  }
}

module.exports = nextConfig
