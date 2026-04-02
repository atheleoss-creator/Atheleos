const nextConfig = {
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;