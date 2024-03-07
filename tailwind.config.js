/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/flowbite/**/*.js",
    ],
    theme: {
        fontFamily: {
            body: ["League Spartan", "sans-serif"],
        },
        container: {
            center: true,
            screens: {
                sm: "640px",
                md: "768px",
                mm:"992px",
                lg: "1024px",
                xl: "1280px",
                // "2xl": "1496px",
            },
        },
        extend: {
            fontFamily: {
                generalSans: "'General Sans', san-serif",
            },
            keyframes: {
                parallax: {
                    "0%": {
                        objectPosition: "center",
                    },
                    "100%": {
                        objectPosition: "0 0",
                    },
                },
            },
            animation: {
                parallax: "parallax linear both",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "bg-purple": "#06141d",
                "text-white": "#D9D9D9",
                "tweet-blue": "#03A9F4",
                "bg-card": "#1B2730",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
