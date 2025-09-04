import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  turbopack: {
    resolveAlias: {
      canvas: "false",
    },
  },
  experimental: {
    optimizePackageImports: [
      "date-fns",
      "lucide-react",
      "recharts",
      "@radix-ui/react-select",
      "@radix-ui/react-slider",
      "react-toastify",
      "clsx",
      "class-variance-authority",
      "embla-carousel-react",
      "react-hook-form",
    ],
    // 메모리 최적화
    largePageDataBytes: 512 * 1000, // 512KB
  },
};

export default nextConfig;
