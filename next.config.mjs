/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponents: true,
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "*",
    },
  ],
  images: {
    domains: ['image.tmdb.org'],
  },
};

export default nextConfig;
