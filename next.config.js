/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
