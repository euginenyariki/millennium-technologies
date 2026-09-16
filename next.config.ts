/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;