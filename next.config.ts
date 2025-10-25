import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Add image domains as needed
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
