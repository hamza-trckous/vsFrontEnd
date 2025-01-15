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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' *.facebook.com *.fbcdn.net *.facebook.net https://gw.conversionsapigateway.com blob: data: https://*.google-analytics.com *.google.com https://apis.google.com https://accounts.google.com/gsi/client;
              style-src 'self' 'unsafe-inline' *.googleapis.com;
              img-src 'self' data: *.google-analytics.com *.google.com *.facebook.com *.fbcdn.net;
              connect-src 'self' *.facebook.com *.google-analytics.com;
              font-src 'self' *.gstatic.com;
              frame-src *.facebook.com *.google.com;
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
