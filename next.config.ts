import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", // or 'http' if your images are served over HTTP
        hostname: "agaram-milk.s3.ap-south-1.amazonaws.com",
        port: "", // Leave empty if default port
        pathname: "/**", // Allow all paths under 
      },
    ],
  },
};

export default nextConfig;
