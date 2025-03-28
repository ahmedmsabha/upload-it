import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "cloud.appwrite.io" },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
};

export default nextConfig;
