// next.config.mjs
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: true,
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // Accept all paths from Cloudinary
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/path/to/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
    ],
  },
};

export default process.env.ANALYZE === "true"
  ? withBundleAnalyzer(nextConfig)
  : nextConfig;
