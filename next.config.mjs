/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbopack: {
      root: "./",
    },
  },
  images: {
    domains: ["images.unsplash.com"],
  }
};

export default nextConfig;
