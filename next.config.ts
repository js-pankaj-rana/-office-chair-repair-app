import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  images: {
    remotePatterns: [
      new URL("http://res.cloudinary.com/dvxux8mm0/image/**/*.*"),
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  env: {},
};

export default nextConfig;
