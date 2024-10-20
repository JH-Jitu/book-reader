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
    maxDuration: 60, // Set maximum duration to 60 seconds (adjust as needed)
  },
};

export default nextConfig;
