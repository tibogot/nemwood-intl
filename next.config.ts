import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  poweredByHeader: false,
  compress: true,
  // Redirects for SEO - old /nl/services to new /nl/diensten
  async redirects() {
    return [
      {
        source: "/nl/services",
        destination: "/nl/diensten",
        permanent: true,
      },
      {
        source: "/nl/services/:path*",
        destination: "/nl/diensten/:path*",
        permanent: true,
      },
    ];
  },
  // Optimize file watching for better performance
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
    }
    return config;
  },
};

export default nextConfig;
