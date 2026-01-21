import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                background: "#ffffff", // Pure White
                foreground: "#1d1d1f", // Apple Rich Gray

                // Apple System Colors
                primary: {
                    DEFAULT: "#0071e3", // Apple Blue
                    base: "#0071e3",
                    hover: "#0077ED",
                    active: "#006edb",
                },
                surface: {
                    DEFAULT: "#f5f5f7", // iOS Surface Gray (for pills, cards)
                    hover: "#e8e8ed",
                },
                border: "#d2d2d7", // Apple Border Gray

                // Semantic Colors
                success: "#34c759", // Apple Green
                warning: "#ff9f0a", // Apple Orange
                danger: "#ff3b30", // Apple Red

                muted: {
                    DEFAULT: "#86868b", // Apple Muted Text
                    foreground: "#86868b",
                }
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            borderRadius: {
                "2xl": "1.25rem", // 20px
                xl: "1rem",       // 16px (Standard Card)
                lg: "0.75rem",    // 12px
                md: "0.5rem",     // 8px
                sm: "0.25rem",    // 4px
                full: "9999px",   // Pills
            },
            boxShadow: {
                // "Dreamy Blur" Shadows
                sm: "0 1px 2px rgba(0,0,0,0.04)",
                DEFAULT: "0 4px 12px rgba(0,0,0,0.08)",
                lg: "0 12px 24px rgba(0,0,0,0.12)",
                xl: "0 20px 40px rgba(0,0,0,0.16)",
                // Inner shadow for inset elements
                inner: "inset 0 1px 2px rgba(0,0,0,0.06)",
                // Elevated Float
                float: "0 8px 32px rgba(0,0,0,0.12)",
            },
            letterSpacing: {
                tighter: "-0.04em",
                tight: "-0.02em", // Classic Apple Headline Tracking
                normal: "0",
                wide: "0.02em",
            },
            backdropBlur: {
                xs: '2px',
                xl: '20px', // Header usage
                '2xl': '40px',
                '3xl': '60px',
            }
        },
    },
    plugins: [],
};
export default config;
