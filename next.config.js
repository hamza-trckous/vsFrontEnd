/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/path/to/**",
      },
    ],
  },
};

module.exports = nextConfig;
