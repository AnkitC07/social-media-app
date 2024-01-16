/** @type {import('next').NextConfig} */
const nextConfig = {
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
        ],
        // domains: ["pbs.twimg.com"],
    },
};

module.exports = nextConfig;
