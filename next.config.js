/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')()
const nextConfig = {
    // eslint: {
    //     ignoreDuringBuilds: true,
    // },
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pbs.twimg.com",
            },
            {
                protocol: "https",
                hostname: "inc42.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
        ],
        // domains: ["pbs.twimg.com"],
    },
   
};


module.exports =
  process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig

// module.exports = nextConfig;
