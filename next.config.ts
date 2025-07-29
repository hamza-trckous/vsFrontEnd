import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const isProd = process.env.NODE_ENV === "production";

const baseConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "frontend-babybloom.vercel.app",
      "via.placeholder.com"
    ],
    unoptimized: !isProd
  },
  webpack: (config: WebpackConfig) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
        stream: false
      }
    };
    return config;
  },
  reactStrictMode: true
};

// Add production-only options separately
if (isProd) {
  baseConfig.output = "standalone";
  baseConfig.compress = true;
}

const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
})(baseConfig);

export default nextConfig;
