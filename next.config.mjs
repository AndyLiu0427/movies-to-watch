/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  images: {
    domains: ['image.tmdb.org'],
  },
};

export default nextConfig;
