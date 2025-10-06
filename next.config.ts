import type { NextConfig } from "next";
import webpack from 'webpack';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  // Exclude jitsi-meet directory from webpack compilation
  webpack: (config, { isServer }) => {
    // Ignore the entire jitsi-meet directory
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/jitsi-meet/,
        contextRegExp: /./,
      })
    );
    
    // Add ignore pattern for jitsi-meet directory
    config.plugins.push(
      new webpack.IgnorePlugin({
        checkResource(resource) {
          return /jitsi-meet/.test(resource);
        },
      })
    );

    // Modify existing rules to exclude jitsi-meet
    config.module.rules.forEach((rule) => {
      if (rule && typeof rule === 'object' && 'test' in rule) {
        const test = rule.test;
        if (test && (test.toString().includes('tsx') || test.toString().includes('ts'))) {
          if (Array.isArray(rule.exclude)) {
            rule.exclude.push(/jitsi-meet/);
          } else if (rule.exclude) {
            rule.exclude = [rule.exclude, /jitsi-meet/];
          } else {
            rule.exclude = /jitsi-meet/;
          }
        }
      }
    });

    return config;
  },
};

export default nextConfig;
