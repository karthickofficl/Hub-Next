import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", // or 'http' if your images are served over HTTP
        hostname: "milk-files.s3.ap-south-1.amazonaws.com",
        port: "", // Leave empty if default port
        pathname: "/Products/**", // Allow all paths under /Products/
      },
    ],
  },
};

export default nextConfig;
