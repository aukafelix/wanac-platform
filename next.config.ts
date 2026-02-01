import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Required if you use next/image with static export
  images: {
    unoptimized: true,
  },

  // No Webpack customizations needed for Jitsi API
  // Turbopack will now work without warnings
};

export default nextConfig;
