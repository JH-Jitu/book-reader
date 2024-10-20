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
};

export default nextConfig;
