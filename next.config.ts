import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  allowedDevOrigins: ['p3028.aspen.kahub.in', 'localhost', '127.0.0.1'],
  images: {
    unoptimized: true
  }
};

export default nextConfig;
