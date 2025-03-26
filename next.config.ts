import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import withSvgr from "next-plugin-svgr";
import crypto from "crypto";

// Define the CSP policy with a nonce placeholder
const cspHeader = `
  default-src 'self';
  script-src 'self' 'nonce-{{nonce}}' 'strict-dynamic';
  style-src 'self' 'nonce-{{nonce}}';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, " ").trim();

// Function to generate a nonce
const generateNonce = () => Buffer.from(crypto.randomUUID()).toString("base64");

// Next.js configuration
const nextConfig: NextConfig = withSvgr({
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.boldbrands.pro",
        pathname: "**",
      },
    ],
  },
  async headers() {
    const headers = [];
    if (process.env.NODE_ENV === "production") {
      const nonce = generateNonce();
      const cspWithNonce = cspHeader.replace(/{{nonce}}/g, nonce);
      headers.push({
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspWithNonce,
          },
          {
            key: "X-Nonce",
            value: nonce,
          },
        ],
      });
    }
    return headers;
  },
});

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);