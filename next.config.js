/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["juncture-file-storage.s3.ap-southeast-1.amazonaws.com"],
  },
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;
