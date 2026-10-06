import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 for team portraits (faces show compression artifacts at the default 75)
    qualities: [75, 90],
  },
};

export default nextConfig;
