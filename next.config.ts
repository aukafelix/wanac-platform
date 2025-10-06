import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  // Exclude jitsi-meet directory from webpack compilation
  webpack: (config, { webpack }) => {
    // Ignore the entire jitsi-meet directory using webpack.IgnorePlugin
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /jitsi-meet/,
      })
    );

    return config;
  },
};

export default nextConfig;
