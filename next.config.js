/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/tmdb/:path*",
        destination: "/api/tmdb/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
