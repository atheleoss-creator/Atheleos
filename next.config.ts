import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  generateBuildId: async () => {
    // Deterministic build ID based on timestamp — prevents stale chunk issues
    return `build-${Date.now()}`;
  },
};

export default nextConfig;
