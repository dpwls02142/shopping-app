import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://back-shopping-app.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
