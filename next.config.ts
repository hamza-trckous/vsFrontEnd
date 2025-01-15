import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})({
  // Other Next.js settings
  images: {
    domains: ["https://frontend-babybloom.vercel.app/"], // Add your domain if needed
    unoptimized: true, // Add this if you want to serve static images without optimization
  },
  // You can also add this to ensure proper asset handling
  assetPrefix: process.env.NODE_ENV === "production" ? undefined : undefined,
});

export default nextConfig;
