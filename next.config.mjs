/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gutenberg.org",
        port: "",
        // pathname: "/account123/**",
      },
    ],
  },
  serverRuntimeConfig: {
    maxDuration: 60,
  },
  experimental: {
    serverComponentsExternalPackages: ["react-server-dom-webpack"],
  },
};

export default nextConfig;
