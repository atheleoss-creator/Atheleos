import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Prevent browser from caching stale chunks across deployments
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
};

export default nextConfig;